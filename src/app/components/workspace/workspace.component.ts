import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { } from 'googlemaps';
import { FormControl } from '@angular/forms';
import { Prediction } from '../../model/prediction';
import { PlaceLocation } from '../../model/placeLocation';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  timeout;
  clearSearch;
  predictions: Prediction[] = [];
  selectedPlaces: Prediction[] = [];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  onVaueEnter(event) {
    const that = this;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      that.commonService.getAutocompletePredictions(event.target.value).subscribe((data: Prediction[]) => {
        this.predictions = data;
      });
    }, 2000);
  }

  addToSelectedPlaces(place: Prediction) {
    this.selectedPlaces.push(place);
    this.clearSearch = null;
  }

  markOnMap(place: Prediction) {
    this.commonService.getPlaceDetails(place.place_id).subscribe((data: PlaceLocation) => {
      this.commonService.$updateMarker.next(data);
    });
  }

  remove(place: Prediction) {
    const elementIndex = this.selectedPlaces.findIndex(i => i.place_id === place.place_id)
    this.selectedPlaces.splice(elementIndex, 1)
  }

}
