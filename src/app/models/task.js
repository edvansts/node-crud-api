const mongoose = require("../../database");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  isDone: {
    type: Boolean,
    require: true,
    defaultValue: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
  project: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
