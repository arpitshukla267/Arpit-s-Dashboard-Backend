import Message from "../models/messagemodel.js";

// 📩 Create new message (submit form)
export const submitMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({
      message: "Message sent successfully",
      data: message,
    });
  } catch (err) {
    console.error("❌ Error sending message:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 📥 Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Error fetching messages:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 📄 Get single message
export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json(message);
  } catch (err) {
    console.error("❌ Error fetching message:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Mark message as read/unread
export const toggleReadStatus = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    message.isRead = !message.isRead;
    await message.save();

    res.json({ message: "Read status updated", data: message });
  } catch (err) {
    console.error("❌ Error updating read status:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ⭐ Toggle starred
export const toggleStarStatus = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    message.isStarred = !message.isStarred;
    await message.save();

    res.json({ message: "Starred status updated", data: message });
  } catch (err) {
    console.error("❌ Error updating star status:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting message:", err.message);
    res.status(500).json({ error: err.message });
  }
};
