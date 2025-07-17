const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: String,
    year: Number,
    content: String,
    userId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const notesModel = mongoose.model("Note", notesSchema);

module.exports = notesModel;
