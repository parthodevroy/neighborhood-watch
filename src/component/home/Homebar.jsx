// import React from 'react';
// import Home from './Home';

// const Homebar = () => {
//     const imageUrl = "https://cdn.pixabay.com/photo/2019/03/28/11/46/hands-4087018_1280.jpg"
//     return (
//         <div>
//             <div
//                    className="h-[800px] w-full bg-cover bg-center"
//             style={{ backgroundImage: `url(${imageUrl})` }}>
        
//             <h1 className="text-4xl text-white text-center p-10">We Save Our Country Togther</h1>
//             </div>
//             <div className='max-w-5xl h-full mx-auto border-2 flex'>

//                 <Home/>

//             </div>
//         </div>
//     );
// };

// export default Homebar;

import React from 'react';
// import Banner from './Banner';
// import CategoryCards from './CategoryCards';
// import RecentIssues from './RecentIssues';
// import Stats from './Stats';
import VolunteerCTA from './VolunteerCTA';
import Home from './Home';
import Banner from './Banner';
import CategoryCards from './CategoryCards';
import RecentIssues from './RecentIssues';
import Stats from './Stats';
import Banner1 from './Banner1';
import HomeBanner from './HomeBanner';

const Homebar = () => {
    return (
        <div>
            
            <Banner1/>

            <CategoryCards />
             <RecentIssues />
              <Banner/>

             <HomeBanner></HomeBanner>
             
             <Stats />
            <VolunteerCTA/>

           
            
        </div>
    );
};

export default Homebar;
