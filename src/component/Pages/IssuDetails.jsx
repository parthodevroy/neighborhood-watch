// src/component/issues/SeeDetails.jsx
import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Authcontext } from "../../authcontext/Authcontext";
import Loading from "../Loading";

const IssuDetails = () => {

    const {user}=use(Authcontext)
  const { id } = useParams(); 
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();
  

const handleContribute = () => {
  if (user) {
    
    navigate(`/contributes/${id}`);
   
    
  } else {
    
    navigate("/login", { state: { from: `/issues/${id}` } }); 
   
  }
};

// console.log(user);



useEffect(() => {
    const fetchIssue = async () => {
      try {
        setLoading(true);

        //  console.log(user.accessToken)

        const res = await fetch(
          `https://neighborhood-watch-server.vercel.app/issues/${id}`,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`
             
            },
           
            
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        setIssue(data);
      } catch (err) {
        console.error("Error fetching issue:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
    
  }, [id, user]);

  //  Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-color">
        <Loading></Loading>
      </div>
    );
  }

  //  No issue found state
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
    <div className="max-w-5xl  mx-auto px-5 py-10">
      <div className="bg-card  rounded-2xl shadow-md overflow-hidden">
        {/* Image Section */}
        <img src={image} alt={title} className="w-full h-80 object-cover" />

        {/* Details Section */}
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-color">{title}</h2>
          <p className="text-sm text-color">
            <span className="font-semibold">Category:</span> {category} |{" "}
            <span className="font-semibold">Location:</span> {location}
          </p>
 
          <p className="text-color">{description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-color">
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
          <div className="mt-6  flex justify-between">
            <button onClick={handleContribute} className="btn hover-glow btn-success bg-btn rounded-2xl text-xls w-full sm:w-auto">
              💰 Contribute to Clean-Up
            </button>
            {/* <button onClick={handleContribute} className="btn hover-glow btn-success bg-btn rounded-2xl text-xls w-full sm:w-auto">
             💰 Pay
            </button>
            <button  className="btn btn-success hover-glow bg-btn rounded-2xl text-xls w-full sm:w-auto">
              <Link to={"/addissues"}> Report Issues</Link>
            </button>
            <button  className="btn btn-success hover-glow bg-btn rounded-2xl text-xls w-full sm:w-auto">
               <Link to={"/mycontribution"}>Edid</Link>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuDetails;
