import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogClientComponent} from "./dialog-client/dialog-client.component";
import {RessourcesService} from "../../services/ressources.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = ['clientCIN', 'clientName', 'clientEmail', 'clientAddress', 'client_trushSize', 'clientType','client_trash_id', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private dialog : MatDialog, private api : RessourcesService) {
  }

  ngOnInit(): void {
        this.getAllClients();
    }
  openDialog() {
    this.dialog.open(DialogClientComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if (val === 'save'){
        this.getAllClients();
      }
    })
  }
  getAllClients(){
    this.api.getClient()
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

  editClient(row : any){
    this.dialog.open(DialogClientComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val === 'update'){
        this.getAllClients();
      }
    })
  }
  deleteClient(id:number){
    this.api.deleteClient(id)

      .subscribe({
        next:(res)=>{
          alert("client Deleted Successfully")
          this.getAllClients();
        },
        error:()=>{
          alert("Error while deleting the client!!")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
