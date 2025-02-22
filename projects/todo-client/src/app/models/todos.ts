import { TodoItem } from "./todo-item";

export interface Todo {
  _id: string;
  title: string;
  description: string;
  todoItems: TodoItem[];
}

export type CreateTodoPayload = Omit<Todo, '_id'>;

export type CreateTodoResponse = Pick<Todo, '_id'>;

export type CreateTodoFormData = Omit<Todo, '_id' | 'todoItems'>;
