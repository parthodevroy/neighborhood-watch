import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const RecentIssues = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        fetch("https://neighborhood-watch-server.vercel.app/issues")
            .then(res => res.json())
            .then(data => setIssues(data.slice(0, 4)))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-6xl mx-auto my-6 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Recent Issues</h2>
            <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-6">
                {issues.map(issue => (
                    <div
                        key={issue._id}
                        className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col"
                    >
                        <img
                            src={issue.image}
                            alt={issue.title}
                            className="h-40 w-full object-cover transition-transform duration-900 hover:scale-105"
                        />
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-semibold text-xl">{issue.title}</h3>
                            <p className="text-xs text-color mt-1">{issue.category} • {issue.location}</p>
                            <p className="text-color text-lg mt-2 flex-grow">{issue.description.slice(0, 30)}...</p>

                            <div className="px-4 pb-4 flex justify-between items-center">
                                <p className="font-bold text-teal-600">${issue.amount}</p>

                                <span
                                    className={`px-3 py-1 text-sm font-semibold rounded-full ${issue.status === "ongoing"
                                        ? "bg-yellow-100 text-yellow-700"
                                        :issue.status === "completed"
                                            ? "bg-green-400 text-black"
                                            : "bg-blue-100 text-blue-700"
                                        }`}
                                >
                                    {issue.status || "Pending"}
                                </span>
                            </div>

                            <Link to={`/issues/${issue._id}`}>
                                <button className="btn bg-btn mt-auto w-full">See Details</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentIssues;
