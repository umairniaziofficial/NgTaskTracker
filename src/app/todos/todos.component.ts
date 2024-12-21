import { Component, inject, signal } from '@angular/core';
import { TodosService } from '../services/todos/todos.service';
import { Todo } from '../models/todo.type';
import { NgFor } from '@angular/common';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgFor, TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  private todosService = inject(TodosService);
  todoItems = signal(this.todosService.todoItems);

  trackById(index: number, todo: Todo): number {
    return todo.id;
  }

  updateTodoStatus(id: number, completed: boolean): void {
    this.todosService.updateTodo(id, completed);
    this.todoItems.set([...this.todosService.todoItems]);
  }
}
