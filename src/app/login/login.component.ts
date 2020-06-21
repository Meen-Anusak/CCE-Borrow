import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from '../app.routing';
import { AuthenURL } from '../authentication/authen.routing';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { AuthenService } from '../services/authen.service';

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
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(form.invalid) return;
    this.userService.onLogin(form.value).subscribe(
      res =>{
        this.authen.setAccessToken(res.access_token)
        console.log(res.message);
        this.router.navigate(['/',AppURL.Authen,AuthenURL.Dashboard])

      }, error =>{
        console.log(error.error.error.message)
      }
    )
  }

}
