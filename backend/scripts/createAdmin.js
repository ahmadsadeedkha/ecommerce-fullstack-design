// backend/scripts/createAdmin.js
// Run from the backend folder:
//   node scripts/createAdmin.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); // loads backend/.env when run from backend/

// ── Change these ──────────────────────────────────────────────────────────────
const ADMIN_NAME = "Ahmad";
const ADMIN_EMAIL = "ahmad@sadeed.com";
const ADMIN_PASSWORD = "change_this_password";
// ─────────────────────────────────────────────────────────────────────────────

// Define schema inline — no import, no hook issues
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existing = await User.findOne({ email: ADMIN_EMAIL });

    if (existing) {
      if (!existing.isAdmin) {
        existing.isAdmin = true;
        await existing.save();
        console.log("✅ Promoted existing user to admin.");
      } else {
        console.log("✅ Admin already exists. Nothing changed.");
      }
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, salt);

    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashed,
      isAdmin: true,
    });

    console.log(`✅ Admin created: ${ADMIN_EMAIL}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();
