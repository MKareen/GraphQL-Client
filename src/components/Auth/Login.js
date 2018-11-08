import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Error } from '../Error';

import { LOGIN_USER } from "../../mutations";

const initialState = {
    email: "",
    password: ""
};

export class Login extends Component {
    state = { ...initialState };

    clearState = () => {
        this.setState({ ...initialState });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e, login) => {
        e.preventDefault();
        login().then(({ data }) => {
            console.log(data);
            localStorage.setItem('accessToken', data.login.accessToken)
            this.clearState();
        });
    }

    validateForm = () => {
        const { email, password } = this.state;
        return !email || !password;
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className="App">
                <h2 className="App">Login</h2>
                <Mutation mutation={LOGIN_USER} variables={{ email, password }}>
                    {( login, { data, loading, error }) => {
                        return (
                            <form onSubmit={e => this.handleSubmit(e, login)} className="form">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email || ""}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password || ""}
                                    onChange={this.handleChange}
                                />
                                <button
                                    type="submit"
                                    className="button-primary"
                                    disabled={loading || this.validateForm() }
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

export default Login;
