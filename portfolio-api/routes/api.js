const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Skill = require("../models/Skill");

// GET all projects
router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find().sort("-createdAt");
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all skills
router.get("/skills", async (req, res) => {
    try {
        const skills = await Skill.find().sort("category");
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new project
router.post("/projects", async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST new skill
router.post("/skills", async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.status(201).json(skill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT update project
router.put("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT update skill
router.put("/skills/:id", async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(skill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE project
router.delete("/projects/:id", async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE skill
router.delete("/skills/:id", async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: "Skill deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
