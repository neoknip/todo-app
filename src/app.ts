import express, { Express } from "express";
import dotenv from "dotenv";
import { initializeDB } from "./services/db-service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

initializeDB().then(() => {
  app.use(express.static("public"));

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})
.catch((error) => {
  console.error(`[server]: Error initializing database: ${error}`);
  process.exit(1);
});

