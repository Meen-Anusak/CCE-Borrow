import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { UsersComponent } from './components/users/users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ProductComponent } from './components/product/product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { ProductListComponent } from './components/product-list/product-list.component';



@NgModule({
  declarations: [DashboardComponent, UsersComponent, CreateUserComponent, ProductComponent, CreateProductComponent, ProfileComponent, ChangePasswordComponent, EditUserComponent, ProductListComponent,],
  entryComponents:[ChangePasswordComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialModule
  ]
})
export class AuthenticationModule { }
