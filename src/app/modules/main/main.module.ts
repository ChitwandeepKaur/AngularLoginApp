import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from "ngx-toastr";
import { LoginGuard } from "@guards/login.guard";
import { UpdateUserDetailsDialogComponent } from './dashboard/update-user-details-dialog/update-user-details-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    UpdateUserDetailsDialogComponent,
    ChangePasswordComponent
  ],
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      maxOpened: 4,
      autoDismiss: true,
      enableHtml: true
    })
  ],
  providers: [LoginGuard]
})

export class MainModule { }
