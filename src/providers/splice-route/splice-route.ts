import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LiveTrackingProvider } from '../../providers/live-tracking/live-tracking';

/*
  Generated class for the SpliceRouteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SpliceRouteProvider {

route: any
point: any
splicedRoute: any

  constructor(public http: Http) {
    console.log('Hello SpliceRouteProvider Provider');
  }
	

	//Takes a Route and a position on the Route and takes app points from the start of the route and adds it to the end
	getSplicedRoute(route, position){
		

	this.splicedRoute = route.slice(position)
			               var startOfRoute = route
			               startOfRoute.length =  position
			               

			               this.splicedRoute = this.splicedRoute.concat(startOfRoute)
			               // console.log( this.splicedRoute )

	return this.splicedRoute

	}
}
