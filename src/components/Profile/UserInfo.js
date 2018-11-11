import React from 'react';

const UserInfo = ({ session }) => (
    <div>
        <h3>User info</h3>
        <p>Full Name: {session.currentUser.fullName}</p>
        <p>Email Address: {session.currentUser.email}</p>
        <p>Join Date: {session.currentUser.createdAt}</p>
    </div>
);

export default UserInfo;