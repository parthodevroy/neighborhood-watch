import React from "react";

const About = () => {
  return (
    <div className="bg-main max-w-6xl mx-auto text-main">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About Neighborhood Watch
          </h1>
          <p className="max-w-3xl mx-auto text-lg opacity-90">
            Building safer communities by empowering people to report, track,
            and solve neighborhood issues together.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Our Mission
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Neighborhood Watch is a community-driven platform designed to help
            residents report local issues, contribute to solutions, and track
            progress transparently.
          </p>
          <p className="text-muted leading-relaxed">
            From road damage to safety concerns, our goal is to connect people
            with the right resources and create positive change together.
          </p>
        </div>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Community"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card py-14">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold text-primary">500+</h3>
            <p className="text-muted mt-1">Issues Reported</p>
          </div>
          <div className="p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold text-primary">300+</h3>
            <p className="text-muted mt-1">Community Members</p>
          </div>
          <div className="p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold text-primary">200+</h3>
            <p className="text-muted mt-1">Issues Solved</p>
          </div>
          <div className="p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold text-primary">24/7</h3>
            <p className="text-muted mt-1">Support</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
