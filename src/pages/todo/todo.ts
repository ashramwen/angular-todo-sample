import { TodoItem, TodoItems } from './../../module/TodoItem';
import { KiiService } from './../../providers/kii-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Todo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html'
})
export class TodoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private kiiService: KiiService
  ) { }

  text: string;
  todoItems: TodoItems;

  ionViewDidLoad() {
    this.kiiService.setBucket();
    this.kiiService.getTodoItems().subscribe((items: TodoItems) => {
      this.todoItems = items;
    });
  }

  onEnter(text: string) {
    if (!text) return;
    this.kiiService.addTodoItem(new TodoItem(text))
      .subscribe(todoItem => {
        this.todoItems.push(todoItem);
        this.text = '';
      });
  }

  delete(todoItem: TodoItem, index: number) {
    if (!todoItem.done) return;
    this.kiiService.deleteTodoItem(todoItem).subscribe(() => {
      this.todoItems.splice(index, 1);
    });
  }

}
