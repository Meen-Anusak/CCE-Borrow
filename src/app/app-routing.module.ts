import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppURL } from './app.routing';
import { AuthenticationGuard } from './guards/authentication.guard';
import { UnauthenGuard } from './guards/unauthen.guard';


const routes: Routes = [
  {path:AppURL.Login,component:LoginComponent,canActivate:[UnauthenGuard]},
  {
    path:AppURL.Authen,
    canActivate:[AuthenticationGuard],
    loadChildren:()=> import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {path:'**',redirectTo:AppURL.Login},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
