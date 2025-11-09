import React, { useEffect, useState, useContext } from "react";
import { Authcontext } from "../../authcontext/Authcontext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

const MyContributes = () => {
  const { user } = useContext(Authcontext);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/mycontributions/${user.email}`)
        .then((res) => res.json())
        .then((data) => setContributions(data));
    }
  }, [user]);

  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("My Contributions Report", 14, 22);

  const tableColumn = ["Issue Title", "Amount", "Date"];
  const tableRows = contributions.map(c => [
    c.issueTitle,
    `$${c.amount}`,
    new Date(c.date).toLocaleDateString(),
  ]);

  // autoTable function কে আলাদাভাবে কল করতে হবে
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save("My_Contributions.pdf");
};
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Contributions
      </h2>

      <div className="mb-4 text-center">
        <button
          onClick={downloadPDF}
          className="btn bg-green-600 text-white"
        >
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
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={c.issueImage}
                alt={c.issueTitle}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{c.issueTitle}</h3>
                <p className="text-sm text-gray-600">
                  Amount: <span className="font-bold">${c.amount}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(c.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyContributes;
