import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CacheService } from "ionic-cache";
/*
  Generated class for the MapBoxProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MapBoxProvider {

  constructor(public http: Http) {
    console.log('Hello MapBoxProvider Provider');

   

  }
  getETA(waypoints) {
    var key = "pk.eyJ1Ijoic2FmZXRyYXZlbHMiLCJhIjoiaEpwOFNFayJ9.NgM-Grtel0qZnq3_A0vhzg"
    var points = waypoints
    // var points = "174.82292,-36.84561;174.82567,-36.84699;174.82328,-36.84555;174.81594,-36.85159;174.78355,-36.84769;174.77659,-36.85029;174.77873,-36.86108;174.77621,-36.85971;174.77794,-36.86148;174.77651,-36.85953;174.7714,-36.86148;174.76558,-36.85651;174.76581,-36.85227;174.76268,-36.85037;174.76389,-36.84284;174.81013,-36.85086;174.82141,-36.84587"
   var url = "https://api.mapbox.com/directions/v5/mapbox/driving/" + points + "?access_token=pk.eyJ1Ijoic2FmZXRyYXZlbHMiLCJhIjoiaEpwOFNFayJ9.NgM-Grtel0qZnq3_A0vhzg"
    

        return this.http.get(url).map((res: any) => {
        	return res.json();
        })
  }

}
