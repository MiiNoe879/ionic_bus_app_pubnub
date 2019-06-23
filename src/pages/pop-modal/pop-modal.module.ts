import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopModalPage } from './pop-modal';

@NgModule({
  declarations: [
    PopModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PopModalPage),
  ],
})
export class PopModalPageModule {}
