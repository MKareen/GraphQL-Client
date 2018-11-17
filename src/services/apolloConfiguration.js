import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('accessToken');
        operation.setContext({
            headers: {
                authorization: token
            }
        });
    },
    onError: ({ graphQLErrors, networkError }) => {
        if (networkError) {
            localStorage.removeItem('accessToken');
        }
        if (graphQLErrors) {
            graphQLErrors.map(({ message, state, locations, path }) =>
                console.error(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, State: ${state}`,
                ),
            );
        }
    }
});

export default client;
