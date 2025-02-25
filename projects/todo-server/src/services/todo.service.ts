import { CreateTodoPayload, CreateTodoResponse, Todo } from "@models/todo";
import { TodoRepo } from "src/repos/todo.repo";

export class TodoService {

    constructor(private _todoRepo: TodoRepo) {}

    async getTodos(): Promise<Todo[]> {
        return await this._todoRepo.getTodos();
    }

    async getTodo(id: string): Promise<Todo> {
        return await this._todoRepo.getTodo(id);
    }

    async createTodo(todoPayload: CreateTodoPayload): Promise<CreateTodoResponse> {
        return await this._todoRepo.createTodo(todoPayload);
    }

    async updateTodo(todo: Todo): Promise<boolean> {
        return await this._todoRepo.updateTodo(todo);
    }

    async deleteTodo(id: string): Promise<boolean> {
        return await this._todoRepo.deleteTodo(id);
    }
}