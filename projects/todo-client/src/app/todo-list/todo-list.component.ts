import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CreateTodoFormData, Todo } from '@app/models/todos';

import { TodoService } from '@app/services/todo.service';

import { CreateTodoComponent } from '@app/create-todo/create-todo.component';

@Component({
  selector: 'app-todo-list',
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatProgressBarModule, RouterModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  private _todoService = inject(TodoService);
  private _dialog = inject(MatDialog);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  public readonly creatingTodo = signal<boolean>(false);
  public readonly deletingTodo = signal<boolean>(false);

  public todos = rxResource({
    loader: () => this._todoService.getTodos(),
  });

  public addTodo(): void {
    const dialogRef = this._dialog.open<CreateTodoComponent, void, CreateTodoFormData>(CreateTodoComponent, {
      panelClass: 'create-todo-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._createTodo(result);
      }
    });
  }

  public deleteTodo(todo: Todo): void {
    this.deletingTodo.set(true);
    this._todoService.deleteTodo(todo._id).subscribe({
      next: () => {
        this.deletingTodo.set(false);
      },
      error: (error) => {
        console.error('Failed to delete todo', error);
        this.deletingTodo.set(false);
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
        this.creatingTodo.set(false);
        this.todos.reload();
        this._router.navigate([response._id, { relativeTo: this._route }]);
      },
      error: (error) => {
        console.error('Failed to create todo', error);
        this.creatingTodo.set(false);
      }
    });
  }

}
