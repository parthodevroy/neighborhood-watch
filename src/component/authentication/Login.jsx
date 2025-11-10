import React, { use, useState } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { Authcontext } from '../../authcontext/Authcontext';

const Login = () => {
  const { userlogin, googlelogin } = use(Authcontext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Email/password login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    userlogin(email, password)
      .then(result => {
        console.log("User:", result.user);
        setSuccess(true);
        navigate(from);
        e.target.reset();
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  };

  // Google login
  const handleGoogleLogin = () => {
  googlelogin()
    .then(result => {
      console.log("Google user:", result.user);
      setSuccess(true);
      navigate(from); // Login শেষে redirect
    })
    .catch(err => setError(err.message));
};

  return (
    <div className="hero bg-green-50 min-h-screen flex items-center justify-center">
      <div className="card bg-card w-full max-w-md shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-extrabold text-[#1e3a8a] text-center mb-6">Login Now</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="label font-semibold text-gray-700">Email</label>
            <input type="email" name='email' className="input input-bordered w-full" placeholder="Email" />
          </div>

          <div className="flex flex-col">
            <label className="label font-semibold text-gray-700">Password</label>
            <input type="password" name='password' className="input input-bordered w-full" placeholder="Password" />
          </div>

          <button type="submit" className="btn pb-2 bg-btn text-white mt-4 hover-glow">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-500 mb-2">OR</p>
          <button
            type="button" // important! না হলে form submit হবে
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5] flex items-center justify-center gap-2 w-full"
          >
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>

        {error && <p className='text-red-500 mt-3'>{error}</p>}
        {success && <p className='text-green-600 mt-3'>Login Successful!</p>}
      </div>
    </div>
  );
};

export default Login;
