import { Injectable } from '@angular/core';
import { Todo } from '../../models/todo.type';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todoItems = <Array<Todo>>[
    {
      userId: 1,
      id: 0,
      completed: false,
      title: ' Learn Angular',
    },
    {
      userId: 1,
      id: 1,
      completed: false,
      title: 'Create content',
    },
  ];
  constructor() {}
}
