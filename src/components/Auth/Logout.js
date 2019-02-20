import React from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { LOGOUT_USER } from '../../mutations/auth';

const handleLogout = async (client, history) => {
    await client.mutate({
        mutation: LOGOUT_USER
    });
    localStorage.removeItem('accessToken');
    client.resetStore();
    history.push('/');
};

const Logout = ({ history }) => (
    <ApolloConsumer>
        {(client) => {
            return (
                <button className="out" onClick={() => handleLogout(client, history)}>Logout</button>
            );
        }}
    </ApolloConsumer>
);

export default withRouter(Logout);
