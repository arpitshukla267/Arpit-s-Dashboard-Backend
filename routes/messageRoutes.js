import express from "express";
import {
  submitMessage,
  getAllMessages,
  getMessageById,
  toggleReadStatus,
  toggleStarStatus,
  deleteMessage
} from "../controllers/messageController.js";

const router = express.Router();

// 📩 Create
router.post("/global-submit", submitMessage);

// 📥 Read
router.get("/", getAllMessages);
router.get("/:id", getMessageById);

// ✏️ Update
router.patch("/:id/toggle-read", toggleReadStatus);
router.patch("/:id/toggle-star", toggleStarStatus);

// 🗑️ Delete
router.delete("/:id", deleteMessage);

export default router;
