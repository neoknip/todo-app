import { ObjectId } from "mongodb";
import { TodoItem } from "./todo-item";

export interface Todo {
    _id?: ObjectId;
    title: string;
    description: string;
    todoItems: TodoItem[];
}

export type CreateTodoPayload = Omit<Todo, '_id'>;
export type CreateTodoResponse = Pick<Todo, '_id'>;