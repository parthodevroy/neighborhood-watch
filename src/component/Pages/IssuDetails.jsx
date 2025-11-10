// src/component/issues/SeeDetails.jsx
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Authcontext } from "../../authcontext/Authcontext";

const IssuDetails = () => {

    const {user}=use(Authcontext)
  const { id } = useParams(); // URL থেকে id নিচ্ছে
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

const handleContribute = () => {
  if (user) {
    // User logged in → contribution page / action
    console.log("User can contribute:", user);
    // যদি page নিয়ে যেতে চাও
    navigate(`/contributes/${id}`);
  } else {
    // User not logged in → login page এ redirect
    navigate("/login", { state: { from: `/issues/${id}` } }); 
    // state পাঠাচ্ছি যাতে login পরে আবার ফিরে আসতে পারে
  }
};


  // নির্দিষ্ট issue fetch করা
  useEffect(() => {
    fetch(`https://neighborhood-watch-server.vercel.app/issues`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item._id === id);
        setIssue(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching issue:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading issue details...
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-600">
        Issue not found 😕
      </div>
    );
  }

  const {
    title,
    category,
    location,
    description,
    image,
    amount,
    status,
    email,
    date,
    collectedAmount,
    contributorsCount,
  } = issue;

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Image Section */}
        <img src={image} alt={title} className="w-full h-80 object-cover" />

        {/* Details Section */}
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Category:</span> {category} |{" "}
            <span className="font-semibold">Location:</span> {location}
          </p>

          <p className="text-gray-700">{description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  status === "ongoing"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Budget:</span> ${amount}
            </p>
            <p>
              <span className="font-semibold">Reported by:</span> {email}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Collected:</span> $
              {collectedAmount || 0}
            </p>
            <p>
              <span className="font-semibold">Contributors:</span>{" "}
              {contributorsCount || 0}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <button onClick={handleContribute} className="btn btn-success bg-btn rounded-2xl text-xls w-full sm:w-auto">
              💰 Contribute to Clean-Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuDetails;
