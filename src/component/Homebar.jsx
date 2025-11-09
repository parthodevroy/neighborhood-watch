import React from 'react';
import Home from './Home';

const Homebar = () => {
    const imageUrl = "https://cdn.pixabay.com/photo/2022/01/26/05/06/garbage-6967966_1280.jpg"
    return (
        <div>
            <div
                   className="h-[800px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}>
        
            <h1 className="text-4xl text-white text-center p-10">We Save Our Country Togther</h1>
            </div>
            <div className='max-w-5xl h-full mx-auto border-2 flex'>

                <Home/>

            </div>
        </div>
    );
};

export default Homebar;
