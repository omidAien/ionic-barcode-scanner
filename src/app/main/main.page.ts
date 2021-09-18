import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  mainPageTitle:string = "صفحه اصلی";

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }

  goTospecificPage(moduleName:string) {

    switch (moduleName) {

      case 'productTracking':
        this.router.navigateByUrl('/product-tracker', { state : { title: 'ردیابی محصول' } })
        break;

      case 'brokenProduct':
        this.router.navigateByUrl('/broken-product', { state : { title: 'ثبت شکست' } })

    }

  }

  logOut() {
    sessionStorage.clear();
    this.cookieService.delete("token");
    this.router.navigateByUrl("/");
  }

}
