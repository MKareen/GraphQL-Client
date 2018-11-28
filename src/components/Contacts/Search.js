import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_CONTACT } from '../../queries/contact';
import SearchItem from './SearchItem';
import withAuth from '../Session/withAuth';

class Search extends Component {
    state = {
        searchResults: []
    };

    handleChange = ({ searchContact }) => {
        this.setState({
            searchResults: searchContact
        });
    };

    render() {
        const { searchResults } = this.state; 

        return (
            <ApolloConsumer>
                {(client) => (
                    <div className="contact-list">
                        <input 
                            type="search" 
                            placeholder="Search for Contacts"
                            onChange={async event => {
                                event.persist();
                                const { data } = await client.query({
                                    query: SEARCH_CONTACT,
                                    variables: { q: event.target.value }
                                });
                                this.handleChange(data);
                            }} />
                        <ul>
                            {searchResults.map((contact, i) => (
                                <SearchItem key={i} { ...contact } />
                            ))}
                        </ul>
                    </div>
                )}
            </ApolloConsumer>
        );
    }
}

export default withAuth(session => session && session.currentUser)(Search);
