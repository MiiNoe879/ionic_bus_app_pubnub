var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PubNubAngular } from 'pubnub-angular2';
import { CacheService } from "ionic-cache";
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { DriverPage } from '../pages/driver/driver';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, pubnub, cache) {
        var _this = this;
        this.rootPage = HomePage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            _this.pages = [
                { title: 'Home', component: HomePage },
                { title: 'Map', component: MapPage },
                { title: 'Driver', component: DriverPage }
            ];
            cache.setDefaultTTL(6000 * 60); //set default cache TTL for 1 hour
            pubnub.init({
                publishKey: 'pub-c-07c14277-0f47-4a2b-adeb-80e255d0e8b9',
                subscribeKey: 'sub-c-32d5e1ee-4ad2-11e5-8287-0619f8945a4f'
            });
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, PubNubAngular, CacheService])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map