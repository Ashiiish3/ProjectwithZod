import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
    const {noteId} = useParams()
    const navigate = useNavigate();
    const [noteDetails, setNoteDetails] = useState({})

  const getNoteDetails = async () => {
    console.log(noteId);
    try {
        const res = await axios.get(`http://localhost:5000/notes/getnote/${noteId}`, { withCredentials: true });
        setNoteDetails(res.data.note || "")
        
    } catch (error) {
        console.log("Error while fetching note details", error);
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNoteDetails(prev => ({...prev, [name]: value}));
  }

  const UpdateNote = async (e)=> {
    e.preventDefault()
    try {
        const res = await axios.put(`http://localhost:5000/notes/updateNote/${noteId}`, noteDetails, { withCredentials: true });
        console.log(res.data)
        alert(res.data.message || "Note updated successfully.");
        navigate("/AllNotes");
    } catch (error) {
        console.log("Error while updating note", error);
        
    }
  }


  useEffect(() => {
    getNoteDetails();
  }, [noteId]);

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
