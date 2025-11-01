import React from "react";

const Card = ({ movie }) => {
  const handleLike = async () => {
    alert("clicked");
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 relative">
      <div className="relative">
        <img
          src={movie.url || "https://via.placeholder.com/300x400?text=No+Image"}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        {/* Overlay + Like Button */}
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition flex justify-end items-start p-3">
          <button
            onClick={handleLike}
            className="text-2xl text-white hover:text-red-500 transition"
          >
            🤍
          </button>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-400 mt-1">
          Release: {movie.release_date}
        </p>
      </div>
    </div>
  );
};

export default Card;
