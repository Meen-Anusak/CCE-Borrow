import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthenService } from 'src/app/services/authen.service';
import { NgForm } from '@angular/forms';

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
    private authen : AuthenService
  ) { }

  ngOnInit(): void {
    this.ongetUserProdile()
  }

  onSubmit(form){
    console.log(form.value);

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
      .then(
        res =>{
          let {studentID,fname,lname,role} = res
          this.formLogin.setValue({studentID,fname,lname,role})
          this.formLogin.controls['studentID'].disable()
          this.formLogin.controls['role'].disable()
          this.imagePreview = res.image
        }
      )
  }

}
