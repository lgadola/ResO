import { Injectable } from '@angular/core';
import { AppEventsProvider } from '../../services/app-events';

@Injectable()
export class PrincipalProvider {

  constructor(private appEvents: AppEventsProvider) {

  }

  public logout(){
    this.appEvents.emit('logout');
  }

  public login(){
    this.appEvents.emit('login');
  }

}
