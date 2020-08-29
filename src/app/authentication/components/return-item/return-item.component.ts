import { Component, OnInit } from '@angular/core';
import { Product2Service } from 'src/app/services/product2.service';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-return-item',
  templateUrl: './return-item.component.html',
  styleUrls: ['./return-item.component.css']
})
export class ReturnItemComponent implements OnInit {


  fname : string
  lname : string
  items = []
  onItem :boolean = true;
  total : 0;
  productId:any;
  studentId : any;

  constructor(
    private borrow : Product2Service,
    private authen : AuthenService,
  ) { }

  ngOnInit(): void {
    this.getReturnBorrowByUser()
  }

  getReturnBorrowByUser(){
    this.borrow.onGetReturnItems(this.authen.getAccessToken())
    .subscribe(res => {
      this.fname = res.data.user.fname
      this.lname = res.data.user.lname
      this.items = res.data.data_items;
      this.total = res.data.total;
      this.productId = res.data.product_id;
      this.studentId = res.data.user.studentID;
    },error =>{
      this.onItem = false
      console.log(error.error.error.message)
    })
  }

}
