import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'regenerator-runtime/runtime';
import { ApolloClient } from "apollo-client";
import  { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import './plugins/vue-bootsrap'

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
