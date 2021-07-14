import './styles/globals.css';

import * as serviceWorker from './serviceWorker';

import { AppProps, NextWebVitalsMetric } from 'next/app';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../utils/constants';
import React, { useContext } from 'react';
import {
  StylesProvider,
  ThemeProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { WebfoxContext, WebfoxProvider } from '../services/webfox';

import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import Layout from '../components/Layout';
import Routes from '../components/Routes';
import { StoreProvider } from '../services/webstore';
import { ViewportProvider } from '../components/ViewportProvider';
import cookie from 'react-cookies';
import { setAnalyticsUserProperties } from '../utils/analytics';
import theme from '../theme/theme';
import { useAmp } from 'next/amp';
import { useRouter } from 'next/router';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ottplay-',
});

//const Layout = dynamic(import('../components/Layout'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  const amp = useAmp();
  const [key, setKey] = React.useState(0);
  const { webstore } = useContext(WebfoxContext);
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [
      'English',
      'Hindi',
      'Tamil',
      'Telugu',
      'Kannada',
      'Bengali',
      'Marathi',
      'Gujarati',
      'Punjabi',
      'Malayalam',
    ],
    (webstore && webstore.languages && webstore.languages.name) || []
  );
  const providersArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    (webstore &&
      webstore.streamingServices &&
      webstore.streamingServices.name) ||
      []
  );

  const router = useRouter();

  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;

    const prevPath =
      storage.getItem('currentPath') == null
        ? '/home'
        : storage.getItem('currentPath');
    storage.setItem('prevPath', prevPath);

    storage.setItem('currentPath', globalThis.location.pathname);
  };

  React.useEffect(() => storePathValues, [router.asPath]);

  React.useEffect(() => {
    setKey(1);
    const _ht_clientid = cookie.load('_ht_clientid');
    const userData = {
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    };
    setAnalyticsUserProperties(userData);
  }, []);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // React.useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', function () {
  //       navigator.serviceWorker.register('/serviceworker.js').then(
  //         function (registration) {
  //           console.log(
  //             'Service Worker registration successful with scope: ',
  //             registration.scope
  //           );
  //         },
  //         function (err) {
  //           console.log('Service Worker registration failed: ', err);
  //         }
  //       );
  //     });
  //   }
  // }, []);

  return (
    <StylesProvider key={key} generateClassName={generateClassName}>
      <React.Fragment>
        <Head>
          <title>OTTplay</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        {amp ? (
          <Component {...pageProps} />
        ) : (
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ViewportProvider>
              <StoreProvider>
                <WebfoxProvider>
                  {/* <LocalizationProvider> */}
                  <Routes />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                  {/* </LocalizationProvider> */}
                </WebfoxProvider>
              </StoreProvider>
            </ViewportProvider>
          </ThemeProvider>
        )}
      </React.Fragment>
    </StylesProvider>
  );
}

serviceWorker.register();

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // console.log(metric)
  const { id, name, label, value } = metric;
  const body = JSON.stringify(metric);
  const url = 'https://analytics.ottplay.com';
  const windowAny: any = typeof window !== 'undefined' && window;

  if (windowAny) {
    windowAny.gtag('event', name, {
      event_category:
        label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
      event_label: id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    });
  } else {
    // fetch(url, { body, method: 'POST', keepalive: true });
  }
}

export default MyApp;
