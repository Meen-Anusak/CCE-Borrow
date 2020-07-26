import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from 'src/app/services/product.service';
import { Products } from 'src/app/models/product-models';
import { AppURL } from 'src/app/app.routing';
import { AuthenURL } from '../../authen.routing';
import { UsersService } from 'src/app/services/users.service';
import { AuthenService } from 'src/app/services/authen.service';
import { Irole } from 'src/app/interface/user.interface';
import  Swal  from "sweetalert2";
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  AppURL = AppURL;
  AuthenURL = AuthenURL;
  role = Irole;
  userRole : any;

  @ViewChild(MatSort,{static:true}) sort:MatSort
  @ViewChild(MatPaginator,{static:true}) page:MatPaginator

  tabalColumn: string[] = ['image','name_p','stock','action'];
  textSearch:string;


  products = new MatTableDataSource<Products>();

  constructor(
    private productService : ProductService,
    private usersService : UsersService,
    private authen :AuthenService,
    private alert : AlertService,
    ) { }

  ngOnInit(): void {
    this.products.sort = this.sort
    this.products.paginator = this.page
    this.getProduct();
    this.getRole();
  }

  search(event:Event){
    let search = ''
    if(event){
      search = (event.target as HTMLInputElement).value
    }
    this.products.filter = search.trim()
  }


  getProduct(){
    this.productService.onGetTotal()
      .subscribe(res =>{
        this.products.data = res
      })
  }

  getRole(){
    this.usersService.onGetprofile(this.authen.getAccessToken())
      .subscribe(
        res =>{
         this.userRole = res.role
        }
      )
  }

  onEdit(data){
    console.log(data._id);
  }

  onDelete(data){
    Swal.fire({
      title: 'ต้องการลบใช่หรือไม่?',
      text: `ลบ : ${data.fname} ${data.lname}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช้,ต้องการลบ!',
    }).then((result) => {
      if (result.value) {
        this.usersService.onDelete(data._id,this.authen.getAccessToken())
        .subscribe(
          res =>{
            this.alert.ontify_Success(res.message,3000)
            this.getProduct()
          }
        )
      }
    });
  }


}
