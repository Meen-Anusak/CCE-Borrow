import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.routing';
import { AuthenService } from 'src/app/services/authen.service';
import { UsersService } from 'src/app/services/users.service';
import { AuthenURL } from 'src/app/authentication/authen.routing';




@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  AppURL = AppURL;
  AuthenURL = AuthenURL;

  @Input() mobileQuery : boolean
  @Output() sidenavToggle = new EventEmitter();

  fname : string;
  lname : string;
  image : string;


  constructor(
    private router:Router,
    private authen : AuthenService,
    private usersService : UsersService,
  ) {
    this.ongetProfile()
   }

  ngOnInit(): void {

  }

  ongetProfile(){
    this.usersService.onGetprofile(this.authen.getAccessToken())
      .then(
        res =>{
          this.fname = res.fname;
          this.lname = res.lname;
          this.image = res.image;
        }
      )
  }

  onLogout(){
    this.authen.clearToken()
    this.router.navigate(['/',AppURL.Login])
  }

  onClicktoggle(){
    this.sidenavToggle.emit();
  }

}
