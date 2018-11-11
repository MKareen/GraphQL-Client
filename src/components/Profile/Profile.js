import React from 'react';
import UserInfo from './UserInfo';
import withAuth from '../HOCs/withAuth';

const Profile = ({ session }) => (
    <div className="App">
        <UserInfo session={session}/>
    </div>
);

export default withAuth(session => session && session.currentUser)(Profile);
