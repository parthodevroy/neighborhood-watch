import { useContext, useState } from "react";
import { Authcontext } from "../../authcontext/Authcontext";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useContext(Authcontext);
    const [showMenu, setShowMenu] = useState(false);
  

  return (
    <div className="p-6 text-color">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="bg-gray-200 p-8 rounded-lg max-w-xl">
        <img
          src={user.photoURL || "https://i.ibb.co/ZmZL9bP/avatar.png"}
          alt="profile"
          className="w-28 h-28 rounded-full mb-4"
        />
        <p className="text-lg font-semibold">{user.displayName}</p>
        <p className="text-sm">{user.email}</p>

        <li>
          <Link to="/updateprofile" onClick={() => setShowMenu(false)} className="block mt-6 px-6 w-40 py-3 bg-btn hover:bg-green-700 text-white font-semibold rounded-lg transition">
          Update Profile
          </Link>
        </li>
      </div>
    </div>
  );
};

export default Profile;
