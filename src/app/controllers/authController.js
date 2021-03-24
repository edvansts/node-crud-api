const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { isAfter } = require("date-fns");

const mailer = require("../../modules/mailer");
const authConfig = require("../../config/auth.json");

const User = require("../models/user");

const router = express.Router();

function generateToken(params = {}) {
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 60 * 60 * 24 * 7, //7 dias
  });

  return token;
}

router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "User email already exists" });

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (error) {
    return res.status(400).send({ error: "Registration failed" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).send({ error: "User not found" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ error: "Passoword incorrect" });

    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (error) {
    return res.status(400).send({ error: "Authentication failed" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ error: "User not found" });

    const token = crypto.randomBytes(20).toString("hex");

    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 1);
  
    await User.updateMany(
      { _id: user._id },
      {
        $set: {
          passwordResetToken: token,
          passwordResetExpiresIn: expiresIn,
        },
      }
    );

    mailer.sendMail(
      {
        to: email,
        from: "edvan.stt02@gmail.com",
        template: "auth/forgot-password",
        context: { token },
      },
      (err) => {
        if (err)
          return res
            .status(400)
            .send({ error: "Cannot send forgot password email" });

        res.send();
      }
    );
  } catch (err) {
    res
      .status(400)
      .send({ error: "Error on forgot password, try again in few minutes." });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, newPassword, token } = req.body;

  try {
    const user = await User.findOne({ email }).select([
      "+passwordResetToken",
      "+passwordResetExpiresIn",
    ]);

    if (!user) return res.status(400).send({ error: "User not found" });

    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: "Token invalid" });

    if (isAfter(new Date(), user.passwordResetExpiresIn,))
      return res.status(400).send({ error: "Token expired" });

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpiresIn = undefined;

    await user.save();

    const userUpdated = await User.findOne({ _id: user.id });

    res.send({ user: userUpdated });
  } catch (err) {
    res
      .status(400)
      .send({ error: "Error on forgot password, try again in few minutes." });
  }
});

module.exports = (app) => app.use("/auth", router);
