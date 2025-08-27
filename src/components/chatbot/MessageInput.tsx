"use client";
import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: (message?: string) => void; // accept optional message
}

export default function MessageInput({
  input,
  setInput,
  onSend,
}: MessageInputProps) {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => setShowOptions((prev) => !prev);

  const handleOptionClick = (option: string) => {
    setInput(option);
    setShowOptions(false);
    setTimeout(() => {
      onSend(option);
    }, 50);
  };

  return (
    <div className="fixed bottom-3 left-0 w-full px-4 z-50">
      {/* Options Menu */}
      {showOptions && (
<div className="relative left-50 h-[280px] w-auto inline-block m-4 flex-col gap-4 p-4 rounded-lg border-2 bg-[rgba(255,255,255,0.2)] backdrop-blur-lg overflow-y-auto hide-scrollbar">
  {[
    "Place",
    "Food",
    "Shops",
    "Transport",
    "HiddenGem",
    "Activity",
    "Misc",
    "CityInfo",
    "Itinerary",
    "Connectivity",
    "Accommodation",
  ].map((label) => (
    <div
      key={label}
      onClick={() => handleOptionClick(label)}
      className="
        bg-[rgba(160,210,243,0.6)]
        shadow-md
        w-[140px] h-[60px] rounded-[20px] text-lg font-medium m-3 p-4
        text-white border-[#8CA0DB] border flex justify-center items-center
        backdrop-blur-[25px]
        hover:bg-[#02518E] hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer
      "
    >
      {label}
    </div>
  ))}
</div>

      )}

      {/* Input Row */}
      <div className="flex gap-2 items-center justify-center">
        {/* Toggle Button */}
        <button
          onClick={toggleOptions}
          className="
            p-3 flex items-center justify-center rounded-full 
            bg-blue-500 text-white shadow-md 
            hover:bg-blue-600 hover:scale-105 transition-transform duration-300
          "
        >
          {showOptions ? <X size={20} /> : <Plus size={20} />}
        </button>

        {/* Text Input */}
        <input
          type="text"
          className="
            flex-1 border rounded-xl px-4 py-2 max-w-[799px] 
            outline-none border-gray-300 focus:ring-2 focus:ring-blue-400 
            focus:shadow-md hover:shadow-sm transition-all duration-300
          "
          placeholder="Type a city name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend(input)}
        />

        {/* Send Button */}
        <button
          onClick={() => onSend(input)}
          className="
            bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md 
            hover:bg-blue-700 hover:scale-105 transition-transform duration-300
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}
