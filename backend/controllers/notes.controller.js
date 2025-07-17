const notesModel = require("../models/notes.model");

const createNotes = async (req, res) => {
  try {
    const { title, year, content } = req.body;
    if (!title || !year || !content) {
      return res.json({ message: "All field required.", success: false });
    }
    const note = await notesModel.create({
      title,
      year,
      content,
      userId: req.user._id,
    });
    return res.json({ message: "Note has been created successfully.", note, success: true });
  } catch (error) {
    return res.json({ message: "error while creating notes", error, success: false });
  }
};

const getNotes = async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await notesModel.findById(noteId);
    if (note.userId != req.user._id) {
      return res
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
    const userId = req.user._id;
    if (!userId) {
      return res.json({ message: "ID is required" });
    }
    const allUserNotes = await notesModel.find({ userId });
    if (allUserNotes.length == 0) {
      return res.json({ message: "No notes found." });
    }
    return res.json({ message: "getting All user Notes", allUserNotes });
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
      return res.json({ message: "Notes not Exist." });
    }
    await notesModel.findByIdAndDelete(noteId);
    return res.status(200).json({ message: "Note has been deleted.", success:true });
  } catch (error) {
    console.log("error while deleting note", error);
    return res.json({ message: "error while deleting note", error, success: false });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, year, content } = req.body;
    if (!noteId) {
      return res.json({ message: "Note id is not found.", success: false });
    }
    const note = await notesModel.findById(noteId);
    console.log(note);
    if (!note) {
      return res.json({ message: "note not found." , success: false});
    }
    const updatedNote = await notesModel.findByIdAndUpdate(noteId, {
      title,
      year,
      content,
    });
    return res.json({ message: "note has been updated.", updatedNote, success: true });
  } catch (error) {
    console.log("error while deleting note", error);
    return res.json({ message: "error while deleting note", error, success: false });
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
    return res.json({ message: "note getting", note });
  } catch (error) {
    console.log("error while getting single note by admin", error);
    return res.json({ message: "error while getting single note by admin", error });
  }
};

const deleteNoteByAdmin = async (req, res) => {
  try {
    const { noteId } = req.params;
    if (!noteId) {
      return res.json({ message: "note is note found", success: false });
    }
    const isNoteExist = await notesModel.findById(noteId);
    if (!isNoteExist) {
      return res.status(400).json({ message: "Note not Exist.", success: false });
    }
    await notesModel.findByIdAndDelete(noteId);
    return res.status(200).json({ message: "Note has been deleted.", success: true });
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
      res.json({ message: "note id not found.", success: false });
    }
    const isNoteExist = await notesModel.findById(noteId);
    if (!isNoteExist) {
      return res.status(400).json({ message: "Note not Exist.", success: false });
    }
    const updatedNote = await notesModel.findByIdAndUpdate(noteId, {
      title,
      content,
      year,
    });
    return res.json({ message: "notes updated successfully.", updatedNote, success: true });
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