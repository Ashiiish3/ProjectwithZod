import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { useNavigate } from "react-router-dom";

export default function AllNotesAdmin() {
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();

  const getAllNotesByAdmin = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/notes/getAllNotesAdmin`,
        { withCredentials: true }
      );
      setAllNotes(res.data.allNotes);
      if (res?.data?.success === false) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error while getting all notes by admin", error);
    }
  };
  useEffect(() => {
    getAllNotesByAdmin();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-center font-bold mb-5">All Notes</h1>
        <div>
          {allNotes?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {allNotes?.map((note) => (
                <AdminCard key={note._id} note={note} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No notes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}