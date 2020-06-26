import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthenService } from 'src/app/services/authen.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user-models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('formLogin',{static:true}) formLogin:NgForm;

  imagePreview: string | ArrayBuffer;
  fileImage: File;

  constructor(
    private userService : UsersService,
    private authen : AuthenService,
    public dialog : MatDialog,
    private alert : AlertService
  ) { }

  ngOnInit(): void {
    this.ongetUserProdile()
  }

  onSubmit(form){
    let user = new User()
    user.studentID = form.value.studentID;
    user.fname = form.value.fname;
    user.lname = form.value.lname;
    user.password = form.value.password;
    user.image = this.fileImage;
    user.role = form.value.role;
    this.userService.onUpdateImage(user,this.authen.getAccessToken())
      .subscribe(
        res =>{
          this.alert.ontify_Success_center(res.message,3000)
        }
      )
  }

  onPreviewImage(event) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      this.fileImage = metaImage;
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
    }
  }
  onDeleteImage() {
    this.imagePreview = '';
    this.fileImage = undefined;
  }

  ongetUserProdile(){
    this.userService.onGetprofile(this.authen.getAccessToken())
      .subscribe(
        res =>{
          let {studentID,fname,lname,role} = res
          this.formLogin.setValue({studentID,fname,lname,role})
          this.formLogin.controls['studentID'].disable()
          this.formLogin.controls['role'].disable()
          this.formLogin.controls['fname'].disable()
          this.formLogin.controls['lname'].disable()
          this.imagePreview = res.image
        }
      )
  }

  openDialog(){
    this.dialog.open(ChangePasswordComponent,{
      width:'500px',
      height:'400px',
      disableClose:true
    })
  }

}
