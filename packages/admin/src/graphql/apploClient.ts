import { ApolloClient, InMemoryCache, concat } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

// const isDev = process.env.NODE_ENV === 'development';
const cache = new InMemoryCache();
const httpLink = new BatchHttpLink({
  uri: REACT_APP_GRAPHQL_URL,
});

const authLink = setContext((...rest) => {
  console.log(rest);
  return {};
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

(async function handlePersistCache() {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });
})();

export const client = new ApolloClient({
  cache,
  link: concat(httpLink, authLink).concat(errorLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
