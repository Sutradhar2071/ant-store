require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const run = async () => {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || "admin@antstore.com").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "admin1234";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin আগে থেকেই আছে: ${email}`);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);
  await Admin.create({ name: "Admin", email, password: hashed });

  console.log("Admin account তৈরি হয়েছে!");
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
