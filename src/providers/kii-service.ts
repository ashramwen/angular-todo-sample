import { TodoItem, TodoItems } from './../module/TodoItem';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

/*
  Generated class for the KiiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class KiiService {

  constructor(public http: Http) {

  }

  user: KiiUser;
  bucket: KiiBucket;

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
