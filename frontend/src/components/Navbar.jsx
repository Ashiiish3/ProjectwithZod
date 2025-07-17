import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">MyLogo</div>
      <div
        className={`flex-col md:flex md:flex-row md:items-center md:static absolute bg-white left-0 w-full md:w-auto md:space-x-6 transition-all duration-300 ease-in`}
      >
        <Link
          to="/"
          className="block px-4 py-2 text-gray-700 hover:text-blue-600"
        >
          Home
        </Link>
        <Link
          to="/AllNotes"
          className="block px-4 py-2 text-gray-700 hover:text-blue-600"
        >
          Notes
        </Link>
        <Link
          to="/createNote"
          className="block px-4 py-2 text-gray-700 hover:text-blue-600"
        >
          +
        </Link>
        <button className="m-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Link to={"/register"}>Register</Link>
        </button>
        <button className="m-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Link to={"/login"}>Login</Link>
        </button>
        
        {user?.role === "admin" && (
          <button className="m-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Link to={"/getAllNotes"}>Admin</Link>
          </button>
        )}
      </div>
    </nav>
  );
}
