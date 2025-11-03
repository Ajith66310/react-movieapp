import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useMovieContext } from "../contexts/MovieContext";

const Card = ({ movie }) => {
  const { addToFavourites, removeFromFavourites, isFavourite } = useMovieContext();
  const [liked, setLiked] = useState(false);

  // Sync liked state with context
  useEffect(() => {
    setLiked(isFavourite(movie.id));
  }, [movie.id, isFavourite]);

  const handleLike = (e) => {
    e.preventDefault();
    if (liked) {
      removeFromFavourites(movie.id);
    } else {
      addToFavourites(movie);
    }
    setLiked(!liked);
  };

  const image =
    movie?.poster_url ||
    movie?.poster ||
    movie?.image_url ||
    (movie?.id
      ? `https://cdn.watchmode.com/posters/${movie.id}_poster_w185.jpg`
      : "https://via.placeholder.com/300x450?text=No+Image");

  return (
    <div
      className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                 transition duration-300 transform hover:scale-105 
                 relative flex flex-col h-full"
    >
      {/* Poster Image */}
      <div className="relative group overflow-hidden grow">
        <img
          src={image}
          alt={movie?.title || movie?.name || "Movie Poster"}
          className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 flex items-center justify-center w-10 h-10
                     border-2 border-white text-white rounded-full 
                     bg-black/40 backdrop-blur-sm hover:bg-red-600 hover:border-red-600
                     transition-all duration-300"
        >
          {liked ? (
            <FaHeart className="text-red-500 text-xl transition-transform duration-300 transform scale-110" />
          ) : (
            <FaRegHeart className="text-white/50 text-xl blur-[0.5px] transition duration-300" />
          )}
        </button>
      </div>

      {/* Movie Info */}
      <div className="p-4 text-white shrink-0">
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
