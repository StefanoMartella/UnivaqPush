import 'rxjs/add/operator/map';

import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';

import { GOOGLE_API_KEY } from '../../constants';

declare var google: any;

@IonicPage()
@Component({
  selector: "page-canteen",
  templateUrl: "canteen.html"
})
export class CanteenPage {
  private onOnline: any;
  private map: any;

  constructor(
    private network: Network,
    private http: Http
  ) { }

  ionViewDidLoad() {
    if 
      (this.network.type != "none") this.loadGoogleMaps();
    else 
      // Waiting for internet connection to load map
      this.onOnline = this.network.onConnect().subscribe(() => {
        this.loadGoogleMaps();
      });
  }

  // Load map and remove network subscription if present
  loadGoogleMaps() {
    //Load the SDK
    window["mapInit"] = () => {
      this.initMap();
    };

    let script = document.createElement("script");
    script.id = "googleMaps";
    script.src = "http://maps.google.com/maps/api/js?key=" +
                  GOOGLE_API_KEY +
                 "&callback=mapInit";

    document.body.appendChild(script);
    if (this.onOnline != undefined) this.onOnline.unsubscribe();
  }

  // Defining options for map
  initMap() {
    let latLng = new google.maps.LatLng(42.355696, 13.361555);

    let mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(
      document.getElementById("map_canvas"),
      mapOptions
    );
    this.setMarkers();
  }

  // Retrieving markers according to infos into 
  // markers.json in assets folder
  setMarkers() {
    this.http
      .get("assets/data/markers.json")
      .map(res => res.json())
      .subscribe(data => {
        this.addMarkersToMap(data);
      });
  }

  // Adding markers to the map
  addMarkersToMap(markers) {
    for (let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);

      let infoWindow = new google.maps.InfoWindow({
        content: `<h6>${marker.name}</h6>`
      });

      let marker_info = new google.maps.Marker({
        position: position,
        map: this.map,
        title: marker.name
      });

      marker_info.addListener("click", () => {
        infoWindow.open(this.map, marker_info);
      });
    }
  }
}