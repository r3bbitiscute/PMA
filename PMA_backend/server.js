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
// Get all "Pages"
app.get("/getAllPages", async (req, res) => {
  try {
    const data = await Page.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error@server.js.getAllPages: ${error}`);
    console.log("Error@server.js.getAllPages: ", error);
  }
});

// Get certain "Page"
app.get("/getPage/:page", async (req, res) => {
  const pageName = req.params.page;

  try {
    const data = await Page.findOne({ name: pageName });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error@server.js.getPage: ${error}`);
    console.log("Error@server.js.getPage: ", error);
  }
});

// Get all "Lists" for a specific "Page"
app.get("/getAllLists/:page", async (req, res) => {
  const pageName = req.params.page;

  try {
    const data = await List.find({ page: pageName });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error@server.js.getLists: ${error}`);
    console.log("Error@server.js.getLists: ", error);
  }
});

// Get certain "List"
app.get("/getList/:page/:list", async (req, res) => {
  const { page, list } = req.params;

  try {
    const data = await List.findOne({ name: list, page: page });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error@server.js.getList: ${error}`);
    console.log("Error@server.js.getList: ", error);
  }
});

// Get all "Cards" for a specific "Page"
app.get("/getAllCards/:page", async (req, res) => {
  const pageName = req.params.page;

  try {
    const data = await Card.find({ page: pageName });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error@server.js.getCards: ${error}`);
    console.log("Error@server.js.getCards: ", error);
  }
});

// Get certain "Card"
app.get("/getCard/:page/:list/:card", async (req, res) => {
  const { page, list, card } = req.params;

  try {
    const data = await Card.findOne({
      name: card,
      page: page,
      list: list,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error@server.js.getList: ${error}`);
    console.log("Error@server.js.getList: ", error);
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
    await Page.findOneAndDelete({ name: page });

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
    await List.updateMany({ page: page }, { page: updatedData.name });
    await Card.updateMany({ page: page }, { page: updatedData.name });

    res.status(200).send(`Successfully Edited Page: "${updatedData.name}"`);
  } catch (error) {
    res.status(500).send(`Error@server.js.editPage: ${error}`);
    console.log("Error@server.js.editPage: ", error);
  }
});

// Edit a specific "List"
app.put("/editList/:page/:list", async (req, res) => {
  const { page, list } = req.params;
  const updatedData = req.body;

  try {
    await List.findOneAndUpdate({ name: list, page: page }, updatedData);

    res.status(200).send(`Successfully Edited List: "${updatedData.name}"`);
  } catch (error) {
    res.status(500).send(`Error@server.js.editList: ${error}`);
    console.log("Error@server.js.editList: ", error);
  }
});

// Edit a specific "Card"
app.put("/editCard/:page/:list/:card", async (req, res) => {
  const { page, list, card } = req.params;
  const updatedData = req.body;

  try {
    await Card.findOneAndUpdate(
      { name: card, page: page, list: list },
      updatedData
    );

    res.status(200).send(`Successfully Edited List: "${updatedData.name}"`);
  } catch (error) {
    res.status(500).send(`Error@server.js.editList: ${error}`);
    console.log("Error@server.js.editList: ", error);
  }
});
