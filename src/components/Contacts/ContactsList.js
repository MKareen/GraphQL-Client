import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_USER_CONTACTS } from "../../queries/contact";
import ContactItem from './Contact';

class ContactsList extends Component {
    componentDidMount() {
        this.props.refetch();
    }

    render() {
        return (
            <div className="App">
                <h1>Contacts</h1>
                <button><Link to="/contact/add">Add New Contact </Link></button>
                <Query query={GET_USER_CONTACTS}>
                    {({ data, loading,error }) => {
                        if (loading) return <div>Loading...</div>;
                        if (error) { console.log(error); };
                        console.log(data);
                        if (data && data.userContacts.length) {
                            return (
                                <ul>
                                    {data.userContacts.map((contact, i) => (
                                        <ContactItem key={i} {...contact}/>
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
    }
}

export default ContactsList;
