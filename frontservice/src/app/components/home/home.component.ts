import { EmailSignupComponent } from './../email-signup/email-signup.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../email-login/email-login.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  login = 0;
  constructor(public dialog: MatDialog)
  {}
  ngOnInit(): void {

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EmailSignupComponent, {
      width: '250px',

    });


    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',

    });


    dialogRef.afterClosed().subscribe(result => {

    });
  }
  course= [
    {'id':1,'name':'Achref Yakdhane','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/Achref-yakdhan.jpg'},
    {'id':2,'name':'Wael Chakchouk','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/Wael-Chakchou1.jpg'},
    {'id':3,'name':'Sofien Sellami','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/Sofien-Sellami.jpg'},
    // {'id':4,'name':'Learn Reactjs','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/reactjs.jpg'},
  ]




}


