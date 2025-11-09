import React from 'react';
import { Authcontext } from './Authcontext';

const Authprovider = ({children}) => {
    const userinfo={

    }


    return (
        <div>
            <Authcontext>
                {children}
            </Authcontext>

        </div>
    );
};

export default Authprovider;