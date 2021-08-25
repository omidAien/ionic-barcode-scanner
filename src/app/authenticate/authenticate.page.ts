import { Component, OnInit, ViewChild } from '@angular/core';
import { noop, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticateParameters, AuthenticateResponse, ClientInformation, SystemInformation } from '../general-models/general';
import { GlobalAPIService } from '../services/global-api.service';
import { LoadingService } from '../services/loading.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IonCheckbox, ToastController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage implements OnInit {

  @ViewChild("remmeberMe") remmeberMe: IonCheckbox;

  pageDirection:string;
  Caption:string;
  appVersion:string;
  PoweredBy:string;
  ReleaseDate:string;
  clientInformation: ClientInformation;

  loginForm:FormGroup;
  remmeberMeIsChecked:boolean = false;

  constructor(private globalAPIService: GlobalAPIService, 
              public loadingService: LoadingService,
              private cookieService: CookieService,
              private router: Router,
              public toastController: ToastController) { }

  ngOnInit() {

    this.clientInformation = JSON.parse(this.cookieService.get("clientInformation"));

    const systemInformation$: Observable<SystemInformation> = this.globalAPIService.getSystemInformation();
    const systemInformation: (SystemInformation | null) = JSON.parse(sessionStorage.getItem("SystemInformation"));

    if ( systemInformation ) {
      this.pageDirection = systemInformation.Direction;
      this.Caption = systemInformation.Caption;
      this.appVersion = systemInformation.Version;
      this.PoweredBy = systemInformation.PoweredBy;
      this.ReleaseDate = systemInformation.ReleaseDate;
    }
    else {
      this.loadingService
      .loadUntilRequestComplete(systemInformation$)
      .subscribe((systemInformation: SystemInformation) => {

        if ( !systemInformation.Error.hasError ) {

          sessionStorage.setItem("SystemInformation", JSON.stringify(systemInformation));

          this.pageDirection = systemInformation.Direction;
          this.Caption = systemInformation.Caption;
          this.appVersion = systemInformation.Version;
          this.PoweredBy = systemInformation.PoweredBy;
          this.ReleaseDate = systemInformation.ReleaseDate;

        }
        else {
          console.log(systemInformation.Error.Message);
        }

      });
    };

    this.loginForm = new FormGroup({
      username: new FormControl(localStorage?.getItem("username")),
      password: new FormControl(localStorage.getItem("password")),
    });

    this.remmeberMeIsChecked = JSON.parse(localStorage.getItem("remmeberMe"));

  }

  submitLoginForm() {
    
    if ( this.loginForm.valid ) {

      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      const clientInformation = this.clientInformation;

      const authenticateParameters: AuthenticateParameters = {
        userID : username,
        userPSW : password,
        workstationID : 0,
        workgroupID : 0,
        clientInformation : clientInformation,
      };

      this.globalAPIService
          .loginProcedure(authenticateParameters)
          .pipe(
            tap((authenticateResponse: AuthenticateResponse) => {
              
              if ( !authenticateResponse.Error.hasError ) {

                this.applyRememberMe(username, password);
                
                const token: string = authenticateResponse.Token;
                this.cookieService.set("token", JSON.stringify(authenticateResponse.Token));
                this.saveToSessionStorage("userLogin", JSON.stringify(true));
                this.router.navigateByUrl("/barcode");

              }
              else {
                const errorMessage:string = authenticateResponse.Error.Message;
                this.presentToast(errorMessage);
              }

            })
          )
          .subscribe(
            noop
          );
    }

  }

  applyRememberMe(username: string, password: string) {
    if ( this.remmeberMe?.checked ) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("remmeberMe", JSON.stringify(true));
    };
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color: "dark",
      cssClass: 'map-toast-message'
      
    });
    toast.present();
  }

  saveToSessionStorage(key: string, value:any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
