import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo.type';
import { HighlightCompletedTodoDirective } from '../../directives/highligh-completed-todo.directive';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [HighlightCompletedTodoDirective,UpperCasePipe],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() statusChange = new EventEmitter<{ id: number; completed: boolean }>();
  @Output() delete = new EventEmitter<number>();

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.statusChange.emit({ id: this.todo.id, completed: checkbox.checked });
  }

  onDelete(): void {
    this.delete.emit(this.todo.id);
  }
}
