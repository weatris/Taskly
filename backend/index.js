import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/index.js";
import cors from "cors";
import db from "./config/db.js";
import http from "http";
import { setupSocket } from "./config/socketHandler.js";

dotenv.config();

export const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

const app = express();
const server = http.createServer(app);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/", router);

app.get("/", (_, res) => {
  res.send("Its Alive!");
});

setupSocket(server, app);

const port = process.env.PORT || 5000;

db.sequelize
  .authenticate()
  .then(() => {
    return db.sequelize.sync();
  })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error establishing database connection:", err);
  });
