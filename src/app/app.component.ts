import { AuthService } from './../providers/auth-service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppEventsProvider } from '../services/app-events';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav)
  public nav: Nav;
  rootPage: any = 'MenuPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private auth: AuthService,
    private appEvents: AppEventsProvider) {
    this.initializeApp();
}

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  public ngOnInit(){
    this.appEvents.on('logout').subscribe(()=>{
      this.auth.logout();
      this.nav.setRoot('MenuPage');
    });
  }
}
