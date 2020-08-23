import { Component, OnInit } from '@angular/core';
import { Product2Service } from 'src/app/services/product2.service';
import { IUsers } from 'src/app/interface/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Products } from 'src/app/models/product-models';
import { MatDialog } from '@angular/material/dialog';
import { ShowItemsComponent } from './show-items/show-items.component';
import Swal from 'sweetalert2';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-allow',
  templateUrl: './allow.component.html',
  styleUrls: ['./allow.component.css']
})
export class AllowComponent implements OnInit {

  panelOpenState = false;
  
  product = []
  userId : any;
  constructor(
    private borrow : Product2Service,
    private dialog : MatDialog,
    private authen : AuthenService,
    private alert : AlertService,
  ) { }

  ngOnInit(): void {
    this.getAllow()
  }

  getAllow(){
    this.borrow.onGetBottow()
      .subscribe(res =>{
        this.product = res;
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


   onDelete(id){
    let data ={
      _id : id
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
            this.getAllow()
    })
      }
    });
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
      title: 'ยืนยันการอนุมัติ?',
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
        this.borrow.onAllow(data).subscribe(res =>{
           swalWithBootstrapButtons.fire(
          'ตกลง!',
          'ยืนยันการอนุมัติ',
          'success'
        );
        this.getAllow();
        },error =>{
        console.log(error.error.error.message);  
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
