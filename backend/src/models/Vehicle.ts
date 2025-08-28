import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
  {
    vin: { type: String, required: true, unique: true },
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    trim: String,
    mileage: Number,
    color: String,
    purchasePrice: Number,
    repairCosts: Number,
    fees: Number,
    salePrice: Number,
    status: {
      type: String,
      enum: ["acquired", "recon", "ready", "listed", "sold"],
      default: "acquired",
    },
    titleStatus: String,
    location: String,
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
    inspections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Inspection" }],
    score: { type: mongoose.Schema.Types.ObjectId, ref: "Score" },
    sale: { type: mongoose.Schema.Types.ObjectId, ref: "Sale" },
    history: {
      ownersCount: Number,
      accidents: [String],
      services: [String],
      titleBrands: [String],
      recalls: [String],
    },
  },
  { timestamps: true }
);

export const Vehicle = mongoose.model("Vehicle", VehicleSchema);
