import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-product-tracker',
  templateUrl: './product-tracker.page.html',
  styleUrls: ['./product-tracker.page.scss'],
})
export class ProductTrackerPage implements OnInit, AfterViewInit {

  @ViewChild('barcode') barcode: IonInput;

  title:string;
  barcodeContainerLabel:string = "بارکد";
  
  constructor(private router: Router) { 

    this.title = this.router.getCurrentNavigation().extras.state.title;

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
  }

  sendToServer() {

    // first action
    this.barcode.value = "";
    this.barcode.readonly = true;

    // second action
    this.focusOnBarcodeInputElement();
  }

  ngAfterViewInit() {
    this.barcode.readonly = true;
  }

}
