import express, { Router } from "express";
import { Todo } from "../models/todo";
import { ObjectId } from "mongodb";
import { collections } from "../utils/db.utility";
import { AddTodoItemPayload, TodoItem } from "@models/todo-item";

export const todoRouter = Router();

todoRouter.use(express.json());

/**
 * GET /tasks
 */
todoRouter.get("/", async (_req, res) => {
  try {
    const tasks = await collections.todos?.find().toArray() as Todo[];
    res.status(200).json(tasks ?? []);
  }
  catch (error: any) {
    console.error(error);
    res.status(500).send(`Failed to get tasks: ${error.message}`);
  }
});

/**
 * GET /tasks/:id
 */
todoRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const task = await collections.todos?.findOne(query) as Todo;
    task ? res.json(task) : res.status(404).send();
  }
  catch (error: any) {
    console.error(error);
    res.status(500).send(`Failed to get task: ${error.message}`);
  }
});

/**
 * POST /tasks
 */
todoRouter.post("/", async (req, res) => {
  try {
    const task = req.body as Todo;
    const result = await collections.todos?.insertOne(task);
    result ? res.status(201).json({
      _id: result.insertedId
    }) : res.status(500).send("Failed to create task");
  }
  catch (error: any) {
    console.error(error);
    res.status(500).send(`Failed to create task: ${error.message}`);
  }
});

/**
 * PUT /tasks/:id
 */
todoRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const task = req.body as Todo;
    const result = await collections.todos?.replaceOne(query, task);
    result ? res.status(204).send() : res.status(500).send("Failed to update task");
  }
  catch (error: any) {
    console.error(error);
    res.status(500).send(`Failed to update task: ${error.message}`);
  }
});

/**
 * DELETE /tasks/:id
 */
todoRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.todos?.deleteOne(query);
    result ? res.status(204).send() : res.status(500).send("Failed to delete task");
  }
  catch (error: any) {
    console.error(error);
    res.status(500).send(`Failed to delete task: ${error.message}`);
  }
});

todoRouter.post("/:id/item", async (req, res) => {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const payload = req.body as AddTodoItemPayload;
    const todoItem = {
      _id: new ObjectId(),
      ...payload.todoItem
    } as TodoItem;
    const result = await collections.todos?.updateOne(query, {
      $push: {
        todoItems: {
          $each: [todoItem],
          $position: 0
        },
      }
    });
    result ? res.status(200).send({
      todoItem_ids: todoItem._id
    }) : res.status(500).send("Failed to add todo item");
  }
  catch (error: any) {
    console.error(error);
    res.status(500).send(`Failed to add todo item: ${error.message}`);
  }
});

todoRouter.put("/:id/item", async (req, res) => {
  const id = req.params.id;
  const todoItem = req.body as TodoItem;
  const { _id: todoItemId, ...todoItemData} = todoItem;
  try {
    const query = { _id: new ObjectId(id), "todoItems._id": new ObjectId(todoItemId)};
    const result = await collections.todos?.updateOne(query, {
      $set: {"todoItems.$": {
        _id: new ObjectId(todoItemId),
        ...todoItemData
      }}
    });
    result ? res.status(204).send(): res.status(500).send('Failed to update todo item');
  }
  catch (error: any) {
    console.error(error);
    res.status(500).send(`Failed to update todo item: ${error.message}`);
  }
});

todoRouter.delete("/:id/item/:itemId", async (req, res) => {
  const id = req.params.id;
  const todoItemId = req.params.itemId;
  try {
    const query = { _id: new ObjectId(id)};
    const result = await collections.todos?.updateOne(query, {
      $pull: {
        todoItems: { _id: new ObjectId(todoItemId)}
      }
    });
    result ? res.status(204).send() : res.status(500).send('Failed to delete todo item');
  }
  catch (error: any) {
    console.error(error);
    res.status(500).send(`Failed to delete todo item: ${error.message}`);
  }
})