import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.routing';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() mobileQuery : boolean
  @Output() sidenavToggle = new EventEmitter();

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.router.navigate(['/',AppURL.Login])
  }

  onClicktoggle(){
    this.sidenavToggle.emit();
  }

}
