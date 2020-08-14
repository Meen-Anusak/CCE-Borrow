import { Component, OnInit, ViewChild } from '@angular/core';
import { Product2Service } from 'src/app/services/product2.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.routing';
import Swal from 'sweetalert2';
import { AuthenURL } from '../../authen.routing';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-wait-borrow',
  templateUrl: './wait-borrow.component.html',
  styleUrls: ['./wait-borrow.component.css']
})
export class WaitBorrowComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  fname : string
  lname : string
  items = []
  onItem :boolean = true;
  total : 0;
  productId:any;
  studentId : any;
  panelOpenState = false;

  constructor(
    private borrow : Product2Service,
    private authen : AuthenService,
    private alert : AlertService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getBorrow()
  }

  getBorrow(){
    this.borrow.onGetwaitBorrow(this.authen.getAccessToken())
      .subscribe(res => {
        this.fname = res.data.user.fname
        this.lname = res.data.user.lname
        this.items = res.data.data_items;
        this.total = res.data.total;
        this.productId = res.data.product_id;
        this.studentId = res.data.user.studentID;
      },error=>{
        this.onItem = false
        console.log(error.error.error.message)
      })
  }

  toItem(){
    this.router.navigate(['/',AppURL.Authen,AuthenURL.Product])
  }

  onDelete(){
    const data = {
      _id : this.productId
    }
      Swal.fire({
        title: 'ต้องการลบรายการใช่หรือไม่?',
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
              console.log(res)
              this.alert.ontify_Danger(res.message,3000)
              this.getBorrow()
      })
        }
      });
  }

}
