import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, LoadingController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { from, noop, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, delay, finalize, tap } from 'rxjs/operators';
import { BarcodeTrackerResponse, QCPrint } from '../general-models/general';
import { BarcodeReaderService } from '../services/barcode-reader.service';
import { GlobalAPIService } from '../services/global-api.service';

@Component({
  selector: 'app-print-label',
  templateUrl: './print-label.page.html',
  styleUrls: ['./print-label.page.scss'],
})
export class PrintLabelPage implements OnInit, AfterViewInit {

  @ViewChild('barcode') barcode: IonInput;
  @ViewChild('numberOfLabel') numberOfLabel:IonInput;

  title:string;
  barcodeContainerLabel:string = "بارکد";

  constructor(private router: Router, 
              private alertController: AlertController,
              private globalService: GlobalAPIService,
              public loadingController: LoadingController, 
              private cookieService: CookieService,             
              public barcodeReaderService: BarcodeReaderService,) { 

    try {

      this.title = this.router.getCurrentNavigation().extras.state.title;

    } catch (error) {
      
      this.router.navigateByUrl("/main");

    }

  }

  ngOnInit() {}

  focusOnBarcodeInputElement() {
    setTimeout(() => {
      this.barcode.readonly = false;
      this.barcode.setFocus();
    }, 300);
  }

  ionViewWillEnter() {
    this.focusOnBarcodeInputElement();
    this.barcodeReaderService.setBarcode(null);
  }

  ngAfterViewInit() {
    this.barcode.readonly = true;
  }

  changeInputBarcode() {

    let barcode:string = "";

    if ( this.barcode.value.toString().startsWith('j') ) { barcode = this.barcode.value.toString().replace("j", ""); }

    else if ( this.barcode.value.toString().startsWith('s') ) { barcode = this.barcode.value.toString().replace("s", ""); }

    else { barcode = this.barcode.value.toString(); };


    if ( barcode.length >= 12 ) {

      const loading$ = this.barcodeReaderService.getProductInformation(barcode);

      loading$.subscribe((loading) => loading.onDidDismiss().then(() => {

        this.barcode.value = "";
        this.barcode.readonly = true;
        this.focusOnBarcodeInputElement();

      }));

    }

  }

  onClickBackButton() {
    this.barcodeReaderService.setBarcode(null);
    this.barcodeReaderService.resetBarcodeTrackerResponse();
  }

  registerPrintLabel() {

    const barcode:string = this.barcodeReaderService.getBarcode();
    const numberOfLabel:number = +this.numberOfLabel.value;
    const loading$ = this.generateLodingController();
    const token = "bearer ".concat(JSON.parse(this.cookieService.get("token")));

    if ( barcode && numberOfLabel ) {

      const qcPrintRequest: QCPrint = {
        barcode: barcode,
        number: numberOfLabel
      };
  
      const QCPrintRequest$: Observable<BarcodeTrackerResponse> = this.globalService.mapQCPrint(token, qcPrintRequest);
  
      of(null)
        .pipe(
          catchError((error) => {
  
            sessionStorage.removeItem("userLogin");
            this.router.navigateByUrl("/login").then(() => window.location.reload());
  
            return throwError(error);
          }),
          tap(() => loading$.subscribe((loading) => loading.present())),
          delay(500),
          concatMap(() => QCPrintRequest$),
          tap((response: BarcodeTrackerResponse) => {
  
            if ( !response.Error.hasError ) {

              this.barcodeReaderService.updateBarcodeTrackerResponse(response);
              
            }
            else {

              const alertController$ = this.generateAlertController(response.Error.Message);
              alertController$.subscribe((alertController) => alertController.present());

            }
  
          }),
          finalize(() => loading$.subscribe((loading) => {

            loading.dismiss().then(() => {

              this.numberOfLabel.value = null;
              this.numberOfLabel.setBlur;
  
              this.barcode.readonly = true;
              this.focusOnBarcodeInputElement();

            });

          }))
        )
        .subscribe(noop);

    }

    else {

      let errorMessage:string = "";
      const notExistenceBarcode:string = "بارکد به درستی اسکن نشده است";
      const notExistenceNumberOfLabel:string = "تعداد لیبل ها مشخص نشده است";
      const notExistenceBoth:string = "بارکد به درستی اسکن نشده و تعداد لیبل ها مشخص نشده است";

      if ( !barcode && !numberOfLabel ) { errorMessage = notExistenceBoth; }

      else if ( !barcode ) { errorMessage = notExistenceBarcode; }

      else if ( !numberOfLabel ) { errorMessage = notExistenceNumberOfLabel; };

      const alertController$ = this.generateAlertController(errorMessage);
      alertController$.subscribe((alertController) => alertController.present());

    }

  }

  generateAlertController(serverSideMessage:string) {

    const alertController = this.alertController.create({
      cssClass: 'broken-product-alert',
      header: 'توجه',
      message: serverSideMessage,
      buttons: [
        {
          text: 'تایید',
          role: 'okay',
          handler: () => {
            this.barcode.readonly = true;
            this.focusOnBarcodeInputElement();
          }
        }
      ]
    });

    const alertController$ = from(alertController);

    return alertController$

  }

  generateLodingController() {
    
    const loadingPromise = this.loadingController.create({
      message: '... لطفا چند صبر کنید',
    });
    
    const loading$ = from(loadingPromise);

    return loading$

  }


}
