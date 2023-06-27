import { AppProps } from 'next/app';
import Head from 'next/head';

import StyleProvider from '@/providers/StyleProvider';
import AuthProvider from '@/providers/AuthProvider';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  
  return (
    <>
      <Head>
        <title>Purdue Solutions CATS</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <StyleProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </StyleProvider>
    </>
  );
}
