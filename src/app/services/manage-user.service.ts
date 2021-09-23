import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  private userRoleSubject = new BehaviorSubject<number>(null);
  public userRole$: Observable<number> = this.userRoleSubject.asObservable();

  constructor() { }

  setUserRole(defaultWorkgroupID:number) {

    this.userRoleSubject.next(defaultWorkgroupID);
    sessionStorage.setItem('DefaultWorkgroupID', JSON.stringify(defaultWorkgroupID));

  }

}
