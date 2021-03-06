import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.routing';
import { AuthenURL } from 'src/app/authentication/authen.routing';
import { UsersService } from 'src/app/services/users.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/services/alert.service';
import { Irole } from 'src/app/interface/user.interface';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  role = Irole
  user:string

  AppURL = AppURL;
  AuthenURL = AuthenURL
  constructor(
    private userService : UsersService,
    private authen : AuthenService,
    private alert : AlertService,
  ) {
    this.getRole()
  }

  ngOnInit(): void {

  }

  getRole(){
    this.user = this.userService.UserLogin.role;
  }


}
