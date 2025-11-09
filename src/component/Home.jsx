import React from 'react';

const Home = () => {
  const cards = [
    {
      img: "https://cdn.pixabay.com/photo/2020/01/23/16/00/environment-4787978_1280.jpg",
      title: "Clean Environment",
      desc: "Keep your neighborhood clean and safe by reporting environmental issues.",
      btn: "Contribute"
    },
    {
      img: "https://cdn.pixabay.com/photo/2019/11/21/20/57/cigarette-4643508_1280.jpg",
      title: "No Smoking Zones",
      desc: "Help enforce smoke-free areas and promote a healthy environment.",
      btn: "Report"
    },
    {
      img: "https://cdn.pixabay.com/photo/2016/07/19/18/03/trash-can-1528663_1280.jpg",
      title: "Garbage Overflow",
      desc: "Notify authorities about garbage overflow to keep streets clean.",
      btn: "Report Issue"
    },
    {
      img: "https://cdn.pixabay.com/photo/2019/02/17/22/35/traffic-4003342_1280.jpg",
      title: "Traffic Issues",
      desc: "Report traffic hazards and unsafe road conditions in your area.",
      btn: "Notify"
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 px-4 py-8 max-w-6xl mx-auto'>
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="card w-full bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
        >
          <figure className="relative h-60">
            <img src={card.img} alt={card.title} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </figure>
          <div className="card-body p-4 flex flex-col justify-between h-48">
            <h2 className="card-title text-lg font-bold text-[#1e3a8a]">{card.title}</h2>
            <p className="text-gray-700 text-sm">{card.desc}</p>
            <div className="card-actions justify-end mt-2">
              <button className="btn bg-btn text-white px-4 py-2 rounded-xl font-semibold hover-glow">
                {card.btn}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
