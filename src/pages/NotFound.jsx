import React from "react";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {


  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center text-white">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 animate-pulse">
          <img
            src="https://source.unsplash.com/800x600/?error,404"
            alt="404"
            className="opacity-20 object-cover w-full h-full"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center p-4 text-center">
          <h1 className="text-8xl font-extrabold tracking-widest text-yellow-300">
            404
          </h1>
          <p className="text-2xl font-semibold mt-4 mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>

          {/* Animated SVG */}
          <div className="w-48 h-48 mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              className="animate-spin-slow"
            >
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="20"
                strokeDasharray="50,30"
              />
              <circle cx="100" cy="100" r="50" fill="#FFF" />
            </svg>
          </div>

          {/* Button Links */}
          <div className="flex space-x-6">
            <a
              href="/"
              className="px-8 py-3 bg-yellow-400 text-black font-bold text-xl rounded-full shadow-md hover:bg-yellow-500 hover:scale-105 transform transition duration-300"
            >
              <FaHome className="inline-block mr-2" />
              Go Home
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
