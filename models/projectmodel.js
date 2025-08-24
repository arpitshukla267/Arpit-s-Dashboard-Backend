import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  progress: Number,
  technologies: [String],
  imageUrl: String,
  url: String,
  fav: { type: Boolean, default: false }, // ⭐ FIXED
});

export default mongoose.model("Project", projectSchema);
