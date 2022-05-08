import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogReportComponent} from "../dialog-report/dialog-report.component";
import {RessourcesService} from "../../../services/ressources.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Report } from 'src/app/models/report';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  fileName = '';
  msg: string;
  reports: Report[];

  displayedColumns: string[] = ['Name', 'Email', 'Subject', 'Content', 'Location', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : RessourcesService) { }

  ngOnInit(): void {
    this.getAllReports();

    this.api.getReport().subscribe((reports: Report[]) => {
      this.reports = reports;
    });
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

  deleteReport(id:number){
    this.api.deleteReport(id)

      .subscribe({
        next:(res)=>{

          var result = confirm("are you sure you want to delete this?");
          if(result)  {
              alert("report Deleted Successfully!");
              this.getAllReports();
          }
        },
        error:()=>{
          alert("Error while deleting the report!!")
        }
      })
  }

  SendMail(Email: string) {
    
    return this.api.postMail('mail', {
      Email
    });
    
  }

  getReportC() {
    return this.api.getReport();
  }

  ViewRep(Email: string, Content: string, Subject: string) {
    //console.log("here: ", Email, Content, Subject );
    
    
    this.msg = 'subject: \n' + Subject + '\nContent :\n' + Content ;
    var result = confirm(this.msg);
    
    if(result)  {
      this.SendMail(Email).subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();
      });
        alert("mail sended Successfully!");
        this.ngOnInit();
    }


/*
    this.SendMail(Email).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit();
    });
    this.msg = 'subject: \n' + Subject + '\nContent :\n' + Content ;

    
    alert(this.msg);
    
    this.ngOnInit();*/
  }


  RepCexportexcel(): void {
    /* table id is passed over here */
    const element = document.getElementById('client-report');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    this.fileName = new Date().toLocaleString();

    /* save to file */
    XLSX.writeFile(wb, 'List-Report_Client_of_' + this.fileName + '.xlsx');
  }

}
