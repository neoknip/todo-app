import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '@app/models/todos';
import { TodoService } from '@app/services/todo.service';

@Component({
  selector: 'app-todo',
  imports: [MatCardModule, MatCheckboxModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {

  public readonly todo = signal<Todo | null>(null);
  public readonly gettingTodo = signal<boolean>(false);

  private _route = inject(ActivatedRoute);
  private _todoService = inject(TodoService);

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = params['id'];
      this._getTodo(id);
    });
  }

  private _getTodo(id: string): void {
    this.gettingTodo.set(true);
    this._todoService.getTodo(id).subscribe({
      next: (todo) => {
        this.todo.set(todo);
        this.gettingTodo.set(false);
      },
      error: (error) => {
        this.gettingTodo.set(false);
        console.error('Failed to get todo', error);
      }
    });
  }

}
