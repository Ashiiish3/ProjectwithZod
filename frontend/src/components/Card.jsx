import axios from "axios";
import React from "react";

export default function Card({ note }) {

    const deleteNote = async (noteId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/notes/deleteNote/${noteId}`, {withCredentials: true})
            alert(res.data.message || "Note deleted successfully.");
            window.location.reload();
        } catch (error) {
            console.log("Error while deleting note", error);
        }
    }
  return (
    <div className="bg-gray-200 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
      <p className="text-gray-700">{note.content}</p>
      <p className="text-gray-500 mt-2">Year: {note.year}</p>
      <div className="mt-4">
        <button onClick={()=>window.location.href = `/editNote/${note._id}`} className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition">
          Edit
        </button>
        <button onClick={()=>deleteNote(note._id)} className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition ml-2">
          delete
        </button>
      </div>
    </div>
  );
}