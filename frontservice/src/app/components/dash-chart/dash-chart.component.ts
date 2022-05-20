import { Component, OnInit,ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import {RessourcesService} from "../../services/ressources.service";
import { TrashService } from 'src/app/services/Trash.service';
import { MapComponent } from '../map/map.component';
@Component({
  selector: 'app-dash-chart',
  templateUrl: './dash-chart.component.html',
  styleUrls: ['./dash-chart.component.css']
})
export class DashChartComponent implements OnInit {
  @ViewChild('mychart') mychart:any;
  canvas: any;
  ctx: any;
  trash ;
  sensorsData ;
  greentrash ;
  redtrash ;
  
  
  constructor(private trashService: TrashService,private api : RessourcesService) { }
  ngOnInit(): void {
   this.getAllAWStrash(); 
  }

  
  getAllAWStrash()
  {
    this.api.getTrush().subscribe(params =>{

      this.trash = params;
      
      console.log(this.stat());
      console.log(this.trash)
     
    })

    
  }
  

 stat(){

    var trashs = this.trash.length ; 
    console.log("nbre de trash",trashs);


    var redtrash = 0;
    var greentrash = 0;
    this.trashService.getAwsTrash().subscribe(data => {
      // console.log(data);
        this.sensorsData = data;
  
        console.log("les donne de sensor",this.sensorsData)
        
    for (let j=0; j < this.sensorsData.length ;j++){

      console.log("distance",this.sensorsData[j].distance);
      
      if(this.sensorsData[j].distance>(9/2))
      {
        greentrash ++;
        
      }
      else{
        redtrash ++ ;
       
      }
    }
    console.log ("green",greentrash);
    console.log ("red",redtrash);
    
    var greenTrashsPercent = (greentrash/trashs)*100;
    var redTrashsPercent = (redtrash/trashs)*100;
    console.log("green trash :",greenTrashsPercent,"red trash :",redTrashsPercent)


    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'doughnut',
      data : {
        labels: [
          'Empty-Trash',
          'Full-Trash',
 
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [greenTrashsPercent,redTrashsPercent],
          backgroundColor: [
            
            'rgb(54, 235, 60)',  
            'rgb(255, 99, 132)',        
          ]
        }]
      }
    });
  
      });  
  }

  ngAfterViewInit() {
  }
  
}
  