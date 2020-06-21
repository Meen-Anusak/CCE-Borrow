import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor() { }

  private accessKey = 'accessKey'

  setAccessToken(accessToken){
    localStorage.setItem(this.accessKey,accessToken)
  }

  getAccessToken(){
   return localStorage.getItem(this.accessKey)
  }

  clearToken(){
    localStorage.clear()
  }
}
