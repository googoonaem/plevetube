import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  password: { type: String },
  name: { type: String, required: true },
  avatarUrl: String,
  location: String,
});

userSchema.pre("save", async function () {
  console.log("users password:", this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log("hashted password:", this.password);
});

const User = mongoose.model("User", userSchema);
export default User;
