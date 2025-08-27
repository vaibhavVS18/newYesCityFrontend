"use client";
export default function SearchBar() {
  return (
    <div className="mt-14  flex w-[434px] h-[55px] items-center border-gray-300 rounded-full overflow-hidden   shadow-lg shadow-black/60">
      <input
        type="text"
        placeholder="Find Your Perfect Destination"
        className="flex-grow h-[55px]  px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm md:text-base focus:outline-none"
      />
      <button className="bg-blue-600 text-white rounded-full p-1 sm:p-2 m-1 sm:m-2 cursor-pointer">
        🔍
      </button>
    </div>
  );
}
 