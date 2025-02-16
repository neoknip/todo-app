import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

export async function initializeDB() {
    dotenv.config();
    const connectionString = process.env.MONGODB_URI || '';
    const client = new MongoClient(connectionString);
    await client.connect();
    return client.db(process.env.MONGO_DB);
}