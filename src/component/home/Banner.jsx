import React from "react";

const Banner = () => {
  const slides = [
    {
      image: "https://cdn.pixabay.com/photo/2019/03/28/11/46/hands-4087018_1280.jpg",
      text: "Join Hands for a Cleaner Neighborhood",
    },
    {
      image: "https://cdn.pixabay.com/photo/2020/03/11/09/35/cleaning-4918518_1280.jpg",
      
    },
    {
      image: "https://cdn.pixabay.com/photo/2016/06/06/17/05/garbage-1439623_1280.jpg",
      text: "Your Contribution Matters",
    },
  ];

  return (
    <div className="w-full flex justify-center items-center py-8">
     
      <div className="relative w-[90%] md:w-[80%] lg:w-[70%] h-[300px] overflow-hidden rounded-2xl shadow-lg">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-1000"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
           
            <div className="h-full w-full bg-black/50 flex justify-center items-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
                {slide.text}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
