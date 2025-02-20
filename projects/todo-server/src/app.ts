import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initializeDB } from "./services/db.service";
import { todoRouter } from "./routers/todo.router";

dotenv.config();

initializeDB().then(() => {
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(cors());

  //routes
  app.use('/api/todo', todoRouter);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error(`[server]: Error initializing database: ${error}`);
  process.exit(1);
});

