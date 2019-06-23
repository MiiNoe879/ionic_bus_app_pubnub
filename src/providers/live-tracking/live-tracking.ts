import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PubNubAngular } from 'pubnub-angular2';
import { SimulationProvider } from '../../providers/simulation/simulation';
/*
  Generated class for the LiveTrackingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LiveTrackingProvider {

  constructor(public http: Http) {
    console.log('Hello LiveTrackingProvider Provider');
  }

}
