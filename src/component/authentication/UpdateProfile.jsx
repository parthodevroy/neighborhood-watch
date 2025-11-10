import React, { useContext, useState } from "react";

import { updateProfile } from "firebase/auth";
import { auth } from "../authentication/firebase.init";


import toast, { Toaster } from "react-hot-toast";
import { Authcontext } from "../../authcontext/Authcontext";

const UpdateProfile = () => {
  const { user } = useContext(Authcontext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.err("Failed to update profile!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg">
      <Toaster />
      <h2 className="text-2xl font-bold text-center mb-6 text-[#06b6d4]">
        Update Profile
      </h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          className="bg-[#06b6d4] text-white py-2 rounded-xl font-semibold hover:bg-[#0596ad]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
