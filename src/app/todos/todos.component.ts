import { Component, inject, signal } from '@angular/core';
import { TodosService } from '../services/todos/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  private todosService = inject(TodosService);
  todoItems = signal(this.todosService.todoItems);

  updateTodoStatus(id: number, completed: boolean): void {
    this.todosService.updateTodo(id, completed);
    this.todoItems.set(this.todosService.todoItems); // Update the signal
  }
}
