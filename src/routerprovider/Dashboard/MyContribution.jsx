import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../authcontext/Authcontext";

const MyContribution = () => {
  const { user } = useContext(Authcontext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://neighborhood-watch-server.vercel.app/mycontributions/${user.email}`, {
     headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
    })
      .then(res => res.json())
      .then(setData);
  }, [user.email]);
  console.log(data);
  

  return (
    <div className="p-6 text-color">
      <h1 className="text-2xl font-bold mb-6">My Contributions</h1>

      <div className="space-y-4">
        {data.map(item => (
          <div key={item._id} className="bg-gray-200 p-5 rounded-lg flex justify-between">
            <div>
              <p className="font-semibold">Issue ID: {item.issueId}</p>
              <p>Amount: ${item.amount}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyContribution;
