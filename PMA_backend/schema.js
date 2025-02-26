import mongoose from "mongoose";

// Page Schema
const pageSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    collection: "pages",
  }
);

export const Page = mongoose.model("Page", pageSchema);

// List Schema
const listSchema = new mongoose.Schema(
  { name: String, page: String },
  { collection: "lists" }
);

export const List = mongoose.model("List", listSchema);

// Card Schema
const cardSchema = new mongoose.Schema(
  {
    name: String,
    date: Date,
    page: String,
    list: String,
  },
  {
    collection: "cards",
  }
);

export const Card = mongoose.model("Card", cardSchema);
