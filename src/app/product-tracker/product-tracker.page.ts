import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { BarcodeReaderService } from '../services/barcode-reader.service';

@Component({
  selector: 'app-product-tracker',
  templateUrl: './product-tracker.page.html',
  styleUrls: ['./product-tracker.page.scss'],
})
export class ProductTrackerPage implements OnInit {

  @ViewChild('barcode') barcode: IonInput;
  barcodeContainerLabel:string = "بارکد";
  title:string;

  constructor(private router: Router,
              public barcodeReaderService: BarcodeReaderService) { 

    try {     
      this.title = this.router.getCurrentNavigation().extras.state.title;
    } 
    catch (error) {
      this.router.navigateByUrl("/main");
    };

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

  changeInputBarcode() {

    let barcode:string = "";

    if ( this.barcode.value.toString().startsWith('j') ) {

      barcode = this.barcode.value.toString().replace("j", "");

    }
    else if ( this.barcode.value.toString().startsWith('s') ) {

      barcode = this.barcode.value.toString().replace("s", "");

    }
    else {

      barcode = this.barcode.value.toString();

    }

    if ( barcode.length >= 12 ) {

      const loading$ = this.barcodeReaderService.getProductInformation(barcode);

      loading$.subscribe((loading) => loading.onDidDismiss().then(() => {

        this.barcode.value = "";
        this.barcode.readonly = true;
        this.focusOnBarcodeInputElement();

      }));

    }

  }

  ngAfterViewInit() {
    this.barcode.readonly = true;
  }

  onClickBackButton() {
    this.barcodeReaderService.setBarcode(null);
    this.barcodeReaderService.resetBarcodeTrackerResponse();
  }

}
