import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink to='/' exact >Home</NavLink>
        </li>
        <li>
            <NavLink to='/login'>Login</NavLink>
        </li>
        <li>
            <NavLink to='/signup'>Signup</NavLink>
        </li>
    </ul>
);

export default NavbarUnAuth;
