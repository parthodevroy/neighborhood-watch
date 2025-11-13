
// import React, { useContext, useEffect, useState } from "react";
// import { data, useParams } from "react-router";
// import Swal from "sweetalert2";
// import { Authcontext } from "../../authcontext/Authcontext";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import Loading from "../Loading";
// import { FaUserCircle } from "react-icons/fa";
      
// const Contributes = () => {
//   const { id } = useParams();
//   const { user } = useContext(Authcontext);

//   const [issue, setIssue] = useState(null);
//   const [contributions, setContributions] = useState([]);    

//   // issue details
//   useEffect(() => {
//     fetch(`https://neighborhood-watch-server.vercel.app/issues/${id}`)
//       .then((res) => res.json())
//       .then((data) => setIssue(data));
//   }, [id]);

//   // Fetch contributions 
//   const fetchContributions = () => {
//     fetch(
//       `https://neighborhood-watch-server.vercel.app/contributions/${id}`,
//       {
//         headers: { authorization: `Bearer ${user.accessToken}` },
//       }
//     )
//       .then((res) => res.json())
//       .then((data) =>{
//          setContributions(data)
//         //  console.log(data);
         
//       }
    
//     )
    
      
//       .catch((err) => console.error("Failed to fetch contributions:", err));
//   };
// // Fetch contributions
// useEffect(() => {
//   if (user) fetchContributions();
// }, [id, user]);


//   // Handle contribution 
//   const handleContribute = (e) => {
//     e.preventDefault();
//     const amount = parseFloat(e.target.amount.value);
//     const location = e.target.location.value;
//     const phone=e.target.phone.value
//     const photo=e.target.photoURL.value
    

//     if (amount < 50) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops!",
//         text: "Contribution must be at least 50 Taka.",
//       });
//       return;
//     }

//     const contribution = {
//       issueId: id,
//       issueTitle: issue.title,
//       issueImage: issue.image,
//       userEmail: user.email,
//       userName: user.displayName,
      
//       amount,
//       photo,
//       location,
//       phone,
//       date: new Date(),
//     };

//     fetch("https://neighborhood-watch-server.vercel.app/contribute", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${user.accessToken}`,
//       },
//       body: JSON.stringify(contribution),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Thank you!",
//           text: "Your contribution was successfully added!",
//         });
//         e.target.reset();
//         fetchContributions(); 
//       })
//       .catch((err) => console.error("Contribution failed:", err));
//   };

//   if (!issue) return <p><Loading></Loading></p>;
//   // console.log(user);
  

//   return (
//     <div>
//       <div className="max-w-lg mx-auto bg-card border-amber-400 pb-16 p-6 shadow-lg rounded-xl mt-10">
//       <img src={issue.image} alt={issue.title} className="rounded-lg mb-4" />
//       <h2 className="text-2xl font-semibold mb-2">{issue.title}</h2>
//       <p className="text-gray-600 mb-4">{issue.description}</p>

//       {/* Contribution Form */}
//       <form onSubmit={handleContribute} className="flex flex-col gap-4">
//         <div className="flex flex-col">
         
//           <label className="font-semibold text-gray-600">Name</label>
//           <input
//             type="text"
//             name="name"
//             defaultValue={user?.displayName || ""}
//             readOnly
//             className="input input-bordered w-full bg-card"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="font-semibold text-gray-700">Email</label>
//           <input
//             type="email"
//             name="email"
//             defaultValue={user?.email || ""}
//             readOnly
//             className="input input-bordered w-full bg-card"
//           />
//         </div>
//         {/* photo url */}
//          <div className="flex flex-col">
//     <label className="font-semibold text-gray-700">Profile Photo URL</label>
//     <input
//       type="text"
//       name="photoURL"
//       defaultValue={user?.photoURL || ""}
//       readOnly
//       className="input input-bordered w-full bg-card"
//     />
//   </div>
//         {/* Phone Number */}
// <div className="flex flex-col">
//   <label className="font-semibold text-gray-700">Phone Number</label>
//   <input
//     type="tel"
//     name="phone"
//     placeholder="Enter your phone number"
//     required
//     className="input input-bordered w-full"
//   />
// </div>


//         <div className="flex flex-col">
//           <label className="font-semibold text-gray-700">Location</label>
//           <input
//             type="text"
//             name="location"
//             placeholder="Enter your location"
//             required
//             className="input input-bordered w-full"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="font-semibold text-gray-700">Amount (Taka)</label>
//           <input
//             type="number"
//             name="amount"
//             placeholder="Enter amount"
//             required
//             className="input input-bordered w-full"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-btn hover-glow text-white p-4 px-4 py-2 rounded-lg mt-2"
//         >
//           Contribute
//         </button>
//       </form>
//       </div>

//       {/* Contributors Chart */}
//       <div className="bg-card">
//         {contributions.length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold mb-2">Contributors</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={contributions}>
//               <XAxis dataKey="userName" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="amount" fill="#1f77b4" />
//             </BarChart>
//           </ResponsiveContainer>

//           <ul className="mt-4 space-y-2">
//   {contributions.map((c, i) => (
//     <li
//       key={i}
//       className="flex items-center justify-between bg-white/10 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-amber-300"
//     >
//       {/* User Info */}
//       <div className="flex items-center gap-3">

//         {c.photo?(<img
//           src={c.photo}
//           alt={c.userName}
//           className="w-10 h-10 rounded-full object-cover border"
//         />): <FaUserCircle className="w-8 h-8"/>}
//         <div className="flex flex-col">
//           <span className="font-semibold text-gray-800 dark:text-gray-100">
//             {c.userName}
//           </span>
//           <span className="text-xs text-gray-500 dark:text-gray-400">
//             {c.location}
//           </span>
//         </div>
//       </div>

//       {/* Amount */}
//       <div className="text-right">
//         <span className="font-bold text-emerald-600 dark:text-emerald-400">
//           ${c.amount}
//         </span>
//       </div>
//     </li>
//   ))}
// </ul>

//         </div>
//       )}
//       </div>
//     </div>
//   );
// };

// export default Contributes;
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { Authcontext } from "../../authcontext/Authcontext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "../Loading";
import { FaUserCircle } from "react-icons/fa";

const Contributes = () => {
  const { id } = useParams();
  const { user } = useContext(Authcontext);

  const [issue, setIssue] = useState(null);
  const [contributions, setContributions] = useState([]);

 
  useEffect(() => {
    fetch(`https://neighborhood-watch-server.vercel.app/issues/${id}`)
      .then((res) => res.json())
      .then((data) => setIssue(data));
  }, [id]);

 
  const fetchContributions = () => {
    fetch(`https://neighborhood-watch-server.vercel.app/contributions/${id}`, {
      headers: { authorization: `Bearer ${user.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setContributions(data))
      .catch((err) => console.error("Failed to fetch contributions:", err));
  };

  useEffect(() => {
    if (user) fetchContributions();
  }, [id, user]);
   
  
  const handleContribute = (e) => {
    e.preventDefault();
    const amount = parseFloat(e.target.amount.value);
    const location = e.target.location.value;
    const phone = e.target.phone.value;
    const photo = e.target.photoURL.value;

    if (amount < 50) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Contribution must be at least 50 Taka.",
      });
      return;
    }

    const contribution = {
      issueId: id,
      issueTitle: issue.title,
      issueImage: issue.image,
      userEmail: user.email,
      userName: user.displayName,
      amount,
      photo,
      location,
      phone,
      date: new Date(),
    };

    fetch("https://neighborhood-watch-server.vercel.app/contribute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(contribution),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your contribution was successfully added!",
        });
        e.target.reset();
        fetchContributions();
      })
      .catch((err) => console.error("Contribution failed:", err));
  };

  if (!issue) return <p><Loading /></p>;

  return (
    <div className="max-w-4xl mx-auto bg-card border-amber-400 pb-16 p-6 shadow-lg rounded-xl mt-10">
     
      <img src={issue.image} alt={issue.title} className="rounded-lg mb-4" />
      <h2 className="text-2xl font-semibold mb-2">{issue.title}</h2>
      <p className="text-gray-600 mb-6">{issue.description}</p>

      {/* Form */}
      <form onSubmit={handleContribute} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="font-semibold text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-card"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-card"
          />
        </div>

        {/* Photo */}
        <div>
          <label className="font-semibold text-gray-700">Profile Photo URL</label>
          <input
            type="text"
            name="photoURL"
            defaultValue={user?.photoURL || ""}
            readOnly
            className="input input-bordered w-full bg-card"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="font-semibold text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="font-semibold text-gray-700">Amount (Taka)</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            required
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-btn hover-glow text-white p-4 rounded-lg mt-2"
        >
          Contribute
        </button>
        <p className="text-red-600">.................................IF YOU CONTRIBUTE, YOU CAN SEE THE HISTORY BELOW</p>
      </form>

      
      {contributions.length > 0 && (
        <div className="mt-12 flex flex-col lg:flex-row gap-6 items-start">
         
          <div className="w-full lg:w-2/2 bg-white/10 p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">Contribution Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={contributions}>
                <XAxis dataKey="userName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#1f77b4" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          
          <div className="w-full lg:w-1/2 bg-white/10 p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">Contributors</h3>
            <ul className="space-y-2">
              {contributions.map((c, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-card p-3 rounded-lg border border-amber-300"
                >
                  
                  <div className="flex items-center gap-3">
                    {c.photo ? (
                      <img
                        src={c.photo}
                        alt={c.userName}
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    ) : (
                      <FaUserCircle className="w-8 h-8 text-gray-500" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {c.userName}
                      </p>
                      <p className="text-xs text-gray-500">{c.location}</p>
                    </div>
                  </div>

                 
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ${c.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contributes;
