import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { NavLink } from "react-router";

const skills = [
  { name: "Overflowing", level: 85, label: "Expert" },
  { name: "street light", level: 80, label: "Advanced" },
  { name: "Waterlogging", level: 90, label: "Expert" },
  { name: "noise", level: 85, label: "Expert" },
  { name: "Illegal parking", level: 75, label: "Intermediate" },
  { name: "footpath tiles", level: 95, label: "Pro" },
  { name: "electric wires", level: 80, label: "Advanced" },
  { name: "manhole", level: 70, label: "Intermediate" },
];

const SkillBar = ({ name, level, label }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false, 
  });

  return (
    <div ref={ref} className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-gray-800 font-bold tracking-wide">{name}</span>
        <span className="text-[#6E07F3] font-semibold text-sm">{label}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#6E07F3] to-[#a259ff] rounded-full"
        />
      </div>
    </div>
  );
};

const SocietyProblemPercenttest = () => {
  return (
    <section id="skills" className="py-20 bg-white text-gray-900 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 text-gray-800">
           some of our <span className="text-[#6E07F3]">problems</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          {skills.map((skill, index) => (
            <SkillBar key={index} {...skill} />
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-24 py-12 px-6 bg-gray-50 rounded-3xl border border-gray-100">
          <h3 className="text-2xl md:text-4xl font-bold mb-8 text-gray-800">
            Need help with our problems.
          </h3>
         <NavLink to={"/contact"}> <button className="bg-[#6E07F3] hover:bg-[#5a05c8] text-white px-12 py-4 rounded-full text-lg font-bold transition transform hover:scale-105 shadow-xl shadow-purple-200">
            Feel free to contact me
          </button></NavLink>
        </div>
      </div>
    </section>
  );
};

export default SocietyProblemPercenttest;