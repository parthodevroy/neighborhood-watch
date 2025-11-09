import React, { useEffect, useState, useContext } from "react";
import { Authcontext } from "../../authcontext/Authcontext";
import Swal from "sweetalert2";

const MyContributes = () => {
  const { user } = useContext(Authcontext);
  const [contributions, setContributions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingAmount, setEditingAmount] = useState("");

  // Fetch contributions
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/mycontributions/${user.email}`)
        .then((res) => res.json())
        .then((data) => setContributions(data));
    }
  }, [user]);

  // Delete contribution
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This contribution will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/mycontributions/${id}`, { method: "DELETE" })
          .then(() => {
            setContributions(contributions.filter((c) => c._id !== id));
            Swal.fire("Deleted!", "Your contribution has been deleted.", "success");
          });
      }
    });
  };

  // Start editing
  const handleEditStart = (id, currentAmount) => {
    setEditingId(id);
    setEditingAmount(currentAmount);
  };

  // Save updated contribution
  const handleEditSave = (id) => {
    fetch(`http://localhost:3000/mycontributions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: editingAmount })
    })
      .then((res) => res.json())
      .then(() => {
        setContributions(
          contributions.map((c) =>
            c._id === id ? { ...c, amount: editingAmount } : c
          )
        );
        setEditingId(null);
        Swal.fire("Updated!", "Your contribution has been updated.", "success");
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Contributions
      </h2>

      {contributions.length === 0 ? (
        <p className="text-center text-gray-500">No contributions yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {contributions.map((c) => (
            <div key={c._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={c.issueImage}
                alt={c.issueTitle}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{c.issueTitle}</h3>
                {editingId === c._id ? (
                  <>
                    <input
                      type="number"
                      className="border w-full p-1 rounded mb-2"
                      value={editingAmount}
                      onChange={(e) => setEditingAmount(e.target.value)}
                    />
                    <button
                      onClick={() => handleEditSave(c._id)}
                      className="btn btn-sm bg-green-600 text-white mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn btn-sm bg-gray-400 text-white"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 mb-2">
                      Amount: <span className="font-bold">${c.amount}</span>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Date: {new Date(c.date).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditStart(c._id, c.amount)}
                        className="btn btn-sm bg-yellow-500 text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="btn btn-sm bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyContributes;
