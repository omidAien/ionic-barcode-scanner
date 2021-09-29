import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonInput, IonSelect, IonSelectOption, LoadingController, ModalController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { from, noop, of, throwError } from 'rxjs';
import { catchError, concatMap, finalize, tap } from 'rxjs/operators';
import { BarcodeTracker, ErrorModel, GetBreak, SetBreak } from 'src/app/general-models/general';
import { BarcodeReaderService } from 'src/app/services/barcode-reader.service';
import { GlobalAPIService } from 'src/app/services/global-api.service';

@Component({
  selector: 'app-brokrn-register',
  templateUrl: './brokrn-register.component.html',
  styleUrls: ['./brokrn-register.component.scss'],
})
export class BrokrnRegisterComponent implements OnInit {

  @Input() title: string;
  @ViewChild('numberOfBreak') numberOfBreak:IonInput; 

  breakFormData: { ID:number; Caption:string; DefaultValue:string; Items: null | string; ObjectType:number }[] = null;

  registerValue: { fieldID:number; fieldValue:string; }[] = [];

  constructor(public modalController: ModalController, 
              private globalAPIService: GlobalAPIService,
              private cookieService: CookieService,
              private router: Router,
              public alertController: AlertController,
              public loadingController: LoadingController,
              public barcodeReaderService: BarcodeReaderService,) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    }).then(() => {

      this.barcodeReaderService.setBarcode(null);
      this.barcodeReaderService.resetBarcodeTrackerResponse();
    });

  }

  ionViewWillEnter() {

    const barcode:string = this.barcodeReaderService.getBarcode();
    const token = "bearer ".concat(JSON.parse(this.cookieService.get("token")));
    const mapGetBreakRequest: BarcodeTracker = {
      barcode: barcode
    }; 

    const mapGetBreak$ = this.globalAPIService
                             .mapGetBreak(token, mapGetBreakRequest)
                             .pipe(
                                catchError((error) => {
    
                                  sessionStorage.removeItem("userLogin");
                                  this.router.navigateByUrl("/login").then(() => window.location.reload());
                        
                                  return throwError(error);
                                }),
                             );
    const loading$ = this.generateLodingController();

    of(null)
      .pipe(
        tap(() => loading$.subscribe((loading) => loading.present())),
        concatMap(() => mapGetBreak$),
        tap((data: GetBreak) => {
          
          if ( !data.Error.hasError ) {

            data.Break  
                .map((item) => {

                  const _id:number = item.ID;

                  if ( item.DefaultValue && item.Items ) {

                    const _Items:{ Code:string; Value:string;}[] = JSON.parse(item.Items);
                    let _code:string = null;

                    _Items.map((op:{ Code:string; Value:string;}) => {

                      if ( op.Value === item.DefaultValue ) {
                        _code = op.Code;
                      }

                    });

                    setTimeout(() => this.registerValue.push({ fieldID: _id, fieldValue: _code }), 100);

                  }
                  else if ( item.DefaultValue && !item.Items ) {

                    this.registerValue.push({ fieldID: _id, fieldValue: item.DefaultValue });

                  }
                  else if ( !item.DefaultValue ) {

                    this.registerValue.push({ fieldID: _id, fieldValue: null });

                  }

            });

            setTimeout(() => {

              this.breakFormData = data.Break;


            }, 200);

          }

        }),
        finalize(() => loading$.subscribe((loading) => loading.dismiss()))
      )
      .subscribe(noop);
        
  }

  selectOptions(event:any, id:number) {

    this.registerValue
        .map((item:{ fieldID:number; fieldValue:string; }) => {

          if ( item.fieldID === id ) {
            item.fieldValue = event.detail.value;
          }

        });
  
  }

  generateLodingController() {
    
    const loadingPromise = this.loadingController.create({
      message: '... لطفا چند صبر کنید',
    });
    
    const loading$ = from(loadingPromise);

    return loading$

  }

  convertToJson(value:string) {
    return JSON.parse(value);
  }

  sendDataToSever() {

    const token = "bearer ".concat(JSON.parse(this.cookieService.get("token")));
    const mapSetBreakRequest: SetBreak[] = this.registerValue;

    const mapSetBreak$ = this.globalAPIService
                             .mapSetBreak(token, mapSetBreakRequest)
                             .pipe(
                              catchError((error) => {
  
                                sessionStorage.removeItem("userLogin");
                                this.router.navigateByUrl("/login").then(() => window.location.reload());
                      
                                return throwError(error);
                              }),
                           );

    const loading$ = this.generateLodingController();

    of(null)
      .pipe(
        tap(() => loading$.subscribe((loading) => loading.present())),
        concatMap(() => mapSetBreak$),
        tap((data:ErrorModel) => {

          if ( !data.hasError ) {

            const alertController$ = from(this.alertController.create({
              cssClass: 'broken-product-alert',
              header: 'توجه',
              message: 'ثبت با موفقیت انجام شد',
              buttons: [
                {
                  text: 'تایید',
                  role: 'okay',
                  handler: () => {
                    this.dismiss();
                  }
                }
              ]
            }));

            alertController$.subscribe((alertController) => alertController.present());

          }
          else {

            const alertController$ = from(this.alertController.create({
              cssClass: 'broken-product-alert',
              header: 'توجه',
              message: 'خطایی رخ داد',
              buttons: [
                {
                  text: 'تایید',
                  role: 'okay'
                }
              ]
            }));

            alertController$.subscribe((alertController) => alertController.present());


          }

        }),
        finalize(() => loading$.subscribe((loading) => loading.dismiss()))
      )
      .subscribe(noop);

  }

  setIonSelectValue(event:IonSelect, defaultValue:string) {

    event.value = defaultValue;


  }

}
