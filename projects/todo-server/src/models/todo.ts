import { ObjectId } from "mongodb";
import { TodoItem } from "./todo-item";

export interface Todo {
    _id?: ObjectId;
    name: string;
    description: string;
    todoItems: TodoItem[];
}