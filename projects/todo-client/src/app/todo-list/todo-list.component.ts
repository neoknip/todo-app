import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';

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

  public readonly creatingTodo = signal<boolean>(false);
  public readonly deletingTodo = signal<boolean>(false);


  public todos = rxResource<Todo[], void>({
    loader: () => this._todoService.getTodos(),
  });

  public readonly selectedTodoId = linkedSignal<Todo[], string | null>({
    source: () => {
      return this.todos.value() ?? []
    },
    computation: (newTodos, previous) => {
      if (newTodos.length) {
        return newTodos.find(todo => todo._id == previous?.value)?._id ?? newTodos[0]._id;
      }
      else {
        return null;
      }
    }
  });

  private _navigateToTodoEffect = effect(() => {
    if (this.selectedTodoId()) {
      this._router.navigate(['/todos', this.selectedTodoId()]);
    }
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
        this.todos.reload();
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
        this.selectedTodoId.set(response._id);
        this.todos.reload();
      },
      error: (error) => {
        console.error('Failed to create todo', error);
        this.creatingTodo.set(false);
      }
    });
  }

  public selectTodo(todo: Todo): void {
    this.selectedTodoId.set(todo._id);
  }

}
