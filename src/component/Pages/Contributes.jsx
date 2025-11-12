// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router";
// import Swal from "sweetalert2";
// import { Authcontext } from "../../authcontext/Authcontext";
// import ContributationPeople from "./ContributationPeople";


// const Contribute = () => {
//   const { id } = useParams();
//   const [issue, setIssue] = useState(null);
//   const { user } = useContext(Authcontext); 

//   useEffect(() => {
//     fetch(`https://neighborhood-watch-server.vercel.app/issues/${id}`)
//       .then((res) => res.json())
//       .then((data) => setIssue(data));
//   }, [id]);


//   const handleContribute = (e) => {
//     e.preventDefault();
//     const amount = parseFloat(e.target.amount.value);
//      const location = e.target.location.value; 

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
//       location,
//       date: new Date(),
//     };

//     fetch("https://neighborhood-watch-server.vercel.app/contribute", {
//       method: "POST",
//       headers: { "Content-Type": "application/json",
//          authorization: `Bearer ${user.accessToken}`,
//        },
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
//       });
//   };

//   if (!issue) return <p>Loading...</p>;

//   return (
//     <div className="max-w-lg mx-auto bg-white border-amber-400 pb-16 p-6 shadow-lg rounded-xl mt-10">
//       <img src={issue.image} alt={issue.title} className="rounded-lg mb-4" />
//       <h2 className="text-2xl font-semibold mb-2">{issue.title}</h2>
//       <p className="text-gray-600 mb-4">{issue.description}</p>

//       <form onSubmit={handleContribute} className="flex flex-col gap-4">
//         {/* Name  */}
//         <div className="flex flex-col">
//           <label className="font-semibold text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             defaultValue={user?.displayName || ""}
//             readOnly
//             className="input input-bordered w-full bg-gray-100"
//           />
//         </div>

//         {/* Email  */}
//         <div className="flex flex-col">
//           <label className="font-semibold text-gray-700">Email</label>
//           <input
//             type="email"
//             name="email"
//             defaultValue={user?.email || ""}
//             readOnly
//             className="input input-bordered w-full bg-gray-100"
//           />
//         </div>

//          {/* Location  */}
//   <div className="flex flex-col">
//     <label className="font-semibold text-gray-700">Location</label>
//     <input
//       type="text"
//       name="location"
//       placeholder="Enter your location"
//       required
//       className="input input-bordered w-full"
//     />
//   </div>

//        {/* amount */}
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
//       <ContributationPeople></ContributationPeople>
//     </div>
//   );
// };

// export default Contribute;

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

const Contributes = () => {
  const { id } = useParams();
  const { user } = useContext(Authcontext);

  const [issue, setIssue] = useState(null);
  const [contributions, setContributions] = useState([]);

  // issue details
  useEffect(() => {
    fetch(`https://neighborhood-watch-server.vercel.app/issues/${id}`)
      .then((res) => res.json())
      .then((data) => setIssue(data));
  }, [id]);

  // Fetch contributions 
  const fetchContributions = () => {
    fetch(
      `https://neighborhood-watch-server.vercel.app/contributions/${id}`,
      {
        headers: { authorization: `Bearer ${user.accessToken}` },
      }
    )
      .then((res) => res.json())
      .then((data) => setContributions(data))
      .catch((err) => console.error("Failed to fetch contributions:", err));
  };
// Fetch contributions when component mounts
useEffect(() => {
  if (user) fetchContributions();
}, [id, user]);


  // Handle contribution 
  const handleContribute = (e) => {
    e.preventDefault();
    const amount = parseFloat(e.target.amount.value);
    const location = e.target.location.value;
    const phone=e.target.phone.value

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

  if (!issue) return <p>Loading...</p>;

  return (
    <div>
      <div className="max-w-lg mx-auto bg-card border-amber-400 pb-16 p-6 shadow-lg rounded-xl mt-10">
      <img src={issue.image} alt={issue.title} className="rounded-lg mb-4" />
      <h2 className="text-2xl font-semibold mb-2">{issue.title}</h2>
      <p className="text-gray-600 mb-4">{issue.description}</p>

      {/* Contribution Form */}
      <form onSubmit={handleContribute} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-card"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-card"
          />
        </div>
        {/* Phone Number */}
<div className="flex flex-col">
  <label className="font-semibold text-gray-700">Phone Number</label>
  <input
    type="tel"
    name="phone"
    placeholder="Enter your phone number"
    required
    className="input input-bordered w-full"
  />
</div>


        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex flex-col">
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
          className="bg-btn hover-glow text-white p-4 px-4 py-2 rounded-lg mt-2"
        >
          Contribute
        </button>
      </form>
      </div>

      {/* Contributors Chart */}
      <div className="bg-card">
        {contributions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Contributors</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contributions}>
              <XAxis dataKey="userName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#1f77b4" />
            </BarChart>
          </ResponsiveContainer>

          <ul className="mt-4 text-emerald-500">
            {contributions.map((c, i) => (
              <li key={i}>
                {c.userName} contributed ** {c.amount} ** Taka from  {c.location}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
};

export default Contributes;

