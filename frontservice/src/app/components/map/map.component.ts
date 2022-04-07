import { environment } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  private flyToMarker: mapboxgl.Marker;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 36.7948008;
    lng = 10.0031931;


  constructor() { }
  ngOnInit() {
    const map = new mapboxgl.Map({
      accessToken: environment.mapAc,
      container: 'map',
      style: this.style,
        zoom: 13,
        center: [this.lng, this.lat],
    });
    var airportIcon = document.createElement('div');
    // Add map controls




            var airportPopup = new mapboxgl.Popup({
              anchor: 'bottom',
              offset: [0, -64] // height - shadow
            })
            .setText('Zürich Airport');

            var airport = new mapboxgl.Marker(airportIcon, {
              anchor: 'bottom',
              offset: [0, 6]
            })
            .setLngLat([36.7948008,10.0031931])
            .setPopup(airportPopup)
            .addTo(map);
  }


}
