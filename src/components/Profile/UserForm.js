import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { EDIT_USER } from '../../mutations/user';
import { Error } from '../Error';
import validator from 'validator';
import { cloneDeep, isEqual } from 'lodash';
import moment from 'moment';

const userState = {
    fullName: '',
    email: ''
};

class UserForm extends Component {
    state = {
        fields: { ...userState },
        errors: { ...userState }
    };

    componentDidMount() {
        const { data: { currentUser } } = this.props;
        if (currentUser) {
            this.setState({
                fields: {
                    fullName: currentUser.fullName,
                    email: currentUser.email
                }
            });
        }
    }

    validate = (name, value) => {
        switch (name) {
                case 'fullName':
                    if (validator.isEmpty(value)) {
                        return 'Full Name is required';
                    }
                    break;
                case 'email':
                    if (validator.isEmpty(value)) {
                        return 'Email is required';
                    } else if (!validator.isEmail(value)) {
                        return 'Email is invalid';
                    }
                    break;
                default:
                    return '';
        }
    }

    handleChange = (e) => {
        let newState = cloneDeep(this.state);
        const { name, value } = e.target;
        if (name === 'fullName' || name === 'email') {
            newState.fields[name] = value;
        } else {
            newState.errors[name] = this.validate(name, value);
            newState.fields[name] = value;
        }
        if (!isEqual(this.state, newState)) {
            this.setState(newState);
        }
        this.setState({ fields: { ...this.state.fields, [name]: value }, errors: { ...userState } });
    };

    handleSubmit = (e, editUser) => {
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

        editUser().then(({ data }) => {
            console.log(data);
        });
    };

    render() {
        const { fields, errors } = this.state;
        const { data: { currentUser } } = this.props;

        return (
            <Mutation
                mutation={EDIT_USER}
                variables={{
                    fullName: fields.fullName,
                    email: fields.email }}
            >
                {( editUser, { loading, error }) => {
                    return (
                        <form className="form" onSubmit={(e) => this.handleSubmit(e, editUser)}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={fields.fullName || ''}
                                onChange={this.handleChange}
                            />
                            {errors.fullName && <div className="invalid">{errors.fullName}</div>}
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={fields.email || ''}
                                onChange={this.handleChange}
                            />
                            {errors.email && <div className="invalid">{errors.email}</div>}
                            <label>Join Date</label>
                            <input
                                type="text"
                                disabled={true}
                                value={moment(currentUser.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                            />
                            <button disabled={loading} type="submit" className="button-primary">Save</button>
                            {error && <Error error={error}/>}
                        </form>
                    );
                }}
            </Mutation>
        );
    }
}

export default UserForm;
