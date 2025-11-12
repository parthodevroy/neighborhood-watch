
import React from "react";
import { Link } from "react-router";


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-700 text-white">
      
      <h1 className="text-8xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl mb-4">Oops! Page Not Found</h2>
      <p className="mb-6 text-center max-w-md">
        Looks like you took a wrong turn. The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
