import React from 'react';
import { Link } from 'react-router';

const Issue = ({ issu }) => {
  const { title, category, location, description, image, status, amount, _id } = issu;

  return (
    <div className="card bg-card shadow-lg  mt-4 rounded-2xl overflow-hidden flex flex-col h-full">
     
      <img src={image} alt={title} className="h-48 w-full transition-transform duration-900 hover:scale-105 hover:shadow-2xl object-cover" />

      
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl text-collor font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          <span className="text-lg font-semibold text-red-600">{category}</span> • {location}
        </p>
        <p className="text-collor flex-grow">{description.slice(0, 30)}....</p>
      </div>

     
      <div className="px-4 pt-3 pb-4 flex justify-between items-center">
        <p className="font-bold text-teal-600">Amount: ${amount}</p>

        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full ${
            status === "ongoing"
              ? "bg-yellow-100 text-yellow-700"
              : status === "completed"
              ? "bg-green-400 text-black"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {status || "Pending"}
        </span>
      </div>

     
      <div className="px-4 pb-4">
        <Link to={`/issues/${_id}`}>
          <button className="btn bg-btn hover-glow btn-sm w-full mt-2">See Details</button>
        </Link>
      </div>
    </div>
  );
};

export default Issue;
