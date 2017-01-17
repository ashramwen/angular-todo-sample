import { AppConfig } from './../../app.config';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate() {
    let accessToken = localStorage.getItem(AppConfig.STORAGE_TOKEN_KEY)
    var subscription = Observable.fromPromise<KiiUser>(KiiUser.authenticateWithToken(accessToken));
    return subscription.map(theUser => {
      if (theUser) {
        localStorage.setItem(AppConfig.STORAGE_TOKEN_KEY, theUser.getAccessToken());
        return true;
      }
    }).catch(() => {
      this.router.navigate(['/login']);
      return Observable.of(false);
    });
  }
}
