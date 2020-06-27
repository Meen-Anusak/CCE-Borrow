import { Injectable } from '@angular/core';
import { Products } from '../models/product-models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http : HttpClient
  ) { }



  makeFormUser(product:Products):FormData{
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
