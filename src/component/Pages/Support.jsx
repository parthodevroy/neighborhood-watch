import React, { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: 'How do I report a neighborhood issue?',
    a: 'Go to the "Create Report" section, fill out the details with photos if possible, and submit. Our community moderators will review it quickly.'
  },
  {
    q: "What if there's an emergency situation?",
    a: 'For emergencies (fire, medical, crime), contact your local authority or emergency number immediately. You can still report the incident for awareness.'
  },
  {
    q: 'Can I report anonymously?',
    a: 'Yes, you can choose the anonymous option while submitting your report. Your identity will remain hidden from public view.'
  },
  {
    q: 'How long does it take to verify a report?',
    a: 'Most reports are reviewed within a few hours by our moderators or verified members of the community.'
  }
];

const Support = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const toggleFAQ = (i) => setOpenIdx(openIdx === i ? null : i);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setSuccess({ ok: false, msg: 'Please fill all fields.' });
      return;
    }
    setSending(true);
    setSuccess(null);

    try {
      await new Promise((r) => setTimeout(r, 900));
      setSending(false);
      setSuccess({ ok: true, msg: 'Report submitted — our team will review it soon.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setSending(false);
      setSuccess({ ok: false, msg: 'Something went wrong. Try again later.' });
    }
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto rounded-xl bg-gradient-to-b from-[#080808] via-[#0b0b0b] to-[#0f1724] text-gray-100">

     
      <header className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="inline-block bg-green-600 text-black px-3 py-1 rounded-full text-xs font-semibold">
              Community Support
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              We're here to help keep your neighborhood safe
            </h1>

            <p className="text-gray-300 max-w-xl">
              Report issues, ask questions, or browse our community FAQ. Together, we keep our neighborhood cleaner, safer, and stronger.
            </p>

            <div className="flex gap-3">
              <a href="#contact" className="px-5 py-3 rounded-lg bg-green-600 text-black font-semibold shadow-lg">
                Create Report
              </a>
              <a href="#faqs" className="px-5 py-3 rounded-lg border border-gray-700 hover:border-gray-500">
                View FAQs
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-tr from-[#0b1220] to-[#12212f] rounded-3xl p-6 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1532012197267-da84d127e765"
                alt="neighborhood support"
                className="w-full h-72 object-cover rounded-2xl"
              />
            </div>

            <div className="absolute -bottom-6 left-6 w-80 p-4 bg-[#07121a] rounded-2xl shadow-xl border border-gray-800">
              <p className="text-sm text-gray-400">Community Moderators</p>
              <h3 className="font-bold text-lg">Live Support Available</h3>
              <p className="text-sm text-gray-400">Daily, 8am — 10pm</p>
              <button className="mt-3 w-full bg-green-600 text-black py-2 rounded-lg font-semibold">
                Start Live Chat
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      
      <section className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Report Issues', desc: 'Garbage, vandalism, noise, illegal construction, and more.', icon: '🚨' },
          { title: 'Community Safety', desc: 'Suspicious activity, public safety alerts, neighborhood watch.', icon: '👮' },
          { title: 'General Support', desc: 'Questions, requests, or help using our platform.', icon: '💬' }
        ].map((card, i) => (
          <motion.div key={i} whileHover={{ y: -6 }} className="bg-[#07121a] p-6 rounded-2xl shadow-lg border border-gray-800">
            <div className="text-3xl">{card.icon}</div>
            <h4 className="font-bold text-xl mt-3">{card.title}</h4>
            <p className="text-gray-400 mt-2">{card.desc}</p>
            <div className="mt-4">
              <a href="#contact" className="text-green-500 font-semibold">Submit Report →</a>
            </div>
          </motion.div>
        ))}
      </section>

      
      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-[#07121a] rounded-3xl p-8 shadow-xl border border-gray-800"
        >
          <h2 className="text-2xl font-bold mb-2">Submit a Community Report</h2>
          <p className="text-gray-400 mb-6">
            Describe the issue clearly. Your report helps improve the neighborhood for everyone.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="bg-[#0b1216] border border-gray-800 rounded-lg px-4 py-2" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="bg-[#0b1216] border border-gray-800 rounded-lg px-4 py-2" />
            </div>

            <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="bg-[#0b1216] border border-gray-800 rounded-lg px-4 py-2" />

            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe the issue..." className="bg-[#0b1216] border border-gray-800 rounded-lg px-4 py-2 h-32"></textarea>

            <button disabled={sending} className="bg-green-600 text-black w-full py-3 mt-2 rounded-lg font-semibold">
              {sending ? 'Submitting...' : 'Submit Report'}
            </button>

            {success && (
              <p className={`${success.ok ? 'text-green-400' : 'text-red-400'} mt-2`}>
                {success.msg}
              </p>
            )}
          </form>
        </motion.div>

       
        <div id="faqs">
          <h3 className="text-xl font-bold mb-4">FAQs</h3>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#07121a] p-4 rounded-xl border border-gray-800">
                <button onClick={() => toggleFAQ(idx)} className="w-full text-left font-semibold text-lg">
                  {faq.q}
                </button>

                {openIdx === idx && <p className="text-gray-400 mt-2">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default Support;
