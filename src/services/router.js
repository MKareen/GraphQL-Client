import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import withSession from '../components/Session/withSession';
import Navbar from '../components/Navbar';
import ContactsList from '../components/Contacts/ContactsList';
import Profile from '../components/Profile/Profile';
import AddContact from '../components/Contacts/AddContact';
import ContactsPage from '../components/Contacts/ContactsPage';
import Search from '../components/Contacts/Search';
import Favourites from '../components/Contacts/Favourites';
import App from '../components/App';

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
                <Redirect to='/' />
            </Switch>
        </Fragment>
    </Router>
);

export const RootWithSession = withSession(Root);
