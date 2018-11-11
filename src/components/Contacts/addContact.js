import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Error } from '../Error';
import { ADD_CONTACT } from '../../mutations/contact';
import { GET_USER_CONTACTS } from '../../queries/contact';
import withAuth from '../HOCs/withAuth';

const initialState = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: ''
};

class AddContact extends Component {
    state = { ...initialState };

    componentDidMount() {
        console.log(this.props);
    }

    clearState = () => {
        this.setState({ ...initialState });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e, addContact) => {
        e.preventDefault();
        addContact().then(({ data }) => {
            console.log(data);
            this.clearState();
            this.props.history.push("/contacts");
        });
    }

    validateForm = () => {
        const { firstName, phone } = this.state;
        return !firstName || !phone;
    }

    updateCache = (cache, { data: { addContact }} ) => {
        const { userContacts } = cache.readQuery({ query: GET_USER_CONTACTS });
        cache.writeQuery({ 
            query: GET_USER_CONTACTS, 
            data: { 
                userContacts: [addContact, ...userContacts]
            } 
        });
    }

    render() {
        const { firstName, lastName, phone, email, address } = this.state;

        return (
            <Mutation 
                mutation={ADD_CONTACT} 
                variables={{ firstName, lastName, phone, email, address }}
                refetchQueries={() => [
                    { query: GET_USER_CONTACTS }
                ]}
                update={this.updateCache}>
            {( addContact, { data, loading, error }) => {
                return (
                    <div className="App">
                        <h2 className="App">Add Contact</h2>
                        <form className="form" onSubmit={(e) => this.handleSubmit(e, addContact)}>
                            <input 
                                type="text" 
                                name="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={this.handleChange} />
                            <input 
                                type="text" 
                                name="lastName"
                                placeholder="Last Name"
                                value={lastName || ""}
                                onChange={this.handleChange} />
                            <input 
                                type="text" 
                                name="phone"
                                placeholder="Phone"
                                value={phone}
                                onChange={this.handleChange} />
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email"
                                value={email || ""}
                                onChange={this.handleChange} />
                            <input
                                type="text" 
                                name="address"
                                placeholder="Address"
                                value={address || ""}
                                onChange={this.handleChange} />
                            <button disabled={loading || this.validateForm()} type="submit" className="button-primary">Add</button>
                            {error && <Error error={error} />}
                        </form>
                    </div>
                ); 
            }}
        </Mutation>
        );
    }
}

export default withAuth(session => session && session.currentUser)(
    withRouter(AddContact)
);