const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null }, // optional, for showing discount
    stock: { type: Number, default: 0 },
    images: [{ type: String }], // array of image URLs
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
