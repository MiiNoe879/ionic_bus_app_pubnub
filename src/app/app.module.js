var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicApp, IonicModule, IonicErrorHandler, Nav } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { PubNubAngular } from 'pubnub-angular2';
import { MapDataProvider } from '../providers/map-data/map-data';
import { MapBoxProvider } from '../providers/map-box/map-box';
import { ArrivalGuidesProvider } from '../providers/arrival-guides/arrival-guides';
import { ListPage } from '../pages/list/list';
import { CacheModule } from "ionic-cache";
import { DriverPage } from '../pages/driver/driver';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                AboutPage,
                ContactPage,
                HomePage,
                TabsPage,
                ListPage,
                MapPage,
                DriverPage
            ],
            imports: [
                BrowserModule,
                HttpModule,
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
                DriverPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                PubNubAngular,
                Nav,
                // EonMap,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                MapDataProvider,
                MapBoxProvider,
                ArrivalGuidesProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map