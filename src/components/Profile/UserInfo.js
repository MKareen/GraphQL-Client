import React from 'react';

const UserInfo = ({ session }) => (
    <div className="App">
        <h3>User info</h3>
        <form className="form">
            <label>Full Name</label>
            <input type="text" value={session.currentUser.fullName}/>
            <label>Email</label>
            <input type="text" value={session.currentUser.email}/>
            <label>Join Date</label>
            <input type="text" value={session.currentUser.createdAt}/>
            <button type="submit" className="button-primary">
                Save
            </button>
        </form>
    </div>
);

export default UserInfo;
