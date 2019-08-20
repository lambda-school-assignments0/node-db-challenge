const express = require("express");

const Projects = require("./project-model.js");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const projects = await Projects.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: "Failed to get projects" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Projects.findById(id);
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: `Failed to get project id: ${id}` });
    }
});

router.get("/:id/resources", async (req, res) => {
    const { id } = req.params;

    try {
        const resources = await Projects.findProjResources(id);
        res.json(resources);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get project id: ${id} resources`
        });
    }
});

router.get("/:id/tasks", async (req, res) => {
    const { id } = req.params;

    try {
        const tasks = await Projects.findProjTasks(id);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get project id: ${id} tasks`
        });
    }
});

router.post("/", async (req, res) => {
    const projectInfo = req.body;

    try {
        const added = await Projects.addProj(projectInfo);
        res.json({ message: `Added project id: ${added}` });
    } catch (err) {
        res.status(500).json({
            message: "Failed to add project"
        });
    }
});

router.post("/:id/resources", async (req, res) => {});

router.post("/:id/tasks", async (req, res) => {});

module.exports = router;
