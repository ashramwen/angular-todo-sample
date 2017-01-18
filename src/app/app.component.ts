import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

var kii;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;



  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


    alert('ready');
    kii = window['kii'].create();
    kii.Kii.initializeWithSite("58d9081d", "2932582ebd12d1ce69fca7f3d77adb09", kii.KiiSite.JP);

    alert('initAndroid start');
    window['kiiPush'].initAndroid("603734069394", "pushReceived", {             // pushReceived should be correct name(with namespace)
      user: {
        ledColor: "#FFFF00FF",
        notificatonText: "user"
      },
      app: {
        ledColor: "#FFFF00FF",
        notificatonText: "app"
      },
      direct: {
        showInNotificationArea: true,
        ledColor: "#FFFFFFFF",
        notificatonTitle: "$.title",
        notificatonText: "$.msg"
      },
      success: function () {
        alert('init done');       // never called(bug of Kii push plug-in?)
      },
      failure: function (msg) {   // never called(bug of Kii push plug-in?)
        alert('init error:' + msg);
      }
    });
    alert('initAndroid end');

    kii.KiiUser.authenticate("aaaa", "bbbb", {
      success: function (theUser) {
        alert("user authenticated");
        window['kiiPush'].register(kii, {
          received: "pushReceived",             // pushReceived should be correct name(with namespace)
          success: function (token) {
            alert('token=' + token);
          },
          failure: function (msg) {
            alert('error ' + msg);
          }
        });
      },
      failure: function (theUser, errorString) {
        alert("Error authenticating: " + errorString);
      }
    });


      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}

 function pushReceived(args) {
    alert('push received:'+JSON.stringify(args));
 }
