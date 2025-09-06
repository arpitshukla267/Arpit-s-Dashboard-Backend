// routes/projectRoutes.js
import express from "express";
import {
  addProject,
  getAllProjects,
  toggleFav,
  deleteProject,
  updateProject 
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", addProject);
router.get("/", getAllProjects);
router.patch("/:id/fav", toggleFav);
router.delete("/:id", deleteProject); 
router.put("/:id", updateProject); 

export default router;
