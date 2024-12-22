import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.type';

@Pipe({
  name: 'filterTodo'
})
export class FilterTodoPipe implements PipeTransform {
  transform(todos: Todo[], searchTerm: string): Todo[] {
    if (!searchTerm) {
      return todos;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();

    return todos.filter(todo =>
      todo.title.toLowerCase().includes(lowerCaseSearch) ||
      todo.id.toString().includes(lowerCaseSearch)
    );
  }
}
