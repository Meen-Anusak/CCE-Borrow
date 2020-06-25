import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from '../services/authen.service';
import { AppURL } from '../app.routing';
import { AuthenURL } from '../authentication/authen.routing';

@Injectable({
  providedIn: 'root'
})
export class UnauthenGuard implements CanActivate {
  constructor(
    private authen : AuthenService,
    private router : Router
  ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authen.getAccessToken()){
      this.router.navigate(['/',AppURL.Authen,AuthenURL.Dashboard])
      return false
    }
    return true
  }

}
