import express from "express";
import { getDashboardStats } from "../controllers/statsController.js";

const router = express.Router();

router.get("/", getDashboardStats); // GET /api/stats

export default router;
