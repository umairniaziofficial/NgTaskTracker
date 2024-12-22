import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { title: 'Home' },
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'todos',
    title: 'Todos',
    data: { title: 'Todos' },
    loadComponent: () => import('./todos/todos.component').then((m) => m.TodosComponent),
  },
];
