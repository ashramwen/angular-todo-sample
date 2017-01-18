import { AppConfig } from './../app/app.config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  user: KiiUser;
  bucket: KiiBucket;

  constructor(public http: Http) {
    Kii.initializeWithSite(AppConfig.AppID, AppConfig.AppKey, AppConfig.KiiSite);
    console.log('Initialize Kii setting');
  }

  authenticate(credential) {
    var subscription = Observable.fromPromise<KiiUser>(KiiUser.authenticate(credential.username, credential.password));
    return subscription.map(theUser => {
      if (theUser) {
        localStorage.setItem(AppConfig.STORAGE_TOKEN_KEY, theUser.getAccessToken());
        return true;
      }
    }).catch(() => {
      return Observable.of(false);
    });
  }

  canActivate() {
    let accessToken = localStorage.getItem(AppConfig.STORAGE_TOKEN_KEY)
    var subscription = Observable.fromPromise<KiiUser>(KiiUser.authenticateWithToken(accessToken));
    return subscription.map(theUser => {
      if (theUser) {
        localStorage.setItem(AppConfig.STORAGE_TOKEN_KEY, theUser.getAccessToken());
        return true;
      }
    }).catch(() => {
      return Observable.of(false);
    });
  }
}
