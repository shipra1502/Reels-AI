import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] md:pt-[15%] px-6 md:px-12 lg:px-24 absolute text-white">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
        {title}
      </h1>
      <p className="hidden md:block py-4 md:py-6 text-sm md:text-base lg:text-lg w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        {overview}
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 md:mt-0">
        <button className="bg-white text-black py-2 px-6 sm:py-3 sm:px-8 md:py-4 md:px-12 rounded-md md:rounded-lg text-base md:text-lg lg:text-xl font-semibold hover:bg-opacity-80 transition">
          ▶︎ Play
        </button>
        <button className="bg-gray-500 text-white py-2 px-6 sm:py-3 sm:px-8 md:py-4 md:px-12 rounded-md md:rounded-lg text-base md:text-lg lg:text-xl font-semibold bg-opacity-50 hover:bg-opacity-30 transition">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
