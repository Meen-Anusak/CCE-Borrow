import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from '../app.routing';
import { AuthenURL } from '../authentication/authen.routing';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    console.log(form.value);
    this.router.navigate(['/',AppURL.Authen,AuthenURL.Dashboard])
  }

}
