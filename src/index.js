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
import withSession from './withSession';
import Navbar from './components/Navbar';
import Contacts from "./components/Contacts/Contact";
import Profile from "./components/Profile";

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
    onError: ({ networkError }) => {
        if (networkError) {
            localStorage.setItem('token', '');
        }
    }
});

const Root = ({ refetch, session }) => (
  <Router>
      <Fragment>
          <Navbar session={session}/>
          <Switch>
              <Route path='/' exact component={App} />
              <Route path='/contacts' component={Contacts} />
              <Route path='/login' render={() => <Login refetch={refetch} />} />
              <Route path='/signup' render={() => <Signup refetch={refetch} />} />
              <Route path="/profile" component={Profile} />
              <Redirect to='/' />
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
serviceWorker.unregister();
