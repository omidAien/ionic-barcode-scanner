import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, LoadingController, ModalController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { from, noop, of, throwError } from 'rxjs';
import { catchError, concatMap, finalize, tap } from 'rxjs/operators';
import { BarcodeTracker, GetBreak, SetBreak } from 'src/app/general-models/general';
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

  breakFormData: { ID:number; Caption:string; DefaultValue:string; Items: null | []; ObjectType:number }[] = null;

  registerValue: { fieldID:number; fieldValue:string; }[] = [];

  constructor(public modalController: ModalController, 
              private globalAPIService: GlobalAPIService,
              private cookieService: CookieService,
              private router: Router,
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
          
          console.log(data.Break);
          if ( !data.Error.hasError ) {

            setTimeout(() => {
              this.breakFormData = data.Break;
            }, 500);

          }

        }),
        finalize(() => loading$.subscribe((loading) => loading.dismiss()))
      )
      .subscribe(noop);
        
  }

  selectOptions(event:any, id:number) {

    const data: { fieldID:number; fieldValue:string; } = {
      fieldID: id,
      fieldValue: event.detail.value
    };

    this.registerValue.push(data);
  
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

    const barcode:string = this.barcodeReaderService.getBarcode();

    this.registerValue.push({fieldID: +this.numberOfBreak.name, fieldValue: this.numberOfBreak.value.toString()});

    this.registerValue.push({fieldID: 1, fieldValue: barcode});

    console.log(this.registerValue)

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
        tap((data) => {

          console.log(data);

        }),
        finalize(() => loading$.subscribe((loading) => loading.dismiss()))
      )
      .subscribe(noop);

  }

}
