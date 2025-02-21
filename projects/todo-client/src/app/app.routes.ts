import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { CreateTodoInfoComponent } from './create-todo-info/create-todo-info.component';

export const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  {
    path: 'todos',
    component: TodosComponent,
    children: [
      { path: '', component: CreateTodoInfoComponent },
      { path: ':id', component: TodoComponent }
    ]
  },
  { path: '**', redirectTo: 'todos' }
];
