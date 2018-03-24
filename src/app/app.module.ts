import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../providers/auth-service';
import { Client } from '../providers/api.service';
import { TokenInterceptor } from '../providers/interceptor/interceptor';
import { PrincipalProvider } from '../providers/principal/principal';
import { AppEventsProvider } from '../services/app-events';
//Imports the entire DevExtreme
import { DxButtonModule } from 'devextreme-angular/ui/button'; 

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    DxButtonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    Client,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    PrincipalProvider,
    AppEventsProvider

  ]
})
export class AppModule {}
