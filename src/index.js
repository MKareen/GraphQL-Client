import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import withSession from './components/Session/withSession';
import Navbar from './components/Navbar';
import ContactsList from './components/Contacts/ContactsList';
import Profile from "./components/Profile/Profile";
import AddContact from './components/Contacts/AddContact';
import ContactsPage from './components/Contacts/ContactsPage';
import Search from './components/Contacts/Search';
import Favourites from './components/Contacts/Favourites';
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
        if (graphQLErrors)
            graphQLErrors.map(({ message, state, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, State: ${state}`,
                ),
            );
    }
});

const Root = ({ refetch, session }) => (
    <Router>
        <Fragment>
            <Navbar session={session}/>
            <Switch>
                <Route path='/' exact component={App} />
                <Route path='/contacts' render={() => <ContactsList session={session} />} />
                <Route path='/login' render={() => <Login refetch={refetch} />} />
                <Route path='/signup' render={() => <Signup refetch={refetch} />} />
                <Route path="/profile" render={() => <Profile session={session} /> } />
                <Route path="/contact/add" render={() => <AddContact session={session} />} />
                <Route path="/contact/:id" render={() => <ContactsPage session={session} />} />
                <Route path="/search" render={() => <Search session={session} />} />
                <Route path="/favourites" render={() => <Favourites session={session} /> } />
                {/*<Redirect to='/' />*/}
            </Switch>
        </Fragment>
    </Router>
);

const RootWithSession = withSession(Root);


ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
