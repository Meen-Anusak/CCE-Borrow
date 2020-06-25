import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { Role } from 'src/app/interface/user.interface';
import { User } from 'src/app/models/user-models';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit,OnDestroy {

  @ViewChild('formEdit',{static:true}) fromEdit :NgForm

  imagePreview: string | ArrayBuffer;
  fileImage: File;

  sub : Subscription

  id:any

  roles: Role[] = [
    { value: 'นักศึกษา', viewValue: 'นักศึกษา' },
    { value: 'อาจารย์', viewValue: 'อาจารย์' },
    { value: 'ผู้ดูแล', viewValue: 'ผู้ดูแล' },
  ];


  constructor(
    private activateRouter : ActivatedRoute,
    private userService : UsersService,
    private authen : AuthenService,
    private alert : AlertService,
    private localtion : Location
  ) { }

  ngOnInit(): void {
    this.activateRouter.params.subscribe(
      params =>{
        this.id = params.id
        this.ongetUser(params.id)
      }
    )
  }

  ongetUser(id){
   this.sub =  this.userService.ongetUserById(id,this.authen.getAccessToken())
      .subscribe(
        res =>{
          let {studentID,fname,lname,role} = res
          this.imagePreview = res.image
          this.fromEdit.controls['studentID'].setValue(studentID)
          this.fromEdit.controls['fname'].setValue(fname)
          this.fromEdit.controls['lname'].setValue(lname)
          this.fromEdit.controls['role'].setValue(role)
        },error =>{
          this.alert.ontify_Danger_center(error.error.error.message,3000)
        }
      )
  }


  onSubmit(formEdit: NgForm) {
    if (formEdit.invalid) return this.alert.ontify_Warning('กรุณาป้อนข้อมูลให้ครบถ้วน',3000);
    let user = new User();

    if(this.fileImage === undefined){
      user.studentID = formEdit.value.studentID;
    user.fname = formEdit.value.fname;
    user.lname = formEdit.value.lname;
    user.password = formEdit.value.password;
    user.role = formEdit.value.role;
    }else{
      user.studentID = formEdit.value.studentID;
      user.fname = formEdit.value.fname;
      user.lname = formEdit.value.lname;
      user.password = formEdit.value.password;
      user.image = this.fileImage;
      user.role = formEdit.value.role;
    }
    this.userService.onupdateUser(this.id,user,this.authen.getAccessToken())
      .subscribe(
        res =>{
          this.alert.ontify_Success(res.message,3000)
          this.localtion.back()
        },error =>{
          this.alert.ontify_Danger_center(error.error.error.message,3000)
        }
      )
  }
  onBack(){
    this.localtion.back()
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

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

}
