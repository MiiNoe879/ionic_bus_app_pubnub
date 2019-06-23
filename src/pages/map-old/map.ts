// import { Component, ViewChild } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';
// import { PubNubAngular } from 'pubnub-angular2';
// import L from "leaflet";
// import { MapDataProvider } from '../../providers/map-data/map-data'
// import {Http, Response} from '@angular/http';
// import { ArrivalGuidesProvider } from '../../providers/arrival-guides/arrival-guides';
// import { CacheService } from "ionic-cache";
// import { MapBoxProvider } from '../../providers/map-box/map-box';
// import moment from 'moment';
// // import * as turf from 'turf'
// declare let turf;


// /*
//   Generated class for the Map page.

//   See http://ionicframework.com/docs/v2/components/#navigation for more info on
//   Ionic pages and navigation.
// */
// @Component({
//   selector: 'page-map',
//   templateUrl: 'map.html',
//   // template: '<div #map></div>'
// })
// export class MapPage {
//   // @ViewChild('map') this.map;
//   map: L.Map;
//   center: L.PointTuple;
// channel: any;
// redBus1Position: any
// redBus2Position: any
// live: number
// live2: number
// redRoute: any
// blueRoute:any
// markers:any
// destination: any
// images:any
// destinationPOI: any
// myFeatures: any
// myCategories: any
// coord: any
// currentBusLocation: any
// currentLng:any
// currentLat:any

//   constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public pubnub: PubNubAngular, public MapData: MapDataProvider, public arrivalGuides: ArrivalGuidesProvider, private cache: CacheService, public mapbox: MapBoxProvider ){
//       // this.position = 1     
//   }
  

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad MapPage');

//     //set map center
//     this.center = [-36.8465457,174.7482552]; //
    
//     //setup leaflet map when page is loaded

//     this.initMap();
//     this.guidePOI();
  
//   }

//   // ionViewWillLeave(){
//   //   document.getElementById("map").outerHTML = "";
//   // }

//   initMap() {

//     //Create the map 
//     this.map = L.map('map', {
//       center: this.center,
//       zoom: 12,


//     });

//        var redRouteStyle = {
//           iconUrl: '//cdn.shopify.com/s/files/1/2314/0377/t/3/assets/Red-Blue-Number-icon-1.png?14059996050108928727',
//           iconSize:     [32, 32], // size of the icon
//       };

//         // function findETA(){
//         //   console.log("finding Eta")
//         //   this.getETA()

//         // }



//                 //Load Red Route from JSON Data and add it to the map
//       this.MapData.getPoints().subscribe((res) => {
//                 // console.log("what is in the data ", res);
//                 this.markers = res;
//                 console.log(this.markers)
//                    function oneachFeature( feature, layer){
//                       layer.bindPopup(feature.properties.description);
//                       layer.on('click', (e)=> {this.getETA(e)});
                      
//                      }
//                            var myLayer = L.geoJSON(this.markers, {
//                            pointToLayer: function(feature, latlng) {
//                              if(feature.properties.route === "red"){
//                              var smallIcon = new L.Icon({
//                                  iconSize: [27, 27],
//                                  iconAnchor: [13, 27],
//                                  popupAnchor:  [1, -24],
//                                  iconUrl: 'assets/images/redx2.png'
//                              });
//                              return L.marker(latlng, {icon: smallIcon});
//                            } else if (feature.properties.route === "blue" ){
//                               var smallIcon = new L.Icon({
//                                  iconSize: [27, 27],
//                                  iconAnchor: [13, 27],
//                                  popupAnchor:  [1, -24],
//                                  iconUrl: 'assets/images/bluex2.png'
//                              });
                             
//                             return L.marker(latlng, {icon: smallIcon});
//                         }},
//                            onEachFeature: oneachFeature.bind(this)
//                        })

//                         // myLayer.addData(polygon);
//                         myLayer.addTo(this.map);
//               });

   
//       //Load Red Route from JSON Data and add it to the map
//       this.MapData.getRedRoute().subscribe((res) => {
//                 // console.log("what is in the data ", res);
//                 this.redRoute = res;
                  
//                 console.log(this.redRoute)

//                         L.geoJSON(this.redRoute, {
//                           style: function(feature) {
//                           return {
//                              color: '#ed2f4b',
//                             weight: 5,
//                             opacity: 0.7,
//                             smoothFactor: 1
//                           };
//                         }
//                       }).addTo(this.map);
//                         // this.getETA();
//               });

//       //Load Blue Route from JSON Data
//       this.MapData.getBlueRoute().subscribe((res) => {
//                 this.blueRoute = res;
//                 console.log(this.blueRoute)

//                         L.geoJSON(this.blueRoute, {
//                           style: function(feature) {
//                           return {
//                              color: '#4dc3c9',
//                               weight: 5,
//                               opacity: 0.7,
//                               smoothFactor: 1
//                           };
//                         }
//                       }).addTo(this.map);
//               });

//       //Loads Sample Data for RedBus1 on the 
//       this.MapData.getRedBus1().subscribe((res) => {
//           // console.log("what is in the data ", res);
//           this.redBus1Position = res;
//           // console.log(this.position)
//         });

//       //Loads Sample Data for RedBus1 on the 
//       this.MapData.getRedBus2().subscribe((res) => {
//           // console.log("what is in the data ", res);
//           this.redBus2Position = res;
//           // console.log(this.position)
//         });

//      this.pubnub.init({
//         publishKey: 'pub-c-07c14277-0f47-4a2b-adeb-80e255d0e8b9',
//         subscribeKey: 'sub-c-32d5e1ee-4ad2-11e5-8287-0619f8945a4f'
//         });
//       this.channel = 'redRoute';
//         this.live = 0
//         this.live2 = 0
        

//         //This function publishes the sample data (long/lat) to PubNUb to simulate a bus sending its coordinates every few seconds.  This will be replaces by a Admin mobile app.
//         setInterval(()=> {
//            this.live = this.live + 1
//            // console.log(this.live)
//            // console.log(this.position[this.live])
     
//             this.pubnub.publish({
//             channel: 'redRoute',
//             message:
//               [
//                     //this send a single long/lat in ascending order from the map
//                     this.redBus1Position[this.live]
//               ]

//             })
//           },4000)


//                 //This function publishes the sample data (long/lat) to PubNUb to simulate a bus sending its coordinates every few seconds.  This will be replaces by a Admin mobile app.
//         setInterval(()=> {
//            this.live2 = this.live2 + 1
//            // console.log(this.live2)
//            // console.log(this.position[this.live])
     
//             this.pubnub.publish({
//             channel: 'redRoute',
//             message:
//               [
                 
//                     this.redBus2Position[this.live2]

//               ]

//             })
//           },3000)

//         // This suscribes to the channel for the bus to get the live tracking data.
//        this.pubnub.subscribe({
//             channels: [this.channel],
//             triggerEvents: ['message']
//         });


//         // var bus
//         var oldLat = 0
//         var oldLng = 0

//         var myBus = false
//      // var bus
//          var markerGroupBus1
//          var markerGroupBus2
//         //This listens to the suscribed channel for new data that is published.  Each time it is published, it plots the bus marker on the map.
//        this.pubnub.getMessage(this.channel, (msg) => {

//           // console.log(msg);

//           //Wrapper to check if Bus "Online" and only plot data if it is sending data
//         if (msg.message[0]){



//          var latlng = msg.message[0].latlng
//          // console.log(latlng)
//          var lat = latlng[0]
//          var lng = latlng[1]
//          var busID = msg.message[0].busID
//          // console.log(lat)

//          this.currentLng = lng
//          this.currentLat = lat
          
          

            

           
//             // this.map.removeLayer(bus);si
//             var  bus1 = L.icon({
//                 iconUrl: './assets/images/bus.png',
//                 iconSize:     [32, 32], // size of the icon
//             });

              
               
//                // bus = L.marker([lat,lng], {icon: bus1} ).addTo(markerGroup);

//               if (busID === 1) {
//                   // console.log(this.map.hasLayer(markerGroupBus1))
//              if (this.map.hasLayer(markerGroupBus1) == true){
//                this.map.removeLayer(markerGroupBus1)
//              }
//                 markerGroupBus1 = L.layerGroup().addTo(this.map);
//               var bus = L.circle([lat,lng], {color: 'red', fillColor: '#f03',fillOpacity: 0.5,radius: 100} ).addTo(markerGroupBus1);
//               var busIcon =  L.marker([lat,lng], {icon: bus1} ).addTo(markerGroupBus1);
//               // console.log(this.map.hasLayer(markerGroupBus1))
//             } else if (busID === 2){
//                 // console.log(this.map.hasLayer(markerGroupBus2))
//              if (this.map.hasLayer(markerGroupBus2) == true){
//                this.map.removeLayer(markerGroupBus2)
//              }
//               markerGroupBus2 = L.layerGroup().addTo(this.map);
//               var bus2 = L.circle([lat,lng], {color: 'orange', fillColor: '#f47f25',fillOpacity: 0.5,radius: 120} ).addTo(markerGroupBus2);
//               var busIcon2 =  L.marker([lat,lng], {icon: bus1} ).addTo(markerGroupBus2);
//             }
            
//           } else {
//               // Remove bus markers when bus offline
//               if (busID === 1) {
//                   this.map.removeLayer(markerGroupBus1)
//               } else if (busID === 2){
//                 this.map.removeLayer(markerGroupBus2)
//               }

//           }  
            
//     });
  
//     // Sets the Style Layer of the map, currently Mapbox Soaring Kiwi.  Will need to change to ours
//       L.tileLayer('https://api.mapbox.com/styles/v1/hasslefreetours/cjaj9k1d8alu92ro2y90qxchv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFzc2xlZnJlZXRvdXJzIiwiYSI6ImNqN3IyeHAyNTQ5angzMm5wbXFjd3drMTUifQ.gRlfVGUNacJNsyCwjnlozg', {
//         maxZoom: 18,
//         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       }).addTo(this.map);








//    }



//    ionViewCanLeave(){
//   document.getElementById("map").outerHTML = "";
// }

//    // findClosestRoutePoint (){
       
//    //     // array of the route points from GeoJson
//    //     var line = a.turf.lineString(this.blueRoute)


//    //     // This will be the long / lat of the marker the user click ons
//    //     var pt = _.turf.point([-36.88218, 174.73223])

//    //     var snapped = _.turf.nearestPointOnLine(line,pt)

//    //     console.log(snapped)
//    // }

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
                
//    getETA(stop){
     
//          // Convert Bus Route to lineString
//      var line = turf.lineString(this.redRoute.coordinates);
//       var redPath = this.redRoute.coordinates
   

//      // Find and return the Current Bus Location to Closest Point on Route
//      var bus = []
//      bus.push(this.currentLng, this.currentLat) 
//      console.log(bus)
//      var busLocation = turf.point(bus)
//      console.log("Bus Location:" + busLocation)
//      console.log(busLocation)

//            var snapped = turf.pointOnLine( line, busLocation);
//       console.log(snapped)
//       console.log("index where bus currently is closest to on route:" + snapped.properties.index)
//       var currentBus = snapped.properties.index

//     //  // return index of closed route point from current bus location
 
//     //  //Gets the Lat/Long of the current stop

//      var busStop = stop
//     // console.log(busStop.latlng.lng, busStop.latlng.lat);
//      var busStopLocation =  turf.point([busStop.latlng.lng,busStop.latlng.lat])
//      // console.log("Bus Stop Location:" + busStop)
//      // Now snap bus stop to route (why? because the stop might not match exactly a point on a route)
//      var  snapStop = turf.pointOnLine(line, busStopLocation);
//      // console.log(snapStop)
     
//     //  snapStop = snapStop.properties.index
//      console.log("index where stop is:" + snapStop.properties.index)
//     var currentStop = snapStop.properties.index
  


//       // Now we have the closest point the bus is to a position on the map we need to send this to the Mapbox Matrix api to get an ETA.  However because 
//       // Mapbox will optimise the route, it wont get the ETA for along the bus route.
//       // To work around this, we need to send a number of waypoints to Mapbox as part of the request, however we do not need to send all of them as this is uncessessary.

//        //1. Splice th array to remove all of the points on the route the bus has already passed

//        var route = redPath
//        var closestPoint = snapped.properties.index


//        var remainingPath = []

//        // Check if bus is ahead or behind stop.  If it is behind spot, it is easy. We just find the points on the route between the bus and the stop.
//        if (currentBus < currentStop){
//        for (var x =0; x < route.length; x++){
//         if (x >= currentBus && x <= currentStop){
//           remainingPath.push(route[x])
//         }
//        }
//        // If the bus is ahead of the Bus Route, it is more challenging.
//      } else {
//         for (var x = 0; x < route.length; x++){
//             if ( x >= currentBus){
//               remainingPath.push(route[x])
//             }
//          }
//          for (var y = 0; x < route.length; y++){
//             if ( y <= currentStop){
//               remainingPath.push(route[y])
//             }

//          }
     
//      }
//        console.log(remainingPath)

//      /******************************************************************************************************************************************************************
      
//         STEP 3

//         - Send path to Mapbox Matrix API and get remaining time.
//         - We can only send a max of 25 points on the path to MapBox
//         - Add some logic to check the length of the remainingPath
//           - if the path < 25, we send all. If greater than 25 we divide and conquer

//     ************************************************************************************************************************************************************/  

//       var pathLength = remainingPath.length
//       console.log(pathLength)

//       if (pathLength >= 24){
//          var maxPoints = Math.round(pathLength / 20)
//           console.log(maxPoints)

//                  // filters the array of route so we only send every 10th position on map.
//        var newArr = remainingPath.filter(function(value, index, Arr) {
//           return index % maxPoints == 0;
//         });
//          console.log(newArr)
//       } else {
//         var newArr = remainingPath
//         console.log(newArr)
//       }

//       var source = newArr[0]
//       var destination = newArr[newArr.length]
     
//       // format New arrivals
//       var waypoints = ""
//       for (var v=0; v < newArr.length; v++){
//         waypoints = waypoints + newArr[v][0] + "," + newArr[v][1] + ";"
//       }
//       waypoints = waypoints.slice(0, -1); // "12345.0"

//       console.log(waypoints)
//             this.mapbox.getETA(waypoints).subscribe((res) => {
//                 // console.log("what is in the data ", res);
//                 var eta = res;
//                 console.log(eta)
//                 var count = 1
//                 var myETA = eta.durations
//                 var seconds = 0
//                 // console.log(countDurations)
//                 // console.log(myETA)
//                 for ( var x = 0; x < (myETA.length -1); x ++){
//                   var duration = myETA[x][count]
//                   console.log(duration)
//                   seconds = seconds + duration
//                   console.log(seconds)
//                   count ++
//                 }
//                 console.log("ETA: " + Math.round((seconds/60)) +" minutes")
                    
//               });
//    }
    



// }
