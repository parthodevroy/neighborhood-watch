import React, { use, useState } from 'react';
import { Authcontext } from '../../authcontext/Authcontext';
import {  useLocation, useNavigate } from 'react-router';

const Login = () => {
   const {userlogin}=use(Authcontext)
  const navigate = useNavigate();
const location = useLocation();
const from = location.state?.from?.pathname || "/";
       const [error,setError]=useState("")
   
       const [succcces,setSuccess]=useState(false)
   
   
     const handelregister = (e) => {
       e.preventDefault();
    //    const name = e.target.name.value;
    //    const photo = e.target.photo.value;
       const email = e.target.email.value;
       const password = e.target.password.value;
   
       console.log( email, password);
   
       userlogin(email,password)
      
           .then(result=>{
               console.log("result",result.user);
               setSuccess(result.user)
               navigate("/issues")
               e.target.reset()
              
               
           })
           .catch(error=>{
               console.log(error);
               setError(error.message)
       
               
           })
     }
   
     return (
       <div className="hero bg-green-50 min-h-screen flex items-center justify-center">
         <div className="card bg-card w-full max-w-md shadow-2xl rounded-2xl p-6">
           <h2 className="text-2xl font-extrabold text-[#1e3a8a] text-center mb-6">Register Now</h2>
           <form onSubmit={handelregister} className="flex flex-col gap-4">
             
   
             <div className="flex flex-col">
               <label className="label font-semibold text-gray-700">Email</label>
               <input type="email" name='email' className="input input-bordered w-full" placeholder="Email" />
             </div>
   
             <div className="flex flex-col">
               <label className="label font-semibold text-gray-700">Password</label>
               <input type="password" name='password' className="input input-bordered w-full" placeholder="Password" />
             </div>
   
             <button type="submit" className="btn bg-btn text-white mt-4 hover-glow">
               Login
             </button>
           </form>
            {
               error&&<p className='text-red-500'>{error}</p>
           },
           {
               succcces&& <p className='text-green-600'>Login Succesful</p>
           }
         </div>
       </div>
    );
};

export default Login;