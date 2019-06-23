import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SpliceRouteProvider } from '../../providers/splice-route/splice-route';
import { MapDataProvider } from '../../providers/map-data/map-data'
/*
  Generated class for the CalculateEtaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CalculateEtaProvider {

  constructor(public http: Http, public MapData: MapDataProvider, public SpliceRoute: SpliceRouteProvider) {
    console.log('Hello CalculateEtaProvider Provider');
  }

calculateETAs(payload){
	console.log("ETA function called")

	var payload = payload

	// Get Route Data

	this.MapData.getRouteData(payload.RouteID).subscribe((res) => {
		var busRoute = res.features[0].geometry.coordinates

		console.log(busRoute)
		console.log(payload.PositionIndex)
		if (payload.PositionIndex > 0) {
		busRoute =  this.SpliceRoute.getSplicedRoute(busRoute, payload.PositionIndex)
		}
		console.log(busRoute)

		// Now that we have the Route points from Bus Location as the start/finish points, we want to get all the stops on that route. 
		this.MapData.getStopData(payload.CityID).subscribe((res) => {
			var routeStops = res
			// loop through stop data, and if the stop is on the route we call a function that caclulates the ETA from the current bus to the route.
			for (var x = 0; x < routeStops.features.length; x++){
				if (routeStops.features[x].properties.routeID === payload.RouteID){
					// this.calculateStopETA(busRoute, routeStops.features[x])
					//Now we want

				}
			}
		})
		// 
	})
	// Get Position from payload
	// Now we send this to the Splicer service to re-arrange the array so that the bus's current position is the starting point, in the map route loop.

	// 


	var response = {
		"Stop 1 ETA" : "14min",
		"Stop 2 ETA" : "36 min"
	}

	return response
}

// calculateStopETA(busRoute, stop){
// 	console.log("calculating stop eta")
// }

}
