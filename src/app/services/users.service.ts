import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http : HttpClient
  ) { }

  onAdduser(userModel:User){
    return this.http.post<any>(`${environment.URL}users`,this.makeFormUser(userModel))
  }

  makeFormUser(user:User):FormData{
    let formuser = new FormData();
    formuser.append('studentID',user.studentID)
    formuser.append('fname',user.fname)
    formuser.append('lname',user.lname)
    formuser.append('image',user.image)
    formuser.append('password',user.password)
    formuser.append('role',user.role)
    return formuser
  }
}