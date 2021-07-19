const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const taskRouter = new express.Router();

taskRouter.post("/tasks", auth, async (req, res) => {
  // console.log(req.body);
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    const result = await task.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt_desc
taskRouter.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({});
    // const tasks = await Task.find({
    //   owner: req.user._id,
    // });
    const match = {};
    const sort = {};
    const completed = req.query.completed;
    if (completed) {
      match.completed = completed === "true";
    }
    const sortBy = req.query.sortBy;
    if (sortBy) {
      const parts = sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.get("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findById({ _id: req.params.id });
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.patch("/tasks/:id", auth, async (req, res) => {
  const allowedList = ["completed", "description"];
  const updateData = Object.keys(req.body);

  const isValidUpdateEntry = updateData.every((update) =>
    allowedList.includes(update)
  );

  if (!isValidUpdateEntry) {
    return res.status(400).send({ error: "Invalid keys for update!" });
  }

  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    // const task = await Task.findByIdAndUpdate(
    //   { _id: req.params.id },
    //   req.body,
    //   { new: true, runValidators: true }
    // );
    if (!task) {
      return res.status(404).send();
    }

    updateData.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();

    return res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.delete("/tasks/:id", auth, async (req, res) => {
  // console.log(req.params);

  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = taskRouter;
