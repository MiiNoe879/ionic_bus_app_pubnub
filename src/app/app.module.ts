import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { IonicApp, IonicModule, IonicErrorHandler, Nav } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import {PopModalPage} from '../pages/pop-modal/pop-modal';
import { PubNubAngular } from 'pubnub-angular2';
import { MapDataProvider } from '../providers/map-data/map-data';
import { MapBoxProvider } from '../providers/map-box/map-box';
import { ArrivalGuidesProvider } from '../providers/arrival-guides/arrival-guides';
import { ListPage } from '../pages/list/list';
import { CacheModule } from "ionic-cache";
import {DriverPage} from '../pages/driver/driver';
import { SimulationProvider } from '../providers/simulation/simulation';
import { LiveTrackingProvider } from '../providers/live-tracking/live-tracking';
import { SpliceRouteProvider } from '../providers/splice-route/splice-route';
import { CalculateEtaProvider } from '../providers/calculate-eta/calculate-eta';
import { Geolocation } from '@ionic-native/geolocation';
import { OneSignal } from '@ionic-native/onesignal';
import { Geofence } from '@ionic-native/geofence';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListPage,
    MapPage,
    DriverPage,
    PopModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
IonicStorageModule.forRoot(),
    CacheModule.forRoot(),



    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MapPage,
    DriverPage,
    PopModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PubNubAngular,
    Nav,
    Geolocation,
    OneSignal,
    Geofence,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MapDataProvider,
    MapBoxProvider,
    ArrivalGuidesProvider,
    SimulationProvider,
    LiveTrackingProvider,
    SpliceRouteProvider,
    CalculateEtaProvider
  ]
})
export class AppModule {}
