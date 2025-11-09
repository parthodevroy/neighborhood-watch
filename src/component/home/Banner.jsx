import React from 'react';

const Banner = () => {
    const slides = [
        {
            image: "https://cdn.pixabay.com/photo/2019/03/28/11/46/hands-4087018_1280.jpg",
            text: "Join Hands for a Cleaner Neighborhood"
        },
        {
            image: "https://cdn.pixabay.com/photo/2020/03/11/09/35/cleaning-4918518_1280.jpg",
            // text: "Report Issues, Make a Change"
        },
        {
            image: "https://cdn.pixabay.com/photo/2016/06/06/17/05/garbage-1439623_1280.jpg",
            // text: "Your Contribution Matters"
        },
    ];

    return (
        <div className="relative h-[600px] w-full overflow-hidden">
            {slides.map((slide, idx) => (
                <div
                    key={idx}
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="h-full w-full bg-black/40 flex justify-center items-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
                            {slide.text}
                        </h1>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Banner;
