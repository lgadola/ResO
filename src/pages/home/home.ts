import { Observable } from 'rxjs/Observable';
import { Client, OrganisationView, UserView } from './../../providers/api.service';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public organisation: Observable<OrganisationView> | null;
  public me: Observable<UserView> | null;

  constructor(private nav: NavController, private auth: AuthService, private api: Client) {  }
  ionViewDidLoad() {
    this.organisation = this.api.organisations_Get(1);
    if (this.auth.isAuthenticated())
      this.me = this.api.users_GetCurrentUser();
  }
  public logout() {
    this.auth.logout();
  }
  public login() {
    this.nav.push('LoginPage');
  }
  public isLoggedIn()
  {
    return this.auth.isAuthenticated;
  }
}