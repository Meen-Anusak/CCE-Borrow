import { Component, OnInit } from '@angular/core';
import { Product2Service } from 'src/app/services/product2.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.routing';
import { AuthenURL } from '../../authen.routing';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {


  items = []
  noItem :boolean = true;

  constructor(
    private borrow : Product2Service,
    private authen : AuthenService,
    private alert : AlertService,
    private location : Location,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getItem()
  }

  getItem(){
    this.borrow.getItemByUser(this.authen.getAccessToken())
      .subscribe(res =>{
        this.items = res
      },error =>{
        this.noItem = false
      })
  }

  onBorrow(value){
    console.log(value)
  }

  onRemove(id){
    const data ={
      _id : id
    }
    this.borrow.RemoveItem(this.authen.getAccessToken(),data)
    .subscribe(res =>{
      this.alert.ontify_Warning(res.message,3000)
      this.getItem()
    })
  }

  onAddItem(id){
    const data ={
      _id : id
    }
    this.borrow.onSaveItem(this.authen.getAccessToken(),data)
      .subscribe(res =>{
        this.alert.ontify_Success(res.message,3000)
        this.getItem()
      })
  }

  onDelete(id){
    const data ={
      _id : id
    }
    this.borrow.onDelete(this.authen.getAccessToken(),data)
      .subscribe(res =>{
        this.alert.ontify_Danger(res.message,3000)
        this.getItem()
      },error =>{
        console.log(error.message)
      })
  }

  toItem(){
    this.router.navigate(['/',AppURL.Authen,AuthenURL.Product])
  }

}
