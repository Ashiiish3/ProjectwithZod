const express = require("express");
const {
  createNotes,
  getNotes,
  getAllNotes,
  deleteNote,
  updateNotes,
  getAllNotesByAdmin,
  getsingleNoteByAdmin,
  deleteNoteByAdmin,
  updateNoteByAdmin,
} = require("../controllers/notes.controller");
const Auth = require("../middlewares/Auth");
const Admin = require("../middlewares/Admin");

const notesRouter = express.Router();

// user routes for notes
notesRouter.post("/create", Auth, createNotes);
notesRouter.get("/getnote/:noteId", Auth, getNotes);
notesRouter.get("/getAllNotes/:userId", Auth, getAllNotes);
notesRouter.delete("/deleteNote/:noteId", Auth, deleteNote);
notesRouter.put("/updateNote/:noteId", Auth, updateNotes);

// admin routes
notesRouter.get("/getAllNotes", Auth, Admin, getAllNotesByAdmin);
notesRouter.get("/singleNote/:noteId", Auth, Admin, getsingleNoteByAdmin);
notesRouter.delete("/deleteNoteAdmin/:noteId", Auth, Admin, deleteNoteByAdmin);
notesRouter.put("/updateNoteAdmin/:noteId", Auth, Admin, updateNoteByAdmin);

module.exports = notesRouter;
