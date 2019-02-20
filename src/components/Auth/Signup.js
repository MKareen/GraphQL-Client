import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isEmpty, isEmail } from 'validator';
import { isEqual, cloneDeep } from 'lodash';
import { Mutation } from 'react-apollo';
import { Error } from '../Error';
import { SIGNUP_USER } from '../../mutations/auth';
import { REQUIRED, INVALID } from '../../configs/constants';

const signupState = {
    fullName: '',
    email: '',
    password: ''
};

export class Signup extends Component {
    state = {
        fields: { ...signupState },
        errors: { ...signupState }
    };

    clearState = () => {
        this.setState({ fields: { ...signupState }, errors: { ...signupState } });
    }

    validate = (name, value) => {
        switch (name) {
                case 'fullName': {
                    if (isEmpty(value)) {
                        return REQUIRED('Full Name');
                    }
                    break;
                }
                case 'email':
                    if (isEmpty(value)) {
                        return REQUIRED('Email');
                    } else if (!isEmail(value)) {
                        return INVALID('Email');
                    }
                    break;
                case 'password':
                    if (isEmpty(value)) {
                        return REQUIRED('Password');
                    }
                    break;
                default:
                    return '';
        }
    }

    handleChange = e => {
        let newState = cloneDeep(this.state);
        const { name, value } = e.target;
        if (name) {
            newState.fields[name] = value;
        } else {
            newState.errors[name] = this.validate(name, value);
            newState.fields[name] = value;
        }
        if (!isEqual(this.state, newState)) {
            this.setState(newState);
        }
        this.setState({ fields: { ...this.state.fields, [name]: value }, errors: { ...signupState } });
    };

    handleSubmit = (e, signup) => {
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

        signup().then(async ({ data: { signup } }) => {
            localStorage.setItem('accessToken', signup.accessToken);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        });
    };

    render() {
        const { fields, errors } = this.state;

        return (
            <div className="App">

                <Mutation
                    mutation={SIGNUP_USER}
                    variables={{
                        fullName: fields.fullName,
                        email: fields.email,
                        password: fields.password
                    }}>
                    {( signup, { loading, error }) => {
                        return (
                            <form onSubmit={e => this.handleSubmit(e, signup)} className="form">
                                <h2 className="felt">Sign Up</h2>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={fields.fullName || ''}
                                    onChange={this.handleChange}
                                />
                                {errors.fullName && <div className="invalid">{errors.fullName}</div>}
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={fields.email || ''}
                                    onChange={this.handleChange}
                                />
                                {errors.email && <div className="invalid">{errors.email}</div>}
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={fields.password || ''}
                                    onChange={this.handleChange}
                                />
                                {errors.password && <div className="invalid">{errors.password}</div>}
                                <button
                                    type="submit"
                                    className="button-primary"
                                    disabled={loading}
                                >
                                    Submit
                                </button>
                                {error && <Error error={error} />}
                            </form>
                        );
                    }}
                </Mutation>
            </div>
        );
    }
}

export default withRouter(Signup);
