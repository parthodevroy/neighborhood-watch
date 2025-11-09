import React from 'react';
import Navber from '../Navber';
import { Outlet, useLocation } from 'react-router';
import Footer from '../Footer';
import Homebar from '../Homebar';

const Root = () => {

    const location=useLocation()
    return (
        < div className='bg-green-50'>
<header>

    <Navber></Navber>
    {location.pathname === '/' && <Homebar />}

</header>


<main>
    <Outlet/>
   
</main>


<footer>
    <Footer/>
</footer>
        </div>
    );
};

export default Root;