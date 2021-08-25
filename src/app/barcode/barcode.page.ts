import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit {

  @ViewChild('barcode') barcode: IonInput;

  Caption:string = "بارکد خوان";
  barcodeContainerLabel:string = "بارکد";
  numberOfStuff = [...Array(101).keys()];

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    setTimeout(() => this.barcode.setFocus(), 300);
  }

  sendToServer() {
    this.barcode.value = "";
    this.barcode.setFocus();
  }

  logOut() {
    sessionStorage.clear();
    this.cookieService.delete("token");
    this.router.navigateByUrl("/");
  }

}
