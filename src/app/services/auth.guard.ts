import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const userLoginStatus = sessionStorage.getItem("userLogin");
    const IsUserLogin: boolean | null = userLoginStatus ? JSON.parse(userLoginStatus) : null;
    
    if ( IsUserLogin ) {
      return true
    }
    else {
      this.router.navigateByUrl("/");
      return false
    }

  }
  
}
