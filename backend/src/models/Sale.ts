import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    soldAt: Date,
    salePrice: Number,
    taxes: Number,
    buyer: String, // or ref to Customer
    restrictedToOwner: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Sale = mongoose.model("Sale", SaleSchema);
