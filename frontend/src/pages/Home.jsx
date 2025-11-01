import React, { useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [serachQuery, setSerachQuery] = useState("");

  const movies = [
    { id: 1, title: "Good Bad Ugly", release_date: "2004" },
    { id: 2, title: "John Wick", release_date: "2005" },
    { id: 3, title: "Avatar", release_date: "2006" },
    { id: 4, title: "Lucifer", release_date: "2007" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(serachQuery);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10 pt-28">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-row sm:flex-row gap-3 justify-center items-center mb-10 flex-wrap"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          value={serachQuery}
          onChange={(e) => setSerachQuery(e.target.value)}
          className="w-[70%] md:w-1/2 px-4 py-3 rounded-lg bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition"
        >
          Search
        </button>
      </form>


      {/* Movie Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
