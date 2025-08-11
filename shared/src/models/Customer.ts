import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactInfo: String,
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sale" }],
    notes: String,
  },
  { timestamps: true }
);

export const Customer = mongoose.model("Customer", CustomerSchema);
