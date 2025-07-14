const mongoose = require("mongoose");

const connectWithDB = mongoose.connect("mongodb://127.0.0.1:27017/ProjectZod")

module.exports = connectWithDB;