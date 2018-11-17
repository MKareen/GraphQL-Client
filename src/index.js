import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { RootWithSession } from './services/router';
import client from './services/apolloConfiguration';

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>, document.getElementById('root'));

serviceWorker.register();
