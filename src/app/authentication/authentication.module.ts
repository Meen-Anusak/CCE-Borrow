import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { UsersComponent } from './components/users/users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';


@NgModule({
  declarations: [DashboardComponent, UsersComponent, CreateUserComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialModule
  ]
})
export class AuthenticationModule { }
