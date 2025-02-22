import { MatButtonModule } from '@angular/material/button';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '@app/services/todo.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo',
  imports: [MatButtonModule, MatCardModule, MatCheckboxModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _todoService = inject(TodoService);

  public readonly todoId = signal<string>(this._route.snapshot.params['id']);

  public readonly todo = rxResource({
    request: () => this.todoId(),
    loader: ({request}) => this._todoService.getTodo(request),
  });

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.todoId.set(params['id']);
    });
  }

}
