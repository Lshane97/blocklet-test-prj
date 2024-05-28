import Head from 'next/head';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import Header from './_header';
import Theme from './_theme';

import '../styles/globals.css';

const App = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <title>{process.env.APP_TITLE}</title>
        <link rel="icon" href="/favicon.ico?imageFilter=convert&f=png&w=32" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#4F6AF5" />
      </Head>
      <Script src="__blocklet__.js" />
      <Theme>
        <Header />
        <Component {...pageProps} />
      </Theme>
    </>
  );
};

export default appWithTranslation(App);
