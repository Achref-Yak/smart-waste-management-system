import { Component, Input, OnInit } from '@angular/core';
import { dashboardRoutes } from '../../app-routing.module';
@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit  {
  routes = dashboardRoutes;
  constructor() { }

  ngOnInit(): void {
  }

  @Input() collapsed = false ;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleCass = '';

    if (this.collapsed && this.screenWidth > 768){
      styleCass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleCass = 'body-md-screen';
    }
    return  styleCass;
  }

}

     