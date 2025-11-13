import React, { useEffect, useState, useContext } from "react";
import { Authcontext } from "../../authcontext/Authcontext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../Loading";

const MyContributes = () => {
  const { user } = useContext(Authcontext);
  const [contributions, setContributions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch 
  useEffect(() => {
    if (user?.email && user?.accessToken) {
      fetch(`https://neighborhood-watch-server.vercel.app/mycontributions/${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setContributions(data);
          } else {
            console.error("Expected array, got:", data);
            setContributions([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setContributions([]);
          setLoading(false);
        });
    }
  }, [user]);
console.log(contributions);

  // Delete 
  const handleConfirmDelete = async () => {
    if (!deleting || !user?.accessToken) return;

    try {
      const res = await fetch(
        `https://neighborhood-watch-server.vercel.app/mycontributions/${deleting._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
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

  // Download 
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

  // Update contribution
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editing || !user?.accessToken) return;

    const form = e.target;
    const amount = parseFloat(form.amount.value);
    const updatedData = { amount };

    try {
      const res = await fetch(
        `https://neighborhood-watch-server.vercel.app/mycontributions/${editing._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
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

  if (loading) return <p className="text-center mt-10"><Loading></Loading></p>;

  return (
    <div className="p-6">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Contributions
      </h2>

      <div className="mb-4 text-center">
        <button
          onClick={downloadPDF}
          className="btn bg-green-600 text-white px-4 py-2"
        >
          📄 Download PDF
        </button>
      </div>

      {contributions.length === 0 ? (
        <p className="text-center text-color">No contributions yet.</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {contributions.map((c) => (
            <div
              key={c._id}
              className="card bg-card shadow-lg rounded-xl overflow-hidden"
            >
              <figure>
                <img
                  src={c.issueImage}
                  alt={c.issueTitle}
                  className="h-40 w-full text-color object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="font-semibold text-lg">{c.issueTitle}</h3>
                <p className="text-sm text-color">
                  Amount: <span className="font-bold">${c.amount}</span>
                </p>
                <p className="text-sm text-color">
                  Location: <span className="font-bold">{c.location}</span>
                </p>
                <p className="text-sm text-color">
                  Date: {new Date(c.date).toLocaleDateString()}
                </p>

                <div className="card-actions justify-between mt-4">
                  <button
                    onClick={() => setEditing(c)}
                    className="btn btn-sm bg-btn bg-card"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setDeleting(c)}
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

      {/*  Update */}
      {editing && (
        <dialog id="edit_modal" className="modal modal-open">
          <div className="modal-box bg-card">
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

      {/* Delete */}
      {deleting && (
        <dialog id="delete_modal" className="modal modal-open">
          <div className="modal-box bg-card">
            <h3 className="font-bold text-lg text-red-600">
              Are you sure you want to delete?
            </h3>
            <p className="py-3 text-color">
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
