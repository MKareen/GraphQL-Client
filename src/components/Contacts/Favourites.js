import React from 'react';
import withAuth from '../Session/withAuth';
import Contact from './Contact';

const Favourites = ({ session }) => {
    console.log(session);

    return (
        <div className="contact-list">
            <ul>
                {session.currentUser && session.currentUser.favourites.length ? 
                    session.currentUser.favourites.map((contact, i) => (
                        <Contact key={i} { ...contact } />
                    )) :
                    <div>No Favourites</div>
                }
            </ul>
        </div>
    );
};

export default withAuth(session => session && session.currentUser)(Favourites);
