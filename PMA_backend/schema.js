import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    collection: "pages",
  }
);

export const Page = mongoose.model("Page", pageSchema);
