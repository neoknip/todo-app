import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '@app/models/todos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this._http.get<Todo[]>('/api/todo');
  }

  getTodoById(id: string): Observable<Todo> {
    return this._http.get<Todo>(`/api/todo/${id}`);
  }

  createTodo(todo: Todo): Observable<Pick<Todo, 'id'>> {
    return this._http.post<Pick<Todo, 'id'>>('/api/todo', todo);
  }

  updateTodo(todo: Todo): Observable<any> {
    return this._http.put(`/api/todo/${todo.id}`, todo);
  }
}
