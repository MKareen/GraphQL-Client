import ApolloClient from 'apollo-boost';
import params from '../configs/params';

const client = new ApolloClient({
    uri: params.apiUrl,
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('accessToken');
        operation.setContext({
            headers: {
                authorization: `Bearer ${token}`
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
