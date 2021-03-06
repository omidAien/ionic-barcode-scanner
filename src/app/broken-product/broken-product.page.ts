import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, from, noop, of } from 'rxjs';
import { delay, finalize, shareReplay, tap } from 'rxjs/operators';
import { BarcodeTrackerResponse } from '../general-models/general';
import { BarcodeReaderService } from '../services/barcode-reader.service';
import { ProductInfoViewerComponent } from '../shared/product-info-viewer/product-info-viewer.component';
import { BrokrnRegisterComponent } from './modalPages/brokrn-register/brokrn-register.component';

@Component({
  selector: 'app-broken-product',
  templateUrl: './broken-product.page.html',
  styleUrls: ['./broken-product.page.scss'],
})
export class BrokenProductPage implements OnInit, AfterViewInit {

  @ViewChild('barcode') barcode: IonInput;

  barcodeContainerLabel:string = "بارکد";
  title:string;

  constructor(private router: Router, 
              public barcodeReaderService: BarcodeReaderService,
              public alertController: AlertController,
              public modalController: ModalController) {

    try {
      this.title = this.router.getCurrentNavigation().extras.state.title;
    } 
    catch (error) {
      this.router.navigateByUrl("/main");
    }

   }

  ngOnInit() {}

  focusOnBarcodeInputElement() {
    setTimeout(() => {
      this.barcode.readonly = false;
      this.barcode.setFocus()
    }, 300);
  }

  ionViewWillEnter() {
    this.focusOnBarcodeInputElement();
    this.barcodeReaderService.setBarcode(null);
  }

  ngAfterViewInit() {
    this.barcode.readonly = true;
  }

  onClickBackButton() {
    this.barcodeReaderService.setBarcode(null);
    this.barcodeReaderService.resetBarcodeTrackerResponse();
  }

  changeInputBarcode() {

    let barcode:string = "";

    if ( this.barcode.value.toString().startsWith('j') ) { barcode = this.barcode.value.toString().replace("j", ""); }

    else if ( this.barcode.value.toString().startsWith('s') ) { barcode = this.barcode.value.toString().replace("s", ""); }

    else { barcode = this.barcode.value.toString(); }

    if ( barcode.length >= 12 ) {

      const loading$ = this.barcodeReaderService.getProductInformation(barcode);

      loading$.subscribe((loading) => loading.onDidDismiss().then(() => {

        this.barcode.value = "";
        this.barcode.readonly = true;
        this.focusOnBarcodeInputElement();

      }));

    }

  }

  async brokenRegisterModal() {

    let barcodeIsExistence:boolean = false;

    this.barcodeReaderService
        .barcodeTrackerResponse$
        .pipe(
          shareReplay(),
          tap((data:BarcodeTrackerResponse) => {

            if ( data ) {

              if ( data.Barcode ) { barcodeIsExistence = true; }

              else { barcodeIsExistence = false; }

            }

            else { barcodeIsExistence = false; }

          })
        )
        .subscribe(noop);
    
    if ( !barcodeIsExistence ) {
      
      const alert = await this.alertController.create({
        cssClass: 'broken-product-alert',
        header: 'توجه',
        message: 'لطفا بارکد را به درستی اسکن نمایید',
        buttons: [
          {
            text: 'تایید',
            role: 'okay',
            handler: () => {
              this.barcode.readonly = true;
              this.focusOnBarcodeInputElement();
            }
          }
        ]
      });
  
      await alert.present();

    }
    else {

      const modal = await this.modalController.create({
        component: BrokrnRegisterComponent,
        componentProps: {
          'title': 'ثبت عملیات',
        }
      });
      
      await modal.present();

      const { data } = await modal.onWillDismiss();
      
      if (data) {
        this.barcode.readonly = true;
        this.focusOnBarcodeInputElement();
      };
      
    }

  }


}
