import React from "react";
import Card from "../components/Card";
import { useMovieContext } from "../contexts/MovieContext";

const Favourite = () => {
  const { favourites } = useMovieContext();

  return (
    <div className="bg-black min-h-screen pt-24 px-4">
      {favourites && favourites.length > 0 ? (
        <div
          className="grid gap-6 
                     grid-cols-2 sm:grid-cols-2 
                     md:grid-cols-3 lg:grid-cols-4 
                     p-4 sm:p-10"
        >
          {favourites.map((movie) => (
            <Card movie={movie} key={movie.id || movie.title} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-white text-xl mt-20">
          <h3>No favourite movies...</h3>
        </div>
      )}
    </div>
  );
};

export default Favourite;
