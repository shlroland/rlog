import { isSSR } from '@/utils'
import { ApolloClient, from, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { toast } from 'react-toastify'
import merge from 'deepmerge'
import { isEqual } from 'lodash'
import 'react-toastify/dist/ReactToastify.css'
import { useMemo } from 'react'

type PageProps = { props: Record<string, unknown>; [key: string]: unknown }

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && !isSSR()) {
    graphQLErrors.forEach(graphQLError => {
      toast.error(`[GraphQL error]: ${graphQLError.message}`)
    })
  }

  if (networkError && !isSSR()) {
    toast.error(`[Network error]: ${networkError.message}`)
  }
})

const link = from([errorLink, httpLink])

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isSSR(),
    // uri: process.env.NEXT_PUBLIC_API_URL,
    link,
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()
  if (initialState) {
    const existingCache = _apolloClient.extract()
    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = merge(initialState as any, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    })
    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (isSSR()) {
    return _apolloClient
  }
  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient
  }

  return _apolloClient
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: PageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: PageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = useMemo(() => initializeApollo(state as any), [state])
  return store
}
