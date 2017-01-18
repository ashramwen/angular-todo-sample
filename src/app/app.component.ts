import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Push } from '@ionic/cloud-angular';

import { TabsPage } from '../pages/tabs/tabs';
declare function require(string): any;
var kii = require('kii-cloud-sdk').create();

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;



  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


      console.log("ready");
      // kii = window['kii'].create();  // Kii push plug-in
      kii.Kii.initializeWithSite("58d9081d", "2932582ebd12d1ce69fca7f3d77adb09", kii.KiiSite.JP);

      console.log("Push.init");
      let push = Push.init({
        android: {
          senderID: "603734069394"
        },
        ios: {
          alert: "true",
          badge: false,
          sound: "true"
        },
        windows: {}
      });

      console.log("push.on(registration)");
      push.on('registration', (data) => {
        console.log("registered");
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
        console.log(data.message);
      });
      push.on('error', (e) => {
        console.log(e.message);
      });

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}

