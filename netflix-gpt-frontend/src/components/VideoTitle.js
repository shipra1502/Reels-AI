import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] md:pt-[15%] px-6 md:px-24 absolute text-white">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:my-0">
        <button className="bg-white text-black py-1 px-3 md:py-4 md:px-12 rounded-md md:rounded-lg text-base md:text-lg font-semibold hover:bg-opacity-80 transition">
          ▶︎ Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white py-2 px-6 md:py-4 md:px-12 rounded-md md:rounded-lg text-base md:text-lg font-semibold bg-opacity-50 hover:bg-opacity-30 transition">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
