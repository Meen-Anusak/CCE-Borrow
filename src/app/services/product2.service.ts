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

  RemoveItem(accessToken,id){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.post<any>(`${environment.URL}borrow/removeItem`,id,{headers:Header});
  }

  onDelete(accessToken,id){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.post<any>(`${environment.URL}borrow/deleteItem`,id,{headers:Header});
  }
  onDeleteList(accessToken,productId){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.post<any>(`${environment.URL}borrow/deleteList`,productId,{headers:Header});
  }

  onBorrow(accessToken,productId){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.post<any>(`${environment.URL}borrow/borrow`,productId,{headers:Header});
  }

  onGetwaitBorrow(accessToken,user_id?){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.post<any>(`${environment.URL}borrow/wait-borrow`,user_id,{headers:Header});
  }

  onGetBottow(){
    return this.http.get<any>(`${environment.URL}borrow/allow`);
  }

  onAllow(id){
    return this.http.post<any>(`${environment.URL}borrow/allow`,id)
  }
}
