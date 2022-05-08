import { Component, OnInit } from '@angular/core';
import {EmailSignupComponent} from "../../email-signup/email-signup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-homep',
  templateUrl: './homep.component.html',
  styleUrls: ['./homep.component.css']
})
export class HomepComponent implements OnInit {

  constructor(public dialog: MatDialog  ) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EmailSignupComponent, {
      width: '250px',

    });


    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
