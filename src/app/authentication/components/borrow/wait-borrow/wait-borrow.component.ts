import { Component, OnInit, ViewChild } from '@angular/core';
import { Product2Service } from 'src/app/services/product2.service';
import { AuthenService } from 'src/app/services/authen.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-wait-borrow',
  templateUrl: './wait-borrow.component.html',
  styleUrls: ['./wait-borrow.component.css']
})
export class WaitBorrowComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  user : string
  items = []
  noItem :boolean = true;
  total : 0;
  productId:any;
  studentId : any;
  panelOpenState = false;

  constructor(
    private borrow : Product2Service,
    private authen : AuthenService,
  ) { }

  ngOnInit(): void {
    this.getBorrow()
  }

  getBorrow(){
    this.borrow.onGetwaitBorrow(this.authen.getAccessToken())
      .subscribe(res => {
        this.user = res.data.user.fname
        this.items = res.data.data_items;
        this.total = res.data.total;
        this.productId = res.data.product_id;
        this.studentId = res.data.user.studentID;
      },error =>{

      })
  }

}
