// Dependencies
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// Import router
import router from "./routes/router.ts";

import mongoose from "mongoose";

dotenv.config({ path: "src/.env" });

console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI!);

app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established!");
});
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Use vehicle routes (all starting with /api/vehicles)
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
