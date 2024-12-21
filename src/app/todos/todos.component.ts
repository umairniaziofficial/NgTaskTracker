import { Component, inject, signal } from '@angular/core';
import { TodosService } from '../services/todos/todos.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports:[FormsModule,NgFor],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  private todosService = inject(TodosService);

  todoItems = signal([...this.todosService.todoItems]);

  updateTodoStatus(id:number,event : Event) :void
  {
    console.log("Sending For Upadte");
    const input = event.target as HTMLInputElement;
    const complete  = input.checked;
    this.todosService.updateTodo(id,complete);

    this.todoItems.set([...this.todosService.todoItems]);
    console.log(this.todoItems().map((item)=>
    {
      return item.completed
    }));


  }

  trackById(index :number, todo :{id:number}) :number {
    return todo.id;
  }
}

