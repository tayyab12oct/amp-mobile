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
import React, { Fragment } from 'react';

import SEO from '../../components/Seo';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';

const windowAny: any = typeof window !== 'undefined' && window;
export default function AllGenre({ location }) {
  const _ht_clientid = cookie.load('_ht_clientid');
  const { webstore, webfox, actionDispatch, actions } = React.useContext(
    WebfoxContext
  );
  const [result, setResult] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const classes = useStyles();
  const { languages, streamingServices } = webstore;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  const providersArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
    ) || [],
    streamingServices.selectedStreamingServices || []
  );
  React.useEffect(() => {
    window.scrollTo(0, 0);
    firebaseAnalytics.logEvent('genres', {
      screen_view:
        '/genres' +
        (location && location?.state && location?.state.source
          ? '/' + location?.state.source
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
    windowAny.Moengage?.track_event('genres', {
      screen_view: '/genres',
      source:
        location && location?.state && location?.state.source
          ? location?.state.source
          : '',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
    const params = {
      limit: 45,
    };
    webfox
      .getAllGenresList(params)
      .then((response) => {
        if (response.data && response.data.genres) {
          setResult(
            response.data.genres.filter((item) => {
              return item.hasOwnProperty('icon_url');
            })
          );
        }

        actionDispatch(
          actions.FETCH_GENRES_LIST_SUCCESS,
          response.data.genres || []
        );
        setLoadingData(false);
      })
      .catch(() => {
        actionDispatch(actions.FETCH_GENRES_LIST_FAILURE, []);
      });
  }, []);
  const siteNavigationJSON = {
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
        name: 'Genres',
        url:
          'http://www.ottplay.com/' +
          (typeof window !== 'undefined' && window.location?.pathname),
      },
    ],
  };
  const breadcrumbSchemaJSON = {
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
          '@id':
            'http://www.ottplay.com/' +
            (typeof window !== 'undefined' && window.location?.pathname),
          name: 'Genres',
        },
      },
    ],
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <SEO>
          <meta
            property="og:title"
            content={'Watch movies and shows from every genre'}
          />
          <meta property="og:site_name" content="OTTPlay" />
          <meta property="og:url" content="https://www.ottplay.com/" />
          <meta
            property="og:description"
            content="From comedy to crime to capers, OTTplay helps you find the latest movies and shows based on your preference of genre"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://images.ottplay.com/images/genre-cover-image-953.jpg"
          />
          <script type="application/ld+json">
            {JSON.stringify(siteNavigationJSON)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchemaJSON)}
          </script>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
        <SEO>
          <title>Genres page</title>
          <meta
            name="description"
            content="On this page, you can explore different genres, such as Action, Comedy, Mystery Drama, Sci-Fi, and many other exciting categories. You can also see the number of movies and show titles that are available within each genre."
          />
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
                    { name: 'genres', path: '/all-genre' },
                  ]}
                />
                <Grid xs={12} item>
                  <span className={classes.pageTitle}>{'All Genres'}</span>
                </Grid>
                <div className={classes.container}>
                  {result.map((item, index) => {
                    return (
                      <RefineDetailCard
                        data={item}
                        forPage={'genre'}
                        fromPage={'For you'}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </Grid>
          <Grid sm={1} lg={2} item></Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
  },
  mainContainer: {
    padding: '0px 20px',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
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
