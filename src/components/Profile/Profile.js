import React from 'react';
import UserInfo from './UserInfo';
import withAuth from '../Session/withAuth';

const Profile = ({ session }) => {
    console.log(session);

    return (
        <div className="contact-list">
            <UserInfo session={session}/>
        </div>
    );
};

export default withAuth(session => session && session.currentUser)(Profile);
