import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Issue from "./Issue";

const Issues = () => {
  const issuesdata = useLoaderData();
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  
  const filteredIssues = issuesdata.filter((issue) => {
    const categoryValue = issue.category?.toLowerCase() || "";
    const statusValue = issue.status?.toLowerCase() || "";

    const categoryMatch = category ? categoryValue.includes(category.toLowerCase()) : true;
    const statusMatch = status ? statusValue === status.toLowerCase() : true;

    return categoryMatch && statusMatch;
  });

  return (
    <div className="p-4 ">
      <h1 className="text-3xl font-bold text-center mb-5">All Issues</h1>

     
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
       
        <input
          type="text"
          placeholder="Filter by category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input input-bordered w-full sm:w-1/3"
        />

        
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select select-bordered w-full sm:w-1/3"
        >
          <option value="">Filter by status</option>
           <option value="ongoing">Ongoing</option>
          <option value="completed">completed</option>
          <option value="pending">Pending</option>
         
        </select>
      </div>

      
      {filteredIssues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredIssues.map((issu) => (
            <Issue key={issu._id} issu={issu} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No issues found for your filter.</p>
      )}
    </div>
  );
};

export default Issues; 