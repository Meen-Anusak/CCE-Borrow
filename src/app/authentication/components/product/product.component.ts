import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductComponent } from './show-product/show-product.component';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/services/alert.service';
import  Swal  from "sweetalert2";

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
    private authen : AuthenService,
    private alert : AlertService,
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
        let page = 1;
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

 onBorrow(products){

    this.productService.onSaveItem(products,this.authen.getAccessToken())
      .subscribe(res =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${res.message}`,
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  }

