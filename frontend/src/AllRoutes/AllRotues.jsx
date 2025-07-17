import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AllNotes from "../pages/AllNotes";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { PrivateRoute } from "../components/PrivateRoute";
import CreateNote from "../pages/CreateNote";
import EditNote from "../pages/EditNote";
import AllNotesAdmin from "../admin/AllNotesAdmin";
import EditNoteAdmin from "../admin/EditNoteAdmin";

export default function AllRotues() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/allNotes"
        element={
          <PrivateRoute>
            <AllNotes />
          </PrivateRoute>
        }
      />
      <Route
        path="/createNote"
        element={
          <PrivateRoute>
            <CreateNote />
          </PrivateRoute>
        }
      />
      <Route path="/editNote/:noteId" element={<EditNote />} />

      {/* Routes for Admin */}
      <Route
        path="/getAllNotes"
        element={
          <PrivateRoute>
            <AllNotesAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/editNoteAdmin/:noteId"
        element={
          <PrivateRoute>
            <EditNoteAdmin />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>Page not found.</h1>} />
    </Routes>
  );
}
