import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTodoPayload, CreateTodoResponse, Todo } from '@app/models/todos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this._http.get<Todo[]>('/api/todo');
  }

  getTodo(id: string): Observable<Todo> {
    return this._http.get<Todo>(`/api/todo/${id}`);
  }

  createTodo(todo: CreateTodoPayload): Observable<CreateTodoResponse> {
    return this._http.post<CreateTodoResponse>('/api/todo', todo);
  }

  updateTodo(todo: Todo): Observable<any> {
    return this._http.put(`/api/todo/${todo.id}`, todo);
  }

  deleteTodo(id: string): Observable<any> {
    return this._http.delete(`/api/todo/${id}`);
  }
}
