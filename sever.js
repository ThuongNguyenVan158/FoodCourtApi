import express from "express";
import dotenv from "dotenv";
import path from "path";
const body = require("body-parser");
import { sequelize } from "./models";
import rootRouter from "./routers";
import cors from "cors";
dotenv.config();
const app = express();
app.use(body.json());
app.use(express.json());
app.use(cors());
const publicPath = path.join(__dirname, "./public");
app.use("/public", express.static(publicPath));
app.use("/api/v1", rootRouter);
app.listen(5000, async () => {
  console.log("App listening on http://localhost:5000");
  try {
    await sequelize.authenticate();
    console.log("Connection database successfully");
  } catch (error) {
    console.log("Unable to connect to database");
  }
});
