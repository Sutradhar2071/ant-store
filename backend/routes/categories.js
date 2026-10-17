const express = require("express");
const Category = require("../models/Category");
const Product = require("../models/Product");
const protect = require("../middleware/auth");

const router = express.Router();

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// GET /api/categories - public, list all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/categories - admin only, create category
router.post("/", protect, async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category নাম দিন" });
    }

    const slug = slugify(name);
    const exists = await Category.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: "এই নামে category আগে থেকেই আছে" });
    }

    const category = await Category.create({ name: name.trim(), slug, image: image || "" });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/categories/:id - admin only, update category
router.put("/:id", protect, async (req, res) => {
  try {
    const { name, image } = req.body;
    const update = {};
    if (name && name.trim()) {
      update.name = name.trim();
      update.slug = slugify(name);
    }
    if (image !== undefined) update.image = image;

    const category = await Category.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!category) return res.status(404).json({ message: "Category পাওয়া যায়নি" });

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/categories/:id - admin only, delete category
router.delete("/:id", protect, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category পাওয়া যায়নি" });

    const productCount = await Product.countDocuments({ category: category._id });
    if (productCount > 0) {
      return res.status(400).json({
        message: `এই category তে ${productCount} টি product আছে। আগে product গুলো ডিলিট বা অন্য category তে সরান।`,
      });
    }

    await category.deleteOne();
    res.json({ message: "Category ডিলিট হয়েছে" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
