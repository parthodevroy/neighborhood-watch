import React from "react";
import { motion } from "framer-motion";

const newsData = [
  {
    id: 1,
    title: "Community unites to improve night patrol routes",
    category: "Neighborhood Alert",
    date: "January 12, 2025",
    image:
      "https://cdn.pixabay.com/photo/2017/08/03/11/05/people-2575608_1280.jpg",
  },
  {
    id: 2,
    title: "Local volunteers join hands for safer streets",
    category: "Community",
    date: "January 10, 2025",
    image:
      "https://cdn.pixabay.com/photo/2022/10/03/01/00/woman-7494708_1280.jpg",
  },
  {
    id: 3,
    title: "Security cameras installed in high-risk zones",
    category: "Safety Update",
    date: "January 9, 2025",
    image:
      "https://cdn.pixabay.com/photo/2021/09/18/08/40/security-camera-6634600_1280.jpg",
  },
  {
    id: 4,
    title: "Traffic violations decrease after new road rules",
    category: "Local Report",
    date: "January 8, 2025",
    image:
      "https://cdn.pixabay.com/photo/2017/06/03/01/15/bike-2367705_1280.jpg",
  },
];

const NewsSection = () => {
  return (
    <div className="max-w-6xl mx-auto py-6 px-4 md:px-0">

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

       
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="col-span-2 bg-card p-4 rounded-3xl shadow-lg"
        >
          <img
            src={newsData[0].image}
            alt="main"
            className="w-full h-[380px] object-cover rounded-3xl"
          />

          <p className="mt-3 text-gray-600 text-sm">
            {newsData[0].category} · {newsData[0].date}
          </p>

          <h2 className="text-3xl font-extrabold mt-2 tracking-wide">
            {newsData[0].title}
          </h2>
        </motion.div>

       
        <div className="flex flex-col gap-6">
          {newsData.slice(1).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex gap-4 bg-card p-3 rounded-2xl shadow"
            >
              <img
                src={item.image}
                alt="thumb"
                className="w-28 h-24 object-cover rounded-2xl"
              />

              <div>
                <p className="text-gray-600 text-sm">
                  {item.category} · {item.date}
                </p>
                <h3 className="font-bold text-lg leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default NewsSection;
