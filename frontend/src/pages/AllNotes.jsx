import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
// import { useNavigate } from "react-router-dom";

export default function AllNotes() {
  // const navigate = useNavigate()
  const [notes, setNotes] = useState([]);

  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user)
  const getAllNotes = async () => {
    try {
      const Notes = await axios.get(`http://localhost:5000/notes/getAllNotes`, {
        withCredentials: true,
      });
      setNotes(Notes.data.allUserNotes);
    } catch (error) {
      console.log("error while getting all notes", error);
    }
  };
  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        All Notes
      </h1>
      <div className="max-w-4xl mx-auto px-4">
        {notes?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes?.map((note) => (
              <Card key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No notes available.</p>
        )}
      </div>
    </div>
  );
}
