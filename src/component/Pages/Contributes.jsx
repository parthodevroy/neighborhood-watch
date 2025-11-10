import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { Authcontext } from "../../authcontext/Authcontext";

const Contribute = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const { user } = useContext(Authcontext); // user.email, user.displayName

  useEffect(() => {
    fetch(`https://neighborhood-watch-server.vercel.app/issues/${id}`)
      .then((res) => res.json())
      .then((data) => setIssue(data));
  }, [id]);

  const handleContribute = (e) => {
    e.preventDefault();
    const amount = parseFloat(e.target.amount.value);

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
      date: new Date(),
    };

    fetch("https://neighborhood-watch-server.vercel.app/contribute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      });
  };

  if (!issue) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white border-amber-400 pb-16 p-6 shadow-lg rounded-xl mt-10">
      <img src={issue.image} alt={issue.title} className="rounded-lg mb-4" />
      <h2 className="text-2xl font-semibold mb-2">{issue.title}</h2>
      <p className="text-gray-600 mb-4">{issue.description}</p>

      <form onSubmit={handleContribute} className="flex flex-col gap-4">
        {/* Name field (readonly) */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Email field (readonly) */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Amount field */}
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
          className="bg-blue-600 text-white p-4 px-4 py-2 rounded-lg hover:bg-blue-700 mt-2"
        >
          Contribute
        </button>
      </form>
    </div>
  );
};

export default Contribute;
