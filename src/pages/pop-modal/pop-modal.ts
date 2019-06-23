import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-modal',
  templateUrl: 'pop-modal.html',
})
export class PopModalPage {

  data: any = {};
  sub_value: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.data = this.navParams.get("data");
    console.log(this.data);
    this.sub_value = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopModalPage');
  }

  dismiss() {
    console.log('dismiss')
    this.viewCtrl.dismiss();
  }

  subcribe() {
    this.viewCtrl.dismiss( 'alert');
  }

}
