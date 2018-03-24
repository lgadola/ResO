import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Client } from '../../providers/api.service';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-subscriptions',
  templateUrl: 'subscriptions.html',
})
export class SubscriptionsPage {
  dataSource: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, api: Client) {
    this.dataSource.store = new CustomStore({
      load: function () {

          return api.subscriptionInstances_Query(null,null,null,null,null,null).toPromise()
             .then(response => {
               return response;
              })
              .catch(error => { throw 'Data Loading Error' });
      }
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionsPage');
  }

}
