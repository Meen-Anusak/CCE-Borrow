import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductComponent } from './show-product/show-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {




  products =[] ;
  image : string;
  startPage = 1;

  searchText = '';
  pageLength = 100;
  pageSize = 12;
  pageSizeOption : number[] = [6,12, 24, 100];



  constructor(
    private productService : ProductService,
    private dialog : MatDialog,
  ) {
    this.startPage = 1;
    this.pageSize = 12;
    this.searchText = ''
    this.productService.onGetProduct(this.startPage,this.pageSize,this.searchText)
    .subscribe(
      res =>{
        this.products = res;
    })
  }

  ngOnInit(): void {

  }

  pageEvent(even:PageEvent){
    if(even){
        let page = 1 || 1;
        let limit = even.pageSize || this.pageSize
      page = even.pageIndex +1

      this.productService.onGetProduct(page,limit,this.searchText)
      .subscribe(
        res =>{
          this.products = res;
      })
    }
   }

   openDialog(id:any){
    this.dialog.open(ShowProductComponent,{
      width:'600px',
      height:'500px',
      disableClose:false,
      data: {
        ID : id }
    })
   }

   seachButton(){
    this.productService.onGetProduct(this.startPage,this.pageSize,this.searchText)
    .subscribe(
      res =>{
        this.products = res;
    })

   }






  search(even:Event){
    if(even){
    this.searchText = (event.target as HTMLInputElement).value;
    }

  }

}
