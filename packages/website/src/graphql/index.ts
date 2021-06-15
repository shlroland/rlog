import { ApolloClient, InMemoryCache } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { onError } from '@apollo/client/link/error'
import fetch from 'isomorphic-unfetch'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const httpLink = new BatchHttpLink({
  fetch,
  uri: process.env.NEXT_PUBLIC_API_URL,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(graphQLError => {
      toast.error(`[GraphQL error]: ${graphQLError.message}`)
    })
  }

  if (networkError) {
    toast.error(`[Network error]: ${networkError.message}`)
  }
})

const client = new ApolloClient({
  resolvers: {},
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
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
