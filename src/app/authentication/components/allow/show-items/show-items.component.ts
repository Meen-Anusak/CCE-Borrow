import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product2Service } from 'src/app/services/product2.service';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.css']
})
export class ShowItemsComponent implements OnInit {
  fname : string
  lname : string
  items = []
  onItem :boolean = true;
  total : 0;
  studentId : any;
  Id : any
  constructor(
    private borrow : Product2Service,
    private authen : AuthenService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.Id  = data.ID
   }

  ngOnInit(): void {
    let data = {
      user_id : this.Id
    }
    this.borrow.onGetwaitBorrow(this.authen.getAccessToken(),data)
      .subscribe(res =>{
        this.fname = res.data.user.fname
        this.lname = res.data.user.lname
        this.items = res.data.data_items;
        this.total = res.data.total;
        this.studentId = res.data.user.studentID;
      })
  }

}
