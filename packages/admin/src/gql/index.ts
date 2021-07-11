import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import SnackbarUtils from 'src/components/Toast'

interface CustomGraphQLError {
  timestamp: string
  code: string
  message: string
}

const cache = new InMemoryCache({})

const isEnvProduction = process.env.NODE_ENV

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
    const isUnauthenticated = graphQLErrors.some((graphQLError) => {
      const isEnvProductionUnauthenticated =
        isEnvProduction &&
        (graphQLError as unknown as CustomGraphQLError).code === 'UNAUTHENTICATED'

      const isUnEnvProductionUnauthenticated =
        !isEnvProduction &&
        graphQLError.extensions &&
        graphQLError.extensions.code === 'UNAUTHENTICATED'

      return isEnvProductionUnauthenticated || isUnEnvProductionUnauthenticated
    })

    if (isUnauthenticated) {
      alert('Your session has expired. Please log in.')
      //   logout()
      return
    }

    graphQLErrors.forEach((graphQLError) => {
      SnackbarUtils.error(`[GraphQL error]: ${graphQLError.message}`)
    })
    // graphQLErrors.forEach(({ message, locations, path }) => {
    //   if (path) {
    //     SnackbarUtils.error(path.join(','))
    //   }
    // })
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
