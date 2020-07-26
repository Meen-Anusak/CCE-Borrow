import { Injectable } from '@angular/core';
import { Products } from '../models/product-models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { optionSearch } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http : HttpClient
  ) { }

  onAddProduct(model,accessToken:string){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.post<any>(`${environment.URL}product`,this.makeFormProduct(model),{headers:Header});
  }

  onGetProduct(startPage?,limitPage?,search?){
    return this.http.get<any>(`${environment.URL}product/?search=${search}&&page=${startPage}&&size=${limitPage}`);
  }

  onGetTotal(){
    return this.http.get<any>(`${environment.URL}product/total`);
  }

  onGetProductById(id:any){
    return this.http.get<any>(`${environment.URL}product/${id}`);
  }

  onUpdateProduct(id:any,model:Products,accessToken:string,){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.put<any>(`${environment.URL}product/${id}`,this.makeFormProduct(model),{headers:Header});
  }


  onSaveItem(model,accessToken){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.post<any>(`${environment.URL}borrow`,model,{headers:Header});
  }




  private makeFormProduct(product:Products):FormData{
    let formProduct = new FormData();
    formProduct.append('p_Id',product.p_Id)
    formProduct.append('name_p',product.name_p)
    formProduct.append('stock',`${product.stock}`)
    formProduct.append('category',product.category)
    formProduct.append('image',product.image)
    formProduct.append('detail',product.detail)

    return formProduct
  }
}
