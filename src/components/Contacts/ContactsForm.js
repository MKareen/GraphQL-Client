import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { GET_USER_CONTACTS } from '../../queries/contact';
import { EDIT_CONTACT } from '../../mutations/contact';
import { Error } from '../Error';
import validator from 'validator';
import { cloneDeep, isEqual } from 'lodash';

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

class ContactForm extends Component {

    state = {
        fields: { ...initialState },
        errors: { ...errorsState }
    };

    componentDidMount() {
        this.setState({
            fields: {
                firstName: this.props.data.contact.firstName,
                lastName: this.props.data.contact.lastName,
                phone: this.props.data.contact.phone,
                email: this.props.data.contact.email,
                address: this.props.data.contact.address
            }
        });
    }

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
    };

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

    handleSubmit = (e, editContact) => {
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

        editContact().then(({ data }) => {
            console.log(data);
        });
    };

    render() {
        const { fields, errors } = this.state;
        const { data } = this.props;

        return (
            <Mutation
                mutation={ EDIT_CONTACT }
                variables={{
                    id: data.contact.id,
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    phone: fields.phone,
                    email: fields.email,
                    address: fields.address }}
                refetchQueries={() => [
                    { query: GET_USER_CONTACTS }
                ]}
            >
                {( editContact, { loading, error }) => {
                    return (
                        <form className="form" onSubmit={(e) => this.handleSubmit(e, editContact)}>
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={fields.firstName}
                                onChange={this.handleChange}
                            />
                            {errors.firstName && <div className="invalid">{errors.firstName}</div>}
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={fields.lastName || ''}
                                onChange={this.handleChange}
                            />
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={fields.phone}
                                onChange={this.handleChange}
                            />
                            {errors.phone && <div className="invalid">{errors.phone}</div>}
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={fields.email || ''}
                                onChange={this.handleChange}
                            />
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="address"
                                value={fields.address || ''}
                                onChange={this.handleChange}
                            />
                            <button disabled={loading} type="submit" className="button-primary">Save</button>
                            {error && <Error error={error} />}
                        </form>
                    );
                }}
            </Mutation>
        );
    }
}

export default ContactForm;
