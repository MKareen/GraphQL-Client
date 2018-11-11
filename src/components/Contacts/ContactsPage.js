import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { GET_CONTACT, GET_USER_CONTACTS } from '../../queries/contact';
import { DELETE_CONTACT, LIKE_OR_UNLIKE } from '../../mutations/contact';
import { GET_CURRENT_USER } from '../../queries/user';

const handleDelete = (deleteContact, history) => {
    const confirmDelete = window.confirm('Do you really want to delete?');
    if (confirmDelete) {
        deleteContact().then(({ data }) => {
            history.push('/contacts');
        });
    }
}

const handleAddOrRemove = (addToFavourites) => {
    addToFavourites().then(({ data }) => {
        console.log(data);
    });
}

const ContactsPage = ({ match, history }) => {
    const { id } = match.params;
    return (
        <Query query={GET_CONTACT} variables={{ id }}>
            {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div>{error.message}</div>
                console.log(data);
                return (
                    <div className="App">
                        <h2>{data.contact.firstName} {data.contact.lastName}</h2>
                        <p>Phone: {data.contact.phone || ""}</p>
                        <p>Email: {data.contact.email || ""}</p>
                        <Mutation
                            mutation={LIKE_OR_UNLIKE}
                            variables={{ id }}
                            refetchQueries={() => [
                                { query: GET_CONTACT },
                                { query: GET_USER_CONTACTS },
                                { query: GET_CURRENT_USER }
                            ]}>
                            {(addToFavourites, { data, loading, error }) => {
                                // Todo fix like/unlike
                                return (
                                    <button 
                                        className="delete-button"
                                        onClick={() => handleAddOrRemove(addToFavourites)}>
                                            {data && data.addToFavourites.isFavourite ? 'Add to favourites' : 'Remove from favourites'}
                                    </button>
                                );
                            }}
                        </Mutation>
                        <Mutation 
                            mutation={DELETE_CONTACT} 
                            variables={{ id }}
                            refetchQueries={() => [
                                { query: GET_USER_CONTACTS }
                            ]}
                            update={(cache, { data: { deleteContact } }) => {
                                const { userContacts } = cache.readQuery({
                                    query: GET_USER_CONTACTS,
                                    // variables: { currentUser._id }
                                });

                                cache.writeQuery({
                                    query: GET_USER_CONTACTS,
                                    // variabeles ...
                                    data: {
                                        userContacts: userContacts.filter(contact => contact.id !== deleteContact.id)
                                    }
                                });
                            }}
                        >
                            {(deleteContact,  attrs = {}) => (
                                    <button 
                                        className="delete-button"
                                        onClick={() => handleDelete(deleteContact, history)}>
                                            {attrs.loading ? 'Deleting...' : 'Delete'}
                                    </button>
                                )
                            }
                        </Mutation>
                    </div>
                );
            }}
        </Query>
    );
};

export default withRouter(ContactsPage);