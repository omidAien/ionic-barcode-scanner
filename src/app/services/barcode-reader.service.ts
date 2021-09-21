import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject, from, noop, Observable, of } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BarcodeReaderService {

  private barcodeSubject = new BehaviorSubject<string>(null);

  private productInformationSubject = new BehaviorSubject<string>(null);
  public productInformation$: Observable<string> = this.productInformationSubject.asObservable();

  constructor(public loadingController: LoadingController,) { }

  getProductInformation(barcode:string) {

    // 1. save barcode in memory
    this.barcodeSubject.next(barcode);

    // 2. create loadingController Promise by menas of ionic's loadingController
    const loadingPromise = this.loadingController.create({
      message: '... لطفا صبر کنید',
    });
    
    // 3. convert loadingController Promise to Observeable
    const loading$ = from(loadingPromise);
    
    // 4. send barcode has been read to sever in order to get information of product
    of(true)
      .pipe(
        tap(() => loading$.subscribe((loading) => loading.present())),
        delay(2000),
        finalize(() => loading$.subscribe((loading) => loading.dismiss()))
      )
      .subscribe(() => this.productInformationSubject.next("ok"));

    return loading$
    
  }

  setBarcode(value:string) {
    this.barcodeSubject.next(value);
  }

  getBarcode() {
    return this.barcodeSubject.getValue();
  }
        
}
