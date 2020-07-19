import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenURL } from './authen.routing';
import { UsersComponent } from './components/users/users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ProductComponent } from './components/product/product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { RoleGuard } from '../guards/role.guard';
import { ProductListComponent } from './components/product-list/product-list.component';
import { EditProductComponent } from './components/product-list/edit-product/edit-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';



const routes: Routes = [
  {path:'',redirectTo:AuthenURL.Product,pathMatch:'full'},
{
  path:AuthenURL.Dashboard,
  component:DashboardComponent,
  canActivate:[RoleGuard],
  data:{roles:['ผู้ดูแล','อาจารย์']}
},
{path:AuthenURL.Users,component:UsersComponent},
{
  path:AuthenURL.createUser,
  component:CreateUserComponent,
  canActivate:[RoleGuard],
  data:{roles:['ผู้ดูแล']}
},
{
  path:AuthenURL.ProductList,
  component:ProductListComponent,
  canActivate:[RoleGuard],
  data:{roles:['ผู้ดูแล','อาจารย์']}
},
{path:AuthenURL.Product,component:ProductComponent},
{path:AuthenURL.createProduct,component:CreateProductComponent},
{path:AuthenURL.Profile,component:ProfileComponent},
{path:AuthenURL.editUser + '/:id',component:EditUserComponent},
{path:AuthenURL.editProduct+'/:id',component:EditProductComponent},
{path:AuthenURL.productDetail+'/:id',component:ProductDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
