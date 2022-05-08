import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailSignupComponent } from './components/email-signup/email-signup.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/email-login/email-login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeGuardService } from './services/home-auth-guard';
import { MapComponent } from './components/map/map.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import {TruckComponent} from "./components/truck/truck.component";
import {LoginParentComponent} from "./components/login-parent/login-parent.component";
import {TrushComponent} from "./components/trush/trush.component";
import {ClientComponent} from "./components/client/client.component";
import {ReportListComponent} from "./components/report/report-list/report-list.component";
import {DashChartComponent} from "./components/dash-chart/dash-chart.component";
export const dashboardRoutes  = [
  {
    path: 'dash', // child route path
    component: DashChartComponent, // child route component that the router renders
    label: 'dashboard',

  },
  {
    path: 'employees', // child route path
    component: EmployeesComponent, // child route component that the router renders
    label: 'employees',

  },
  {
    path: 'trucks', // child route path
    component: TruckComponent, // child route component that the router renders
    label: 'trucks',

  },
  {
    path: 'trushs', // child route path
    component: TrushComponent, // child route component that the router renders
    label: 'trushs',

  },
  {
    path: 'clients', // child route path
    component: ClientComponent, // child route component that the router renders
    label: 'clients',

  },
  {
    path: 'reports', // child route path
    component: ReportListComponent, // child route component that the router renders
    label: 'reports',

  },
  {
  path: 'map', // child route path
  component: MapComponent, // child route component that the router renders
  label: 'map',

}]

export const routes  = [
  {
  path: '',
  component: HomeComponent,
 // canActivate: [AuthGuardService]

},
{
  path: 'forgotpassword',
  component: ForgotpasswordComponent,
  label: 'home',
},
{
  path: 'profile',
  component: ProfileComponent,
  //canActivate: [HomeGuardService],
  label: 'profile',
},
{
  path: 'aboutus',
  component: AboutusComponent,
  label: 'aboutus',
},
{
  path: 'welcome',
  component: LoginParentComponent,
  label: 'welcome'
},

{
  path: 'admin-dashboard',
  component: DashboardMainComponent,
 // canActivate: [HomeGuardService],
  label: 'admin',
  children: dashboardRoutes,
}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
