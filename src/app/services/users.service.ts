import { Injectable, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-models';
import { environment } from 'src/environments/environment';
import { AuthenService } from './authen.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit{

  constructor(
    private http : HttpClient,
    private authen : AuthenService
  ) {
    this.setUser()

   }

   ngOnInit(){

   }



  onAdduser(userModel:User){
    return this.http.post<any>(`${environment.URL}users`,this.makeFormUser(userModel))
  }

  onLogin(loginModel){
    return this.http.post<any>(`${environment.URL}users/login`,loginModel);
  }

  onGetprofile(accessToken){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    this.setUser()
   return this.http.get<User>(`${environment.URL}users/profile`,{headers:Header})
  }

  ongetUser(accessToken){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.get<any>(`${environment.URL}users`,{headers:Header})
    }

  onDelete(id,accessToken){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.delete<any>(`${environment.URL}users/${id}`,{headers:Header})
  }

  onchangePass(model,accessToken){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.post<any>(`${environment.URL}users/change-pass`,model,{headers:Header})
  }

  onUpdateImage(model,accessToken){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.post<any>(`${environment.URL}users/update-image`,this.makeFormUser(model),{headers:Header})
  }

  ongetUserById(id,accessToken){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.get<any>(`${environment.URL}users/${id}`,{headers:Header})
  }
  onupdateUser(id,model,accessToken){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.put<any>(`${environment.URL}users/${id}`,this.makeFormUser(model),{headers:Header})
  }


  private makeFormUser(user:User):FormData{
    let formuser = new FormData();
    formuser.append('studentID',user.studentID)
    formuser.append('fname',user.fname)
    formuser.append('lname',user.lname)
    formuser.append('image',user.image)
    formuser.append('password',user.password)
    formuser.append('role',user.role)

    return formuser
  }

  public setUser(){
    const Header ={
      'Authorization': 'Bearer '+ this.authen.getAccessToken()
    }
   this.http.get<User>(`${environment.URL}users/profile`,{headers:Header})
    .subscribe(res => {
        this.setUserLogin(res) 
    })
  }

  public UserLogin: User = {} as any;

  private setUserLogin(userLogin: User) {
      this.UserLogin.studentID = userLogin.studentID;
      this.UserLogin.fname = userLogin.fname;
      this.UserLogin.lname = userLogin.lname;
      this.UserLogin.password = userLogin.password;
      this.UserLogin.image = userLogin.image;
      this.UserLogin.role = userLogin.role;
      return this.UserLogin;
  }

}
