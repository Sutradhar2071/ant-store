const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/auth");

const router = express.Router();

// POST /api/orders - public, customer places an order (Cash on Delivery)
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, address, note, items } = req.body;

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ message: "নাম, ফোন, ঠিকানা এবং প্রোডাক্ট আবশ্যক" });
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    const order = await Order.create({
      customerName,
      phone,
      address,
      note: note || "",
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/orders - admin only, list all orders
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/orders/:id/status - admin only, update order status
router.put("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order পাওয়া যায়নি" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/orders/:id - admin only
router.delete("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order পাওয়া যায়নি" });
    await order.deleteOne();
    res.json({ message: "Order ডিলিট হয়েছে" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
