const notesModel = require("../models/notes.model");

const createNotes = async (req, res) => {
  try {
    const { title, year, content } = req.body;
    if (!title || !year || !content) {
      res.json({ message: "All field required." });
    }
    const note = await notesModel.create({
      title,
      year,
      content,
      userId: req.user._id,
    });
    return res.json({ message: "Note has been created successfully.", note });
  } catch (error) {
    console.log("error while creating notes", error);
    res.json({ message: "error while creating notes", error });
  }
};

const getNotes = async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await notesModel.findById(noteId);
    if (note.userId != req.user._id) {
      return res
        .status(400)
        .json({ message: "You don't have permission to get this Note." });
    }
    res.json({ message: "get Note", note });
  } catch (error) {
    console.log("error while getting a note", error);
    res.json({ message: "error while getting a note", error });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "ID is required" });
    }
    const allUserNotes = await notesModel.find({ userId });
    if (allUserNotes.length == 0) {
      return res.status(400).json({ message: "No notes found." });
    }
    res.status(200).json({ message: "getting All user Notes", allUserNotes });
  } catch (error) {
    console.log("error while getting all notes", error);
    res.json({ message: "error while getting all notes", error });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const isNoteExist = await notesModel.findById(noteId);
    if (!isNoteExist) {
      return res.status(400).json({ message: "Notes not Exist." });
    }
    await notesModel.findByIdAndDelete(noteId);
    res.status(200).json({ message: "Note has been deleted." });
  } catch (error) {
    console.log("error while deleting note", error);
    res.json({ message: "error while deleting note", error });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, year, content } = req.body;
    if (!noteId) {
      res.json({ message: "Note id is not found." });
    }
    const note = await notesModel.findById(noteId);
    console.log(note);
    if (!note) {
      res.json({ message: "note not found." });
    }
    const updatedNote = await notesModel.findByIdAndUpdate(noteId, {
      title,
      year,
      content,
    });
    res.json({ message: "note has been updated.", updatedNote });
  } catch (error) {
    console.log("error while deleting note", error);
    res.json({ message: "error while deleting note", error });
  }
};



// controllers for admin
const getAllNotesByAdmin = async (req, res) => {
  try {
    const allNotes = await notesModel.find();
    if (!allNotes.length > 0) {
      return res.status(400).json({ message: "Notes not exist." });
    }
    res.json({ message: "Getting All Notes", allNotes });
  } catch (error) {
    console.log("error while getting note by admin", error);
    res.json({ message: "error while getting note by admin", error });
  }
};

const getsingleNoteByAdmin = async (req, res) => {
  try {
    const { noteId } = req.params;
    if (!noteId) {
      res.json({ message: "note is note found" });
    }
    const note = await notesModel.findById(noteId);
    if (!note) {
      return res.status(400).json({ message: "Notes not Exist." });
    }
    res.json({ message: "note getting", note });
  } catch (error) {
    console.log("error while getting single note by admin", error);
    res.json({ message: "error while getting single note by admin", error });
  }
};

const deleteNoteByAdmin = async (req, res) => {
  try {
    const { noteId } = req.params;
    if (!noteId) {
      res.json({ message: "note is note found" });
    }
    const isNoteExist = await notesModel.findById(noteId);
    if (!isNoteExist) {
      return res.status(400).json({ message: "Note not Exist." });
    }
    await notesModel.findByIdAndDelete(noteId);
    res.status(200).json({ message: "Note has been deleted." });
  } catch (error) {
    console.log("error while delete note by admin", error);
    res.json({ message: "error while delete note by admin", error });
  }
};

const updateNoteByAdmin = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, year } = req.body;
    if (!noteId) {
      res.json({ message: "note id not found." });
    }
    const isNoteExist = await notesModel.findById(noteId);
    if (!isNoteExist) {
      return res.status(400).json({ message: "Note not Exist." });
    }
    const updatedNote = await notesModel.findByIdAndUpdate(noteId, {
      title,
      content,
      year,
    });
    res.json({ message: "notes updated successfully.", updatedNote });
  } catch (error) {
    console.log("error while updating note by admin", error);
    res.json({ message: "error while updating note by admin", error });
  }
};



module.exports = {
  createNotes,
  getNotes,
  getAllNotes,
  deleteNote,
  updateNotes,
  getAllNotesByAdmin,
  getsingleNoteByAdmin,
  deleteNoteByAdmin,
  updateNoteByAdmin,
};