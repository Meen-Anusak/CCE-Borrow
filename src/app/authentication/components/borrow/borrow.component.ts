import { Component, OnInit } from '@angular/core';
import { Product2Service } from 'src/app/services/product2.service';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {


  items = []

  constructor(
    private borrow : Product2Service,
    private authen : AuthenService
  ) { }

  ngOnInit(): void {
    this.getItem()

  }

  getItem(){
    this.borrow.getItemByUser(this.authen.getAccessToken())
      .subscribe(res =>{
       console.log(res)
       this.items = res
      })
  }

}
