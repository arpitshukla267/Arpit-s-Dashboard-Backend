// routes/projectRoutes.js
import express from "express";
import {
  addProject,
  getAllProjects,
  toggleFav,
  deleteProject, // ✅ import
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", addProject);
router.get("/", getAllProjects);
router.patch("/:id/fav", toggleFav);
router.delete("/:id", deleteProject); // ✅ new delete route

export default router;
