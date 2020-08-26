import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from '../services/authen.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authen : AuthenService,
    private userService : UsersService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return new Promise<boolean>((resolve,reject)=>{
    const role:[] = next.data.roles;
    this.userService.onGetprofile(this.authen.getAccessToken())
    .subscribe(
      res =>{
        if(role.filter(item => item === res.role).length > 0){
          resolve(true)
        }else{
          resolve(false)
        }
      },error =>{
        error (() => resolve(false))
      }
    )

    })
   }
}

