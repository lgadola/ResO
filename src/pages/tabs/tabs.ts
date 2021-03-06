import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

@IonicPage({
  segment: 'tabs'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  @ViewChild('tabs')
  public tabRef: Tabs;
  public homeRoot: any = 'HomePage';
  public tab2Root: any = 'Tab2Page';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.tabRef.select(this.navParams.data.tabIndex || 0);
  }

}
