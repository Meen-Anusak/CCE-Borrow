import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user-models';
import { Role } from 'src/app/interface/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  imagePreview: string | ArrayBuffer;
  fileImage: File;

  roles: Role[] = [
    { value: 'นักศึกษา', viewValue: 'นักศึกษา' },
    { value: 'อาจารย์', viewValue: 'อาจารย์' },
    { value: 'ผู้ดูแล', viewValue: 'ผู้ดูแล' },
  ];

  constructor(
    private userService: UsersService,
    private alert : AlertService,
      ) {}

  ngOnInit(): void {}

  onSubmit(formLogin: NgForm) {
    if (formLogin.invalid) return this.alert.ontify_Warning('กรุณาป้อนข้อมูลให้ครบถ้วน',3000);
    let user = new User();
    user.studentID = formLogin.value.studentID;
    user.fname = formLogin.value.fname;
    user.lname = formLogin.value.lname;
    user.password = formLogin.value.password;
    user.image = this.fileImage;
    user.role = formLogin.value.role;
    this.userService.onAdduser(user).then(
      res =>{
        this.alert.ontify_Success(res.message,3000)
        formLogin.resetForm()
      }
    ).catch(
      error =>{
        this.alert.ontify_Warning(error.error.error.message,3000)
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
}
