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



const routes: Routes = [
{path:AuthenURL.Dashboard,component:DashboardComponent},
{path:AuthenURL.Users,component:UsersComponent},
{path:AuthenURL.createUser,component:CreateUserComponent},
{path:AuthenURL.Product,component:ProductComponent},
{path:AuthenURL.createProduct,component:CreateProductComponent},
{path:AuthenURL.Profile,component:ProfileComponent},
{path:AuthenURL.editUser + '/:id',component:EditUserComponent},
{path:'**',redirectTo:AuthenURL.Dashboard,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
