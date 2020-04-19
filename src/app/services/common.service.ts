import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Prediction } from '../model/prediction';
import { PlaceLocation } from '../model/placeLocation';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  serviceUrl = 'http://localhost:8080';
  LATITUDE: Number;
  LONGITUDE: Number;

  $updateMarker = new BehaviorSubject<PlaceLocation>(null);

  constructor(private http: HttpClient) { }

  getAutocompletePredictions(placeName: string) {
    return this.http.get(this.serviceUrl + '/place/autocomplete?placeName=' + placeName +
      '&latitude=' + this.LATITUDE + '&longitude=' + this.LONGITUDE);
  }

  getPlaceDetails(placeId: string) {
    return this.http.get(this.serviceUrl + '/place/details?placeId=' + placeId);
  }

}
