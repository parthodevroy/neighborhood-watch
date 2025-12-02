import React from "react";

export default function NeighborHome() {
  const items = [
    {
      title: "Community Safety First",
      desc: "A safer neighborhood begins with awareness, unity, and responsible reporting.",
    },
    {
      title: "Report Suspicious Activity",
      desc: "If you notice unusual behavior, damaged property, or unlawful acts—report it instantly to help prevent crime.",
    },
    {
      title: "Protect Shared Spaces",
      desc: "Your parks, playgrounds, roads, and buildings belong to everyone. Keep them clean, protected, and respected.",
    },
    {
      title: "Stay Informed, Stay Alert",
      desc: "Get updates about local issues like road damage, illegal construction, noise disturbances, and more.",
    },
  ];

  return (
    <div className="bg-navbar max-w-6xl mx-auto rounded-xl text-color py-8 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide">
          Neighborhood Watch & Community Care
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg md:text-xl mb-12">
          Together we build a stronger, safer, and more connected neighborhood. Stay aware, take action, and help your community grow.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] p-6 rounded-2xl shadow-xl border border-gray-800 hover:border-blue-500 hover:scale-[1.03] transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-3 text-blue-400">{item.title}</h2>
            <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-[#111] rounded-2xl p-10 shadow-inner border border-gray-800 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Common Issues Reported in Neighborhoods</h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
          These are frequent community concerns that residents often face. If you observe any of these problems, report them early to help maintain community well‑being.
        </p>

        <ul className="grid md:grid-cols-2 gap-4 text-left text-gray-200 max-w-4xl mx-auto">
          <li className="p-3 bg-[#1b1b1b] rounded-lg border border-gray-700">• Road damage & potholes</li>
          <li className="p-3 bg-[#1b1b1b] rounded-lg border border-gray-700">• Illegal construction activities</li>
          <li className="p-3 bg-[#1b1b1b] rounded-lg border border-gray-700">• Public garbage & waste dumping</li>
          <li className="p-3 bg-[#1b1b1b] rounded-lg border border-gray-700">• Broken street lights or signboards</li>
          <li className="p-3 bg-[#1b1b1b] rounded-lg border border-gray-700">• Suspicious movement or noise incidents</li>
          <li className="p-3 bg-[#1b1b1b] rounded-lg border border-gray-700">• Vandalism & damaged public property</li>
        </ul>
      </div>
    </div>
  );
}
