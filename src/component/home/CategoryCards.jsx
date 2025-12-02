
import React from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const categories = [
  {
    name: "Garbage",
    image: "https://images.unsplash.com/flagged/photo-1572213426852-0e4ed8f41ff6?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1174"
  },
  {
    name: "Illegal Construction",
    image: "https://images.unsplash.com/photo-1579612222961-8364d433164e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170"
  },
  {
    name: "Broken Private Property",
    image: "https://images.unsplash.com/photo-1609424612637-20f39c4187ee?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1074"
  },
  {
    name: "Road Damage",
    image: "https://images.unsplash.com/photo-1635068741358-ab1b9813623f?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1460"
  },
];

const CategoryCards = () => {
  return (
    <div className="py-10 max-w-6xl mx-auto">
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        loop={true}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index} className="!w-[410px]">
            <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-5 text-center hover:scale-105 duration-300">
              <img
                src={cat.image}
                className="h-40 w-full rounded-xl object-cover"
                alt={cat.name}
              />
              <h3 className="text-xl font-bold text-white mt-4">{cat.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryCards;
