import mongoose from "mongoose";

const InspectionSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    sections: {
      mechanical: Number,
      structural: Number,
      exterior: Number,
      interior: Number,
      notes: String,
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Inspection = mongoose.model("Inspection", InspectionSchema);
