import React from "react";

const Card = ({ movie }) => {
  const handleLike = async () => {
    alert(`Liked: ${movie.title || movie.name}`);
  };

  // ✅ Use the correct field name from API: movie.poster_url
  const image =
    movie?.poster_url ||
    movie?.poster ||
    movie?.image_url ||
    (movie?.id
      ? `https://cdn.watchmode.com/posters/${movie.id}_poster_w185.jpg`
      : "https://via.placeholder.com/300x450?text=No+Image");

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 relative">
      {/* Poster Image */}
      <div className="relative">
        <img
          src={image}
          alt={movie?.title || movie?.name || "Movie Poster"}
          className="w-full h-64 object-cover"
        />

        {/* Overlay + Like Button */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition flex justify-end items-start p-3">
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
        <h3 className="text-lg font-semibold truncate">
          {movie?.title || movie?.name || "Untitled"}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          Release: {movie?.year || movie?.release_date || "Unknown"}
        </p>
        {movie?.genre_names && (
          <p className="text-xs text-gray-500 mt-1">
            {movie.genre_names.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
