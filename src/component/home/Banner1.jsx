import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const Banner1 = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1760001552685-fa470d9cd473?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      text: "Join Hands for a Greener Neighborhood",
    },
    {
      image:
        "https://images.unsplash.com/photo-1758599668932-484f54cdf48f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
      text: "Report Issues, Make a Change",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2024/04/17/01/37/ai-generated-8701165_1280.png",
      text: "Your Contribution Matters",
    },
    {
      image:
        "https://images.unsplash.com/photo-1758599667717-27c61bcdd14b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
      text: "Together We Can Make a Difference",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[400px] max-w-6xl mx-auto rounded-xl overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="h-full w-full bg-black/40 flex flex-col justify-center items-center px-4 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
              {slide.text}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mt-4 drop-shadow-md">
              Make a difference in your community
            </p>
            <button className="mt-6 px-6 py-3 bg-btn hover:bg-green-700 text-white font-semibold rounded-lg transition">
             <Link to={"/issues"}> Get Involved</Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner1;
