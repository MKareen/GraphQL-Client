import React from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

const handleLogout = (client, history) => {
    localStorage.removeItem('accessToken');
    client.resetStore();
    history.push('/');
};

const Logout = ({ history }) => (
    <ApolloConsumer>
        {(client) => {
            return (
                <button onClick={() => handleLogout(client, history)}>Logout</button>
            );
        }}
    </ApolloConsumer>
);

export default withRouter(Logout);
