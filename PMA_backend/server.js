import mongoose from "mongoose";
import express from "express";
import { Page } from "./schema.js";
import { formConfig } from "./formConfig.js";

// API listening at port 8080
const app = express();
app.use(express.json());

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// Connecting to MongoDB
mongoose
  .connect(
    "mongodb+srv://r3bbitiscute:R3bbitvelicute!@myapp.k1bkj.mongodb.net/PMA?retryWrites=true&w=majority&appName=myapp"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error@server.js; ", error);
  });

/* API endpoints */

const collections = {
  pages: Page,
};

// Get all pages
app.get("/getAllPages", async (req, res) => {
  try {
    const data = await Page.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error@server.js.getAllPages: ${error}`);
    console.log("Error@server.js.getAllPages: ", error);
  }
});

// Get form config schema
app.get("/getFormConfig/:formName", async (req, res) => {
  const formName = req.params.formName;
  const schema = formConfig[formName];
  if (schema) {
    res.status(200).json(schema);
  } else {
    res.status(500).send("Error@server.js.getFormConfig");
    console.log("Error@server.js.getFormConfig");
  }
});

// Submit Data to mongoDB server
app.post("/submitData/:collection", async (req, res) => {
  const collection = req.params.collection;
  const data = req.body;

  try {
    const schema = collections[collection];

    const newEntry = new schema(data);
    await newEntry.save();

    res.status(200).send(`Success`);
  } catch (error) {
    res.status(500).send(`Error@server.js.getAllPages: ${error}`);
    console.log("Error@server.js.submitData: ", error);
  }
});
