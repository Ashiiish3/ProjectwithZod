import React from "react";
import axios from "axios";

export default function AdminCard({note}) {
  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/notes/deleteNoteAdmin/${noteId}`, {withCredentials: true});
      console.log(response)
      if (response.data.success) {
        alert(response.data.message);
        window.location.href = '/getAllNotes';
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note.");
    }
  }
  return (
    <div className="bg-gray-200 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
      <p className="text-gray-700">{note.content}</p>
      <p className="text-gray-500 mt-2">Year: {note.year}</p>
      <div className="mt-4">
        <button
          onClick={() => (window.location.href = `/editNoteAdmin/${note._id}`)}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
        >
          Edit
        </button>
        <button
          onClick={() => deleteNote(note._id)}
          className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition ml-2"
        >
          delete
        </button>
      </div>
    </div>
  );
}
