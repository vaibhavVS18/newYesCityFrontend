"use client";
import React from "react";

export default function SearchBar2() {
  return (
    <div className="m-20 flex items-center justify-center">
      <div className="flex items-center p-1 border border-gray-200 rounded-full overflow-hidden max-w-sm w-full shadow-sm shadow-black/80">
        <input
          type="text"
          placeholder="Give your Experience..."
          className="flex-grow px-3  focus:outline-none text-sm shadow-inner"
        />
        <button className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-xl font-bold">
          →
        </button>
      </div>
    </div>
  );
}
