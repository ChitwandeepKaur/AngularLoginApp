import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@guards/login.guard';

import { DashboardComponent } from './modules/main/dashboard/dashboard.component';
import { LoginComponent } from './modules/main/login/login.component';
import { SignupComponent } from './modules/main/signup/signup.component';

const appRoutes: Routes = [
  {
    path       : 'login',
    component  : LoginComponent
  },
  {
    path       : 'signup',
    component  : SignupComponent
  },
  {
    path       : 'dashboard',
    component  : DashboardComponent,
    canActivate: [LoginGuard]
  },
  {
    path       : '**',
    redirectTo : 'login',
    pathMatch  : 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
