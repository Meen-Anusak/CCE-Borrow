import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products = [] ;
  image : string;
  constructor(
    private productService : ProductService,

  ) {
    this.getProduct();
  }

  getProduct(){
    this.productService.onGetProduct()
      .subscribe(
        res =>{
          this.products = res.map( item => {
            // item.image = `product/${item.image}`
            console.log(item);

            return item;
          })
      })
  }

  ngOnInit(): void {
  }

}
