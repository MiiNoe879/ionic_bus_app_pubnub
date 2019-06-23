import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CacheService } from "ionic-cache";

/*
  Generated class for the ArrivalGuidesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ArrivalGuidesProvider {

  constructor(public http: Http, private cache: CacheService) {
    console.log('Hello ArrivalGuidesProvider Provider');
  }

  

   getDestinationGuide(){
   	var iso = "Auckland"
   	var url = "https://api.arrivalguides.com/api/json/Travelguide?auth=Safetravels&lang=en&iso=" + iso + "&v=8"
   
 	

        let cacheKey = url;
        let request = this.http.get(url).map(res => res.json());

        return this.cache.loadFromObservable(cacheKey, request);
 } 

}
