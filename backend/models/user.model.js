const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
