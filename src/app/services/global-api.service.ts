import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators'
import { environment } from "../../environments/environment";
import { AuthenticateParameters, AuthenticateResponse, SystemInformation } from '../general-models/general';

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
                              window.location.reload();
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

}
