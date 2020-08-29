import { Component, OnInit } from '@angular/core';
import { Product2Service } from 'src/app/services/product2.service';
import { AuthenService } from 'src/app/services/authen.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowItemsComponent } from '../show-items/show-items.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-return-borrow',
  templateUrl: './return-borrow.component.html',
  styleUrls: ['./return-borrow.component.css']
})
export class ReturnBorrowComponent implements OnInit {

  product = []

  constructor(
    private borrow : Product2Service,
    private authen : AuthenService,
    private dialog : MatDialog,
  ) { }

  ngOnInit(): void {
    this.getReturnBorrow()
  }

  getReturnBorrow(){
    this.borrow.onGetReturnBorrow()
      .subscribe(res =>{
       this.product = res
      }) 
  }

  openDialog(id:any){
    this.dialog.open(ShowItemsComponent,{
      width:'750px',
      height:'650px',
      disableClose:false,
      data: {
        ID : id }
    })
   }

   onAllow(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mrl-5',
        cancelButton: 'btn btn-danger mr-5',
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'ยืนยันการ คืนอุปกรณ์?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน ',
      cancelButtonText: 'ยกเลิก ',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const data ={
          productId : id
        }
      this.borrow.returnTostore(data)
        .subscribe(res =>{
          swalWithBootstrapButtons.fire(
              'ตกลง!',
              `${res.message}`,
              'success'
            );
            this.getReturnBorrow()
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'ยกเลิกแล้ว',
          ''
        )
      }
    })
   }


}
