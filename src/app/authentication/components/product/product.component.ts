import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  @ViewChild(MatPaginator,{static:true}) page:MatPaginator

  products = [] ;
  image : string;


  pageLength = 100;
  pageSize = 12;
  pageSizeOption : number[] = [12, 24, 100];



  constructor(
    private productService : ProductService,

  ) {
    this.getProduct();
  }


  ngOnInit(): void {

  }

  pageEvent(even:PageEvent){
   let page =  0
   if(even){
     page = even.pageIndex;
   }
  }


  getProduct(){
    this.productService.onGetProduct()
      .subscribe(
        res =>{
        this.products = res;
      })
  }

  search(even:Event){
    let search = ''
    if(even){
      search = (event.target as HTMLInputElement).value;
      search.trim()
    }


  }

}
