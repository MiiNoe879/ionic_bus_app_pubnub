import { Component, ViewChild } from '@angular/core';
import { App, Platform, Nav,  AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PubNubAngular } from 'pubnub-angular2';
import { CacheService } from "ionic-cache";

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { DriverPage } from '../pages/driver/driver';
import { OneSignal } from '@ionic-native/onesignal';
import { Geofence } from '@ionic-native/geofence';
import { Geolocation} from '@ionic-native/geolocation';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>
  

geofences: any

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, pubnub: PubNubAngular, cache: CacheService, private oneSignal: OneSignal, private geofence: Geofence, private geolocation: Geolocation, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

this.geofences = [
  { id: "1", latitude: -27.4542762, longitude: 153.0300965, radius: 1, transitionType: 1, notification: { text: "Gliwice Train Station"} },
  { id: "2", latitude: 50.4728049, longitude: 19.0736874, radius: 3000, transitionType: 1, notification: { text: "Pyrzowice Airport"} },
  { id: "3", latitude: 50.0671974, longitude: 19.945232, radius: 3000, transitionType: 1, notification: { text: "Cracow Main Station"} },
  { id: "4", latitude: 52.2287803, longitude: 21.001124, radius: 3000, transitionType: 1, notification: { text: "Warsaw Main Station"} },
  { id: "5", latitude: 40.7257093, longitude: -74.0032786, radius: 4000, transitionType: 3, notification: { text: "New York - SOHO"} },
  { id: "6", latitude: 34.0033907, longitude: -118.5069657, radius: 3000, transitionType: 2, notification: { text: "LA - Santa Monica State Beach"} },
  { id: "7", latitude: 25.8938595, longitude: -80.1330216, radius: 500, transitionType: 1, notification: { text: "Dexter's Apartment - Miami Bay Harbour" } },
]

    this.pages = [
      { title: 'Home', component: HomePage },
      // { title: 'Map', component: MapPage},
      { title: 'Driver', component: DriverPage} 

    ];

    cache.setDefaultTTL(6000 * 60); //set default cache TTL for 1 hour

      pubnub.init({
        publishKey: 'pub-c-07c14277-0f47-4a2b-adeb-80e255d0e8b9',
        subscribeKey: 'sub-c-32d5e1ee-4ad2-11e5-8287-0619f8945a4f'
        });

      this.oneSignal.startInit('82da13fe-d66f-491a-a6f3-56b0f58c9f7e', '403666582921');


       /* Ensure the platform is ready */


    /* Perform initial geolocation */
    this.geolocation.getCurrentPosition().then((position) => {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
    //            this.geofence.initialize().then(
    // // resolved promise does not return a value
    // () => {
    //   console.log('Geofence Plugin Ready')


    //   this.geofence.addOrUpdate(this.geofences)
    //   },
    // (err) => console.log(err)
  // )

    }).catch((err) => {
        console.log('Error getting location', err);
    });
 

// this.geofence.onTransitionReceived = function (geofences) {
//     geofences.forEach(function (geo) {
//         console.log('Geofence transition detected', geo);
//     });
// };
//     this.geofence.getWatched().then(function (geofencesJson) {
//     var geofences = JSON.parse(geofencesJson);
//     console.log(geofences)
// });

    // this.geofence.onTransitionReceived().subscribe( res =>{
    //       console.log("listening for geofence events")
    //       res.forEach(function(geo) {
    //         console.log("geofence crossed");
    //         alert(geo)
    //           let confirm = this.alertCtrl.create({
    //               title: 'Geofence Crossed',
    //               message: 'geo',
    //               buttons: [
    //                 {
    //                   text: 'Disagree',
    //                   handler: () => {
    //                     console.log('Disagree clicked');
    //                   }
    //                 },
    //                 {
    //                   text: 'Agree',
    //                   handler: () => {
    //                     console.log('Agree clicked');
    //                   }
    //                 }
    //               ]
    //             });
    //             confirm.present();
    //       });

    //     },
    //     (err) => console.log(err),
    //     ()    => console.log("done !")
    // );


    });


     // OneSignal Code start:
    // Enable to debug issues:
    // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    // window["plugins"].OneSignal
    //   .startInit("YOUR_APPID", 403666582921)
    //   .handleNotificationOpened(notificationOpenedCallback)
    //   .endInit()



  }
    openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  showConfirm(geo) {
  
  }
}


