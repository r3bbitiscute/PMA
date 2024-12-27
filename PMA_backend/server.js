import mongoose from "mongoose";
import express from "express";
import { Page } from "./schema.js";

// API listening at port 8080
const app = express();
app.use(express.json());

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// Connecting to MongoDB
mongoose
  .connect(
    "mongodb+srv://r3bbitiscute:R3bbitvelicute!@myapp.k1bkj.mongodb.net/?retryWrites=true&w=majority&appName=myapp"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error@server.js; ", error);
  });

/* API endpoints */

// Get all pages
app.get("/getAllPages", async (req, res) => {
  try {
    const data = await pages.find();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error@server.js.getAllPages: ", error);
  }
});

// Create a new page
app.post("/createPage", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send("Error@server.js.createPage: ", error);
  }
});
