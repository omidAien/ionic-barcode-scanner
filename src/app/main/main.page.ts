import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { noop, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ManageUserService } from '../services/manage-user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  mainPageTitle:string = "";
  defaultWorkGroupId:number;

  constructor(private cookieService: CookieService, 
              private manageUserService:ManageUserService,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.manageUserService
        .userRole$
        .pipe(
          catchError((error) => {

            this.defaultWorkGroupId = JSON.parse(sessionStorage.getItem("DefaultWorkgroupID"));

            return throwError(error)
          }),
          tap((_defaultWorkGroupId:number) => {

              if ( _defaultWorkGroupId ) {

                this.defaultWorkGroupId = _defaultWorkGroupId;

              }
              else {

                this.defaultWorkGroupId = JSON.parse(sessionStorage.getItem("DefaultWorkgroupID"));
                
              }

              this.determineMainPageTitleBasedOnDefaultWorkGroupId(this.defaultWorkGroupId);

          })
        )
        .subscribe(noop)
    
  }

  goTospecificPage(moduleName:string) {

    switch (moduleName) {

      case 'productTracking':
        this.router.navigateByUrl('/product-tracker', { state : { title: 'ردیابی محصول' } })
        break;

      case 'brokenProduct':
        this.router.navigateByUrl('/broken-product', { state : { title: 'ثبت شکست' } });
        break;

      case 'printLabel':
        this.router.navigateByUrl('/print-label', { state : { title: 'چاپ لیبل' } });
        break;   

    }

  }

  logOut() {
    sessionStorage.clear();
    this.cookieService.delete("token");
    this.router.navigateByUrl("/");
  }

  determineMainPageTitleBasedOnDefaultWorkGroupId(id:number) {

    switch (id) {

      case 3:
        this.mainPageTitle = "انبار";
        break;

      case 9:    
      this.mainPageTitle = "کنترل کیفی";
      break;

    }


  }

}
