import express, { Router } from "express";
import { Todo } from "../models/todo";
import { ObjectId } from "mongodb";
import { collections } from "../services/db.service";

export const todoRouter = Router();

todoRouter.use(express.json());

/**
 * GET /tasks
 */
todoRouter.get("/", async (_req, res) => {
  try {
    const tasks = await collections.todos?.find().toArray() as Todo[];
    res.json(tasks ?? []);
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
      id: result.insertedId
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
    result ? res.send() : res.status(500).send("Failed to update task");
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
    result ? res.send() : res.status(500).send("Failed to delete task");
  }
  catch (error: any) {
    console.error(error);
    res.status(500).send(`Failed to delete task: ${error.message}`);
  }
});