import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from "./Auth/Logout";

const Navbar = ({ session }) => (
    <nav>
        {session && session.currentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth/>}
    </nav>
);

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

const NavbarAuth = ({ session }) => (
    <Fragment>
        <ul>
            <li>
                <NavLink to='/' exact>Home</NavLink>
            </li>
            <li>
                <NavLink to='/contacts'>Contacts</NavLink>
            </li>
            <li>
                <NavLink to='/profile'>Profile</NavLink>
            </li>
            <li>
                <Logout />
            </li>
        </ul>
        <h4>Welcome, <strong>{session.currentUser.fullName}</strong> </h4>
    </Fragment>
);

export default Navbar;
