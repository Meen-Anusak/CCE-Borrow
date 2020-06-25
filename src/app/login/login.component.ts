import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from '../app.routing';
import { AuthenURL } from '../authentication/authen.routing';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { AuthenService } from '../services/authen.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService : UsersService,
    private authen : AuthenService,
    private alert : AlertService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(form.invalid) return;
    this.userService.onLogin(form.value).subscribe(
      res =>{
        this.authen.setAccessToken(res.access_token)
        this.alert.ontify_Success(res.message,2000)
        if(res.role === 'ผู้ดูแล' || res.role === 'อาจารย์'){
          this.router.navigate(['/',AppURL.Authen,AuthenURL.Dashboard])
        }else{
          this.router.navigate(['/',AppURL.Authen])
        }
      }, error =>{
        this.alert.ontify_Danger_center(error.error.error.message,3000)
      }
    )
  }

}
