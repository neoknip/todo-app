import { ObjectId } from "mongodb";
import { collections } from "../utils/db.utility";
import { CreateTodoPayload, CreateTodoResponse, Todo } from "@models/todo";

export class TodoRepo {

    public async getTodos(): Promise<Todo[]> {
        return await collections.todos?.find().toArray() as Todo[];
    }

    public async getTodo(id: string): Promise<Todo> {
        const query = { _id: new ObjectId(id) };
        return await collections.todos?.findOne(query) as Todo;
    }

    public async createTodo(todo: CreateTodoPayload): Promise<CreateTodoResponse> {
        const result = await collections.todos?.insertOne(todo);
        return {
            _id: result?.insertedId
        }
    }

    public async updateTodo(todo: Todo) {
        const query = { _id: new ObjectId(todo._id) };
        const result = await collections.todos?.replaceOne(query, todo);
        return !!(result?.modifiedCount) 
    }

    public async deleteTodo(id: string) {
        const query = { _id: new ObjectId(id) };
        const result = await collections.todos?.deleteOne(query);
        return !!(result?.deletedCount)
    }
}