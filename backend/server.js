require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// Ensure DB is connected before handling any request (works for both
// a normal long-running server AND Vercel serverless functions).
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "ANT STORE API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route পাওয়া যায়নি" });
});

const PORT = process.env.PORT || 5000;

// Only listen on a port when run directly (local dev / traditional hosting).
// On Vercel, the exported `app` is used as a serverless function instead.
if (require.main === module) {
  app.listen(PORT, () => console.log(`ANT STORE API running on port ${PORT}`));
}

module.exports = app;
