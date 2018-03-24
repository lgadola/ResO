import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscriptionsPage } from './subscriptions';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    SubscriptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscriptionsPage),
    DxDataGridModule
  ],
})
export class SubscriptionsPageModule {}
