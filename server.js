import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/projectRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "https://camperz-three.vercel.app/","https://arpit-s-portfolio-mu.vercel.app/", "https://arpit-s-dashboard.vercel.app/"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb+srv://shuklaarpit440:xwvcF71gxIKRzQJf@cluster0.tduy54y.mongodb.net/dashboard"
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.get("/", (req, res) => res.send("Welcome to the backend API!"));
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/stats", statsRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
