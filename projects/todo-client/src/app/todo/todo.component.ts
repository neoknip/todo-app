import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, QueryList, signal, viewChild, ViewChildren, viewChildren } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '@app/services/todo.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoItem } from '@app/models/todo-item';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit, AfterViewInit, OnDestroy {

  private _route = inject(ActivatedRoute);
  private _todoService = inject(TodoService);
  private _fb = inject(FormBuilder);

  @ViewChildren('todoItemFormEl') todoItemFormElList!: QueryList<ElementRef<HTMLFormElement>>;

  public readonly showNewTodoForm = signal<boolean>(false);
  public readonly selectedTodoItem = signal<TodoItem | null>(null);

  public readonly todoId = signal<string>(this._route.snapshot.params['id']);

  public readonly todo = rxResource({
    request: () => this.todoId(),
    loader: ({ request }) => this._todoService.getTodo(request),
  });

  public readonly todoItemForm = this._fb.nonNullable.group({
    name: ['', Validators.required],
    description: '',
  });

  private _compActive = false;

  ngOnInit(): void {
    this._compActive = true;
    this._route.params.subscribe(params => {
      this.todoId.set(params['id']);
    });
  }

  ngOnDestroy(): void {
    this._compActive = false;
  }

  ngAfterViewInit(): void {
    this.todoItemFormElList.changes.pipe(takeWhile(() => this._compActive)).subscribe((elList) => {
      //todo item form template added to the dom
      if (elList.length) {
        const todoItemFormEl = this.todoItemFormElList.first;
        const inputEls = todoItemFormEl.nativeElement.getElementsByTagName('input');
        setTimeout(() => {
          inputEls.item(0)?.focus();
        });
      }
    })
  }

  onAddTodoItem(): void {
    this.selectedTodoItem.set(null);
    this.todoItemForm.reset();
    this.showNewTodoForm.set(true);
  }

  toggleTodoItem(todoItem: TodoItem): void {
    this._todoService.updateTodoItem(this.todoId(), {
      ...todoItem,
      completed: !todoItem.completed,
    }).subscribe({
      next: () => {
        this.todo.reload();
      },
      error: (error) => {
        console.error('Failed to update todo item', error);
      }
    });
  }

  selectTodoItem(todoItem: TodoItem): void {
    this.todoItemForm.patchValue({
      name: todoItem.name,
      description: todoItem.description,
    });
    this.selectedTodoItem.set(todoItem);
  }

  deleteTodoItem(todoItemId: string): void {
    this._todoService.deleteTodoItem(this.todoId(), todoItemId).subscribe({
      next: () => {
        this.todo.reload();
      },
      error: (error) => {
        console.error('Failed to delete todo item', error);
      }
    });
  }

  onTodoItemFormBlur(event: FocusEvent): void {
    if (this.todoItemFormElList.first.nativeElement.contains(event.relatedTarget as Node)) {
      //focus is still inside the form
      return;
    }
    if (this.todoItemForm.valid) {
      const { name, description } = this.todoItemForm.value;
      this._todoService.addTodoItem(this.todoId(), {
        todoId: this.todoId(),
        todoItem: {
          name: name ?? '',
          description: description ?? '',
          completed: false,
        }
      }).subscribe({
        next: () => {
          this.todoItemForm.reset();
          this.showNewTodoForm.set(false);
          this.todo.reload();
        },
        error: (error) => {
          console.error('Failed to add todo item', error);
        }
      });
    }
    else {
      this.todoItemForm.reset();
      this.showNewTodoForm.set(false);
    }
  }

}
