import { Component, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '@app/models/todos';
import { TodoService } from '@app/services/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {

  public readonly todos = signal<Todo[]>([]);

  constructor(private _todoService: TodoService) { }

  ngOnInit(): void {
    this._todoService.getTodos().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  public addTodo(): void {
    // Add a new todo
  }

}
