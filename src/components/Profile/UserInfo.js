import React from 'react';
import UserForm from './UserForm';

const UserInfo = ({ session }) => (
    <div className="App">
        <h3>User info</h3>
        <UserForm data={session} />
    </div>
);

export default UserInfo;
