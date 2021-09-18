import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
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

  constructor(private router: Router, public modalController: ModalController) {

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

  async brokenRegisterModal() {
    const modal = await this.modalController.create({
      component: BrokrnRegisterComponent,
      componentProps: {
        'title': 'ثبت عملیات',
      }
    });
    return await modal.present();
  }

}
