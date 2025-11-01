import React from "react";

const Favourite = () => {
  return (
    <div className=" flex flex-col items-center justify-center bg-black text-white px-6 pt-28">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
          Your Favourites ❤️
        </h2>

        <div className="bg-gray-900 pt-10 rounded-2xl shadow-lg border border-gray-800">
          <h3 className="text-lg text-gray-400 font-medium">
            No favourite movies yet
          </h3>
          <p className="text-sm text-red-500 mt-2">
            Start adding movies to your favourites by clicking the 🤍 icon.
          </p>
        </div>

        <div className="mt-8">
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition">
            Browse Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
