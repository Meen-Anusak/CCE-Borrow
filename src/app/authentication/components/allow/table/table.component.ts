import { Component, OnInit, ViewChild } from '@angular/core';
import { Product2Service } from 'src/app/services/product2.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ShowItemsComponent } from '../show-items/show-items.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  products = new MatTableDataSource<any>();
  tabalColumn = ['studentID','name_p','stock','action']

  @ViewChild(MatSort,{static:true}) sort:MatSort
  @ViewChild(MatPaginator,{static:true}) page:MatPaginator

  constructor(
    private borrow : Product2Service,
    private dialog : MatDialog,
  ) { }

  ngOnInit(): void {
    this.products.sort = this.sort
    this.products.paginator = this.page
    this.getReturnProduct()
  }

  getReturnProduct(){
    this.borrow.getReturnProduct()
      .subscribe(res => {
        this.products.data = res
        console.log(this.products.data)
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

  search(event:Event){
    let search = ''
    if(event){
      search = (event.target as HTMLInputElement).value
    }
    this.products.filter = search.trim()
  }



}
