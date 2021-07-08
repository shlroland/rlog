import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import SnackbarUtils from 'src/components/Toast'

const cache = new InMemoryCache({})

import { BatchHttpLink } from '@apollo/client/link/batch-http'
// import { setContext } from '@apollo/client/link/context'

const httpLink = new BatchHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
})

// const authLink = setContext((_, { headers }) => {
//   const token = getToken()
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   }
// })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (path) {
        SnackbarUtils.error(path.join(','))
      }
    })
  }
  if (networkError) SnackbarUtils.error(`[Network error]: ${networkError}`)
})

const client = new ApolloClient({
  cache,
  resolvers: {},
  link: from([errorLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})

export default client
