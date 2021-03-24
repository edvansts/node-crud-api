const mongoose = require("../../database");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    lowerCase: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpiresIn: {
    type: Date,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;