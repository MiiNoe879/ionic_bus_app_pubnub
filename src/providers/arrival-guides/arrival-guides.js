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
import { CacheService } from "ionic-cache";
/*
  Generated class for the ArrivalGuidesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var ArrivalGuidesProvider = /** @class */ (function () {
    function ArrivalGuidesProvider(http, cache) {
        this.http = http;
        this.cache = cache;
        console.log('Hello ArrivalGuidesProvider Provider');
    }
    ArrivalGuidesProvider.prototype.getDestinationGuide = function () {
        var iso = "Auckland";
        var url = "https://api.arrivalguides.com/api/json/Travelguide?auth=Safetravels&lang=en&iso=" + iso + "&v=8";
        var cacheKey = url;
        var request = this.http.get(url).map(function (res) { return res.json(); });
        return this.cache.loadFromObservable(cacheKey, request);
    };
    ArrivalGuidesProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, CacheService])
    ], ArrivalGuidesProvider);
    return ArrivalGuidesProvider;
}());
export { ArrivalGuidesProvider };
//# sourceMappingURL=arrival-guides.js.map