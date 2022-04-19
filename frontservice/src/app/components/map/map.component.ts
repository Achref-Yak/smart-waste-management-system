import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { TrashService } from 'src/app/services/Trash.service';
import {RessourcesService} from "../../services/ressources.service";

import {debounce} from "rxjs";
import {marker} from "leaflet";
import { webSocket } from 'rxjs/webSocket';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  sensorsData;
  points;
  subject = webSocket("wss://21t9ayt5cf.execute-api.us-west-2.amazonaws.com/production");
  trash;
  markers: Array<{
    id: string;
    lat: number,
    lon: number,
    message: string
  }> = []

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);


  }

  constructor(private trashService: TrashService,private api : RessourcesService ) {

  }

  getAllAWStrash()
  {
    this.api.getTrush().subscribe(params =>{

      this.trash = params;
      console.log(this.trash[0]._id);
    })
    this.trashService.getAwsTrash().subscribe(data => {


      console.log(data);
      this.sensorsData = data;

      this.subject.subscribe(
        msg => {
          console.log(msg);

          this.sensorsData.push(msg)
          this.getMarkers();
  
        }, // Called whenever there is a message from the server.
        err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        () => console.log('complete') // Called when connection is closed (for whatever reason).
      );

let point = {
  "id": "9",
  "lat": 10.208476,
  "lon": 36.701448,
  "message": "level: high",
}

this.points = this.markers;

//this.markers.push(point);

// this.markers.forEach(element => {


this.getMarkers();
 // Add custom icon


    });
  }


  getMarkers()
  {
    
 for (let i=0; i < this.sensorsData.length ; i++){
  for (let j=0; j < this.trash.length ;j++){
  if(this.trash[j]._id==this.sensorsData[i].id)
  {
    const message = "distance: " + this.sensorsData[i].distance + "</br> gaz : "  + this.sensorsData[i].gaz + "</br> " ;
    this.points.message = message
    this.points.lat =this.trash[j].latitude;
    this.points.lon = this.trash[j].longitude;
    this.points.push(this.points);
    console.log(this.points)
    var icon = L.icon({
      iconUrl: 'assets/marker-icon-2x.png',

      iconSize: [30, 30],


    });
    this.points.forEach(element => {

      var geojsonPoint: geojson.Point = {
        type: 'Point',
        coordinates: [element.lat,element.lon],
      };
      var marker = L.geoJSON(geojsonPoint, {

        pointToLayer: (point,latlon)=> {
          return L.marker(latlon, {icon: icon})
        }
      });
      //Add popup message
      marker.bindPopup(element.message);
      marker.addTo(this.map);


    });
  }
  }
}
// })
;
  }

  ngAfterViewInit(): void {
    this.getAllAWStrash();
    this.initMap();
  }
}

