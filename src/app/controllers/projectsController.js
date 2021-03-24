const express = require("express");
const User = require("../models/user");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const { userId } = req.userId;

  try {
    const user = await User.findOne({ id: userId });

    if (!user) return res.status(400).send({ error: "User not found" });

    return res.send({ user });
  } catch (error) {
    res.status(400).send({ error: "User error" });
  }
});

module.exports = (app) => app.use("/projects", router);
