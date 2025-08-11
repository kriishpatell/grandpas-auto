import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    total: { type: Number, required: true },
    subscores: {
      history: Number,
      mechanical: Number,
      exterior: Number,
      market: Number,
    },
    weights: mongoose.Schema.Types.Mixed, // e.g. { history: 0.25, mechanical: 0.35, ... }
    reasons: [String],
  },
  { timestamps: true }
);

export const Score = mongoose.model("Score", ScoreSchema);
