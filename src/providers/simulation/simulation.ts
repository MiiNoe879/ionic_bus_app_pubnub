import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { MapDataProvider } from '../../providers/map-data/map-data'
import { LiveTrackingProvider } from '../../providers/live-tracking/live-tracking';
import { SpliceRouteProvider } from '../../providers/splice-route/splice-route';
import { PubNubAngular } from 'pubnub-angular2';
import { CalculateEtaProvider } from '../../providers/calculate-eta/calculate-eta';

/*
  Generated class for the SimulationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SimulationProvider {

route: any
routeData: any
simulationStartPoint_Bus1: any
simulationStartPoint_Bus2: any
simulationRoute_Bus2: any
bus: any
eta: any
simulation: any
company: any
channel: any
buses: any


  constructor(public http: Http, public MapData: MapDataProvider, public SpliceRoute: SpliceRouteProvider, public LiveTracking: LiveTrackingProvider, public pubnub: PubNubAngular, public ETA: CalculateEtaProvider) {
    console.log('Hello SimulationProvider Provider');

     this.pubnub.init({
        publishKey: 'pub-c-4a0bf960-05b6-4661-ad88-1d42361f89e4',
        subscribeKey: 'sub-c-d47d3d7c-1cd9-11e8-a7d0-2e884fd949d2'
        });

     this.company = 'SoaringKiwi'

  }




   simulateCity(route,city, buses){
   		this.route = route
    	console.log("simulating route:" + this.route.name)
    	var routeName = this.route.name
    	this.buses = buses
    	console.log(this.route.id)


 

    	      this.MapData.getRouteData(city).subscribe((res ) =>{
    	      	console.log(res)
    	      })
    	     
    	      	// => {
    	      	// 	var RouteData = res
    	      	// 	console.log(RouteData.features.length)
    	      	// 	for (var x=0; x< RouteData.features.length; x++){
    	      	// 		console.log(RouteData.features[x].properties.route)
          		// 		if (RouteData.features[x].properties.routeID === this.route.id){
          		// 		 this.routeData = RouteData.features[x]
          		// 		 console.log(this.routeData)
           	// 			 }
       				 // }

       				 //     var data = this.MapData.getRouteData(city).subscribe((res) 
    	      	// => {
    	      	// 	var RouteData = res
    	      	// 	console.log(RouteData.features.length)
    	      	// 	for (var x=0; x< RouteData.features.length; x++){
    	      	// 		console.log(RouteData.features[x].properties.route)
          		// 		if (RouteData.features[x].properties.routeID === this.route.id){
          		// 		 this.routeData = RouteData.features[x]
          		// 		 console.log(this.routeData)
           	// 			 }
       				 // }

    	      // 		//Now neeed to split data for each route in the 

    	      // })
     //           	//Returns the coordinates

               	
     //           
     //            console.log(this.routeData)
                
     //            // Now we assign Start Points on the Route for each bus we are simulating
     //            //For bus 1, it is just the start point on the route

     //            for (var x =0; x < this.buses.length; x++){

     //            	if (this.buses[x].id === 1){
     //            		this.simulationStartPoint_Bus1 = this.routeData[0]
					//  console.log("Bus 1 Start point on Route")
			  //               console.log(this.simulationStartPoint_Bus1)
			  //               console.log( this.buses[x].id, routeName, this.route.id, 0, city)
			  //               var channel = "yourBusApp_" + this.company + "_" + city + "." + this.route.id+ "." + this.buses[x].id
     //       		console.log(channel)
					// // this.simulateBus(this.routeData, this.buses[x].id, routeName, this.route.id, 0, city)
     //            	} else {

			  //               //For Bus2, we will make it in the middle of the route
	    //             this.simulationStartPoint_Bus2 = this.routeData[this.routeData.length/2]
	    //              console.log("Bus 2 Start point on Route")
	    //             console.log(this.simulationStartPoint_Bus2)
	    //             var position = this.routeData.length/2
	    //             // For Bus two, we need to move all of the points before the starting point, to the end of the route, to complete the loop again.
	    //            this.simulationRoute_Bus2  = this.SpliceRoute.getSplicedRoute(this.routeData,position)

	    //            // this.simulateBus( this.simulationRoute_Bus2, this.buses[x].id, routeName, this.route.id, position, city)
     //            	}
     //            }
              

					

			    
   	 // })

	}	



	// simulateBus(busLocations, bus, routeName, routeID, positionIndex, city)	{
	// 	var busID = bus
	// 	var index = 0
	// 	var position = busLocations
	// 	var routeName = routeName
	// 	// console.log(routeID)
		
	// //This function publishes the sample data (long/lat) to PubNUb to simulate a bus sending its coordinates every few seconds.  This will be replaces by a Admin mobile app.
 //        // this.simulation = setInterval(()=> {
 //        // 	console.log (index)
 //        // 	console.log ("Current Position of Bus " + bus + " on Route:  " + routeName +
 //        // 	 " is: " + position[index] )
 //        //    	// var currentCoordiantes = busroute[index]
 //        //    	// console.log(currentCoordiantes)
 //        //    	var payload = {
 //        //    		"RouteID": routeID,
 //        //    		"BusID" : busID,
 //        //    		"Position" : position[index],
 //        //    		// "Route" : position,
 //        //    		"PositionIndex" : index,
 //        //    		"CityID" : city
 //        //    		}
           	
 //        //    	console.log(payload)
 //        //    	// this.eta = this.ETA.calculateETAs(ETA_Payload)
 //        //    	// console.log(this.eta)

 //        //    		  this.pubnub.publish({
	// 	      //       channel: channel,
	// 	      //       message:[payload]
	// 	      //       })

 //        //    index = index +1
 //        //   },10000)

		
	// }

stopSimulation(){
		clearInterval(this.simulation)
	}
}
