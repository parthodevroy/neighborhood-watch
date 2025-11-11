import React from 'react';

const categories = [
    { name: "Electicity Problem", image: "https://cdn.pixabay.com/photo/2019/04/19/17/13/power-station-4139902_1280.png" },
    { name: "Street", image: "https://cdn.pixabay.com/photo/2013/07/05/12/20/rubbish-143465_1280.jpg" },
    { name: "Water", image: "https://cdn.pixabay.com/photo/2023/02/03/13/36/marine-7765155_1280.jpg" },
    { name: "Unsufficient Drain", image: "https://cdn.pixabay.com/photo/2019/10/29/13/16/gods-gift-4586902_1280.jpg" },
];

const CategoryCards = () => {
    return (
        <div className="max-w-6xl mx-auto my-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
                <div key={idx} className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform">
                    <img src={cat.image} alt={cat.name} className="h-40 w-full object-cover" />
                    <h3 className="text-xl font-semibold text-center p-4">{cat.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default CategoryCards;
