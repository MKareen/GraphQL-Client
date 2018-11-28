import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from '../../queries/user';

const withAuth = (check) => Component => props => (
    <Query query={GET_CURRENT_USER}>
        {({ loading, data }) => {
            if (loading) {
                return null;
            }

            return check(data) ?
                <Component { ...props } /> :
                <Redirect to="/" />;
        }}
    </Query>
);

export default withAuth;
