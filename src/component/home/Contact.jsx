import React, { useState } from "react";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Message sent successfully!");
      e.target.reset();
    }, 1200);
  };

  return (
    <div className="bg-main text-main max-w-6xl mx-auto min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r  from-cyan-500 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-2">Contact Us</h1>
          <p className="opacity-90">
            Have a question or need help? We’re here for you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted mb-6">
            Reach out to us anytime. Our support team responds within 24 hours.
          </p>

          <ul className="space-y-4 text-muted">
            <li><strong>Email:</strong> support@neighborhoodwatch.com</li>
            <li><strong>Phone:</strong> +880 1234 567890</li>
            <li><strong>Location:</strong> Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card shadow-lg rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              required
              className="input input-bordered w-full"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              required
              className="input input-bordered w-full"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea
              required
              rows="4"
              className="textarea textarea-bordered w-full"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-primary text-white w-full"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
