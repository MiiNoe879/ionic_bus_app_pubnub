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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapDataProvider } from '../../providers/map-data/map-data';
/**
 * Generated class for the DriverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DriverPage = /** @class */ (function () {
    function DriverPage(navCtrl, navParams, MapData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.MapData = MapData;
    }
    DriverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DriverPage');
        // HERE WE DEFINE THE OPTIONS FOR THE DIFFERENT TRACKING VARIABLES - IMPORTANT FOR EACH COMPANY
        this.cities = [
            {
                "id": 1,
                "name": "Auckland",
                "routes": {}
            },
            {
                "id": 2,
                "name": "Christchurch"
            }
        ];
        this.routes = [
            {
                "id": 1,
                "name": "Red Route"
            },
            {
                "id": 2,
                "name": "Blue Route"
            }
        ];
        this.buses = [
            {
                "id": 1,
                "name": "Bus 1 - TWS873"
            },
            {
                "id": 2,
                "name": "Bus 2 - NHD547"
            }
        ];
    };
    DriverPage.prototype.enableTracking = function () {
        console.log(this.city);
        console.log(this.route);
        console.log(this.bus);
        // console.log(this.live)
    };
    /*
      FUNCTION - startSimulation
  
      DESCRIPTION:
        This is where we simulate live buses in the app.
        - We do this by using the data points, along the bus route that we define in the routedata files for a city (the same used to plot the route on the map)
        - We loop through these data points, and send a position at an interval time period.
        - To simulate multiple buses - we set the starting point in the object to a different location
        - For the purpose of a simulation, we will always simulate 2 buses on each route for a city.
  */
    DriverPage.prototype.startSimulation = function () {
        var _this = this;
        console.log("simulation starting");
        // Get the City and Route we are simulate
        this.MapData.getRouteData(this.city).subscribe(function (res) {
            //Returns the coordinates
            _this.routeData = res.features[0].geometry.coordinates;
            console.log(_this.routeData);
            // Now we assign Start Points on the Route for each bus we are simulating
            //For bus 1, it is just the start point on the route
            _this.simulationStartPoint_Bus1 = _this.routeData[0];
            console.log("Bus 1 Start point on Route");
            console.log(_this.simulationStartPoint_Bus1);
            //For Bus2, we will make it in the middle of the route
            _this.simulationStartPoint_Bus2 = _this.routeData[_this.routeData.length / 2];
            console.log("Bus 2 Start point on Route");
            console.log(_this.simulationStartPoint_Bus2);
            // this.getETA();
        });
        // For each Route in the city - we call a service 
    };
    DriverPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-driver',
            templateUrl: 'driver.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, MapDataProvider])
    ], DriverPage);
    return DriverPage;
}());
export { DriverPage };
//# sourceMappingURL=driver.js.map