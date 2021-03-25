const express = require("express");
const User = require("../models/user");
const Project = require("../models/project");
const Task = require("../models/task");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const { userId } = req;

  try {
    const projects = await Project.find({ user: userId }).populate("user");

    return res.send({ projects: projects || [] });
  } catch (error) {
    res.status(400).send({ error: "Projects listing error" });
  }
});

router.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findOne({ _id: projectId }).populate(
      "user tasks"
    );

    if (!project) return res.status(400).send({ error: "Project not found" });

    return res.send({ project });
  } catch (error) {
    res.status(400).send({ error: "Project error" });
  }
});

router.post("/", async (req, res) => {
  const { title, description, tasks } = req.body;
  const { userId } = req;

  try {
    if (!title)
      return res.status(400).send({ error: "Title of project required" });
    if (!description)
      return res.status(400).send({ error: "Description of project required" });

    const project = await Project.create({ title, description, user: userId });

    await Promise.all(
      tasks.map(async (task) => {
        const projectTask = new Task({
          ...task,
          project: project.id,
          user: userId,
        });

        const createdTask = await projectTask.save();
        await project.tasks.push(createdTask);
      })
    );

    await project.save();

    return res.send({ project });
  } catch (error) {
    res.status(400).send({ error: "Project creation error" });
  }
});

router.put("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const { title, description, tasks } = req.body;
  const { userId } = req;

  try {
    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;

    const project = await Project.findOneAndUpdate(projectId, updatedFields);

    if (tasks) {
      await Task.deleteMany({ project: project.id });

      project.tasks = [];

      await Promise.all(
        tasks.map(async (task) => {
          const projectTask = new Task({
            ...task,
            project: project.id,
            user: userId,
          });

          const createdTask = await projectTask.save();

          await project.tasks.push(createdTask);
        })
      );
    }

    await project.save();

    return res.send({ project });
  } catch (error) {
    res.status(400).send({ error: "Error updating project" });
  }
});

router.delete("/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findByIdAndDelete({ _id: projectId });

    if (!project)
      return res.status(400).send({ error: "Deleting project error" });

    return res.send({ project });
  } catch (error) {
    res.status(400).send({ error: "Project deleting error" });
  }
});

module.exports = (app) => app.use("/project", router);
