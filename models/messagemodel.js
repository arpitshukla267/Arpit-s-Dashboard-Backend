import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  isRead: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false },
});

export default mongoose.model("Message", messageSchema);
