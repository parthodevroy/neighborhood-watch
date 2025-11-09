import React from 'react';

const categories = [
    { name: "Garbage", image: "https://media.istockphoto.com/id/1425232352/photo/expired-organic-bio-waste-mix-vegetables-and-fruits-in-a-huge-container-in-a-rubbish-bin-heap.jpg?s=1024x1024&w=is&k=20&c=Gv4GIekm6josYmwPTe-JkptLrWnfmsjjsixcVRsY0iA=" },
    { name: "Street Light", image: "https://cdn.pixabay.com/photo/2018/10/06/07/27/detroit-3727417_1280.jpg" },
    { name: "Road", image: "https://cdn.pixabay.com/photo/2025/06/05/09/22/people-9642583_1280.jpg" },
    { name: "Waterlogging", image: "https://cdn.pixabay.com/photo/2019/10/29/13/16/gods-gift-4586902_1280.jpg" },
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
