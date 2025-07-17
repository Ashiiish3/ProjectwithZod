import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to Our Website
      </h1>
      <p className="text-gray-600 text-center max-w-xl mb-6">
        This is a simple home page built with Vite and Tailwind CSS. You can
        customize it as you like!
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>
  );
}
