import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import { isEqual, cloneDeep } from 'lodash';
import { Error } from '../Error';
import { ADD_CONTACT } from '../../mutations/contact';
import { GET_USER_CONTACTS } from '../../queries/contact';
import withAuth from '../Session/withAuth';

const initialState = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: ''
};

const errorsState = {
    firstName: '',
    phone: ''
};

class AddContact extends Component {
    state = {
        fields: { ...initialState },
        errors: { ...errorsState }
    };

    clearState = () => {
        this.setState({ fields: { ...initialState }, errors: { ...errorsState } });
    };

    validate = (name, value) => {
        switch (name) {
                case 'firstName':
                    if (validator.isEmpty(value)) {
                        return 'First Name is required';
                    }
                    break;
                case 'phone':
                    if (validator.isEmpty(value)) {
                        return 'Phone number is required';
                    }
                    break;
                default:
                    return '';
        }
    }

    handleChange = (e) => {
        let newState = cloneDeep(this.state);
        const { name, value } = e.target;
        if (name === 'firstName' || name === 'phone') {
            newState.fields[name] = value;
        } else {
            newState.errors[name] = this.validate(name, value);
            newState.fields[name] = value;
        }
        if (!isEqual(this.state, newState)) {
            this.setState(newState);
        }
        this.setState({ fields: { ...this.state.fields, [name]: value }, errors: { ...errorsState } });
    };

    handleSubmit = (e, addContact) => {
        e.preventDefault();
        let validationErrors = {};
        const { fields } = this.state;

        Object.keys(fields).forEach(name => {
            const error = this.validate(name, fields[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            this.setState({ errors: validationErrors });

            return;
        }

        addContact().then(({ data }) => {
            console.log(data);
            this.clearState();
            this.props.history.push('/contacts');
        });
    };

    updateCache = (cache, { data: { addContact } } ) => {
        const { userContacts } = cache.readQuery({ query: GET_USER_CONTACTS });
        cache.writeQuery({ 
            query: GET_USER_CONTACTS, 
            data: { 
                userContacts: [addContact, ...userContacts]
            } 
        });
    };

    render() {
        const { fields, errors } = this.state;

        return (
            <Mutation 
                mutation={ADD_CONTACT}
                variables={{
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    phone: fields.phone,
                    email: fields.email,
                    address: fields.address }}
                refetchQueries={() => [
                    { query: GET_USER_CONTACTS }
                ]}
                update={this.updateCache}>
                {( addContact, { loading, error }) => {
                    return (
                        <div className="App">
                            <h2 className="App">Add Contact</h2>
                            <form className="form" onSubmit={(e) => this.handleSubmit(e, addContact)}>
                                <input 
                                    type="text" 
                                    name="firstName"
                                    placeholder="First Name"
                                    value={fields.firstName}
                                    onChange={this.handleChange} />
                                {errors.firstName && <div className="invalid">{errors.firstName}</div>}
                                <input 
                                    type="text" 
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={fields.lastName || ''}
                                    onChange={this.handleChange} />
                                <input 
                                    type="text" 
                                    name="phone"
                                    placeholder="Phone"
                                    value={fields.phone}
                                    onChange={this.handleChange} />
                                {errors.phone && <div className="invalid">{errors.phone}</div>}
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email"
                                    value={fields.email || ''}
                                    onChange={this.handleChange} />
                                <input
                                    type="text" 
                                    name="address"
                                    placeholder="Address"
                                    value={fields.address || ''}
                                    onChange={this.handleChange} />
                                <button disabled={loading} type="submit" className="button-primary">Add</button>
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
