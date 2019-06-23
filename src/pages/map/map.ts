import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { PubNubAngular } from 'pubnub-angular2';
import L from "leaflet";
import { MapDataProvider } from '../../providers/map-data/map-data'
import {Http, Response} from '@angular/http';
import { ArrivalGuidesProvider } from '../../providers/arrival-guides/arrival-guides';
import { CacheService } from "ionic-cache";
import { MapBoxProvider } from '../../providers/map-box/map-box';
import { PopModalPage } from '../pop-modal/pop-modal';
import moment from 'moment';
import { Observable } from 'rxjs/Rx';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Storage } from '@ionic/storage';


declare let eon;
// import * as turf from 'turf'
declare let turf;


/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  // template: '<div #map></div>'
})
export class MapPage {
  // @ViewChild('map') this.map;
  map: L.Map;
  center: L.PointTuple;

redBus1Position: any
redBus2Position: any
live: number
live2: number
route: any
blueRoute:any
markers:any
destination: any
images:any
destinationPOI: any
myFeatures: any
myCategories: any
coord: any
currentBusLocation: any
currentLng:any
currentLat:any

city:any
channel: any
company:any
message:any
route1_markerGroupBus1:any
route1_markerGroupBus2: any
route1_markerGroupBus3: any
route1_markerGroupBus4: any
route2_markerGroupBus1:any
route2_markerGroupBus2: any
route2_markerGroupBus3:any
route2_markerGroupBus4: any
route1_bus1Location: any
route1_bus2Location: any
route1_bus3Location: any
route1_bus4Location: any
route2_bus1Location: any
route2_bus2Location: any
route2_bus3Location: any
route2_bus4Location: any
route1_bus1Name: any
route1_bus2Name: any
route1_bus3Name: any
route1_bus4Name: any
route2_bus1Name: any
route2_bus2Name: any
route2_bus3Name: any
route2_bus4Name: any
stopLayer: any
eta:any
modalData: any;
zIndex: any;
myBusETA: any

mapBusMarkers: any;

trackingData: any
previousLayer: any
routeStatus: any
driverTracking: any
               
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public pubnub: PubNubAngular, public MapData: MapDataProvider, public arrivalGuides: ArrivalGuidesProvider, private cache: CacheService, public mapbox: MapBoxProvider,
    public modalCtrl: ModalController, private storage: Storage ){
    
    this.city = navParams.get("city");
    console.log("City ID is " + this.city)

     

     this.company = 'SoaringKiwi'

     this.channel = "yourBusApp_" + this.company + "_" + this.city
     console.log(this.channel)

this.trackingData =[]
   
       this.mapBusMarkers = L.layerGroup([]);




  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  var dd = this.storage.get('driverTracking').then((val) =>{
         console.log(val)
         this.driverTracking = val
       })
    //set map center for each city
    //If Auckland

    if (this.city === 1){
    this.center = [-36.8465457,174.7482552]; //
    } else if (this.city === 2){
         this.center = [-43.5321,172.6362];
    }
    //setup leaflet map when page is loaded

    this.initMap();
    // this.guidePOI();

        this.pubnub.init({
                    publishKey: 'pub-c-4a0bf960-05b6-4661-ad88-1d42361f89e4',
                    subscribeKey: 'sub-c-d47d3d7c-1cd9-11e8-a7d0-2e884fd949d2'
                    });


       //    var amap = eon.map({
       //         pubnub : this.pubnub,
       //         id: 'map',
       //          mbID: 'mapbox.streets',
       //         mbToken: 'pk.eyJ1Ijoic2FmZXRyYXZlbHMiLCJhIjoiaEpwOFNFayJ9.NgM-Grtel0qZnq3_A0vhzg',

       // })

        this.eta =[]
  }



  /*
    FUNCTION - INITMAP

    DESCRIPTION:
      Function is called when the page loads to set-up the map by:
        - Create map
        - Load the Stop Data for the city
*/
  initMap() {

    //Create the map 
    this.map = L.map('map', {
      center: this.center,
      zoom: 12,


    });

       var redRouteStyle = {
          iconUrl: '//cdn.shopify.com/s/files/1/2314/0377/t/3/assets/Red-Blue-Number-icon-1.png?14059996050108928727',
          iconSize:     [32, 32], // size of the icon
      };




       // This calls the getStopData.  It needs to be updated to pass the CityID, which will the service will then use to get the correct file.
      this.MapData.getStopData(this.city).subscribe((res) => {
                // console.log("what is in the data ", res);
                this.markers = res;
                // console.log(this.markers)
                   function oneachFeature( feature, layer){
                      // layer.bindPopup(feature.properties.description +  "<div>{{this.eta}}</div>");
                      layer.on('click', (e)=> {this.getETA(e)});
                      
                     }


                           this.stopLayer = L.geoJSON(this.markers, {
                           pointToLayer: function(feature, latlng) {
                             if(feature.geometry.type === "Point"){

                             if(feature.properties.route === "red"){
                             var smallIcon = new L.Icon({
                                 iconSize: [27, 27],
                                 iconAnchor: [13, 27],
                                 popupAnchor:  [1, -24],
                                 iconUrl: 'assets/images/redx2.png'
                             });
                             return L.marker(latlng, {icon: smallIcon});
                           } else if (feature.properties.route === "blue" ){
                              var smallIcon = new L.Icon({
                                 iconSize: [27, 27],
                                 iconAnchor: [13, 27],
                                 popupAnchor:  [1, -24],
                                 iconUrl: 'assets/images/bluex2.png'
                             });
                             
                            return L.marker(latlng, {icon: smallIcon, title: feature.properties.stop_id});
                        }}},
                           onEachFeature: oneachFeature.bind(this)

                       })

                        // myLayer.addData(polygon);
                        this.stopLayer.addTo(this.map);
              });

   
      // Load Red Route from JSON Data and add it to the map
      this.MapData.getRouteData(this.city).subscribe((res) => {
                // console.log("what is in the data ", res);
                this.route = res;
                  
                console.log(this.route)


                        L.geoJSON(this.route, {
                          style: function(feature) {
                             if(feature.properties.route === "red"){
                          return {

                             color: '#ed2f4b',
                            weight: 5,
                            opacity: 0.7,
                            smoothFactor: 1
                          };
                        } else if (feature.properties.route === "blue"){
                        return {
                           color: '#4dc3c9',
                            weight: 5,
                            opacity: 0.7,
                            smoothFactor: 1
                        }
                      }
                      }
                      }).addTo(this.map);
                        // this.getETA();
                      // console.log(this.map)

                      var markerGroupBus1
                     var markerGroupBus2
         
        // 

              // console.log(this.channel)

     

               this.pubnub.addListener({
                     message: msg => {
                     // console.log("hello");
                     this.plotBus(msg)
                   }
                  
                   })

                     this.pubnub.subscribe({
                        channels: [this.channel],
                        triggerEvents: ['message']

                    });
          
            
});


  
    // Sets the Style Layer of the map, currently Mapbox Soaring Kiwi.  Will need to change to ours
      L.tileLayer('https://api.mapbox.com/styles/v1/hasslefreetours/cjaj9k1d8alu92ro2y90qxchv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFzc2xlZnJlZXRvdXJzIiwiYSI6ImNqN3IyeHAyNTQ5angzMm5wbXFjd3drMTUifQ.gRlfVGUNacJNsyCwjnlozg', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);


   }

findFirstLargeNumber(element) {
  return element > 13;
}

   plotBus(msg){
       // console.log("plot bus called")
       // console.log(this.map)
   
            // // console.log()
            // if (this.previousLayer != undefined){
            //   this.mapBusMarkers.clearLayers()
            // }
                      
            //           var mapBusMarkers = L.layerGroup();
            //             // mapBusMarkers.clearLayers()
            //                   if (msg.message[0]){
            //                     // this.plotBus(msg.message[0])
            //                     var busData = msg.message[0]
            //                     // console.log(busData)
            //                     // console.log(this.channel)
            //                          var latlng = busData.latlng
            //                        // console.log(latlng)
            //                        var lat = latlng[1]
            //                        var lng = latlng[0]
            //                        var busID = busData.BusID
            //                        var busRoute = busData.RouteID
            //                        var busName = busData.BusName
            //                        // console.log(lat)

            //                                // var bus
            //                       var oldLat = 0
            //                       var oldLng = 0

            //                       var myBus = false
            //                    // var bus

            //                        this.currentLng = lng
            //                        this.currentLat = lat
            //                        // Define the Bus Icon
            //                       var  busIcon = L.icon({
            //                           iconUrl: './assets/images/bus.png',
            //                           iconSize:     [32, 32], // size of the icon
            //                       });
            //                       var trackingData = this.trackingData
            //                       const checkBuses = new Promise((resolve, reject) => {
                                    
            //                         var obj = trackingData.find(function (obj) { return obj.routeID === busRoute; });
            //                           // console.log(obj)
            //                         if (obj === undefined){
            //                           var routeID = {"routeID": busRoute, "buses" :[]}
            //                           console.log("creating route")
            //                           trackingData.push(routeID)
            //                         } else {
            //                           console.log("Route Exists")
            //                         }
            //                         // console.log(trackingData)

            //                       })
            //                       .then(( 
            //                         // for each route in the TrackingData
            //                         trackingData.forEach(function(route)  {
            //                           // console.log(route);
            //                           // console.log(route.routeID)
            //                           // console.log(trackingData)
            //                            // see if the bus already exists
            //                            // console.log(busID)

            //                            //if there is no route on a bus, we push the bus straight away.
            //                            if (!route.buses || route.buses == undefined || route.buses.length === 0){
            //                              console.log("no bus on this route")
                                         
            //                              // route.buses = new Array()
            //                              // we now push the bus to the route (for the first bus)
            //                                // var buses = new Array()
            //                                // route.push= buses
            //                                var bus = {"busID": busID, 
            //                                           "BusName" : busName,
            //                                           "currentLng": lng,
            //                                           "currentLat": lat
            //                                         }
            //                                 // buses.push(bus)   
            //                                 // console.log(buses)   

            //                                 // console.log(trackingData[route].buses) 
            //                                 // console.log(route.buses)
            //                                route.buses.push(bus)
            //                                console.log( trackingData)
            //                            } else {
            //                              // if a bus exists on the route alrady, we need to check if the bus already exists.
            //                              console.log("a bus already exists on this route, checking if this bus matches")
            //                              var bus_obj = route.buses.find(function (bus_obj) { return bus_obj.busID === busID; });
            //                              // console.log(bus_obj)
            //                              //if bus_obj is undefined it means the bus doesnt exist on that route so we need to create it.
            //                               if (bus_obj === undefined){
            //                                   // console.log("The current bus doesn't exist on this route, so we are adding it to the route")

            //                                   // var buses = new Array()
            //                                   var bus = {"busID": busID, 
            //                                           "BusName" : busName,
            //                                           "currentLng": lng,
            //                                           "currentLat": lat
            //                                         }
            //                                 // buses.push(bus)   
            //                                 // console.log(buses)   

            //                                 // console.log(trackingData[route].buses) 
            //                                 // console.log(route.buses)
            //                                route.buses.push(bus)
                                          
            //                               } else{
            //                                 // if the bus does exist on the route we want to update its ;long / lat position with the new data sent in the message
            //                                console.log("The bus already exists, so we are updating its position to display on the map")
            //                                // console.log(bus_obj)
            //                                bus_obj.currentLng = lng
            //                                bus_obj.currentLat = lat
            //                               }
            //                            }
            //                             console.log( trackingData)

            //                               //  Now we loop through the route and buses and plot the long lat
                                          

            //                         }), trackingData));
                                      
            //                         //for each route  
                                   
            //                         trackingData.forEach(function(route)  {
            //                             //for each bus on route
            //                             console.log(route)
            //                             route.buses.forEach(function(bus){
            //                               console.log("plotting bus")
            //                               console.log(bus)


            //                               var theBus =  L.marker([lat,lng], {icon: busIcon} )
            //                               theBus.addTo(mapBusMarkers);
            //                               // mapBusMarkers.addLayer()
            //                             })

            //                         })
                                    
             var busData = msg.message[0]
            //                     // console.log(busData)
            //                     // console.log(this.channel)
                                     var latlng = busData.latlng
                                   var lat = latlng[1]
                                   var lng = latlng[0]
                                   var busID = busData.BusID
                                   var busRoute = busData.RouteID
                                   var busName = busData.BusName
                                    
                                  var  busIcon = L.icon({
                                      iconUrl: './assets/images/bus.png',
                                      iconSize:     [32, 32], // size of the icon
                                    })
                                   // this.markerGroupBus1 = L.layerGroup().addTo(this.map);
                                   //      var bus = L.circle([lat,lng], {color: 'red', fillColor: '#f03',fillOpacity: 0.5,radius: 100} ).addTo(this.markerGroupBus1);
                                   //      var thisbusIcon =  L.marker([lat,lng], {icon: busIcon} ).addTo(this.markerGroupBus1);

                                   // Plot buses on route one (they are the same apart from outer color on markter)
                                  if (busRoute === 1){
                                         if (busID === 1) {
                                            // console.log(this.map.hasLayer(markerGroupBus1))
                                       if (this.map.hasLayer(this.route1_markerGroupBus1) == true){
                                         this.map.removeLayer(this.route1_markerGroupBus1)
                                       }
                                         this.route1_bus1Location = [lat,lng]
                                         this.route1_bus1Name = busData.BusName
                                         console.log(busData.BusName)
                                         this.route1_markerGroupBus1 = L.layerGroup().addTo(this.map);
                                        var bus = L.circle([lat,lng], {color: 'red', fillColor: '#f03',fillOpacity: 0.5,radius: 100} ).addTo(this.route1_markerGroupBus1);
                                        var thisbusIcon =  L.marker([lat,lng], {icon: busIcon} ).addTo(this.route1_markerGroupBus1);
                                        // console.log(this.map.hasLayer(markerGroupBus1))
                                      } else if (busID === 3){
                                          // console.log(this.map.hasLayer(markerGroupBus2))
                                       if (this.map.hasLayer(this.route1_markerGroupBus3) == true){
                                         this.map.removeLayer(this.route1_markerGroupBus3)
                                       }
                                       this.route1_bus3Location = [lat,lng]
                                       this.route1_bus3Name = busData.BusName
                                        this.route1_markerGroupBus3 = L.layerGroup().addTo(this.map);
                                        var bus3 = L.circle([lat,lng], {color: 'orange', fillColor: '#f47f25',fillOpacity: 0.5,radius: 120} ).addTo(this.route1_markerGroupBus3);
                                        var thisbusIcon3 =  L.marker([lat,lng], {icon: busIcon} ).addTo(this.route1_markerGroupBus3);
                                      }else if (busID === 4){
                                          // console.log(this.map.hasLayer(markerGroupBus2))
                                       if (this.map.hasLayer(this.route1_markerGroupBus4) == true){
                                         this.map.removeLayer(this.route1_markerGroupBus4)
                                       }
                                       this.route1_bus4Location = [lat,lng]
                                       this.route1_bus4Name = busData.BusName
                                        this.route1_markerGroupBus4 = L.layerGroup().addTo(this.map);
                                        var bus4 = L.circle([lat,lng], {color: 'orange', fillColor: '#f47f25',fillOpacity: 0.5,radius: 120} ).addTo(this.route1_markerGroupBus4);
                                        var thisbusIcon4 =  L.marker([lat,lng], {icon: busIcon} ).addTo(this.route1_markerGroupBus4);
                                      }
                                      else if (busID === 2){
                                          // console.log(this.map.hasLayer(markerGroupBus2))
                                       if (this.map.hasLayer(this.route1_markerGroupBus2) == true){
                                         this.map.removeLayer(this.route1_markerGroupBus2)
                                       }
                                       this.route1_bus2Location = [lat,lng]
                                       this.route1_bus2Name = busData.BusName
                                        this.route1_markerGroupBus2 = L.layerGroup().addTo(this.map);
                                        var bus2 = L.circle([lat,lng], {color: 'orange', fillColor: '#f47f25',fillOpacity: 0.5,radius: 120} ).addTo(this.route1_markerGroupBus2);
                                        var thisbusIcon2 =  L.marker([lat,lng], {icon: busIcon} ).addTo(this.route1_markerGroupBus2);
                                      }
                                      
                                      
                                    } else  if (busRoute === 2){
                                         if (busID === 1) {
                                            // console.log(this.map.hasLayer(markerGroupBus1))
                                       if (this.map.hasLayer(this.route2_markerGroupBus1) == true){
                                         this.map.removeLayer(this.route2_markerGroupBus1)
                                       }
                                        this.route2_bus1Location = [lat,lng]
                                        this.route2_bus1Name = busData.BusName

                                         this.route2_markerGroupBus1 = L.layerGroup().addTo(this.map);
                                        var bus = L.circle([lat,lng], {color: 'red', fillColor: '#f03',fillOpacity: 0.5,radius: 100} ).addTo(this.route2_markerGroupBus1);
                                        var thisbusIcon =  L.marker([lat,lng], {icon: busIcon} ).addTo(this.route2_markerGroupBus1);
                                        // console.log(this.map.hasLayer(markerGroupBus1))
                                      } else if (busID === 2){
                                          // console.log(this.map.hasLayer(markerGroupBus2))
                                       if (this.map.hasLayer(this.route2_markerGroupBus2) == true){
                                         this.map.removeLayer(this.route2_markerGroupBus2)
                                       }
                                       this.route2_bus2Location = [lat,lng]
                                       this.route2_bus2Name = busData.BusName
                                        this.route2_markerGroupBus2 = L.layerGroup().addTo(this.map);
                                        var bus2 = L.circle([lat,lng], {color: 'orange', fillColor: '#f47f25',fillOpacity: 0.5,radius: 120} ).addTo(this.route2_markerGroupBus2);
                                        var thisbusIcon2 =  L.marker([lat,lng], {icon: busIcon} ).addTo(this.route2_markerGroupBus2);
                                      }
                                      


                                   // } else {
                                   //      // Remove bus markers when bus offline
                                   //      // if (busID === 1) {
                                   //      //     this.map.removeLayer(this.markerGroupBus1)
                                   //      // } else if (busID === 2){
                                   //      //   this.map.removeLayer(this.markerGroupBus2)
                                   //      // }

                                   //  }  
        }
        // this.mapBusMarkers.clearLayers()
//      this.mapBusMarkers = mapBusMarkers
//       this.mapBusMarkers.addTo(this.map)
// console.log(this.map.hasLayer(this.mapBusMarkers))
//        console.log(this.mapBusMarkers)
//        console.log(this.mapBusMarkers._leaflet_id)
//        this.previousLayer = this.mapBusMarkers._leaflet_id
//        console.log(this.map)

}

   ionViewCanLeave(){
  document.getElementById("map").outerHTML = "";
}

   // findClosestRoutePoint (){
       
   //     // array of the route points from GeoJson
   //     var line = a.turf.lineString(this.blueRoute)


   //     // This will be the long / lat of the marker the user click ons
   //     var pt = _.turf.point([-36.88218, 174.73223])

   //     var snapped = _.turf.nearestPointOnLine(line,pt)

   //     console.log(snapped)
   // }


                
   getETA(stop){
     console.log(stop)
      console.log(this.map)
      console.log(this.stopLayer)
      let observables = new Array()
      // this.openModal() 
      // target.getPopup();
      this.eta =[]
      this.myBusETA=[]
     var etaBus = []
     // STEP 1 = Find what Route the Stop is on abd Convert bus route into Turf Line String
     var etaRouteID = stop.target.feature.properties.routeID
     console.log(etaRouteID)
     // for each
     for (var y =0; y < this.route.features.length; y++){
       if (this.route.features[y].properties.routeID === etaRouteID){
         var etaRoute =  turf.lineString(this.route.features[y].geometry.coordinates);
         
       }

     }


              this.modalData = {
                "stop_number": stop.target.feature.properties.stop_id,
                "stop_name": stop.target.feature.properties.markerName,
                "description": stop.target.feature.properties.description
    }

     // STEP 2 -  "Snap" the bus stop to the route path. Why?  The bus stop long/lat might noit match the route path even though close
       var busStopLocation = turf.point([stop.latlng.lng,stop.latlng.lat])
        var  etaStop= turf.pointOnLine(etaRoute, busStopLocation);
       console.log(etaStop)
       var etaStopIndex = etaStop.properties.index
       console.log(etaStopIndex)

     //Step 3 = Get Current Location of all buses on the route

     console.log(etaBus)
     /// Add some logig if bus location is undefined (will break otherwise)
     if (etaRouteID === 1){
       console.log(this.route1_bus1Name)
       console.log(this.route1_bus2Name)

       if (this.route1_bus1Location != undefined){
       etaBus.push([this.route1_bus1Location, this.route1_bus1Name])
       }
       if (this.route1_bus2Location != undefined){
       etaBus.push([this.route1_bus2Location, this.route1_bus2Name])
       }
       if (this.route1_bus3Location != undefined){
       etaBus.push([this.route1_bus3Location, this.route1_bus3Name])
     }
     if (this.route1_bus4Location != undefined){
       etaBus.push([this.route1_bus4Location, this.route1_bus4Name])
     }
     } else if (etaRouteID ===2){
        if (this.route2_bus1Location != undefined){
       etaBus.push([this.route2_bus1Location,this.route2_bus1Name])
     }
        if (this.route2_bus2Location != undefined){
       etaBus.push([this.route2_bus2Location, this.route2_bus2Name])
       }
       if (this.route1_bus3Location != undefined){
       etaBus.push([this.route2_bus3Location, this.route2_bus3Name])
     }
     if (this.route2_bus4Location != undefined){
       etaBus.push([this.route2_bus4Location, this.route2_bus4Name])
     }
   }
     console.log(etaBus)
     
     this.modalData.routeStatus = "There are currently no buses on this route."

       //Step 4 = For each bus on the route - Loop through
     if (etaBus || etaBus.length > 0 || etaBus != undefined){
           
       for (var z = 0; z < etaBus.length; z++){
       
            var bus = [] 
            this.zIndex = z
            // bus is rearranged format of etaBUs   
           bus.push(etaBus[z][0][1], etaBus[z][0][0])
           console.log(bus)

         // 1. Find the closest point on the route where the bus is.
          var busOnRoute= turf.pointOnLine( etaRoute, bus);
          console.log(busOnRoute)
          // find the index (position) the bus is on in the Route path array
          busOnRoute =  busOnRoute.properties.index

          //Check if bus is ahead of stop on route. If so, to calculate the ETA we need to complete the loop, and then re-start the loop to the stop.

        console.log(etaBus[z])
        var busName =etaBus[z][1]
        console.log("Bus Name is: " + etaBus[z][1])
        console.log("Bus Index is: " + busOnRoute)
        console.log("Stop Index is: " + etaStopIndex)
         console.log(etaRoute)
        var etaRoutePath = etaRoute.geometry.coordinates
        var remainingPath = []
        this.myBusETA[z] =[]
        this.myBusETA[z].push(busName)
    //    // Check if bus is ahead or behind stop.  If it is behind spot, it is easy. We just find the points on the route between the bus and the stop.
       if (busOnRoute < etaStopIndex){
         console.log("bus is before stop")
         // we want to push all of the points on the route between the current bus and the bus stop
       for (var x =0; x < etaRoutePath.length; x++){
        if (x >= busOnRoute && x <= etaStopIndex){
          // remainingPath.push(route[x])
          remainingPath.push(etaRoutePath[x])
        // }
       }
       }
       // If the bus is ahead of the Bus Route, it is more challenging.
     } else {
       console.log("bus is after stop on route")
        for (var x = 0; x < etaRoutePath.length; x++){
            if ( x >= busOnRoute){
              remainingPath.push(etaRoutePath[x])
            }
         }
         for (var y = 0; x < etaRoutePath.length; y++){
            if ( y <= etaStopIndex){
              remainingPath.push(etaRoutePath[y])
            }

         }
     
     }
       // console.log(remainingPath)

       var bus2stop = remainingPath
            /******************************************************************************************************************************************************************
      
        STEP 3

        - Send path to Mapbox Matrix API and get remaining time.
        - We can only send a max of 25 points on the path to MapBox
        - Add some logic to check the length of the remainingPath
          - if the path < 25, we send all. If greater than 25 we divide and conquer

    ********************************************************************************************************/
      if (bus2stop.length >= 24){
         var maxPoints = Math.round(bus2stop.length / 20)
          console.log(maxPoints)

        
        // filters the array of route so we only send every 10th position on map.
       var bus2stop = bus2stop.filter(function(value, index, Arr) {
          return index % maxPoints == 0;
        });
         console.log(bus2stop)
      } else {
        
        console.log(bus2stop)
      }
      

      // NOW WE NEED TO TURN THE ARRAY OF POINTS BETWEEN THE BUS AND STOP INTO A STRING 
       var waypoints = ""
      for (var v=0; v < bus2stop.length; v++){
        waypoints = waypoints + bus2stop[v][0] + "," + bus2stop[v][1] + ";"
      }
      waypoints = waypoints.slice(0, -1); // "12345.0"

      console.log(waypoints)


         observables.push(this.mapbox.getETA(waypoints));
    } //end of for each bus
    console.log(this.myBusETA)
      // Now we need to display the pop-up data for the stop.
Observable.forkJoin(observables).subscribe((res) => {
      console.log(res)
      for (var z = 0; z < etaBus.length; z++){
       var count = 1
        var eta = res[z]
        console.log(eta)
        var myETA = eta['routes'];
        var seconds = myETA[0].duration
              
                console.log("ETA: " + Math.round((seconds/60)) +" minutes")
                var busETA = Math.round((seconds/60))
             
                this.myBusETA[z].push(busETA)

      }
  console.log(this.myBusETA)
  this.myBusETA.sort(function(a, b) {
  return a[1] - b[1];
});
    console.log(this.myBusETA)
  this.modalData.eta = this.myBusETA
  console.log(this.modalData)

  
    },
    error => console.log('Error: ', error)
);
}
this.openModal()
}


openModal() {
    console.log('openModal');

    let profileModal = this.modalCtrl.create( PopModalPage, { data: this.modalData });
    profileModal.onDidDismiss(data => {

      console.log(data);

    });
    profileModal.present();
  }



    //   // Now we have the closest point the bus is to a position on the map we need to send this to the Mapbox Matrix api to get an ETA.  However because 
    //   // Mapbox will optimise the route, it wont get the ETA for along the bus route.
    //   // To work around this, we need to send a number of waypoints to Mapbox as part of the request, however we do not need to send all of them as this is uncessessary.

    //    //1. Splice th array to remove all of the points on the route the bus has already passed



     /******************************************************************************************************************************************************************
      
        STEP 3

        - Send path to Mapbox Matrix API and get remaining time.
        - We can only send a max of 25 points on the path to MapBox
        - Add some logic to check the length of the remainingPath
          - if the path < 25, we send all. If greater than 25 we divide and conquer

    ************************************************************************************************************************************************************/  

      // var pathLength = remainingPath.length
      // console.log(pathLength)

      // if (pathLength >= 24){
      //    var maxPoints = Math.round(pathLength / 20)
      //     console.log(maxPoints)

      //            // filters the array of route so we only send every 10th position on map.
      //  var newArr = remainingPath.filter(function(value, index, Arr) {
      //     return index % maxPoints == 0;
      //   });
      //    console.log(newArr)
      // } else {
      //   var newArr = remainingPath
      //   console.log(newArr)
      // }

      // var source = newArr[0]
      // var destination = newArr[newArr.length]
     
      // // format New arrivals
      // var waypoints = ""
      // for (var v=0; v < newArr.length; v++){
      //   waypoints = waypoints + newArr[v][0] + "," + newArr[v][1] + ";"
      // }
      // waypoints = waypoints.slice(0, -1); // "12345.0"

      // console.log(waypoints)
      //       this.mapbox.getETA(waypoints).subscribe((res) => {
      //           // console.log("what is in the data ", res);
      //           var eta = res;
      //           console.log(eta)
      //           var count = 1
      //           var myETA = eta.durations
      //           var seconds = 0
      //           // console.log(countDurations)
      //           // console.log(myETA)
      //           for ( var x = 0; x < (myETA.length -1); x ++){
      //             var duration = myETA[x][count]
      //             console.log(duration)
      //             seconds = seconds + duration
      //             console.log(seconds)
      //             count ++
      //           }
      //           console.log("ETA: " + Math.round((seconds/60)) +" minutes")
                    
      //         });
  
    

// guidePOI(){

//   // Get destination guide from city

//     var controlLayers = L.control.layers().addTo(this.map);
//     this.arrivalGuides.getDestinationGuide().subscribe((res) => {
//                 this.destination = res;
//                 // console.log(this.destination.destination)
//                 this.images = this.destination.destination.slideshow.image
//                 // console.log(this.destination.destination.slideshow)
//                 var categories = this.destination.destination.sections.section
//                 var features = []

//                   // For each Section (category)
//                   for (var x = 0; x < categories.length; x++){
//                     var category = categories[x]
//                     // console.log(category)
//                     var places = category.pointsofinterest.entry
//                       //for each category, loop through each point of interest
                        
//                         for (var y = 0; y < places.length; y++){
//                           var poi = places[y]

//                           //Now we want to get this detail and populate a geojson feature and inject it into a POI array
//                           var feature = {
//                                 "type": "Feature",
//                                 "properties": {
//                                   "style": {"iconUrl": "//cdn.shopify.com/s/files/1/2314/0377/t/3/assets/Red-Blue-Number-icon-1.png?14059996050108928727",
//                                     "iconSize":   [32, 32]
//                                           }, 
//                                   "marker-color": "#e2250f",
//                                   "marker-size": "medium",
//                                   "marker-symbol": "bus",
//                                   "markerName" : poi.title,
//                                   "description": "<b>" + poi.title + "</b><br>" + poi.description,
//                                   "image": poi.images.image[0],
//                                   "category": category.name
//                                 },
//                                 "geometry": {
//                                   "type": "Point",
//                                   "coordinates": [
//                                     poi.Location.lon,
//                                     poi.Location.lat
//                                   ]
//                                 }
                              
//                           }
//                           // console.log(feature)
//                           features.push(feature)
//                         }

//                                           JSON.stringify(features)
//                     // console.log(features)
//                   // Now we add the features to the 

//                   this.myFeatures ={ "features": features}
//                   // console.log(this.myFeatures)
//                   var layerName = "Chris"

//                   if (category.name === "Essential Information"){

//                     // var essentialLayer = L.geoJSON(this.myFeatures, {
//                     //        pointToLayer: function(feature, latlng) {
                            
//                     //          var smallIcon = new L.Icon({
//                     //              iconSize: [27, 27],
//                     //              iconAnchor: [13, 27],
//                     //              popupAnchor:  [1, -24],
//                     //              iconUrl: 'assets/images/other.png'
//                     //          });
//                     //          return L.marker(latlng, {icon: smallIcon});
//                     //     },
//                     //        onEachFeature: function (feature, layer) {
//                     //            if (feature.properties.image != ""){
//                     //              var image = feature.properties.image.content
//                     //              var displayImage = "<img src='"+image+"'</img></br></br>" + feature.properties.description;
//                     //            }
//                     //            // layer.bindPopup(feature.properties.description);
//                     //             layer.bindPopup(displayImage);

//                     //        }
//                     //    })

//                     //     // myLayer.addData(polygon);
//                     //     essentialLayer.addTo(this.map);
//                     //       controlLayers.addOverlay(essentialLayer, category.name);

//                   }  else if ((category.name === "Dining")){
//                         var diningLayer = L.geoJSON(this.myFeatures, {
//                            pointToLayer: function(feature, latlng) {
                             
//                              var smallIcon = new L.Icon({
//                                  iconSize: [27, 27],
//                                  iconAnchor: [13, 27],
//                                  popupAnchor:  [1, -24],
//                                  iconUrl: 'assets/images/food.png'
//                              });
//                              return L.marker(latlng, {icon: smallIcon});
//                         },
//                            onEachFeature: function (feature, layer) {
//                                if (feature.properties.image != ""){
//                                  var image = feature.properties.image.content
//                                  var displayImage = "<img src='"+image+"'</img></br></br>" + feature.properties.description;
//                                }
//                                // layer.bindPopup(feature.properties.description);
//                                 layer.bindPopup(displayImage);

//                            }
//                        })

//                         // myLayer.addData(polygon);
//                         diningLayer.addTo(this.map);
//                           controlLayers.addOverlay(diningLayer, category.name);

//                   } else if ((category.name === "Cafés")){
//                         var cafeLayer = L.geoJSON(this.myFeatures, {
//                            pointToLayer: function(feature, latlng) {
                             
//                              var smallIcon = new L.Icon({
//                                  iconSize: [27, 27],
//                                  iconAnchor: [13, 27],
//                                  popupAnchor:  [1, -24],
//                                  iconUrl: 'assets/images/coffee.png'
//                              });
//                              return L.marker(latlng, {icon: smallIcon});
//                         },
//                            onEachFeature: function (feature, layer) {
//                                if (feature.properties.image != ""){
//                                  var image = feature.properties.image.content
//                                  var displayImage = "<img src='"+image+"'</img></br></br>" + feature.properties.description;
//                                }
//                                // layer.bindPopup(feature.properties.description);
//                                 layer.bindPopup(displayImage);

//                            }
//                        })

//                         // myLayer.addData(polygon);
//                         cafeLayer.addTo(this.map);
//                           controlLayers.addOverlay(cafeLayer, category.name);

//                   } else if ((category.name === "Bars & Nightlife")){
//                         var barsLayer = L.geoJSON(this.myFeatures, {
//                            pointToLayer: function(feature, latlng) {
                             
//                              var smallIcon = new L.Icon({
//                                  iconSize: [27, 27],
//                                  iconAnchor: [13, 27],
//                                  popupAnchor:  [1, -24],
//                                  iconUrl: 'assets/images/cocktail.png'
//                              });
//                              return L.marker(latlng, {icon: smallIcon});
//                         },
//                            onEachFeature: function (feature, layer) {
//                                if (feature.properties.image != ""){
//                                  var image = feature.properties.image.content
//                                  var displayImage = "<img src='"+image+"'</img></br></br>" + feature.properties.description;
//                                }
//                                // layer.bindPopup(feature.properties.description);
//                                 layer.bindPopup(displayImage);

//                            }
//                        })

//                         // myLayer.addData(polygon);
//                         barsLayer.addTo(this.map);
//                           controlLayers.addOverlay(barsLayer, category.name);

//                   } else if ((category.name === "Do & See")){
//                         var sightsLayer = L.geoJSON(this.myFeatures, {
//                            pointToLayer: function(feature, latlng) {
                             
//                              var smallIcon = new L.Icon({
//                                  iconSize: [27, 27],
//                                  iconAnchor: [13, 27],
//                                  popupAnchor:  [1, -24],
//                                  iconUrl: 'assets/images/sights.png'
//                              });
//                              return L.marker(latlng, {icon: smallIcon});
//                         },
//                            onEachFeature: function (feature, layer) {
//                                if (feature.properties.image != ""){
//                                  var image = feature.properties.image.content
//                                  var displayImage = "<img src='"+image+"'</img></br></br>" + feature.properties.description;
//                                }
//                                // layer.bindPopup(feature.properties.description);
//                                 layer.bindPopup(displayImage);

//                            }
//                        })

//                         // myLayer.addData(polygon);
//                         sightsLayer.addTo(this.map);
//                           controlLayers.addOverlay(sightsLayer, category.name);

//                   }

//                       }
//               });

//                   }

}
