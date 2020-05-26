import {ApolloClient, InMemoryCache, HttpLink} from 'apollo-boost';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://rickandmortyapi.com/graphql/',
    })
  });

  export default client;