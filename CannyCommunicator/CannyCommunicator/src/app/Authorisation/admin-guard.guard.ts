import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token =localStorage.getItem('token');
    
    if(token != null){
      let decodedToken: any = jwt_decode(token);
      if(decodedToken.UserType.toUpperCase() != 'ADMIN'){
        this.router.navigate(['/LoginPage']);
        return false;
      }
      else{
        return true;
      }
    }
  }
  
}
