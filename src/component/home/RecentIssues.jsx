import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const RecentIssues = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        fetch("https://neighborhood-watch-server.vercel.app/issues")
            .then(res => res.json())
            .then(data => setIssues(data.slice(0, 6))) // recent 6 issues
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-6xl mx-auto my-10 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Recent Issues</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {issues.map(issue => (
                    <div
                        key={issue._id}
                        className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300"
                    >
                        <img 
                            src={issue.image} 
                            alt={issue.title} 
                            className="h-40 w-full object-cover transition-transform duration-900 hover:scale-105"
                        />
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-semibold text-lg">{issue.title}</h3>
                            <p className="text-sm text-color mt-1">{issue.category} • {issue.location}</p>
                            <p className="text-color mt-2 flex-grow">{issue.description.slice(0, 60)}...</p>
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
