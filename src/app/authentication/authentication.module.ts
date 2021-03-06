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
import { ShowProductComponent } from './components/product/show-product/show-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { EditProductComponent } from './components/product-list/edit-product/edit-product.component';
import { BorrowComponent } from './components/borrow/borrow.component';
import { WaitBorrowComponent } from './components/wait-borrow/wait-borrow.component';
import { AllowComponent } from './components/allow/allow.component';
import { ShowItemsComponent } from './components/allow/show-items/show-items.component';
import { ReturnBorrowComponent } from './components/allow/return-borrow/return-borrow.component';
import { ReturnItemComponent } from './components/return-item/return-item.component';
import { TableComponent } from './components/allow/table/table.component';
import { TableReturnComponent } from './components/table-return/table-return.component';




@NgModule({
  declarations: [DashboardComponent, UsersComponent, CreateUserComponent, ProductComponent, CreateProductComponent, ProfileComponent, ChangePasswordComponent, EditUserComponent, ProductListComponent, ShowProductComponent, ProductDetailComponent, EditProductComponent, BorrowComponent, WaitBorrowComponent, AllowComponent, ShowItemsComponent, ReturnBorrowComponent, ReturnItemComponent, TableComponent, TableReturnComponent,],
  entryComponents: [ChangePasswordComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialModule
  ]
})
export class AuthenticationModule { }
