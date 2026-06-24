// backend/scripts/changePassword.js
// node backend/scripts/changePassword.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config({
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), "../.env"),
});

const EMAIL = "ahmad@sadeed.com"; // ← email of account to update
const NEW_PASSWORD = "my_new_password"; // ← new password

async function changePassword() {
  await mongoose.connect(process.env.MONGO_URI);
  const { default: User } = await import("../models/User.js");

  const user = await User.findOne({ email: EMAIL });
  if (!user) {
    console.log("❌ User not found");
    process.exit(1);
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(NEW_PASSWORD, salt);
  await user.save();

  console.log(`✅ Password updated for ${EMAIL}`);
  await mongoose.disconnect();
  process.exit(0);
}

changePassword();
