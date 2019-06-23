import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MapDataProvider } from '../../providers/map-data/map-data'
import { SimulationProvider } from '../../providers/simulation/simulation';
import { LiveTrackingProvider } from '../../providers/live-tracking/live-tracking';
import { SpliceRouteProvider } from '../../providers/splice-route/splice-route';
import { PubNubAngular } from 'pubnub-angular2';
import { Geolocation } from '@ionic-native/geolocation';
import { CacheService } from "ionic-cache";
import { Storage } from '@ionic/storage';


/**
 * Generated class for the DriverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
})
export class DriverPage {

cities: any
routes: any
buses: any
city: any
route:any
bus: any
live: any
routeData: any
routeLocations: any
company: any

driverTracking: any
interval : any



  constructor(public navCtrl: NavController, public navParams: NavParams, public MapData: MapDataProvider,public pubnub: PubNubAngular, public Simulation: SimulationProvider,public SpliceRoute: SpliceRouteProvider, private geolocation: Geolocation, public alertCtrl: AlertController, public cache: CacheService, private storage: Storage) {
       this.pubnub.init({
        publishKey: 'pub-c-4a0bf960-05b6-4661-ad88-1d42361f89e4',
        subscribeKey: 'sub-c-d47d3d7c-1cd9-11e8-a7d0-2e884fd949d2'
        });

     this.company = 'SoaringKiwi'

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
    console.log(this.driverTracking)
      var dd = this.storage.get('driverTracking').then((val) =>{
         console.log(val)
         this.driverTracking = val
       })
    // storage.set('live', false)
    // this.driverTracking = false
    // this.cache.getOrSetItem("driverTracking", this.driverTracking)

    // HERE WE DEFINE THE OPTIONS FOR THE DIFFERENT TRACKING VARIABLES - IMPORTANT FOR EACH COMPANY
    this.city = 1
    this.cities = [
    	{
    		"id": 1,
    		"name" : "Auckland",
    		"routes" : [
    			 		{
    					"id": 1,
    					"name" : "Red Route",
              "buses": [
                  {
                        "id": 1,
                        "name" : "Donna"

                      },
                      {
                        "id": 2,
                        "name" : "Della"
                      },
      {
        "id": 3,
        "name" : "Bruce"
      },
      {
        "id": 4,
        "name" : "Bob"
      }
              ]
		    			},
		    			{
		    			"id": 2,
		    			"name" : "Blue Route",
               "buses": [
                  {
                        "id": 1,
                        "name" : "Bruice"

                      },
                      {
                        "id": 2,
                        "name" : "Bob"
                      },
      {
        "id": 3,
        "name" : "Bruce"
      },
      {
        "id": 4,
        "name" : "Bob"
      }
              ]
		    			}
    		]

    	},
    	{
    		"id": 2,
    		"name" : "Christchurch",
    		"routes" : [
    			 		{
    					"id": 1,
    					"name" : "Red Route",
               "buses": [
                  {
                        "id": 1,
                        "name" : "Sarah"

                      },
                      {
                        "id": 2,
                        "name" : "Sally"
                      }
              ]
		    			}
    		]
    	}
    ]
    	
    this.routes = [
    		{
    		"id": 1,
    		"name" : "Red Route"

    	},
    	{
    		"id": 2,
    		"name" : "Blue Route"
    	}
    ]

    this.buses = [
    		{
    		"id": 1,
    		"name" : "Donna"

    	},
    	{
    		"id": 2,
    		"name" : "Della"
    	},
      {
        "id": 3,
        "name" : "Bruce"
      },
      {
        "id": 4,
        "name" : "Bob"
      }
    ]

  }

  enableTracking(){
  	 
  	console.log(this.city)
  	console.log(this.route)
  	console.log(this.bus)
  	// console.log(this.live)

  	// Here we will have a timed function that gets the long lat of the user 
        var channel = "yourBusApp_" + this.company + "_" + this.city
     // this.driverTracking = setInterval(()=> {
       if (!this.city){
           let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Please select a City from the Option List',
                buttons: ['Dismiss']
              });
              alert.present();
            }
       
       if (!this.route){
          let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Please select a Route from the Option List',
                buttons: ['Dismiss']
              });
              alert.present();
          }
       
        if (!this.bus){
          let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Please select a Bus from the Option List',
                buttons: ['Dismiss']
              });
              alert.present();
            }

       if (this.bus){
       let confirm = this.alertCtrl.create({


                  title: 'Enable Live Tracking?',
                  message: 'This will publish the location co-ordindates from this device and be visible to users on the bus tracking map',
                  buttons: [
                    {
                      text: 'Cancel',
                      handler: () => {
                        console.log('Disagree clicked');
                      }
                    },
                    {
                      text: 'Enable',
                      handler: () => {
                        console.log('Agree clicked');
                         this.driverTracking = true
                            this.storage.set('driverTracking', true);
                             this.interval = setInterval(()=> {
                               
                                console.log("sending at interval...")
                              // var longlat = 
                              // console.log(longlat)
                                  this.geolocation.getCurrentPosition({ timeout: 50000 }).then((resp) => {

                                          var message = {
                                   "CityID": this.city,
                                  "CityName" : this.cities[this.city-1].name,
                                  "RouteID" : this.route,
                                  "RouteName" : this.cities[this.city-1].routes[this.route -1].name,
                                  "BusID" : this.bus,
                                   "latlng" : [resp.coords.longitude, resp.coords.latitude],
                                 
                                  "BusName" : this.buses[this.bus -1].name,
                                  "BusStatus" : "Live"
                              }
                              console.log(message)
                               this.pubnub.publish({
                                channel: channel,
                                message:[message]
                                })
                                   // resp.coords.latitude
                                   // resp.coords.longitude
                                  }).catch((error) => {
                                    console.log('Error getting location', error);
                                  });

                              // index ++
                           }, 10000)
                      }
                    }
                  ]
                });
                confirm.present();
         }






  	// It then needs to get the Positon of the bus closest to the route (using Turf)

}


stopTracking(){
  var channel = "yourBusApp_" + this.company + "_" + this.city
         let confirm = this.alertCtrl.create({
                  title: 'Stop Live Tracking?',
                  message: 'This will stop publishing the locations from thios device',
                  buttons: [
                    {
                      text: 'Cancel',
                      handler: () => {
                        console.log('Disagree clicked');
                      }
                    },
                    {
                      text: 'Turn Off',
                      handler: () => {
                        console.log('Agree clicked');
                        this.driverTracking = false
                            this.storage.set('driverTracking', false);
                                        var message = {
                                   "CityID": this.city,
                                  "CityName" : this.cities[this.city-1].name,
                                  "RouteID" : this.route,
                                  "RouteName" : this.cities[this.city-1].routes[this.route -1].name,
                                  "BusID" : this.bus,
                                   
                                 
                                  "BusName" : this.buses[this.bus -1].name,
                                  "BusStatus" : "Offline"
                              }
                              console.log(message)
                               this.pubnub.publish({
                                channel: channel,
                                message:[message]
                                })
                                clearInterval(this.interval);
                              console.log("tracking stopped")
                      }
                    }
                  ]
                });
                confirm.present();
         


}
  /*
    FUNCTION - startSimulation

    DESCRIPTION:
      This is where we simulate live buses in the app.
      - We do this by using the data points, along the bus route that we define in the routedata files for a city (the same used to plot the route on the map)
      - We loop through these data points, and send a position at an interval time period.
      - To simulate multiple buses - we set the starting point in the object to a different location
      - For the purpose of a simulation, we will always simulate 2 buses on each route for a city.
}
*/
  startSimulation(){
  	console.log("simulation starting")
  	

  	

  		// For each route in a city, we want to get the route data.




 
    		// Get Route data for the city. We will use these route points as bus location points
    	      this.MapData.getRouteData(this.city).subscribe((res ) =>{
    	      	console.log(res)
    	      	console.log("Now we split city rotue data into individual routes")
    	      	   var RouteData = res
    	      		console.log(RouteData.features.length)

    	      		//For each route in the city, we want to get its own route points from RouteData
    	      		for (var x=0; x< this.cities.length; x++){
                  //if the city matched
    	      			if(this.cities[x].id === this.city){
                    var myCity = this.cities[x]
                    console.log("myCity is " + myCity.name + "ID= " + myCity.id)

              

                    
                    // for each route in a city
    	      				for (var y=0; y < myCity.routes.length; y++){
                        console.log (myCity.routes[y])
                        var myRoute = myCity.routes[y]
                        // Now we loop throut Route data to find the feature set that matches the route
                          for (var z =0; z < RouteData.features.length; z++){
                            if (myRoute.id === RouteData.features[z].properties.routeID){
                              //then push the simulated route to the route in this.cities.
                              var routeSimPath =  RouteData.features[z].geometry.coordinates
                              var bus2Path = RouteData.features[z].geometry.coordinates
                              var bus3Path = RouteData.features[z].geometry.coordinates
                              // console.log(routeSimPath)
                              
                              var bus1 = routeSimPath
                              // console.log(bus1)

                              var myPayload_bus1 = {
                                "CityID": myCity.id,
                                "CityName" : myCity.name,
                                "RouteID" : myRoute.id,
                                "RouteName" : myRoute.name,
                               
                                "BusID" : myRoute.buses[0].id,
                                "BusSimulationPath": bus1,
                                "BusName" : myRoute.buses[0].name

                              }
                              console.log(myPayload_bus1)
                              this.sendSimulationData(myPayload_bus1)
                               
                              // To work out bus 2 we want the bus to start around halfway on the route, so we want to find the mid-point position, and then shift all the points on the route from before this to the end (to make a loop with a different starting piosition,)
                               // console.log("Total Points on Route:" + bus2Path.length)
                               var midpoint = Math.round(bus2Path.length /2)
                               var midpoint2 = Math.round(bus3Path.length /3)
                               // console.log ("midpoint: " + midpoint)
                            
                               //call split function
                               // var bus2 = this.SpliceRoute.getSplicedRoute(bus2Path, midpoint)
                                var newStart = bus2Path.slice(midpoint)
                                // console.log(bus2Path)
                                // console.log(newStart )
                                 var bus2 = newStart
                                 for (var s = 0; s < (bus1.length/2); s++){
                                   bus2.push(bus1[s])
                                   // console.log(bus2)
                                 }
                                  var newStart2 = bus3Path.slice(midpoint2)
                                   var bus3 = newStart2
                                 for (var s = 0; s < (bus1.length/2); s++){
                                   bus3.push(bus1[s])
                                   // console.log(bus2)
                                 }
                                 // console.log (newEnd)
                              // console.log(busSimulation)
                              // console.log(newStart)
                              // console.log(bus2)
                              // [bus1] =routeSimPath
                              // console.log(this.cities[x])
                              // var bus2data = {"bus2" : bus2}
                              var busSimulation = { 
                                            0 :bus1,
                                            1: bus2,
                                            2: bus3
                                            
                               }
                               var myPayload_bus2 = {
                                "CityID": myCity.id,
                                "CityName" : myCity.name,
                                "RouteID" : myRoute.id,
                                "RouteName" : myRoute.name,
                                 "BusID" : myRoute.buses[1].id,
                                "BusSimulationPath": bus2,
                                "BusName" : myRoute.buses[1].name

                              }
                              console.log(myPayload_bus2)
                              this.sendSimulationData(myPayload_bus2)
                               this.cities[x].routes[y]["BusSimulation"] = busSimulation
                               

                                var myPayload_bus3 = {
                                "CityID": myCity.id,
                                "CityName" : myCity.name,
                                "RouteID" : myRoute.id,
                                "RouteName" : myRoute.name,
                                 "BusID" : myRoute.buses[2].id,
                                "BusSimulationPath": bus3,
                                "BusName" : myRoute.buses[2].name

                              }

                              console.log(myPayload_bus3)
                              this.sendSimulationData(myPayload_bus3)
                               this.cities[x].routes[y]["BusSimulation"] = busSimulation
                       

                            }
                          }
    	      				  
    	      				}
    	      			}
    	      		}
                // this.sendSimulationData()
    	   
    	      })

  }

sendSimulationData(payload){

var index = 0
var channel = "yourBusApp_" + this.company + "_" + payload.CityID
console.log(channel)
 setInterval(()=> {
      // var longlat = 
      // console.log(longlat)

      var message = {
           "CityID": payload.CityID,
          "CityName" : payload.CityName,
          "RouteID" : payload.RouteID,
          "RouteName" : payload.RouteName,
          "BusID" : payload.BusID,
          "latlng" : payload.BusSimulationPath[index],
          "BusName" : payload.BusName
      }
      console.log(message)
       this.pubnub.publish({
        channel: channel,
        message:[message]
        })
      index ++
   }, 10000)




}

stopSimulation(){
	this.Simulation.stopSimulation()
}
}
