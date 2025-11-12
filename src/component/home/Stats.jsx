import React from 'react';

const Stats = () => {
    const stats = [
        { title: "Total Users", value: 1245 },
        { title: "Issues Reported", value: 876 },
        { title: "Issues Resolved", value: 654 },
        { title: "Active Volunteers", value: 320 },
    ];

    return (
        <div className="max-w-6xl mx-auto my-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-card p-6 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-bold text-teal-700">{stat.value}</h3>
                    <p className="text-gray-700 mt-2">{stat.title}</p>
                </div>
            ))}
        </div>
    );
};

export default Stats;
