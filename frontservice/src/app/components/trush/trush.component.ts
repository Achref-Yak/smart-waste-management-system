import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogTrushComponent} from "./dialog-trush/dialog-trush.component";
import {RessourcesService} from "../../services/ressources.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-trush',
  templateUrl: './trush.component.html',
  styleUrls: ['./trush.component.css']
})
export class TrushComponent implements OnInit {
  title = 'Angular13Crud';
  displayedColumns: string[] = ['lontitude','latitude', 'Size', 'Date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private dialog : MatDialog, private api : RessourcesService) {
  }

  ngOnInit(): void {
    this.getAllTrushs();
  }
  openDialog() {
    this.dialog.open(DialogTrushComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if (val === 'save'){
        this.getAllTrushs();
      }
    })
  }
  getAllTrushs(){
    this.api.getTrush()
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

  editTrush(row : any){
    this.dialog.open(DialogTrushComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val === 'update'){
        this.getAllTrushs();
      }
    })
  }
  deleteTrush(id:number){
    this.api.deleteTrush(id)
      .subscribe({
        next:(res)=>{
          alert("Truck Deleted Successfully")
          this.getAllTrushs();
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
