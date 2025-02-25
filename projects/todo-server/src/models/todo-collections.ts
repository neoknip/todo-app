import { Collection } from "mongodb";
import { Todo } from "./todo";

export interface TodoCollections {
    todos?: Collection<Todo>;
}