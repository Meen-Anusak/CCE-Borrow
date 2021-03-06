import { Component, OnInit } from '@angular/core';
import { Product2Service } from 'src/app/services/product2.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.routing';
import { AuthenURL } from '../../authen.routing';
import  Swal  from "sweetalert2";
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {


  items = []
  noItem :boolean = true;
  total : 0;
  productId:any;
  fname : string;

  constructor(
    private borrow : Product2Service,
    private authen : AuthenService,
    private alert : AlertService,
    private location : Location,
    private router : Router,
    private usersService : UsersService,
  ) {
   }

  ngOnInit(): void {
    this.fname = this.usersService.UserLogin.fname;
    this.getItem();
   
   
  }

  getItem(){
    this.borrow.getItemByUser(this.authen.getAccessToken())
      .subscribe(res =>{
        console.log(res)
        this.items = res.data.data_items;
        this.total = res.data.total;
        this.productId = res.data.product_id
        this.noItem = false
      },error =>{
        this.noItem = true;
        console.log(error.error.error.message)
      })
  }

  onBorrow(){
    let data ={
      productId:this.productId
    }
    this.borrow.onBorrow(this.authen.getAccessToken(),data)
      .subscribe(res=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${res.message}`,
          showConfirmButton: false,
          timer: 1500
        })
        this.getItem();
      },error =>{
        Swal.fire({
          icon: 'error',
          // title: 'Oops...',
          text: error.error.error.message,
        })
      })
  }


  onRemove(id){
    const data ={
      _id : id,
    
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
      },error =>{
        console.log(error)
      })
  }

  onDeleteItem(id){
    const data ={
      _id : id,
      p_id : this.productId
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

  onDeleteList(){
    const data = {
      _id : this.productId
    }
      Swal.fire({
        title: 'ต้องการลบใช่หรือไม่?',
        text: ``,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช้,ต้องการลบ!',
      }).then((result) => {
        if (result.value) {
          this.borrow.onDeleteList(this.authen.getAccessToken(),data)
            .subscribe(res =>{
              this.alert.ontify_Danger(res.message,3000);
              this.getItem()
      })
        }
      });
    }
  }


