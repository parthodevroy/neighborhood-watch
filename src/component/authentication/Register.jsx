
import React, { useState } from 'react';


import { use } from 'react';
import { Authcontext } from '../../authcontext/Authcontext';
import { Link, } from 'react-router';
import { updateProfile } from 'firebase/auth';

const Register = () => {
    const { userregister}=use(Authcontext)
    
    
    const [error,setError]=useState("")

    const [succcces,setSuccess]=useState(false)


  const handelregister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");
    setSuccess(false);

    userregister(email, password)
      .then(result => {
        const createdUser = result.user;

        updateProfile(createdUser, {
          displayName: name,
          photoURL: photo
        })
          .then(() => {
            console.log("Profile updated:", createdUser);
            setSuccess(true);
            e.target.reset();
          })
          .catch(err => {
            setError(err.message);
          });
      })
      .catch(err => setError(err.message));
  };
  return (
    <div className="hero bg-green-50 min-h-screen flex items-center justify-center">
      <div className="card bg-card w-full max-w-md shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-extrabold text-[#1e3a8a] text-center mb-6">Register Now</h2>
        <form onSubmit={handelregister} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="label font-semibold text-gray-700">Name</label>
            <input type="text" name='name' className="input input-bordered w-full" placeholder="Your Name" />
          </div>

          <div className="flex flex-col">
            <label className="label font-semibold text-gray-700">Photo URL</label>
            <input type="text" name='photo' className="input input-bordered w-full" placeholder="Your Photo URL" />
          </div>

          <div className="flex flex-col">
            <label className="label font-semibold text-gray-700">Email</label>
            <input type="email" name='email' className="input input-bordered w-full" placeholder="Email" />
          </div>

          <div className="flex flex-col">
            <label className="label font-semibold text-gray-700">Password</label>
            <input type="password" name='password' className="input input-bordered w-full" placeholder="Password" />
          </div>

          <button type="submit" className="btn bg-btn text-white mt-4 hover-glow">
            Register Now
          </button>
          <p>Alredy Have An Account <Link to={"/login"}><span className='text-xl text-red-500'>Login</span></Link></p>
        </form>
         {
            error&&<p className='text-red-500'>{error}</p>
        },
        {
            succcces&& <p className='text-green-600'>Registation Succesful</p>
        }
      </div>
    </div>
  );
};

export default Register;
