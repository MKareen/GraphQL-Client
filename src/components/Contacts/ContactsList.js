import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_USER_CONTACTS } from "../../queries/contact";
import ContactItem from './Contact';
import withAuth from "../Session/withAuth";

const ContactsList = () => (
    <div className="App">
        <h1>Contacts</h1>
        <button><Link to="/contact/add">Add New Contact </Link></button>
        <Query query={GET_USER_CONTACTS}>
            {({ data, loading }) => {
                if (loading) return <div>Loading...</div>;
                console.log(data);
                if (data && data.userContacts.length) {
                    return (
                        <ul>
                            {data.userContacts.map((contact, i) => (
                                <ContactItem key={i} { ...contact }/>
                            ))}
                        </ul>
                    );
                } else {
                    return <div>No Contacts Found</div>
                }
            }}
        </Query>
    </div>
);

export default withAuth(session => session && session.currentUser)(ContactsList);
