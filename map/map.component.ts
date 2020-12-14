import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import * as  MapboxLanguage  from '@mapbox/mapbox-gl-language';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 33.892166;
  lng = 9.561555499999997;
  waypoint=[
    [9.400138,33.8439408],[10.13298,35.67337]
  ]
  constructor() { }
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      let  directions :any;
      var map = new mapboxgl.Map({
        accessToken: 'pk.eyJ1IjoiaG91c3NlbWRha2hsaTYzIiwiYSI6ImNraTRtOTM5MjBidHYydW1odGk5MG5nOGcifQ.cZXiOVPj8zfeuEay1lTE7Q',
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [9.400138,33.8439408],
        zoom: 5.8
      });
const coordinates={

}
      map.addControl(
        directions= new MapboxDirections({
          accessToken: 'pk.eyJ1IjoiaG91c3NlbWRha2hsaTYzIiwiYSI6ImNraTRtOTM5MjBidHYydW1odGk5MG5nOGcifQ.cZXiOVPj8zfeuEay1lTE7Q',
          unit: 'metric',
          profile: 'mapbox/cycling',
          language: 'ar-AR',
          container: 'directions',

        }),
        "top-right"
      );

      directions.on('route', function(e) {

      });
        map.on('click', function(e) {


          var marker = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng,e.lngLat.lat])
          .addTo(map);
      })
/*map.on('load',(e)=>{
  console.log(e)
  directions
  .setOrigin([9.400138,33.8439408])
 // directions.setDestination([10.13298,35.67337])

  this.waypoint.forEach((u,i)=>{
    console.log(u)
    directions.addWay
    directions.setDestination(u)


  })

    });*/
})

  }
}
