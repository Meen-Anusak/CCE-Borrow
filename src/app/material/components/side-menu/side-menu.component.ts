import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.routing';
import { AuthenURL } from 'src/app/authentication/authen.routing';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  AppURL = AppURL;
  AuthenURL = AuthenURL
  constructor() { }

  ngOnInit(): void {
  }

}
