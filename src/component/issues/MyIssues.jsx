import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../authcontext/Authcontext";
import Swal from "sweetalert2";
import Loading from "../Loading";

const MyIssues = () => {
  const { user } = useContext(Authcontext);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user issues
  useEffect(() => {
    if (!user) return;
    if (!user.email || !user.accessToken) return;

    const fetchIssues = async () => {
      try {
        const res = await fetch(
          `https://neighborhood-watch-server.vercel.app/userissues?email=${user.email}`,
          {
            headers: { authorization: `Bearer ${user.accessToken}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch issues");
        const data = await res.json();
        setIssues(data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not load issues. Try again later.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [user]);

  // Delete issue
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
          headers: { authorization: `Bearer ${user.accessToken}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your issue has been removed.", "success");
              setIssues((prev) => prev.filter((issue) => issue._id !== id));
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  // Edit issue
  const handleEdit = async (issue) => {
    const { value: updatedValues } = await Swal.fire({
      title: "Edit Issue",
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${issue.title}">
        <input id="category" class="swal2-input" placeholder="Category" value="${issue.category}">
        <input id="location" class="swal2-input" placeholder="Location" value="${issue.location}">
        <input id="amount" class="swal2-input" type="number" placeholder="Amount" value="${issue.amount}">
      `,
      confirmButtonText: "Update",
      showCancelButton: true,
      preConfirm: () => ({
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        location: document.getElementById("location").value,
        amount: parseInt(document.getElementById("amount").value),
      }),
    });

    if (updatedValues) {
      try {
        const res = await fetch(
          `https://neighborhood-watch-server.vercel.app/userissues/${issue._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify(updatedValues),
          }
        );
        const data = await res.json();
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Issue updated successfully.", "success");
          setIssues((prev) =>
            prev.map((i) => (i._id === issue._id ? { ...i, ...updatedValues } : i))
          );
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to update issue", "error");
      }
    }
  };

  // Status 
  const handleStatusChange = async (issue) => {
    const { value: newStatus } = await Swal.fire({
      title: "Change Status",
      input: "select",
      inputOptions: {
        ongoing: "Ongoing",
        completed: "Completed",
        pending: "Pending",
      },
      inputValue: issue.status || "pending",
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (!newStatus) return;

    try {
      const res = await fetch(
        `https://neighborhood-watch-server.vercel.app/userissues/${issue._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await res.json();

      if (data.modifiedCount > 0) {
        Swal.fire("Updated!", "Status updated successfully.", "success");
        setIssues((prev) =>
          prev.map((i) => (i._id === issue._id ? { ...i, status: newStatus } : i))
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (loading) return <p className="text-center mt-10"><Loading></Loading></p>;
  if (!user) return <p className="text-center mt-10">Please log in to view your issues.</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-color">
        My Submitted Issues ({issues.length})
      </h2>

      {issues.length === 0 ? (
        <p className="text-center text-white text-lg">
          You haven’t submitted any issues yet.
        </p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="bg-card shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <img src={issue.image} alt={issue.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{issue.title}</h3>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Category:</strong> {issue.category}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Location:</strong> {issue.location}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Budget:</strong> ${issue.amount}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded ${
                      issue.status === "ongoing"
                        ? "bg-yellow-100 text-yellow-800"
                        : issue.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {issue.status || "pending"}
                  </span>
                </p>

                <div className="flex justify-between mt-4 space-x-2">
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
                  <button
                    onClick={() => handleStatusChange(issue)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Change Status
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
