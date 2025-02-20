import { ObjectId } from "mongodb";
import { TodoItem } from "./todo-item";

export interface Todo {
    _id?: ObjectId;
    title: string;
    description: string;
    todoItems: TodoItem[];
}