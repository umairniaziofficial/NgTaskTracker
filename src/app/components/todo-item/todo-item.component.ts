import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo.type';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() statusChange = new EventEmitter<{ id: number; completed: boolean }>();

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.statusChange.emit({ id: this.todo.id, completed: checkbox.checked });
  }
}
