import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  login = 0;
  constructor()
  {}
  ngOnInit(): void {
    
  }

  toggleLogin()
  {
    this.login = 1 - this.login;
  }

}