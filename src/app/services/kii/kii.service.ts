import { TodoItem, TodoItems } from './../../module/TodoItem';
import { Observable } from 'rxjs';
import { AppConfig } from './../../app.config';
import { Injectable } from '@angular/core';

@Injectable()
export class KiiService {
  bucket: KiiBucket;
  user: KiiUser;

  constructor() {
    Kii.initializeWithSite(AppConfig.AppID, AppConfig.AppKey, AppConfig.KiiSite);
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

  setBucket() {
    this.user = KiiUser.getCurrentUser();
    this.bucket = this.user.bucketWithName('Todo');
  }

}
