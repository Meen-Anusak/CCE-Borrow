import { Component, OnInit, Input, Inject, Optional, ViewChild ,AfterViewInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { Products } from 'src/app/models/product-models';
import { AppURL } from 'src/app/app.routing';
import { AuthenURL } from 'src/app/authentication/authen.routing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit,AfterViewInit {

  Id : string
  name_p : string;
  detail : string;
  stock : number;
  image : string;

  AppURL = AppURL;
  AuthenURL = AuthenURL;

  @ViewChild('text',{static:true}) text;

  constructor(
    private productServie : ProductService,
    private dialog : MatDialog,
    private router : Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.Id = data.ID

   }


  ngOnInit(): void {
   this.productServie.onGetProductById(this.Id)
    .subscribe( res =>{
      this.name_p = res.name_p;
      this.text.nativeElement.innerHTML = res.detail
      this.stock = res.stock;
      this.image = res.image
    })

  }

  onDetailPoduct(){
    this.router.navigate(['/',AppURL.Authen,AuthenURL.productDetail,this.Id]);
    this.dialog.closeAll()
  }

  ngAfterViewInit(){

  }

}
