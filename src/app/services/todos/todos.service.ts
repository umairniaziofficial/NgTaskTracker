import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Todo } from '../../models/todo.type';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  http = inject(HttpClient);
  private StorageKey = 'TODO_LOCAL';
  private todoItemsSubject = new BehaviorSubject<Todo[]>([]);
  todoItems$ = this.todoItemsSubject.asObservable();

  constructor() {
    this.loadTodoItems();
  }

  loadTodoItems(): void {
    const localData = this.loadFromLocalStorage();
    if (localData) {
      this.todoItemsSubject.next(this.sortTodosByID(localData));
    } else {
      this.fetchTodoItemsFromAPI();
    }
  }

  fetchTodoItemsFromAPI(): void {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    this.http
      .get<Array<Todo>>(url)
      .pipe(
        catchError((error) => {
          console.error('Error fetching todo items from API:', error);
          return of([]);
        })
      )
      .subscribe((data) => {
        const sortedData = this.sortTodosByID(data);
        this.todoItemsSubject.next(sortedData.slice(0,10));
        this.saveToLocalStorage(sortedData);
      });
  }

  addTodo(title: string): void {
    const currentTodos = this.todoItemsSubject.getValue();
    const newTodo: Todo = {
      id: this.getNextId(currentTodos),
      title,
      completed: false,
      userId: 1,
    };
    const updatedTodos = this.sortTodosByID([...currentTodos, newTodo]);
    this.todoItemsSubject.next(updatedTodos);
    this.saveToLocalStorage(updatedTodos);
  }

  private sortTodosByID(todos: Todo[]): Todo[] {
    return todos.sort((a, b) => a.id - b.id);
  }

  deleteTodo(id: number): void {
    const currentTodos = this.todoItemsSubject.getValue();
    const updatedTodos = this.sortTodosByID(
      currentTodos.filter(todo => todo.id !== id)
    );
    this.todoItemsSubject.next(updatedTodos);
    this.saveToLocalStorage(updatedTodos);
  }

  private getNextId(todos: Todo[]): number {
    return todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  }

  private saveToLocalStorage(todos: Todo[]): void {
    localStorage.setItem(this.StorageKey, JSON.stringify(todos));
  }

  private loadFromLocalStorage(): Array<Todo> | null {
    const data = localStorage.getItem(this.StorageKey);
    return data ? JSON.parse(data) : null;
  }

  updateTodo(id: number, complete: boolean): void {
    const currentTodos = this.todoItemsSubject.getValue();
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, completed: complete } : todo
    );
    const sortedTodos = this.sortTodosByID(updatedTodos);
    this.todoItemsSubject.next(sortedTodos);
    this.saveToLocalStorage(sortedTodos);
  }
}
