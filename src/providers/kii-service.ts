import { TodoItem, TodoItems } from './../module/TodoItem';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Push } from 'ionic-native';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the KiiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class KiiService {

  constructor(public http: Http,
              public platform: Platform) {

  }

  user: KiiUser;
  bucket: KiiBucket;
  isInitialized: boolean = false;

  initialize(senderId: string, callback: (data: any) => void) {
    if (this.isInitialized) {
      return
    }

    // get user and create bucket.
    this.user = KiiUser.getCurrentUser();
    this.bucket = this.user.bucketWithName('Todo');

    if (!this.platform.is('cordova')) {
      return;
    }

    // subscribe bucket.
    this.user.pushSubscription().isSubscribed(
      this.bucket,
      {
        success: function(subscription, bucket, isSubscribed) {
          if (!isSubscribed) {
            KiiUser.getCurrentUser().pushSubscription().subscribe(
              bucket,
              {
                success: function(subscription, bucket) {
                  // nothing to do.
                },

                failure: function(error) {
                  console.log("fail to subscribe");
                }
              });
          }
        },
        failure: function(error) {
          console.log("fail to check subscription");
        }
      });

    // register push
    var push = Push.init({
      android: {
        senderID: senderId
      },
      ios: {
        alert: "true",
        badge: true,
        sound: 'false'
      },
      windows: {}
    });
    push.on('registration', (data) => {
      KiiUser.getCurrentUser().pushInstallation().installGcm(data.registrationId, false, {
        success: function () {
          console.log("push installed");
        },
        failure: function () {
          console.log("push installation failed");
        }
      });
    });

    push.on('notification', (data) => {
      callback(data);
    });

    push.on('error', (e) => {
      // nothing to do.
    });

    this.isInitialized = true;
  }

  addTodoItem(item: TodoItem) {
    let obj = this.bucket.createObject();
    obj.set('text', item.text);
    obj.set('done', item.done);

    // Save the object
    return Observable.fromPromise(obj.save())
      .map(theObject => {
        let id = theObject.getID();
        return this.bucket.createObjectWithID(id);
      })
      .flatMap((obj) => {
        return Observable.fromPromise(obj.refresh());
      })
      .map(theObject => {
        return TodoItem.fromObject(theObject)
      });
  }

  deleteTodoItem(item: TodoItem) {
    let obj = KiiObject.objectWithURI(item.getUri());
    return Observable.fromPromise(obj.delete());
  }

  getTodoItems() {
    let allQuery = KiiQuery.queryWithClause(null);

    // Execute the query
    var subscription = Observable.fromPromise(this.bucket.executeQuery(allQuery));
    return subscription.map(res => {
      let items: TodoItems = [];
      res[1].forEach((obj: KiiObject) => {
        items.push(TodoItem.fromObject(obj));
      });
      return items;
    });
  }

}
