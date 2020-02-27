import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoList: TodoModel[] = []; // lista de tarefas vazia ( tipo: todo.models.ts )

  constructor() {
    let myTodo: TodoModel;
    const array: TodoModel[] = [
      { id: 1, todo: 'Ir no mercado', done: false },
      { id: 2, todo: 'Estudar', done: false },
      { id: 3, todo: 'Ir na academia', done: false }
    ]
    array.forEach((element: TodoModel) => {
      myTodo = new TodoModel(element.id, element.todo, element.done);
      this.todoList.push(myTodo); // adicionar a ação na lista de tarefas
    });

  }

  ngOnInit() {

  }

  remove(todo: TodoModel) {
    const index = this.todoList.indexOf(todo);
    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
  }

}
