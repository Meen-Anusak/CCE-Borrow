import { Component, OnInit, Input, Inject, Optional } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { Products } from 'src/app/models/product-models';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  Id : string
  name_p : string;
  detail : string;
  stock : number;
  image : string;


  constructor(
    private productServie : ProductService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.Id = data.ID
   }

  ngOnInit(): void {
   this.productServie.onGetProductById(this.Id)
    .subscribe( res =>{
      this.name_p = res.name_p;
      this.detail = res.detail;
      this.stock = res.stock;
      this.image = res.image
    })

  }

}
