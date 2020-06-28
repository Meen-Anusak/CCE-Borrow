import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthenService } from 'src/app/services/authen.service';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Users : any
  Product : any

  constructor(
    private userService : UsersService,
    private authen : AuthenService,
    private productService : ProductService,
    private alert : AlertService,
  ) { }

  ngOnInit(): void {
    this.getUser()
    this.getProduct()
  }

  getUser(){
    this.userService.ongetUser(this.authen.getAccessToken())
      .subscribe(
        res =>{
          this.Users = res.length
        },error => this.alert.ontify_Danger(error.error.error.massage,3000)
      )
  }

  getProduct(){
    this.productService.onGetProduct()
      .subscribe(
        res =>{
          this.Product = res.length
        },error => this.alert.ontify_Danger(error.error.error.massage,3000)
      )
  }

}
