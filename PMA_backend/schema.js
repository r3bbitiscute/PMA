import mongoose from "mongoose";

// Page Schema
const pageSchema = new mongoose.Schema(
  {
    name: String, // Name of the page
  },
  {
    collection: "pages", // Collection name in the database
  }
);

export const Page = mongoose.model("Page", pageSchema);

// List Schema
const listSchema = new mongoose.Schema(
  {
    name: String, // Name of the list
    page: String, // Reference to the page
  },
  {
    collection: "lists", // Collection name in the database
  }
);

export const List = mongoose.model("List", listSchema);

// Card Schema
const cardSchema = new mongoose.Schema(
  {
    name: String, // Name of the card
    date: Date, // Due Date for the card
    page: String, // Reference to the page
    list: String, // Reference to the list
  },
  {
    collection: "cards", // Collection name in the database
  }
);

export const Card = mongoose.model("Card", cardSchema);
