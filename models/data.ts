import mongoose from "mongoose";

const Todo = new mongoose.Schema({
  bin_tax_code: String,
  company_name: String,
  sub_orders: [
    {
      date_to_storage: Number,
      date_to_come_order: String,
      document_number: Number,
      document_type: String,
      description: String,
    },
  ],
});
export const User = mongoose.models.Todo || mongoose.model("Todo", Todo);
