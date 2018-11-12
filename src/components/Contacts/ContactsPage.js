import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { GET_CONTACT, GET_USER_CONTACTS } from '../../queries/contact';
import { DELETE_CONTACT, LIKE_OR_UNLIKE } from '../../mutations/contact';
import { GET_CURRENT_USER } from '../../queries/user';

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


    render() {
        const { id } = this.props.match.params;

        return (
            <Query query={GET_CONTACT} variables={{id}}>
                {({data, loading, error}) => {
                    if (loading) return <div>Loading...</div>;

                    if (error) return <div>{error.message}</div>;

                    console.log(data);

                    return (
                        <div className="App">
                            <h2>{data.contact.firstName} {data.contact.lastName}</h2>
                            <form className="form">
                                <label>First Name</label>
                                <input type="text" value={data.contact.firstName}/>
                                <label>Last Name</label>
                                <input type="text" value={data.contact.lastName || ""}/>
                                <label>Phone</label>
                                <input type="text" value={data.contact.phone}/>
                                <label>Email</label>
                                <input type="text" value={data.contact.email || ""}/>
                                <label>Address</label>
                                <input type="text" value={data.contact.address || ""}/>
                            </form>
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
                                refetchQueries={() => [
                                    {query: GET_USER_CONTACTS}
                                ]}
                                update={(cache, {data: {deleteContact}}) => {
                                    const {userContacts} = cache.readQuery({
                                        query: GET_USER_CONTACTS,
                                    });

                                    cache.writeQuery({
                                        query: GET_USER_CONTACTS,
                                        data: {
                                            userContacts: userContacts.filter(contact => contact.id !== deleteContact.id)
                                        }
                                    });
                                }}
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

export default withRouter(ContactsPage);
