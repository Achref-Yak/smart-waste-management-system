import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogTrushComponent} from "./dialog-trush/dialog-trush.component";
import {RessourcesService} from "../../services/ressources.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TrashService } from 'src/app/services/Trash.service';

@Component({
  selector: 'app-trush',
  templateUrl: './trush.component.html',
  styleUrls: ['./trush.component.css']
})
export class TrushComponent implements OnInit {
  title = 'Angular13Crud';
  displayedColumns: string[] = ['_id','longitude','latitude', 'size', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;
  trash
  positions = [{id: "", lat: "", lon: ""}]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog : MatDialog, private api : RessourcesService, private trashService: TrashService) {
  }

  ngOnInit(): void {

    this.getAllAWStrash();
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


  getAllAWStrash()
  {

    this.trashService.getAwsTrash().subscribe(data => {
      console.log(data);
      this.trash = data;

    });
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
  deleteTrush(id:any){
    this.api.deleteTrush(id)
      .subscribe({
        next:(res)=>{
          var result = confirm("are you sure you want to delete this?");
          if(result)  {
              alert("Trash Deleted Successfully!");
              this.getAllTrushs();
          }

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
