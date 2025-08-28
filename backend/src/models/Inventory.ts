import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    location: String,
    quantityAvailable: Number,
    minimumStockLevel: Number,
    maximumStockLevel: Number,
    reorderPoint: Number,
  },
  { timestamps: true }
);

export const Inventory = mongoose.model("Inventory", InventorySchema);
