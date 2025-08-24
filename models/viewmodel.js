// models/viewmodel.js
import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
  {
    userId: String, // optional: track unique user
  },
  { timestamps: true }
);

const PortfolioView = mongoose.model("PortfolioView", viewSchema);
export default PortfolioView;
