const express = require("express");
const Product = require("../models/Product");
const protect = require("../middleware/auth");

const router = express.Router();

// GET /api/products - public, list products (optional ?category=slug or id, ?search=text)
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/products/:id - public, single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name slug");
    if (!product) return res.status(404).json({ message: "Product পাওয়া যায়নি" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/products - admin only, create product
router.post("/", protect, async (req, res) => {
  try {
    const { name, description, price, oldPrice, stock, images, category, featured } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, category আবশ্যক" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      oldPrice: oldPrice || null,
      stock: stock || 0,
      images: images || [],
      category,
      featured: !!featured,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/products/:id - admin only, update product
router.put("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product পাওয়া যায়নি" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/products/:id - admin only, delete product
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product পাওয়া যায়নি" });

    await product.deleteOne();
    res.json({ message: "Product ডিলিট হয়েছে" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
