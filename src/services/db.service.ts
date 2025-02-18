import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { TodoCollections } from '../models/todo-collections';
import { DbConstants } from '../constants/db.constants';

export const collections: TodoCollections = {};

export async function initializeDB() {
    dotenv.config();
    const connectionString = process.env.MONGODB_URI || '';
    const client = new MongoClient(connectionString);
    await client.connect();
    const db = client.db(DbConstants.DB_NAME);
    collections.todos = db.collection(DbConstants.COLLECTION_TODOS);
}