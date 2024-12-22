import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { TodosService } from '../services/todos/todos.service';
import { Todo } from '../models/todo.type';
import { NgFor } from '@angular/common';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodoPipe } from '../pipes/filter-todo-pipe.pipe';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgFor, TodoItemComponent, FormsModule, FilterTodoPipe],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  private todosService = inject(TodosService);
  todoItems: Signal<Todo[]> = toSignal(this.todosService.todoItems$, { initialValue: [] });
  searchTerm = signal('');
  newTodoTitle = signal('');

  ngOnInit() {
  }

  trackById(index: number, todo: Todo): number {
    return todo.id;
  }

  updateTodoStatus(id: number, completed: boolean): void {
    this.todosService.updateTodo(id, completed);
  }

  addTodo(): void {
    const title = this.newTodoTitle().trim();
    if (title) {
      this.todosService.addTodo(title);
      this.newTodoTitle.set('');
    }
  }

  deleteTodo(id: number): void {
    this.todosService.deleteTodo(id);
  }
}
