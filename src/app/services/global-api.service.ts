import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators'
import { environment } from "../../environments/environment";
import { AuthenticateParameters, AuthenticateResponse, BarcodeTracker, BarcodeTrackerResponse, QCPrint, SetBreak, SystemInformation } from '../general-models/general';

@Injectable({
  providedIn: 'root'
})
export class GlobalAPIService {

  private origin:Required<string> = window.location.origin;
  private originExternal = "http://93.118.108.232:18830";
  private baseURL:Required<string>;

  constructor(private httpClient: HttpClient) {

    if ( this.origin === this.originExternal ) {
      this.baseURL = environment.API_URL_EXTERNAL;
    }
    else {
      this.baseURL = environment.API_URL_INTERNAL;
    };

   }

   private setHeaders(token:Required<string>) {
    const headres = new HttpHeaders({
      "Authorization" : token,
      "Content-Type" : "application/json; charset=utf-8",
    });
    return headres
  }

   getSystemInformation(): Observable<SystemInformation> {
    const requestURL:Required<string> = this.baseURL.concat("mapSystemInformation");
    return this.httpClient.get<SystemInformation>(requestURL)
                          .pipe(
                            catchError((error) => {
                              return throwError(error);
                            }),
                            shareReplay()
                          );
  }

  loginProcedure(authenticateParameters:AuthenticateParameters): Observable<AuthenticateResponse> {
    const headers = { 'content-type': 'application/json'}; 
    const requestURL:Required<string> = this.baseURL.concat("Login/athenticate");

    const body:Required<string> = JSON.stringify(authenticateParameters);
    return this.httpClient.post<AuthenticateResponse>(requestURL, body, {headers:headers})
                          .pipe(
                            catchError((error) => {
                              console.log(error);
                              return throwError(error)
                            }),
                            shareReplay()
                          );
  }

  mapTracking(token:string, barcodeTracker:BarcodeTracker):Observable<BarcodeTrackerResponse> {

    const requestURL:Required<string> = this.baseURL.concat("mapTracking");
    const body:Required<string> = JSON.stringify(barcodeTracker);

    return this.httpClient.post<BarcodeTrackerResponse>(requestURL, body, {headers:this.setHeaders(token)});

  }

  mapQCPrint(token:string, qcPrint: QCPrint):Observable<BarcodeTrackerResponse>  {
   
    const requestURL:Required<string> = this.baseURL.concat("mapQCPrint");
    const body:Required<string> = JSON.stringify(qcPrint);

    return this.httpClient.post<BarcodeTrackerResponse>(requestURL, body, {headers:this.setHeaders(token)});

  }

  mapGetBreak(token:string, barcodeTracker:BarcodeTracker) {

    const requestURL:Required<string> = this.baseURL.concat("mapGetBreak");
    const body:Required<string> = JSON.stringify(barcodeTracker);

    return this.httpClient.post(requestURL, body, {headers:this.setHeaders(token)});

  }

  mapSetBreak(token:string, setBreak:SetBreak[]) {

    const requestURL:Required<string> = this.baseURL.concat("mapSetBreak");
    const body:Required<string> = JSON.stringify(setBreak);

    return this.httpClient.post(requestURL, body, {headers:this.setHeaders(token)});

  }

}
