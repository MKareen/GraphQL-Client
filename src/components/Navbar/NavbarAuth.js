import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../Auth/Logout';

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
                <NavLink to='/favourites'>Favourites</NavLink>
            </li>
            <li>
                <NavLink to='/contact/add'>Create</NavLink>
            </li>
            <li>
                <NavLink to='/search'>Search</NavLink>
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

export default NavbarAuth;
