import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { browser } from 'protractor';
import { CommonService } from '../../services/common.service';
import { Prediction } from '../../model/prediction';
import { PlaceLocation } from '../../model/placeLocation';


@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})

export class GmapComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 40.73061;
  lng = -73.935242;

  coordinates;
  mapOptions: google.maps.MapOptions;
  marker;

  constructor(private commonService: CommonService) {
    this.commonService.$updateMarker.subscribe(this.updateMaker.bind(this));
  }

  ngOnInit() {
    this.getCurrentPosition();
  }

  ngAfterViewInit() {
    // this.mapInitializer();
  }

  mapInitializer() {
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptions = {
      center: this.coordinates,
      zoom: 8
    };
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });

    this.marker.setMap(this.map);
  }

  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.commonService.LATITUDE = this.lat = position.coords.latitude;
        this.commonService.LONGITUDE = this.lng = position.coords.longitude;
        this.mapInitializer();
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  updateMaker(location: PlaceLocation) {
    if (location) {
      this.lat = location.lat;
      this.lng = location.lng;
      this.mapInitializer();
      alert("update");
    }
  }


}
