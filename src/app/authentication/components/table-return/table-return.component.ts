import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShowItemsComponent } from '../allow/show-items/show-items.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product2Service } from 'src/app/services/product2.service';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-table-return',
  templateUrl: './table-return.component.html',
  styleUrls: ['./table-return.component.css']
})
export class TableReturnComponent implements OnInit {

  products = new MatTableDataSource<any>();
  tabalColumn = ['studentID','name_p','stock','action']

  @ViewChild(MatSort,{static:true}) sort:MatSort
  @ViewChild(MatPaginator,{static:true}) page:MatPaginator
    
  constructor(
    private dialog : MatDialog,
    private borrow : Product2Service,
    private authen : AuthenService
  ) { }

  ngOnInit(): void {
    this.products.sort = this.sort
    this.products.paginator = this.page
    this.getReturnProductByUser()
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

   getReturnProductByUser(){
     this.borrow.getReturnProductByUser(this.authen.getAccessToken())
      .subscribe(res =>{
        this.products.data = res;
      })
   }

  search(event:Event){
    let search = ''
    if(event){
      search = (event.target as HTMLInputElement).value
    }
    this.products.filter = search.trim()
  }

}
