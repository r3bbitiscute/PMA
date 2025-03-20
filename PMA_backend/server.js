import mongoose from "mongoose";
import express from "express";
import { Page, List, Card } from "./schema.js";
import { formConfig } from "./formConfig.js";

// Initialize Express app
const app = express();
app.use(express.json());

// Start server on port 8080
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// Connect to MongoDB
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

/**
 * API endpoints
 */

/*GET*/
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

// Get certain pages data
app.get("/getPage/:page", async (req, res) => {
  const pageName = req.params.page;

  try {
    const data = await Page.findOne({ name: pageName });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error@server.js.getPages: ${error}`);
    console.log("Error@server.js.getPages: ", error);
  }
});

// Get all lists for a specific page
app.get("/getLists/:page", async (req, res) => {
  const pageName = req.params.page;

  try {
    const data = await List.find({ page: pageName });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error@server.js.getLists: ${error}`);
    console.log("Error@server.js.getLists: ", error);
  }
});

// Get all cards for a specific page
app.get("/getCards/:page", async (req, res) => {
  const pageName = req.params.page;

  try {
    const data = await Card.find({ page: pageName });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error@server.js.getCards: ${error}`);
    console.log("Error@server.js.getCards: ", error);
  }
});

// Get form configuration schema for a specific form
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

/*POST*/
// Collection mappings
const collections = {
  pages: Page,
  lists: List,
  cards: Card,
};

// Submit data to MongoDB
app.post("/submitData/:collection", async (req, res) => {
  const collection = req.params.collection;
  const data = req.body;

  try {
    const schema = collections[collection];

    const newEntry = new schema(data);
    await newEntry.save();

    res.status(200).send(`Successfully Created ${collection}: "${data.name}" `);
  } catch (error) {
    res.status(500).send(`Error@server.js.submitData: ${error}`);
    console.log("Error@server.js.submitData: ", error);
  }
});

/*DELETE*/
// Delete a specific "Page"
app.delete("/deletePage/:page", async (req, res) => {
  const page = req.params.page;
  try {
    // Delete the "Page"
    await Page.deleteOne({ name: page });

    // Delete all lists associated with the "Page"
    await List.deleteMany({ page: page });

    // Delete all cards associated with the "Page"
    await Card.deleteMany({ page: page });

    res.status(200).send(`Successfully Deleted ${page}.`);
  } catch (error) {
    res.status(500).send(`Error@server.js.deletePage: ${error}`);
    console.log("Error@server.js.deletePage: ", error);
  }
});

// Delete a specific "List"
app.delete("/deleteList/:page/:list", async (req, res) => {
  const { page, list } = req.params;

  try {
    // Delete the "List"
    await List.findOneAndDelete({
      name: list,
      page: page,
    });

    // Delete all cards associated with the "List"
    await Card.deleteMany({
      list: list,
    });

    res.status(200).send(`Successfully Deleted ${list}.`);
  } catch (error) {
    res.status(500).send(`Error@server.js.deleteList: ${error}`);
    console.log("Error@server.js.deleteList: ", error);
  }
});

// Delete a specific "Card"
app.delete("/deleteCard/:page/:list/:card", async (req, res) => {
  const { page, list, card } = req.params;

  try {
    // Delete the "Card"
    await Card.findOneAndDelete({
      name: card,
      page: page,
      list: list,
    });

    res.status(200).send(`Successfully Deleted ${card}.`);
  } catch (error) {
    res.status(500).send(`Error@server.js.deleteCard: ${error}`);
    console.log("Error@server.js.deleteCard: ", error);
  }
});

/*EDIT*/
// Edit a specific "Page"
app.put("/editPage/:page", async (req, res) => {
  const page = req.params.page;
  const updatedData = req.body;

  try {
    await Page.findOneAndUpdate({ name: page }, updatedData);

    res.status(200).send(`Successfully Edited Page: "${updatedData.name}"`);
  } catch (error) {
    res.status(500).send(`Error@server.js.editPage: ${error}`);
    console.log("Error@server.js.editPage: ", error);
  }
});
