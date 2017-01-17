import { Observable } from 'rxjs';
import { TodoItem, TodoItems } from './../../module/TodoItem';
import { KiiService } from './../../services/kii/kii.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  text: string;
  todoItems: TodoItems;
  constructor(
    private kiiService: KiiService
  ) { }

  ngOnInit() {
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
    this.kiiService.deleteTodoItem(todoItem).subscribe(() => {
      this.todoItems.splice(index, 1);
    });
  }
}
