import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { CreateTodoFormData, Todo } from '@app/models/todos';

import { TodoService } from '@app/services/todo.service';
import { CreateTodoComponent } from '@app/create-todo/create-todo.component';

@Component({
  selector: 'app-todo-list',
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatListModule, RouterModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  public readonly creatingTodo = signal<boolean>(false);
  public readonly deletingTodo = signal<boolean>(false);
  public readonly fetchingTodos = signal<boolean>(false);
  public readonly todos = signal<Todo[]>([]);

  private _todoService = inject(TodoService);
  private _dialog = inject(MatDialog);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    this._getTodos();
  }

  public addTodo(): void {
    const dialogRef = this._dialog.open<CreateTodoComponent, void, CreateTodoFormData>(CreateTodoComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._createTodo(result);
      }
    });
  }

  public deleteTodo(todo: Todo): void {
    this.deletingTodo.set(true);
    this._todoService.deleteTodo(todo.id).subscribe({
      next: () => {
        this.deletingTodo.set(false);
      },
      error: (error) => {
        console.error('Failed to delete todo', error);
        this.deletingTodo.set(false);
      }
    });
  }

  private _getTodos(): void {
    this.fetchingTodos.set(true);
    this._todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos.set(todos);
        this.fetchingTodos.set(false);
      },
      error: (error) => {
        console.error('Failed to fetch todos', error);
        this.fetchingTodos.set(false);
      }
    });
  }

  private _createTodo(payload: CreateTodoFormData): void {
    this.creatingTodo.set(true);
    this._todoService.createTodo({
      title: payload.title,
      description: payload.description,
      todoItems: []
    }).subscribe({
      next: (response) => {
        this._getTodos();
        this.creatingTodo.set(false);
        this._router.navigate([response.id, { relativeTo: this._route }]);
      },
      error: (error) => {
        console.error('Failed to create todo', error);
        this.creatingTodo.set(false);
      }
    });
  }

}
