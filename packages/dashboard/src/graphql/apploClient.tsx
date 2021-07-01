import { getToken } from '@/utils/storage';
import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { message as AntMessage, notification } from 'antd';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

// const isDev = process.env.NODE_ENV === 'development';
const cache = new InMemoryCache({
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       getPosts: {
  //         // Don't cache separate results based on
  //         // any of this field's arguments.
  //         keyArgs: false,
  //         // Concatenate the incoming list items with
  //         // the existing list items.
  //         merge(existing,incoming) {
  //           console.log(existing?.items, incoming.items);
  //           return incoming;
  //         },
  //       },
  //     },
  //   },
  // },
});
const httpLink = new BatchHttpLink({
  uri: REACT_APP_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      notification.error({
        message: `[GraphQL error]: Message: ${message}`,
        description: (
          <>
            <div>
              Location:{' '}
              {locations &&
                locations.map((sourceLocation) => (
                  <span>
                    line: {sourceLocation.line},column {sourceLocation.column}
                  </span>
                ))}
            </div>
            <div> Path: {path}</div>
          </>
        ),
      });
    });
  if (networkError) AntMessage.error(`[Network error]: ${networkError}`);
});

(async function handlePersistCache() {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });
})();

export const client = new ApolloClient({
  cache,
  link: from([errorLink, authLink, httpLink]),
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
