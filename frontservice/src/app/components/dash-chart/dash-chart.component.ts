import { Component, OnInit,ViewChild } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-dash-chart',
  templateUrl: './dash-chart.component.html',
  styleUrls: ['./dash-chart.component.css']
})
export class DashChartComponent implements OnInit {
  @ViewChild('mychart') mychart:any;
  canvas: any;
  ctx: any;
  constructor() { }

  ngOnInit(): void {
   /* var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx,{...});*/
  }
  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'doughnut',
      data : {
        labels: [
          'Red',
          'Blue',
          
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [100, 50],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
           
          ],
         // hoverOffset: [{4}]
        }]
      }
  });
  }

}
