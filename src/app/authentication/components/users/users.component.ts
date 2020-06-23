import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthenService } from 'src/app/services/authen.service';
import { User } from 'src/app/models/user-models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import  Swal  from "sweetalert2";
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  Users = new MatTableDataSource<User>();
  tabalColumn = ['studentID','fname','lname','role','createdAt','action']
  textSearch:string;

  @ViewChild(MatSort,{static:true}) sort:MatSort
  @ViewChild(MatPaginator,{static:true}) page:MatPaginator

  constructor(
    private usersService : UsersService,
    private authen : AuthenService,
    private alert : AlertService,
  ) {

  }

  ngOnInit(): void {
    this.Users.sort = this.sort
    this.Users.paginator = this.page
    this.getUsers()
  }

  getUsers(){
    this.usersService.ongetUser(this.authen.getAccessToken())
      .then(
        res =>{
          this.Users.data = res
        }
      )
  }

  search(event:Event){
    let search = ''
    if(event){
      search = (event.target as HTMLInputElement).value
    }
    this.Users.filter = search.trim()
  }

  clearSearch(){
    this.textSearch = ''
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
        .then(
          res =>{
            this.alert.ontify_Success(res.message,3000)
            this.getUsers()
          }
        )
      }
    });
  }
}



