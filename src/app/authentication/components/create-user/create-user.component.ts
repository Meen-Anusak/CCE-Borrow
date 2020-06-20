import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user-models';
import { Role } from 'src/app/interface/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  imagePreview: string | ArrayBuffer;
  fileImage: File;

  roles: Role[] = [
    { value: 'Student', viewValue: 'นักศึกษา' },
    { value: 'Instructor', viewValue: 'อาจารย์' },
    { value: 'Admin', viewValue: 'ผู้ดูแล' },
  ];

  constructor(
    private userService: UsersService  ) {}

  ngOnInit(): void {}

  onSubmit(formLogin: NgForm) {
    if (formLogin.invalid) return;
    let user = new User();
    user.studentID = formLogin.value.studentID;
    user.fname = formLogin.value.fname;
    user.lname = formLogin.value.lname;
    user.password = formLogin.value.password;
    user.image = this.fileImage;
    user.role = formLogin.value.role;
    this.userService.onAdduser(user).subscribe(
      res =>{
        alert(res.message)
        window.location.reload()
      },error =>{
       alert(error.error.error.message)
        window.location.reload()
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