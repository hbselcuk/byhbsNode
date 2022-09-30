import dotenv from "dotenv";
dotenv.config(); // load first to set env vars
import connectDatabase from "./config/database";

import express from "express";
import cors from "cors";
import Storage from "./config/s3-storage";

const app = express();
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const PORT = process.env.PORT || 4000;

/******************* Connect to DB **********************/
connectDatabase();

/******************** Test Routes**********************/
app.post("/uploadurl", (req, res) => {
  const { extension, key } = req.body;
  const url = Storage.getUploadUrl(key, extension);

  res.json(url);
});

const server = app.listen(PORT, () =>
  console.log(`App listening on port: ` + PORT)
);
