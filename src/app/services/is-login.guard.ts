import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const userLoginStatus = sessionStorage.getItem("userLogin");
      const IsUserLogin: boolean | null = userLoginStatus ? JSON.parse(userLoginStatus) : null;
      
      if ( IsUserLogin ) {
        this.router.navigateByUrl("/barcode");
        return false
      }
      else {
        return true
      }
      
  }
  
}
