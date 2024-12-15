const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Skill = require("../models/Skill");

// Admin dashboard
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find().sort("-createdAt");
        const skills = await Skill.find().sort("category");
        res.render("admin/dashboard", { projects, skills });
    } catch (error) {
        next(error);
    }
});

// Projects management
router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find().sort("-createdAt");
        res.render("admin/projects", { projects });
    } catch (error) {
        next(error);
    }
});

// New project form
router.get("/projects/new", (req, res) => {
    res.render("admin/projects/new");
});

// Create project
router.post("/projects", async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.redirect("/admin/projects");
    } catch (error) {
        res.render("admin/projects/new", { 
            error: error.message,
            project: req.body
        });
    }
});

// Edit project form
router.get("/projects/:id/edit", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.render("admin/projects/edit", { project });
    } catch (error) {
        next(error);
    }
});

// Update project
router.put("/projects/:id", async (req, res) => {
    try {
        await Project.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/admin/projects");
    } catch (error) {
        res.render("admin/projects/edit", {
            error: error.message,
            project: { ...req.body, _id: req.params.id }
        });
    }
});

// Delete project
router.delete("/projects/:id", async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.redirect("/admin/projects");
    } catch (error) {
        next(error);
    }
});

// Skills management
router.get("/skills", async (req, res) => {
    try {
        const skills = await Skill.find().sort("category");
        res.render("admin/skills", { skills });
    } catch (error) {
        next(error);
    }
});

// New skill form
router.get("/skills/new", (req, res) => {
    res.render("admin/skills/new");
});

// Create skill
router.post("/skills", async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.redirect("/admin/skills");
    } catch (error) {
        res.render("admin/skills/new", {
            error: error.message,
            skill: req.body
        });
    }
});

// Edit skill form
router.get("/skills/:id/edit", async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        res.render("admin/skills/edit", { skill });
    } catch (error) {
        next(error);
    }
});

// Update skill
router.put("/skills/:id", async (req, res) => {
    try {
        await Skill.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/admin/skills");
    } catch (error) {
        res.render("admin/skills/edit", {
            error: error.message,
            skill: { ...req.body, _id: req.params.id }
        });
    }
});

// Delete skill
router.delete("/skills/:id", async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.redirect("/admin/skills");
    } catch (error) {
        next(error);
    }
});

module.exports = router;
