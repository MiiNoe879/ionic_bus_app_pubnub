var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the MapDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var MapDataProvider = /** @class */ (function () {
    function MapDataProvider(http) {
        this.http = http;
        console.log('Hello MapDataProvider Provider');
    }
    MapDataProvider.prototype.getStopData = function (city) {
        var city = city;
        console.log(city);
        if (city === 1) {
            return this.http.get("./assets/map-data/mapdata-auckland.json").map(function (res) {
                return res.json();
            });
        }
        else {
            return this.http.get("./assets/map-data/mapdata-christchurch.json").map(function (res) {
                return res.json();
            });
        }
    };
    MapDataProvider.prototype.getRouteData = function (city) {
        var city = city;
        if (city === 1) {
            return this.http.get("./assets/map-data/routedata-auckland.json").map(function (res) {
                return res.json();
            });
        }
        else if (city === 2) {
            return this.http.get("./assets/map-data/routedata-christchurch.json").map(function (res) {
                return res.json();
            });
        }
    };
    MapDataProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], MapDataProvider);
    return MapDataProvider;
}());
export { MapDataProvider };
//# sourceMappingURL=map-data.js.map