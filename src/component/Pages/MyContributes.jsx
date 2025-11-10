import React, { useEffect, useState, useContext } from "react";
import { Authcontext } from "../../authcontext/Authcontext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast, Toaster } from "react-hot-toast";

const MyContributes = () => {
  const { user } = useContext(Authcontext);
  const [contributions, setContributions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null); // 🧹 Delete confirm modal state

  useEffect(() => {
    if (user?.email) {
      fetch(`https://neighborhood-watch-server.vercel.app/mycontributions/${user.email}`)
        .then((res) => res.json())
        .then((data) => setContributions(data));
    }
  }, [user]);

  const handleConfirmDelete = async () => {
    if (!deleting) return;

    try {
      const res = await fetch(
        `https://neighborhood-watch-server.vercel.app/mycontributions/${deleting._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.deletedCount > 0) {
        setContributions((prev) =>
          prev.filter((c) => c._id !== deleting._id)
        );
        toast.success("Contribution deleted successfully!");
      } else {
        toast.error("Failed to delete!");
      }
    } catch (error) {
      toast.error("Error deleting contribution!");
    }
    setDeleting(null);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("My Contributions Report", 14, 22);

    const tableColumn = ["Issue Title", "Amount", "Date"];
    const tableRows = contributions.map((c) => [
      c.issueTitle,
      `$${c.amount}`,
      new Date(c.date).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("My_Contributions.pdf");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const amount = form.amount.value;
    const updatedData = { amount };

    try {
      const res = await fetch(
        `https://neighborhood-watch-server.vercel.app/mycontributions/${editing._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Updated successfully!");
        setContributions((prev) =>
          prev.map((item) =>
            item._id === editing._id ? { ...item, amount } : item
          )
        );
        setEditing(null);
      } else {
        toast.error("Update failed!");
      }
    } catch (error) {
      toast.error("Error updating contribution!");
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Contributions
      </h2>

      <div className="mb-4 text-center">
        <button onClick={downloadPDF} className="btn bg-green-600 text-white">
          📄 Download PDF
        </button>
      </div>

      {contributions.length === 0 ? (
        <p className="text-center text-gray-500">No contributions yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {contributions.map((c) => (
            <div
              key={c._id}
              className="card bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <figure>
                <img
                  src={c.issueImage}
                  alt={c.issueTitle}
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="font-semibold text-lg">{c.issueTitle}</h3>
                <p className="text-sm text-gray-600">
                  Amount: <span className="font-bold">${c.amount}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(c.date).toLocaleDateString()}
                </p>

                <div className="card-actions justify-between mt-4">
                  <button
                    onClick={() => setEditing(c)}
                    className="btn btn-sm bg-blue-500 text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setDeleting(c)} // 🧹 Open confirm modal
                    className="btn btn-sm bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✏️ Update Modal */}
      {editing && (
        <dialog id="edit_modal" className="modal modal-open">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg mb-3">Update Contribution</h3>

            <form onSubmit={handleUpdate}>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text font-semibold">Amount</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={editing.amount}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="btn bg-gray-400 text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-blue-600 text-white">
                  Save
                </button>
              </div>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setEditing(null)}>close</button>
          </form>
        </dialog>
      )}

      {/* 🗑️ Delete Confirmation Modal */}
      {deleting && (
        <dialog id="delete_modal" className="modal modal-open">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg text-red-600">
              Are you sure you want to delete?
            </h3>
            <p className="py-3 text-gray-700">
              Issue: <span className="font-semibold">{deleting.issueTitle}</span>
            </p>

            <div className="modal-action">
              <button
                onClick={() => setDeleting(null)}
                className="btn bg-gray-400 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="btn bg-red-600 text-white"
              >
                Yes, Delete
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setDeleting(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyContributes;
