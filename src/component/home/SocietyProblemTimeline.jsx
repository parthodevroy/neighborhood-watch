import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaCheckCircle, FaTools, FaShieldAlt } from "react-icons/fa";

const events = [
  {
    date: "12 MAR",
    year: "2024",
    title: "Street Light Outage Reported",
    description: "Residents reported a series of broken street lights on Sector 7. The issue was logged into the system for immediate attention.",
    type: "left",
    icon: <FaExclamationTriangle className="text-yellow-500" />,
    status: "Pending",
    image: "https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=500&auto=format&fit=crop"
  },
  {
    date: "15 MAR",
    year: "2024",
    title: "Maintenance Team Dispatched",
    description: "Our community maintenance team arrived on-site to inspect the electrical wiring and replace the damaged bulbs.",
    type: "right",
    icon: <FaTools className="text-blue-500" />,
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=500&auto=format&fit=crop"
  },
  {
    date: "18 MAR",
    year: "2024",
    title: "Issue Resolved & Verified",
    description: "The street lights are now fully functional, improving night-time safety for all residents. Verified by the admin panel.",
    type: "left",
    icon: <FaCheckCircle className="text-green-500" />,
    status: "Completed",
    image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=500&auto=format&fit=crop"
  },
  {
    date: "20 MAR",
    year: "2024",
    title: "Enhanced Security Patrol",
    description: "Based on recent complaints, a new security patrol route has been established to monitor vulnerable areas of the society.",
    type: "right",
    icon: <FaShieldAlt className="text-purple-500" />,
    status: "Active",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=500&auto=format&fit=crop"
  }
];

const TimelineCard = ({ event, index }) => {
  const isLeft = event.type === "left";

  return (
    <div className={`mb-12 flex justify-between items-center w-full ${isLeft ? "flex-row-reverse" : "flex-row"}`}>
      <div className="hidden md:block w-5/12"></div>

      <div className="z-20 flex items-center order-1 bg-white shadow-xl w-12 h-12 rounded-full border-4 border-[#6E07F3]">
        <div className="mx-auto text-xl">{event.icon}</div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: false }}
        className="order-1 bg-white rounded-2xl shadow-xl w-full md:w-5/12 px-6 py-6 border border-gray-100 hover:shadow-2xl transition-all"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-purple-600">{event.date}, {event.year}</span>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
            event.status === 'Completed' ? 'bg-green-100 text-green-600' : 
            event.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
          }`}>
            {event.status}
          </span>
        </div>
        
        {event.image && (
          <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-xl mb-4 grayscale hover:grayscale-0 transition-all duration-500" />
        )}

        <h3 className="mb-2 font-bold text-gray-800 text-xl">{event.title}</h3>
        <p className="text-sm leading-relaxed text-gray-500">
          {event.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
            <button className="text-[#6E07F3] text-xs font-bold hover:underline">View Report Details</button>
            <span className="text-[10px] text-gray-400 italic">Report ID: #NW-{index + 1024}</span>
        </div>
      </motion.div>
    </div>
  );
};

const SocietyProblemTimeline = () => {
  return (
    <div className="bg-slate-50 py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Neighborhood Watch Log</h2>
            <p className="text-gray-600">Tracking community issues from report to resolution. Transparent security management for a better society.</p>
        </div>
        
        <div className="relative wrap overflow-hidden p-2 md:p-10 h-full">
          {/* Vertical Line */}
          <div className="absolute border-opacity-20 border-purple-300 h-full border-2 left-1/2 -translate-x-1/2 hidden md:block"></div>
          
          {events.map((event, index) => (
            <TimelineCard key={index} event={event} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
            <button className="bg-[#6E07F3] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#5a05c8] transition">
                Report a New Problem
            </button>
        </div>
      </div>
    </div>
  );
};

export default SocietyProblemTimeline;