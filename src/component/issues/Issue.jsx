import React from 'react';
import { Link } from 'react-router';

const Issue = ({ issu }) => {
  const { title, category, location, description, image, amount,_id } = issu;

  return (
    <div className="card bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col">
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      
      {/* এই div টি flex + justify-between হবে */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mb-2">
            {category} • {location}
          </p>
          <p className="text-gray-700 mb-3">{description}</p>
          <p className="font-bold text-teal-600">Amount: ${amount}</p>
        </div>

        <div className="mt-4">
           <Link to={`/issues/${issu._id}`}>
                <button className="btn bg-btn btn-sm w-full mt-3">
                  See Details
                </button>
              </Link>
        </div>
      </div>
    </div>
  );
};

export default Issue;
