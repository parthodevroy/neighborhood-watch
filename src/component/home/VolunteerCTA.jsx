import React from 'react';
import { Link } from 'react-router';

const VolunteerCTA = () => {
    return (
        <div className="bg-[#935547] text-white  py-16 mt-10 my-8 text-center rounded-xl max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Community Clean-Up Drive</h2>
            <p className="mb-6">Be a part of the change. Together we can make our neighborhood cleaner and safer.</p>
            <Link to="/addissues">
                <button className="btn bg-btn text-white px-6 py-3 rounded-lg">Report or Volunteer Now</button>
            </Link>
        </div>
    );
};

export default VolunteerCTA;
