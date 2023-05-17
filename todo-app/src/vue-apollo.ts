import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.use(VueApollo);

const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:8080/v1/graphql';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: httpEndpoint,
    headers: {
      'x-hasura-admin-secret': 'myadminsecret',
      }
}),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default apolloProvider;
