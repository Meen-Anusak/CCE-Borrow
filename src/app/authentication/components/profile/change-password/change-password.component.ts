import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenService } from 'src/app/services/authen.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  error : boolean

  constructor(
    public dialog : MatDialog,
    private alert : AlertService,
    private authen : AuthenService,
    private userService : UsersService

  ) { }

  ngOnInit(): void {

  }

  onSubmit(form:NgForm){
    const new_pass = form.controls['new_pass'].value;
    const con_pass = form.controls['con_pass'].value;
   if(new_pass === con_pass){
     this.userService.onchangePass(form.value,this.authen.getAccessToken())
      .subscribe(
        res =>{
          this.alert.ontify_Success_center(res.message,3000)
          this.dialog.closeAll()
        },error =>{
          this.alert.ontify_Danger_center(error.error.error.message,3000)
        }
      )
   }else{
    this.alert.ontify_Danger('รหัสผ่านไม่ตรงกัน',3000)
    form.resetForm()
    this.error = true
   }

  }


}
