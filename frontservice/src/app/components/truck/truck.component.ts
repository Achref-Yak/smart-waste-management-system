import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogTruckComponent} from "./dialog-truck/dialog-truck.component";
import {RessourcesService} from "../../services/ressources.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {

  title = 'Angular13Crud';
  displayedColumns: string[] = ['regNumber', 'truckBrand', 'tankVolume', 'firstDriver', 'secondDriver', 'recruitmentDate', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private dialog : MatDialog, private api : RessourcesService) {
  }

  ngOnInit(): void {
    this.getAllTrucks();
  }
  openDialog() {
    this.dialog.open(DialogTruckComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if (val === 'save'){
        this.getAllTrucks();
      }
    })
  }
  getAllTrucks(){
    this.api.getTruck()
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

  editTruck(row : any){
    this.dialog.open(DialogTruckComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val === 'update'){
        this.getAllTrucks();
      }
    })
  }
  deleteTruck(id:number){
    this.api.deleteTruck(id)
      .subscribe({
        next:(res)=>{
          alert("Truck Deleted Successfully")
          this.getAllTrucks();
        },
        error:()=>{
          alert("Error while deleting the truck!!")
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
