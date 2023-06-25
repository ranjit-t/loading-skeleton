import React from "react";

export default function Loading() {
  const games = Array.from({ length: 20 });

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="font-bold mb-6 text-2xl">Popular Video Games</h1>
      {games.map((_, index) => {
        return (
          <div
            key={index}
            className="border border-gray-100 mb-8 rounded rounded-lg w-[90%] max-w-[700px] max-h-[400px] flex flex-col overflow-hidden shadow-lg"
          >
            <p className="min-h-[40px] mt-2 ml-2 font-bold h-10 w-1/3 bg-gray-300 rounded rounded-lg animate-pulse"></p>
            <p className="min-h-[40px] m-2 font-bold h-10 w-1/4 bg-gray-300 rounded rounded-lg animate-pulse"></p>
            <p className="bg-gray-300 rounded rounded-lg animate-pulse h-[350px] w-[100%]"></p>
          </div>
        );
      })}
    </div>
  );
}
