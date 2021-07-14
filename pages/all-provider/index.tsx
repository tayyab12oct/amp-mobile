import { Grid, Hidden, Theme, makeStyles } from '@material-ui/core';
import {
  HOME_SCREEN_SECTIONS,
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import {
  NavBar,
  PagePath,
  RefineDetailCard,
  Spinner,
  TopHeader,
} from '../../components';
import React, { useEffect } from 'react';

import Helmet from 'react-helmet';
import SEO from '../../components/Seo';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');
function AllProvider({ location, ...props }) {
  const { webstore, webfox, actionDispatch, actions } = React.useContext(
    WebfoxContext
  );
  const [result, setResult] = React.useState<any>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const classes = useStyles();
  const getParams = () => {
    const params = {
      limit: 45,
      module_name: 'Providers',
      platform: 'web',
    };
    return params;
  };
  const { languages, streamingServices } = webstore;

  let languagesArr: any = [];
  let providersArr: any = [];
  useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],
      streamingServices.selectedStreamingServices || []
    );
  }, []);
  React.useEffect(() => {
    firebaseAnalytics.logEvent('streamingservices', {
      screen_view:
        '/streamingservices' +
        (location && location.state && location.state.source
          ? '/' + location.state.source
          : '') +
        '/' +
        getUserType(_ht_clientid ? true : false) +
        '/' +
        getPreferredLanguages(languagesArr) +
        '/' +
        getPreferredProviders(providersArr) +
        '/' +
        _ht_clientid
          ? _ht_clientid
          : device_UUID,
    });
    windowAny.Moengage?.track_event('streamingservices', {
      screen_view: '/streamingservices',
      source:
        location && location.state && location.state.source
          ? location.state.source
          : '',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
    setLoadingData(true);
    webfox
      .getSectionData(getParams())
      .then((response) => {
        const arr = response.data.rank.filter(
          (e) => e.provider['status'] === 'published'
        );
        setResult(arr);
        actionDispatch(
          actions.FETCH_PROVIDER_LIST_SUCCESS,
          response.data.rank || []
        );
        setLoadingData(false);
      })
      .catch(() => {
        actionDispatch(actions.FETCH_PROVIDER_LIST_FAILURE, []);
      });
  }, []);

  let siteNavigationJSON = {};
  let breadcrumbSchemaJSON = {};

  useEffect(() => {
    siteNavigationJSON = {
      '@context': 'http://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'SiteNavigationElement',
          position: 1,
          name: 'Home',
          url: 'http://www.ottplay.com/home',
        },
        {
          '@type': 'SiteNavigationElement',
          position: 2,
          name: 'Providers',
          url: 'http://www.ottplay.com/' + window.location.pathname,
        },
      ],
    };
    breadcrumbSchemaJSON = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: { '@id': 'http://www.ottplay.com/home', name: 'Home' },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': 'http://www.ottplay.com/' + window.location.pathname,
            name: 'Providers',
          },
        },
      ],
    };
  }, []);
  return (
    <React.Fragment>
      <div className={classes.root}>
        <SEO>
          <title>Providers page</title>
          <meta name="description" content="" />
          <script type="application/ld+json">
            {JSON.stringify(siteNavigationJSON)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchemaJSON)}
          </script>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
        <Grid xs={12} container>
          <Grid sm={1} lg={2} item></Grid>
          <Grid xs={12} sm={10} lg={8} item>
            {loadingData ? (
              <Spinner styles={{ minHeight: '60vh' }} />
            ) : (
              <div className={classes.mainContainer}>
                <PagePath
                  path={[
                    { name: 'Home', path: '/home' },
                    { name: 'Streaming Services', path: '/all-provider' },
                  ]}
                />
                <Grid xs={12} item>
                  <span className={classes.pageTitle}>
                    {'All Streaming Services'}
                  </span>
                </Grid>
                <div className={classes.container}>
                  {result
                    .filter((prov) => {
                      return prov.provider.total_all > 0;
                    })
                    .map((item, index) => {
                      return (
                        <RefineDetailCard
                          data={item.provider}
                          forPage={'provider'}
                        />
                      );
                    })}{' '}
                </div>
              </div>
            )}
          </Grid>
          <Grid sm={1} lg={2} item></Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default AllProvider;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '70vh',
  },
  mainContainer: {
    padding: '0px 20px',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '5px',
    padding: '1rem 0 0.5rem 0',
    width: '100%',
    color: '#ffffff',
  },
  pageTitle: {
    fontSize: 'clamp(18px, 1.8vw, 30px)',
    fontWeight: 'bold',
    color: 'white',
  },
  [theme.breakpoints.down('xs')]: {
    container: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '0.5rem',
      padding: '16px',
    },
    mainContainer: {
      padding: '0px',
    },
    pageTitle: {
      paddingLeft: '16px',
    },
  },
}));
