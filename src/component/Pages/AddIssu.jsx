import React, { useContext } from "react";
import { Authcontext } from "../../authcontext/Authcontext";
import Swal from "sweetalert2";

const AddIssu = () => {
  const { user } = useContext(Authcontext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const category = e.target.category.value;
    const location = e.target.location.value;
    const description = e.target.description.value;
    const image = e.target.image.value;
    const amount = parseInt(e.target.amount.value);
    const date = new Date();
    const status = "ongoing";
    const email = user?.email;

    const newIssue = { title, category, location, description, image, amount, status, email, date };

    fetch("https://neighborhood-watch-server.vercel.app/userissues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIssue)
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success!", "Issue reported successfully.", "success");
        e.target.reset();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error!", "Failed to report issue.", "error");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Report New Issue</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Issue Title" className="input input-bordered w-full" required />
        <select name="category" className="input input-bordered w-full" required>
          <option value="">Select Category</option>
          <option value="Garbage">Garbage</option>
          <option value="Street Light">Street Light</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
        </select>
        <input name="location" placeholder="Location" className="input input-bordered w-full" required />
        <textarea name="description" placeholder="Description" className="input input-bordered w-full" required />
        <input name="image" placeholder="Image URL" className="input input-bordered w-full" required />
        <input name="amount" placeholder="Suggested Fix Budget" type="number" className="input input-bordered w-full" required />
        <button type="submit" className="btn bg-btn text-white mt-4">Report Issue</button>
      </form>
    </div>
  );
};

export default AddIssu;
