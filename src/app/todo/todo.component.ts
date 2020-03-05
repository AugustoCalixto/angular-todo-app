import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList: TodoModel[] = []; // lista de tarefas vazia ( tipo: todo.models.ts )
  formGroup: FormGroup;
  taskGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      task: ['', Validators.compose([
        Validators.minLength(3), // qtd minima de caracteres
        Validators.maxLength(30), // qtd maxima de caracteres
        Validators.required, // é obrigatiorio
      ])]
    });
  }

  ngOnInit() {
    this.loadFromLocalStorage();
  }

  taskAdd() {
    const task = this.formGroup.controls.task.value;
    this.todoList.push(new TodoModel(task, false));
    this.saveOnLocalStorage();
    this.formGroup.reset();
  }

  taskRemove(todo: TodoModel) {
    const index = this.todoList.indexOf(todo);
    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
    this.saveOnLocalStorage();
  }

  taskDone(todo: TodoModel) {
    const index = this.todoList.indexOf(todo);
    if (index !== -1) {
      todo.done = true;
    }
    this.saveOnLocalStorage();
  }

  saveOnLocalStorage() {
    const data = JSON.stringify(this.todoList);
    localStorage.setItem('todos', data);
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('todos');
    this.todoList = JSON.parse(data);
  }

}
