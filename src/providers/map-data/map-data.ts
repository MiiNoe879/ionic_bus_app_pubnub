import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the MapDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MapDataProvider {

  constructor(public http:Http) {
    console.log('Hello MapDataProvider Provider');
  }

  getStopData(city){

    var city = city

    console.log(city)
    
    if (city === 1){
     return this.http.get("./assets/map-data/mapdata-auckland.json").map((res: any) => {
          return res.json();
        })
    }
    else {
        
         return this.http.get("./assets/map-data/mapdata-christchurch.json").map((res: any) => {
          return res.json();
        })
  }
  }

  getRouteData(city) {

      //      return new Promise((resolve, reject) => {
      //       this.MapData.getRouteData(city)
      //       .then((resp) => {
      //            resolve(resp.json());
      //            console.log(resp)
      //       }).catch((error) => {
      //             console.log('Error getting location', error);
      //             reject(error);
      //       });
      // });

     var city = city
    if (city === 1){

        return this.http.get("./assets/map-data/routedata-auckland.json").map((res: any) => {
        	return res.json();
        })

      } else if (city === 2){
        return this.http.get("./assets/map-data/routedata-christchurch.json").map((res: any) => {
          return res.json();
        })

      }
  }

// getSpecificRouteData(city, route){
//  var results = []
//   this.getRouteData(city).subscribe((res) => {
        
//         return res
//   })
// }
 // console.log(res)
 //  getRedBus2() {
   

 //        return this.http.get("./assets/map-data/redBus2.json").map((res: any) => {
 //        	return res.json();
 //        })
 //  }

 // getRedRoute(){
 // 	return this.http.get("./assets/map-data/redRoute.json").map((res: any) => {
 //        	return res.json();
 //        })
 // } 

 //  getBlueRoute(){
 // 	return this.http.get("./assets/map-data/blueRoute.json").map((res: any) => {
 //        	return res.json();
 //        })
 // } 

 // getPoints(){
 //      return this.http.get("./assets/map-data/markers.json").map((res: any) => {
 //          return res.json();
 //        })

 // }
}
