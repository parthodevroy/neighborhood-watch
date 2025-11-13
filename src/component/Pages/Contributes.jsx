


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
import { useContext, useEffect, useState } from "react";

const Contributes = () => {
  const { id } = useParams();
  const { user } = useContext(Authcontext);

  const [issue, setIssue] = useState(null);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    fetch(`https://neighborhood-watch-server.vercel.app/issues/${id}`,{
       headers: { authorization: `Bearer ${user.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setIssue(data));
  }, [id]);

  const fetchContributions = () => {
    if (!user) return;
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

  if (!issue) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto bg-card border-amber-400 pb-16 p-6 shadow-lg rounded-xl mt-10">
      
      <div className="flex flex-col items-center mb-6">
        <img
          src={issue.image || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={issue.title}
          className="rounded-lg mb-3 w-full max-w-md object-cover"
        />
        <h2 className="text-2xl font-semibold text-center">{issue.title}</h2>
      </div>

     
      <form onSubmit={handleContribute} className="flex flex-col gap-4">
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
        <p className="text-red-600 mt-2 text-center">
          .........................IF YOU CONTRIBUTE, YOU CAN SEE THE HISTORY BELOW
        </p>
      </form>

      
      {contributions.length > 0 && (
        <div className="mt-12 flex flex-col lg:flex-row gap-6 items-start">
          
          <div className="w-full lg:w-2/3 bg-white/10 p-4 rounded-xl shadow-md">
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

          {/* list */}
          <div className="w-full lg:w-1/3 bg-white/10 p-4 rounded-xl shadow-md">
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

