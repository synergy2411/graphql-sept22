import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

const httpLink = createHttpLink({
  uri: "http://localhost:9090/api"
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);