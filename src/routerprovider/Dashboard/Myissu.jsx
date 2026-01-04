import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../authcontext/Authcontext";

const Myissues = () => {
  const { user } = useContext(Authcontext);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch(`https://neighborhood-watch-server.vercel.app/userissues?email=${user.email}`, {
     headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
    })
      .then(res => res.json())
      .then(data => setIssues(data));
  }, [user.email]);
console.log(issues);

  const handleDelete = (id) => {
    fetch(`https://neighborhood-watch-server.vercel.app/userissues/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setIssues(issues.filter(issue => issue._id !== id));
      });
  };

  return (
    <div className="p-6 text-color">
      <h1 className="text-2xl font-bold mb-6">My Reported Issues</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {issues.map(issue => (
          <div key={issue._id} className="bg-gray-200 p-5 rounded-lg">
            <h3 className="font-semibold">{issue.title}</h3>
            <img src={issue.image} alt="" srcset="" />
            <p className="text-sm my-2">{issue.description}</p>
            <span className="text-xs bg-yellow-600 px-2 py-1 rounded">
              {issue.status}
            </span>

            <div className="mt-4 flex gap-3">
             
              <button
                onClick={() => handleDelete(issue._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myissues;
