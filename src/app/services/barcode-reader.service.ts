import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, from, noop, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, delay, finalize, tap } from 'rxjs/operators';
import { BarcodeTracker, BarcodeTrackerResponse } from '../general-models/general';
import { GlobalAPIService } from './global-api.service';

@Injectable({
  providedIn: 'root'
})
export class BarcodeReaderService {

  private barcodeSubject = new BehaviorSubject<string>(null);

  private barcodeTrackerResponseSubject = new BehaviorSubject<BarcodeTrackerResponse>(null);
  public barcodeTrackerResponse$: Observable<BarcodeTrackerResponse> = this.barcodeTrackerResponseSubject.asObservable();

  constructor(public loadingController: LoadingController,
              private globalService: GlobalAPIService,
              private alertController: AlertController,
              private router: Router,
              private cookieService: CookieService) { }

  getProductInformation(barcode:string) {

    // 1. save barcode in memory
    this.barcodeSubject.next(barcode);

    // 2. create loadingController Promise by menas of ionic's loadingController
    const loadingPromise = this.loadingController.create({
      message: '... لطفا چند صبر کنید',
    });
    
    // 3. convert loadingController Promise to Observeable
    const loading$ = from(loadingPromise);
    
    // 4. send barcode has been read to sever in order to get information of product

    const token = "bearer ".concat(JSON.parse(this.cookieService.get("token")));
    const bodyRequest: BarcodeTracker = {
      barcode: barcode
    };
    const barcodeTracker$:Observable<BarcodeTrackerResponse> = this.globalService
                                                                 .mapTracking(token, bodyRequest)
                                                                 .pipe(
                                                                   catchError((error:HttpErrorResponse) => {

                                                                     sessionStorage.removeItem("userLogin");
                                                                     this.router.navigateByUrl("/login").then(() => window.location.reload());
                                                                    
                                                                     return throwError(error);
                                                                  }),
                                                                 );  

    of(true)
      .pipe(  
        tap(() => loading$.subscribe((loading) => loading.present())),
        delay(2000),
        concatMap(() => barcodeTracker$),
        tap((barcodeTrackerResponse:BarcodeTrackerResponse) => {

          this.barcodeTrackerResponseSubject.next(barcodeTrackerResponse);
          
          if ( barcodeTrackerResponse.Error.LogData && this.router.url === '/broken-product' ) {
            
            const logData = JSON.parse(barcodeTrackerResponse.Error.LogData);
            
            const alertController$ = from(this.alertController.create({
              cssClass: 'broken-product-alert',
              header: 'توجه',
              message: logData.Status,
              buttons: [
                {
                  text: 'تایید',
                  role: 'okay'
                }
              ]
              })
            );

            alertController$.subscribe((alertController) => alertController.present());  

          }

        }),
        finalize(() => loading$.subscribe((loading) => loading.dismiss()))
      )
      .subscribe(noop);

    return loading$
    
  }

  setBarcode(value:string) {
    this.barcodeSubject.next(value);
  }

  getBarcode() {
    return this.barcodeSubject.getValue();
  }

  resetBarcodeTrackerResponse() {
    this.barcodeTrackerResponseSubject.next(null);
  }

  updateBarcodeTrackerResponse(value:BarcodeTrackerResponse) {
    this.barcodeTrackerResponseSubject.next(value);
  }
        
}
