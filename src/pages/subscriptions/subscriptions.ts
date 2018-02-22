import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the SubscriptionsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscriptions',
  templateUrl: 'subscriptions.html'
})
export class SubscriptionsPage {

  postingsRoot = 'PostingsPage'
  reservationsRoot = 'ReservationsPage'
  actionsRoot = 'ActionsPage'


  constructor(public navCtrl: NavController) {}

}
