var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ArrivalGuidesProvider } from '../../providers/arrival-guides/arrival-guides';
import { MapPage } from '../../pages/map/map';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, arrivalGuides) {
        this.navCtrl = navCtrl;
        this.arrivalGuides = arrivalGuides;
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    // Function to open the map based on the city selected
    HomePage.prototype.openMap = function (city) {
        var city = city;
        console.log(city);
        this.navCtrl.push(MapPage, {
            city: city
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, ArrivalGuidesProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map