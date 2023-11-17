import mongoose from "mongoose";

const Todo = new mongoose.Schema({
  text: String,
});
export const User = mongoose.models.Todo || mongoose.model("Todo", Todo);
