import express from "express";
import {
  addProject,
  getAllProjects,
  toggleFav
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", addProject);
router.get("/", getAllProjects);
router.patch("/:id/fav", toggleFav); // ⭐ toggle favorite

export default router;
