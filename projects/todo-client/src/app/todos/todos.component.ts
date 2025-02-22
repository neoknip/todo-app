import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Todo } from '@app/models/todos';

import { TodoListComponent } from "../todo-list/todo-list.component";

@Component({
  selector: 'app-todos',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterOutlet,
    TodoListComponent
],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
