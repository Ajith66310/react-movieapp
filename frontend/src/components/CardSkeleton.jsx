import React from "react";

const CardSkeleton = () => {
  return (
    <div
      className="bg-gray-900 rounded-xl overflow-hidden shadow-md animate-pulse 
                 flex flex-col h-full"
    >
      {/* Poster Skeleton */}
      <div className="relative">
        <div className="w-full h-[350px] bg-gray-800"></div>
      </div>

      {/* Text Skeleton */}
      <div className="p-4 space-y-3 grow">
        <div className="h-5 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
