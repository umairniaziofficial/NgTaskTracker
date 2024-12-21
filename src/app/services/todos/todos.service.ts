import { Injectable } from '@angular/core';
import { Todo } from '../../models/todo.type';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private StorageKey = 'TODO_LOCAL';
  todoItems: Array<Todo> = [];

  constructor() {
    this.todoItems = this.loadFromLocalStorage() || [
      {
        id: 1,
        userId: 0,
        title: 'Learn angular',
        completed: false,
      },
      {
        id: 2,
        userId: 0,
        title: 'Writing Code',
        completed: true,
      },
    ];
  }

  saveToLocalStorage(): void {
    localStorage.setItem(this.StorageKey, JSON.stringify(this.todoItems));
  }

  loadFromLocalStorage() : Array<Todo> | null {
    const data = localStorage.getItem(this.StorageKey);
    return data ? JSON.parse(data) : null;
  }

  updateTodo(id : number, complete :boolean) : void
  {
     const todo =  this.todoItems.find((item)=> item.id == id);
     if(todo)
     {
      todo.completed = complete;
      this.saveToLocalStorage();
     }
  }
}
