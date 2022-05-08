import { Component, OnInit } from '@angular/core';
import {DialogReportComponent} from "./dialog-report/dialog-report.component";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RessourcesService} from "../../services/ressources.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private dialog : MatDialog, private api : RessourcesService) { }
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(DialogReportComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if (val === 'save'){
        this.getAllReports();
      }
    })
  }

  getAllReports(){
    this.api.getReport()
      .subscribe({
        next:(res)=>{
           console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error:(err)=>{
          alert("Error while fetching the Records !!")
        }
      })
  }

}
