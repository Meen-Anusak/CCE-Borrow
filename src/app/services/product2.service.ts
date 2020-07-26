import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Product2Service {

  constructor(
    private http : HttpClient
  ) { }

  onSaveItem(accessToken,model){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.post<any>(`${environment.URL}borrow`,model,{headers:Header});
  }

  getItemByUser(accessToken){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.get<any>(`${environment.URL}borrow`,{headers:Header});
  }
}
