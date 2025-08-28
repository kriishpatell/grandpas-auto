import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    url: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    mimeType: String,
    size: Number,
  },
  { timestamps: true }
);

export const Photo = mongoose.model("Photo", PhotoSchema);
