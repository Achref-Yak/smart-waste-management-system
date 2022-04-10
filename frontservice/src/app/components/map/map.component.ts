import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  markers: Array<{
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
    
 
 // Add custom icon
 var icon = L.icon({
  iconUrl: 'assets/marker-icon-2x.png',
 
  iconSize: [30, 30], 
 
 
});

let point = {
  "lat": 10.1815,
  "lon": 36.8065,
  "message": "level: high"
}
let point1 = {
  "lat": 10.1815,
  "lon": 35.8065,
  "message": "level: high"
}
let point2 = {
  "lat": 9.1815,
  "lon": 35.8065,
  "message": "level: high"
}

 

this.markers.push(point);
this.markers.push(point1);
this.markers.push(point2);

this.markers.forEach(element => {

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

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}