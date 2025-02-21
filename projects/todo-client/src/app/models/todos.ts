import { TodoItem } from "./todo-item";

export interface Todo {
  id: string;
  title: string;
  description: string;
  todoItems: TodoItem[];
}

export type CreateTodoPayload = Omit<Todo, 'id'>;

export type CreateTodoResponse = Pick<Todo, 'id'>;

export type CreateTodoFormData = Omit<Todo, 'id' | 'todoItems'>;
