import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailSignupComponent } from './components/email-signup/email-signup.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/email-login/email-login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeGuardService } from './services/home-auth-guard';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'forgotpassword',
  component: ForgotpasswordComponent,
},
{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [HomeGuardService]
},
{
  path: 'admin-dashboard',
  component: AdminDashboardComponent,
  canActivate: [HomeGuardService]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
