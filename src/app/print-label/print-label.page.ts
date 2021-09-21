import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { BarcodeReaderService } from '../services/barcode-reader.service';

@Component({
  selector: 'app-print-label',
  templateUrl: './print-label.page.html',
  styleUrls: ['./print-label.page.scss'],
})
export class PrintLabelPage implements OnInit, AfterViewInit {

  @ViewChild('barcode') barcode: IonInput;

  title:string;
  barcodeContainerLabel:string = "بارکد";

  constructor(private router: Router, public barcodeReaderService: BarcodeReaderService,) { 

    try {
      
      this.title = this.router.getCurrentNavigation().extras.state.title;

    } catch (error) {
      
      this.router.navigateByUrl("/main");

    }

  }

  ngOnInit() {
  }

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

    if ( barcode.length >= 12 ) {

      const loading$ = this.barcodeReaderService.getProductInformation(barcode);

      loading$.subscribe((loading) => loading.onDidDismiss().then(() => {

        this.barcode.value = "";
        this.barcode.readonly = true;
        this.focusOnBarcodeInputElement();

      }));

    }

  }

}
