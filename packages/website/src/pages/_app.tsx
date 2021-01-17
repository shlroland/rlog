import '@/styles/globals.css'
import { AppProps } from 'next/app'
import LayoutHeader from '@/views/LayoutHeader'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <LayoutHeader />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
