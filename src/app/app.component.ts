import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import {Push} from 'ionic-native';
//import {Kii, KiiSite, KiiUser} from 'kii-cloud-sdk';
import * as kii from 'kii-cloud-sdk'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      var push = Push.init({
        android: {
          senderID: "603734069394"
        },
        ios: {
          alert: "true",
          badge: true,
          sound: 'false'
        },
        windows: {}
      });
      push.on('registration', (data) => {
        console.log("registered");
        console.log(data.registrationId);
        kii.Kii.initializeWithSite("58d9081d", "2932582ebd12d1ce69fca7f3d77adb09", kii.KiiSite.JP);
        kii.KiiUser.authenticate("aaaa", "bbbb", {
          success: function (theUser) {
            console.log("user authenticated");
            kii.KiiUser.getCurrentUser().pushInstallation().installGcm(data.registrationId, false, {
              success: function () {
                console.log("push installed");
              },
              failure: function () {
                console.log("push installation failed");
              }
           });
          },
          failure: function (theUser, errorString) {
            console.log("Error authenticating: " + errorString);
          }
        });
      });
      push.on('notification', (data) => {
        console.log(data);
        alert("Hi, Am a push notification");
      });
      push.on('error', (e) => {
        console.log(e.message);
      });
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
