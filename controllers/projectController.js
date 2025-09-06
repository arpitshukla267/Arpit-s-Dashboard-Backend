// controllers/projectController.js

import Project from "../models/projectmodel.js";

export const addProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ message: "Project created successfully", project });
  } catch (err) {
    console.error("❌ Error creating project:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    console.error("❌ Error fetching projects:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const toggleFav = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.fav = !project.fav;
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ New delete controller
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully", id });
  } catch (err) {
    console.error("❌ Error deleting project:", err.message);
    res.status(500).json({ error: err.message });
  }
};
