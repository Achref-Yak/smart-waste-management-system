import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { TrashService } from 'src/app/services/Trash.service';
import {RessourcesService} from "../../services/ressources.service";
import { webSocket } from 'rxjs/webSocket';

import {debounce} from "rxjs";
import {icon, marker} from "leaflet";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  sensorsData;
  subject = webSocket("wss://21t9ayt5cf.execute-api.us-west-2.amazonaws.com/production");
  points;
  trash;
  adress;
  markers: Array<{
    id: string;
    lat: number,
    lon: number,
    message: string
  }> = []

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 35.766154,	10.823634],
      zoom: 8.5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.map.on('click', function(e) {
      alert("You clicked the map at " + e.latlng.toString());

    } );


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

let point = {
  "id": "9",
  "lat": 10.208476,
  "lon": 36.701448,
  "message": "level: high",
}

this.setMarkers();

 // Add custom icon


    });
  }


getPercentage(distance)
{
  return (1 - parseFloat(distance)/ 50)*100
}
  setMarkers()
  {

    this.markers = [];
    this.points = this.markers;

//this.markers.push(point);

// this.markers.forEach(element => {


 for (let i=0; i < this.sensorsData.length ; i++){
  for (let j=0; j < this.trash.length ;j++){
  if(this.trash[j]._id==this.sensorsData[i].id)
  {
    let adress
    this.api.getAdress(this.trash[j].longitude, this.trash[j].latitude ).subscribe( data => {
        this.adress = data
      
        this.adress = this.adress.results[2].formatted_address;
        console.log(this.adress);


        const message = "id:" + this.sensorsData[i].id + "</br> Adress: "+ this.adress! + "</br> Level: " + this.getPercentage(this.sensorsData[i].distance)  + "% </br> Air : "  + this.sensorsData[i].gaz + "</br> " ;
    this.points = [];
    this.points.message = message
    this.points.lat =this.trash[j].latitude;
    this.points.lon = this.trash[j].longitude;
    this.points.push(this.points);
 
    var iconFull = L.icon({
      iconUrl: 'assets/Full.png',
      iconSize: [30, 30],
    });
    var iconEmpty = L.icon({
      iconUrl: 'assets/Empty.png',
      iconSize: [30, 30],
    });
    this.points.forEach(element => {

      if (this.sensorsData[i].distance < 50){
          let icon = iconFull;
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
      }
      else {
        let icon = iconEmpty
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
      }


    });

    })
    
  }
  }
}
// })
;
  }

  ngAfterViewInit(): void {
    this.getAllAWStrash();


    this.initMap();
    this.subject.subscribe(
      msg => {
        console.log(msg);

        this.sensorsData.push(msg)
        this.setMarkers();

      }, // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }
}
