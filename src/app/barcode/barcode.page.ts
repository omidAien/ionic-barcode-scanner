import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit, AfterViewInit {

  @ViewChild('barcode') barcode: IonInput;

  Caption:string = "بارکد خوان";
  barcodeContainerLabel:string = "بارکد";
  numberOfStuff = [...Array(101).keys()];

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.barcode.readonly = true;
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

  logOut() {
    sessionStorage.clear();
    this.cookieService.delete("token");
    this.router.navigateByUrl("/");
  }

}
