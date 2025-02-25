import { ObjectId } from "mongodb";

export interface TodoItem {
    _id: ObjectId;
    name: string;
    description?: string;
    dueDate?: Date;
    completed: boolean;
}

export type AddTodoItemPayload = {
    todoId: ObjectId,
    todoItem: Omit<TodoItem, '_id'>
};
export type AddTodoItemResponse = Pick<TodoItem, '_id'>;