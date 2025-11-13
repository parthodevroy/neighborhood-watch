import React, { useEffect, useState } from "react";

export default function HomeBanner() {
  const cards = [
    {
      title: "Community Alerts",
      text: "Real-time alerts from neighbors and local authorities.",
    },
    {
      title: "Report an Issue",
      text: "Quickly submit safety concerns and track responses.",
    },
    {
      title: "Volunteer Patrols",
      text: "Join local patrols, schedules and meetup spots.",
    },
  ];

  const contributors = [
    { id: 1, name: "Sobir H.", role: "Top Contributor", img: null },
    { id: 2, name: "Rafiq A.", role: "Recent Contributor", img: null },
    { id: 3, name: "Nusrat S.", role: "Recent Contributor", img: null },
    { id: 4, name: "Jamal K.", role: "Top Contributor", img: null },
    { id: 5, name: "Anika R.", role: "Recent Contributor", img: null },
  ];

  
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHighlightIndex((i) => (i + 1) % contributors.length);
    }, 3000);
    return () => clearInterval(id);
  }, [contributors.length]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <div className="col-span-1 lg:col-span-1 bg-card p-6 rounded-xl">
          <h1 className="text-2xl font-bold mb-2">Neighborhood Watch</h1>
          <p className="text-sm opacity-90 mb-4">
            Protecting our community together — report, share and support your neighbors.
          </p>
          <div className="flex gap-3">
            <button className="bg-btn">Get Started</button>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </div>

       
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-card p-5 rounded-xl shadow-sm flex flex-col"
            >
              <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
              <p className="text-sm opacity-90">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

     
      <div className="bg-card p-4 rounded-xl">
        <h4 className="font-semibold mb-3">Contributed People</h4>
        <div className="flex items-center gap-4 overflow-x-auto py-2">
          {contributors.map((person, idx) => {
            const highlighted = idx === highlightIndex;
            return (
              <div
                key={person.id}
                className={`flex items-center gap-3 min-w-[200px] p-3 rounded-lg ${
                  highlighted ? "ring-2 ring-offset-2" : ""
                }`}
              >
               
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{person.name}</div>
                    {highlighted && (
                      <div className="text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-white">
                        Recent / High
                      </div>
                    )}
                  </div>
                  <div className="text-xs opacity-80">{person.role}</div>
                 
                  <div className="text-xs opacity-70 mt-1">Contributions: {10 + person.id * 3}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
