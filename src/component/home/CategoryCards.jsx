import React from 'react';

const categories = [
    { name: "Garbage", image: "https://images.unsplash.com/flagged/photo-1572213426852-0e4ed8f41ff6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174" },
    { name: "Illegal Construction", image: "https://images.unsplash.com/photo-1579612222961-8364d433164e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"},
    { name: "Broken Private Property", image: "https://images.unsplash.com/photo-1609424612637-20f39c4187ee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074" },
    { name: "Road Damage", image: "https://images.unsplash.com/photo-1635068741358-ab1b9813623f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1460" },
];

const CategoryCards = () => {
    return (
        <div className="max-w-6xl mx-auto my-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
                <div key={idx} className="bg-card shadow-lg rounded-xl overflow-hidden  transition-transform">
                    <img src={cat.image} alt={cat.name} className="h-40 w-full transition-transform duration-900 hover:scale-105 hover:shadow-2xl object-cover" />
                    <h3 className="text-xl font-semibold text-center p-4">{cat.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default CategoryCards;
