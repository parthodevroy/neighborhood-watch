import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../authcontext/Authcontext";
import Swal from "sweetalert2";

const MyIssues = () => {
  const { user } = useContext(Authcontext);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load only the user's issues
  useEffect(() => {
    if (user?.email) {
      fetch(`https://neighborhood-watch-server.vercel.app/userissues?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setIssues(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  // ✅ Delete issue
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://neighborhood-watch-server.vercel.app/userissues/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your issue has been removed.", "success");
              setIssues(issues.filter((issue) => issue._id !== id));
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  // ✅ Edit issue
  const handleEdit = (issue) => {
    Swal.fire({
      title: "Edit Issue",
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${issue.title}">
        <input id="category" class="swal2-input" placeholder="Category" value="${issue.category}">
        <input id="location" class="swal2-input" placeholder="Location" value="${issue.location}">
        <input id="amount" class="swal2-input" type="number" placeholder="Amount" value="${issue.amount}">
      `,
      confirmButtonText: "Update",
      showCancelButton: true,
      preConfirm: () => {
        const updated = {
          title: document.getElementById("title").value,
          category: document.getElementById("category").value,
          location: document.getElementById("location").value,
          amount: parseInt(document.getElementById("amount").value),
        };
        return updated;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://neighborhood-watch-server.vercel.app/userissues/${issue._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.value),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire("Updated!", "Issue updated successfully.", "success");
              setIssues(
                issues.map((i) =>
                  i._id === issue._id ? { ...i, ...result.value } : i
                )
              );
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#06b6d4]">
        My Submitted Issues ({issues.length})
      </h2>

      {issues.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven’t submitted any issues yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={issue.image}
                alt={issue.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {issue.title}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Category:</strong> {issue.category}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Location:</strong> {issue.location}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Budget:</strong> ${issue.amount}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(issue)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(issue._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIssues;
