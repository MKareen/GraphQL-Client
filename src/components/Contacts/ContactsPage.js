import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { GET_CONTACT, GET_USER_CONTACTS } from '../../queries/contact';
import { DELETE_CONTACT, LIKE_OR_UNLIKE } from '../../mutations/contact';
import { GET_CURRENT_USER } from '../../queries/user';
import ContactForm from "./ContactsForm";
import withAuth from "../Session/withAuth";

class ContactsPage extends Component {

    handleDelete = (deleteContact) => {
        const confirmDelete = window.confirm('Do you really want to delete?');
        if (confirmDelete) {
            deleteContact().then(() => {
                this.props.history.push('/contacts');
            });
        }
    };

    handleAddOrRemove = (addToFavourites) => {
        addToFavourites().then(({ data }) => {
            console.log(data);
        });
    };

    updateDeleteCache = (cache, { data: { deleteContact }} ) => {
        const {userContacts} = cache.readQuery({
            query: GET_USER_CONTACTS,
        });

        cache.writeQuery({
            query: GET_USER_CONTACTS,
            data: {
                userContacts: userContacts.filter(contact => contact.id !== deleteContact.id)
            }
        });
    };

    render() {
        const { id } = this.props.match.params;

        return (
            <Query query={GET_CONTACT} variables={{ id }}>
                {({data, loading, error}) => {
                    if (loading) return <div>Loading...</div>;

                    if (error) return <div>{error.message}</div>;

                    return (
                        <div className="App">
                            <h2>{data.contact.firstName} {data.contact.lastName}</h2>
                            <ContactForm data={data}/>
                            <Mutation
                                mutation={LIKE_OR_UNLIKE}
                                variables={{id}}
                                refetchQueries={() => [
                                    {query: GET_CONTACT, variables: {id}},
                                    {query: GET_USER_CONTACTS},
                                    {query: GET_CURRENT_USER}
                                ]}>
                                {(addToFavourites) => {
                                    return (
                                        <button
                                            onClick={() => this.handleAddOrRemove(addToFavourites)}>
                                            {data && data.contact.isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                                        </button>
                                    );
                                }}
                            </Mutation>
                            <br />
                            <Mutation
                                mutation={DELETE_CONTACT}
                                variables={{id}}
                                refetchQueries={() => [{ query: GET_USER_CONTACTS }] }
                                update={this.updateDeleteCache}
                            >
                                {(deleteContact, attrs = {}) => (
                                    <button
                                        className="delete-button"
                                        onClick={() => this.handleDelete(deleteContact)}>
                                        {attrs.loading ? 'Deleting...' : 'Delete'}
                                    </button>
                                )}
                            </Mutation>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default withAuth(session => session && session.currentUser)(withRouter(ContactsPage));
