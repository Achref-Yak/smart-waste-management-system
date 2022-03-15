import { Component, OnInit } from '@angular/core';
import { dashboardRoutes } from '../../app-routing.module';
@Component({
  selector: 'app-home',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit  {
  routes = dashboardRoutes;
  constructor()
  {}
  ngOnInit(): void {
    
  }

 

}

     