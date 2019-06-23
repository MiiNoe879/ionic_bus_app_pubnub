import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ArrivalGuidesProvider } from '../../providers/arrival-guides/arrival-guides';
import { MapPage } from '../../pages/map/map';
import { CacheService } from "ionic-cache";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
destination: any
images: any
driverTracking: any

  constructor(public navCtrl: NavController, public arrivalGuides: ArrivalGuidesProvider, public cache: CacheService, private storage: Storage) {

  }
  ionViewDidLoad() {

}
 ionViewDidEnter(){
        // this.driverTracking = "balloon"
        var key = 'driverTracking'
   // var res =  this.cache.getOrSetItem(key, this.driverTracking)
   // localStorage.setItem      ('driverTracking', this.driverTracking);
   // var abc = localStorage.getItem ('driverTracking')
   // console.log(abc)
   // console.log(this.cache.getItem("driverTracking"))

     // this.storage.set('driverTracking', true);
     var dd = this.storage.get(key).then((val) =>{
         console.log(val)
         this.driverTracking = val
       })
    
 }
 
// Function to open the map based on the city selected
 openMap(city){
   var city = city

   console.log(city)
   this.navCtrl.push(MapPage, {
      city: city

    })
 }

}
