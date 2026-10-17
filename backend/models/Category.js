const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, default: "" }, // optional image URL for the category card
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
