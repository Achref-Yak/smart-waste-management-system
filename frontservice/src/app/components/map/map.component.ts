import { Component, AfterViewInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { TrashService } from 'src/app/services/Trash.service';
import { WebsocketService } from 'src/app/services/websocketservice.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  subject = webSocket("wss://21t9ayt5cf.execute-api.us-west-2.amazonaws.com/production");
  sensorsData
  markers: Array<{
    id: string;
    lat: number,
    lon: number,
    message: string
  }> = []
  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);





  }

  constructor(private trashService: TrashService) { }

  getAllAWStrash() {


  
    this.trashService.getAwsTrash().subscribe(data => {
      console.log(data);
      this.sensorsData = data;

      let point = {
        "id": "9",
        "lat": 10.1815,
        "lon": 36.8065,
        "message": "level: high"
      }
  
  
  
      this.markers.push(point);
      this.setMarkers();

    });

    this.subject.subscribe(
      msg => {
        console.log(msg);
        this.sensorsData = []
        this.sensorsData.push(msg)
        this.setMarkers()

      }, // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }


  setMarkers() {

    var i = 0;
    console.log(this.sensorsData)

    this.markers.forEach(element => {
      console.log(this.sensorsData);

      if (element.id == this.sensorsData[i].id) {
        const message = "distance: " + this.sensorsData[i].distance + "</br> gaz : " + this.sensorsData[i].gaz + "</br> ";
        element.message = message

      }
      i++

    });

    // Add custom icon
    var icon = L.icon({
      iconUrl: 'assets/marker-icon-2x.png',

      iconSize: [30, 30],


    });
    this.markers.forEach(element => {

      var geojsonPoint: geojson.Point = {
        type: 'Point',
        coordinates: [element.lat, element.lon],
      };
      var marker = L.geoJSON(geojsonPoint, {
        pointToLayer: (point, latlon) => {
          return L.marker(latlon, { icon: icon })
        }
      });
      //Add popup message
      marker.bindPopup(element.message);
      marker.addTo(this.map);


    });
  }
  ngAfterViewInit(): void {
    this.getAllAWStrash();
    this.initMap();
  }
}