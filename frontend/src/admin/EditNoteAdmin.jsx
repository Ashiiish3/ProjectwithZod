import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNoteAdmin() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [noteDetails, setNoteDetails] = useState({});

  const getSingleNote = async () => {
    try {
      const note = await axios.get(
        `http://localhost:5000/notes/singleNote/${noteId}`,
        { withCredentials: true }
      );
      console.log(note.data.note);
      setNoteDetails(note.data.note);
    } catch (error) {
      console.error("Error fetching note:", error);
      alert("Failed to fetch note details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteDetails((prev) => ({ ...prev, [name]: value }));
  };

  const UpdateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/notes/updateNoteAdmin/${noteId}`,
        noteDetails,
        { withCredentials: true }
      );
      if (response.data.success) {
        alert(response.data.message);
        navigate("/getAllNotes");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Failed to update note.");
    }
  }

  useEffect(() => {
    getSingleNote();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8">
        <h1 className="text-2xl text-center font-bold">Edit Note</h1>
        <form className="space-y-4" onSubmit={UpdateNote}>
          <div>
            <label className="block">Title</label>
            <input
              type="text"
              name="title"
              value={noteDetails.title || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter note title"
            />
          </div>
          <div>
            <label className="block">Content</label>
            <textarea
              name="content"
              value={noteDetails.content || ""}
                onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter note content"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block">Year</label>
            <input
              type="number"
              name="year"
              value={noteDetails.year || ""}
                onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter year"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
