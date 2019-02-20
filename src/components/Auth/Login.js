import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { cloneDeep, isEqual } from 'lodash';
import { isEmpty, isEmail } from 'validator';
import { Mutation } from 'react-apollo';
import { Error } from '../Error';
import { LOGIN_USER } from '../../mutations/auth';
import { REQUIRED, INVALID } from '../../configs/constants';

const loginState = {
    email: '',
    password: ''
};

export class Login extends Component {
    state = {
        fields: { ...loginState },
        errors: { ...loginState }
    };

    clearState = () => {
        this.setState({
            fields: { ...loginState },
            errors: { ...loginState }
        });
    };

    validate = (name, value) => {
        switch (name) {
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
    };

    handleChange = e => {
        let newState = cloneDeep(this.state);
        const { name, value } = e.target;
        if (name === 'email' || name === 'password') {
            newState.fields[name] = value;
        } else {
            newState.errors[name] = this.validate(name, value);
            newState.fields[name] = value;
        }
        if (!isEqual(this.state, newState)) {
            this.setState(newState);
        }
        this.setState({ fields: { ...this.state.fields, [name]: value }, errors: { ...loginState } });
    };

    handleSubmit = (e, login) => {
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

        login().then(async ({ data: { login } }) => {
            if (login) {
                localStorage.setItem('accessToken', login.accessToken);
                await this.props.refetch();
                this.clearState();
                this.props.history.push('/');
            }

        });
    };

    render() {
        const { fields, errors } = this.state;

        return (
            <div className="App">
                <Mutation
                    mutation={LOGIN_USER}
                    variables={{ email: fields.email, password: fields.password }}>
                    {( login, { loading, error }) => {
                        return (
                            <form onSubmit={e => this.handleSubmit(e, login)} className="form">
                            <div className="row header">
                            <h2 className="felt">Login</h2>
                            </div>
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

                                <div className="main-wrapper">
	                                    	<i className="icon ion-logo-facebook"></i>
	                                    	<i className="icon ion-logo-instagram"></i>
	                                    	<i className="icon ion-logo-twitter"></i>
                                    </div>
                                <button
                                    type="submit"
                                    className="button-primary"
                                    disabled={loading }
                                >
                                    Login
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

export default withRouter(Login);
