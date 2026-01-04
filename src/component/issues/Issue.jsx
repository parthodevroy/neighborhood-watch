import React from "react";
import { Link } from "react-router";

const Issue = ({ issu }) => {
  const {
    title,
    category,
    location,
    description,
    image,
    status,
    amount,
    _id,
  } = issu;

  return (
    <div className="group bg-card  rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">

      {/* Image */}
      <div className="h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h2 className="text-lg font-semibold text-main line-clamp-1">
          {title}
        </h2>

        <p className="text-xs text-muted">
          <span className="font-medium text-red-500">{category}</span>
          {" • "}
          {location}
        </p>

        <p className="text-sm text-main/80 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="font-semibold text-teal-600 text-sm">
          ${amount}
        </span>

        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full
            ${
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

      {/* Action */}
      <div className="px-4 pb-4">
        <Link to={`/issues/${_id}`}>
          <button className="w-full text-sm font-medium py-2 rounded-lg bg-btn hover:opacity-90 transition">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Issue;
