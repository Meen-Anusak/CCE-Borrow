import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppURL } from './app.routing';


const routes: Routes = [
  {path:AppURL.Login,component:LoginComponent},
  {path:AppURL.Authen,loadChildren:()=> import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path:'**',redirectTo:AppURL.Login},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
