import { useContext, useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Authcontext } from "../../authcontext/Authcontext";

const DashboardHome = () => {
  const { user } = useContext(Authcontext);
  const [issues, setIssues] = useState([]);
  const [contributions, setContributions] = useState([]);

 useEffect(() => {
  if (!user?.email) return;

  // Fetch user issues
  fetch(`https://neighborhood-watch-server.vercel.app/userissues?email=${user.email}`, {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  })
    .then(res => res.json())
    .then(data => setIssues(data))
    .catch(err => console.error(err));

  // Fetch contributions
  fetch(`https://neighborhood-watch-server.vercel.app/mycontributions/${user.email}`, {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  })
    .then(res => res.json())
    .then(data => setContributions(data))
    .catch(err => console.error(err));
}, [user.email, user.accessToken]);


  const chartData = [
    { name: "Issues", total: issues.length },
    { name: "Contributions", total: contributions.length }
  ];

  return (
    <div className="p-6 text-color">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-200 p-6 rounded-lg">
          <h3>Total Issues</h3>
          <p className="text-3xl font-bold">{issues.length}</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg">
          <h3>Total Contributions</h3>
          <p className="text-3xl font-bold">{contributions.length}</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg">
          <h3>Ongoing Issues</h3>
          <p className="text-3xl font-bold">
            {issues.filter(i => i.status === "ongoing").length}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-200 p-6 rounded-lg h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHome;
