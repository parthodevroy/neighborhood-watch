import React from 'react';
import { useLoaderData } from 'react-router';
import Issue from './Issue';

const Issues = () => {
    const issuesdata=useLoaderData()
    console.log(issuesdata);
    
    return (
        <div className='p-4'>
             <h1 className="text-3xl font-bold text-center mb-5">All Issues</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issuesdata.map((issu) => (
          <Issue key={issu._id} issu={issu} />
        ))}
      </div>
        </div>
    );
};

export default Issues;