import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1f2937] max-w-6xl mx-auto rounded-2xl text-white pt-8 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">

        
        <div>
          <Link to="/" className="flex items-center gap-3">
                   <div className="w-11 h-11 rounded-full overflow-hidden border shadow">
                     <img
                       src="https://cdn.pixabay.com/photo/2018/08/05/10/58/work-3585353_1280.jpg"
                       alt="Logo"
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <span className="font-extrabold text-xl leading-tight">
                     Neighborhood <br />
                     <span className="text-primary">Watch</span>
                   </span>
                 </Link>
          <p className="text-gray-300 text-sm">
            Join our community to make our neighborhood safer and cleaner. Report issues, track contributions, and help build a better society.
          </p>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-[#06b6d4] transition-colors">Home</Link></li>
            <li><Link to="/issues" className="hover:text-[#06b6d4] transition-colors">Issues</Link></li>
            <li><Link to="/mycontribution" className="hover:text-[#06b6d4] transition-colors">My Contributions</Link></li>
            <li><Link to="/addissues" className="hover:text-[#06b6d4] transition-colors">Add Issue</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-300 text-sm">123 Neighborhood St.</p>
          <p className="text-gray-300 text-sm">Dhaka, Bangladesh</p>
          <p className="text-gray-300 text-sm">Email: info@neighborhood.com</p>
          <p className="text-gray-300 text-sm">Phone: +880 1234 567890</p>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-300">
            <a href="#" className="hover:text-[#06b6d4] transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#06b6d4] transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-[#06b6d4] transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-[#06b6d4] transition-colors"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Neighborhood Watch. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
