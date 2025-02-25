export interface TodoItem {
    _id: string;
    name: string;
    description?: string;
    dueDate?: Date;
    completed: boolean;
}

export type AddTodoItemPayload = {
    todoId: string,
    todoItem: Omit<TodoItem, '_id'>
};

export type AddTodoItemResponse = Pick<TodoItem, '_id'>;
