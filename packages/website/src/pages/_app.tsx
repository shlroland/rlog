import '@/styles/globals.css'
import { AppProps } from 'next/app'
import LayoutHeader from '@/views/LayoutHeader'
import { useApollo } from '@/graphql'
import { ApolloProvider } from '@apollo/client'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <LayoutHeader />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
