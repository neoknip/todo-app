import { TodoItem } from "./todo-item";

export interface Todo {
  id: string;
  title: string;
  description: string;
  todoItem: TodoItem[];
}
