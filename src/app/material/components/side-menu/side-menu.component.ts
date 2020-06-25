import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppURL } from 'src/app/app.routing';
import { AuthenURL } from 'src/app/authentication/authen.routing';
import { UsersService } from 'src/app/services/users.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/services/alert.service';
import { Irole } from 'src/app/interface/user.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit ,OnDestroy {

  role = Irole
  user:string
  sub:Subscription

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
    this.sub =  this.userService.onGetprofile(this.authen.getAccessToken())
      .subscribe(
        res =>  {
          this.user = res.role
        },error => this.alert.ontify_Danger_center(error.error.error.message)
      )
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

}
