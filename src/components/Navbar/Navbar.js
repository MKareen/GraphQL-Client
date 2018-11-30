import React from 'react';
import NavbarAuth from './NavbarAuth';
import NavbarUnAuth from './NavbarUnAuth';

const Navbar = ({ session }) => (
    <nav>
        {session &&
            session.currentUser ?
            <NavbarAuth session={session} />
            :
            <NavbarUnAuth/>
        }
    </nav>
);

export default Navbar;
