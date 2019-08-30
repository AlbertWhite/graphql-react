import React from 'react';
import ReactDOM from 'react-dom';
import client from './config/apolloClient'
import {ApolloProvider} from 'react-apollo'
import App from './app';

const wrapper = 
<ApolloProvider client={client}>
  <App/>
</ApolloProvider>

ReactDOM.render(wrapper, document.getElementById('root'));
