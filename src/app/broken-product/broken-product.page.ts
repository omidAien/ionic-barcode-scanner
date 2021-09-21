import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, from, noop, of } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { BarcodeReaderService } from '../services/barcode-reader.service';
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
  }

  changeInputBarcode() {

    const barcode:string = this.barcode.value.toString();

    if ( barcode ) {

      const loading$ = this.barcodeReaderService.getProductInformation(barcode);

      loading$.subscribe((loading) => loading.onDidDismiss().then(() => {

        this.barcode.value = "";
        this.barcode.readonly = true;
        this.focusOnBarcodeInputElement();

      }));

    }

  }

  async brokenRegisterModal() {

    const barcode:string = this.barcodeReaderService.getBarcode();    

    if ( barcode ) {

      const modal = await this.modalController.create({
          component: BrokrnRegisterComponent,
          componentProps: {
            'title': 'ثبت عملیات',
            'barcode': barcode
          }
        });
        
        await modal.present();

        const { data } = await modal.onWillDismiss();
        
        if (data) {
          this.barcode.readonly = true;
          this.focusOnBarcodeInputElement();
        };

      }
      else {

        const alert = await this.alertController.create({
          cssClass: 'broken-product-alert',
          header: 'توجه',
          message: 'لطفا بارکد را اسکن نمایید',
          buttons: [
            {
              text: 'باشه',
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

  }


}
