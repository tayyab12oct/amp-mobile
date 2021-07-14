import * as React from 'react';

import {
  Footer,
  NavBar,
  PagePath,
  Spinner,
  TopHeader,
} from '../../components';
import { Grid, Hidden, makeStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';

import { MoviesList } from '../../components/MoviesList';
import SEO from '../../components/Seo';
import { WatchListHeader } from '../../components/watchlist/WatchListHeader';
import WatchListSignIn from './WatchListSignIn';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');
export default function WatchList() {
  const classes = useStyles();

  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = React.useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;

  let languagesArr: any = [];
  let providersArr: any = [];
  let hiddenData: any = [];
  let deleteData: any = [];
  let watchlistArr: any = [];
  let siteNavigationJSON = {};
  let breadcrumbSchemaJSON = {};

  React.useEffect(() => {
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
          name: 'Watchlist',
          url:
            'http://www.ottplay.com/' + typeof window !== 'undefined' &&
            window.location.pathname,
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
            name: 'Watchlist',
          },
        },
      ],
    };
  }, []);

  React.useEffect(() => {
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
    hiddenData =
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.HIDDEN_DATA_OBJ)
      ) || [];
    deleteData =
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ)
      ) || [];

    watchlistArr =
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ)
      ) || [];
  });

  watchlistArr = watchlistArr.filter((item) => {
    const index = hiddenData.findIndex((data) => data._id === item._id);
    if (index === -1) {
      return true;
    } else return false;
  });
  watchlistArr = watchlistArr.filter((item) => {
    const index = deleteData.findIndex((data) => data._id === item._id);
    if (index === -1) {
      return true;
    } else return false;
  });
  const [open, setOpen] = React.useState(false);
  const [expandInput, setExpandInput] = React.useState(false);
  const [button, setButton] = React.useState([0]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [results, setResults] = React.useState(watchlistArr as any);
  const [searchResults, setSearchResults] = React.useState(watchlistArr as any);
  const [loadingData, setLoadingData] = React.useState(true);
  const [sort, setSort] = React.useState('relavence');
  const [empty, setEmpty] = React.useState(true);
  const [token, setToken] = React.useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleClickAway = () => {
    setOpen(false);
    setSearchTerm('');
  };

  const handleClose = () => {
    setSearchTerm('');
    setExpandInput(false);
  };

  const handleClick = () => {
    setOpen(true);
    setExpandInput(true);
  };

  React.useEffect(() => {
    const filter = watchlistArr.filter(
      (title) =>
        title.name.toString().toLowerCase().includes(searchTerm) ||
        title.name.toString().toUpperCase().includes(searchTerm) ||
        title.name.includes(searchTerm)
      // title.genre.toString().toLowerCase().includes(searchTerm) ||
      // title.genre.toString().toUpperCase().includes(searchTerm) ||
      // title.genre.includes(searchTerm)
    );
    setResults(filter.reverse());
    setToken(cookie.load('token'));
  }, [searchTerm, webstore.watchlistArr.watchlistArr]);

  React.useEffect(() => {
    firebaseAnalytics.logEvent('watchlist', {
      screen_view:
        '/watchlist' +
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
    windowAny.Moengage &&
      windowAny.Moengage.track_event('watchlist', {
        screen_view: '/watchlist',
        userType: getUserType(_ht_clientid ? true : false),
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      });

    const params = {
      limit: 18,
    };

    setResults(watchlistArr.reverse());

    setLoadingData(false);

    // setLoading(true);
    // webfox.getAllWatchlistMovies(params).then(({ data, error }) => {
    //   console.log("Movies result. ", JSON.stringify(data));
    //   if (error) {
    //     actionDispatch(actions.FETCH_WATCHLIST_MOVIES_FAILURE, []);
    //   }
    //   console.log("response: " + JSON.stringify(data));
    //   actionDispatch(actions.FETCH_WATCHLIST_MOVIES_SUCCESS, data || []);
    //   console.log('ress', data)
    //  if(data && data.movies){
    //     setResults(data.movies);
    //     setLoadingData(false);
    //   }
    // });
    // setLoading(false);
  }, [webstore.watchlistArr.watchlistArr]);
  //console.log('watchlistArr: ', watchlistArr.length);
  const handleClear = () => {
    if (button.length > 0 || sort) {
      setEmpty(true);
      setButton([]);
      setSort('');
      setResults(watchlistArr);
      //console.log('results', results);
    }
  };

  const handleSelected = (sort) => {
    setEmpty(false);
    //console.log('select', sort);
    if (sort === 'recentlyAdded') {
      setResults(results.sort((a, b) => b.modified_on - a.modified_on));
    } else if (sort === 'imdbScore') {
      setResults(results.sort((a, b) => b.ottplay_rating - a.ottplay_rating));
    } else if (sort === 'releaseYear') {
      setResults(
        results.sort(function (a: any, b: any) {
          const date1 = new Date(b.release_date);
          const date2 = new Date(a.release_date);
          const diff = Math.abs(date1.getTime() - date2.getTime());
          const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          return diffDays;
        })
      );
    } else if (sort === 'criticScore') {
      setResults(results.sort((a, b) => b.tmdb_rating - a.tmdb_rating));
    } else if (sort === 'relavence') {
      setResults([...watchlistArr]);
    }
  };

  return (
    <React.Fragment>
      <div>
        <SEO
          Title="News page"
          Description="OTTPLAY - News page"
          siteNavigationJSON={JSON.stringify(siteNavigationJSON)}
          breadcrumbSchemaJSON={JSON.stringify(breadcrumbSchemaJSON)}
        />
        <SEO>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
      </div>
      <div className={classes.root}>
        {/* <Helmet>
        <title>Watchlist page</title>
        <meta
          name="description"
          content="Here, you will find all the titles that you have saved for future viewing. "
        />
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationJSON)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchemaJSON)}
        </script>
      </Helmet>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <a href="https://domain.xn--com-9o0a" rel="noindex,nofollow"></a>
      </Helmet> */}
        {results.length === 0 && searchTerm === '' ? (
          <WatchListSignIn token={token} />
        ) : (
          <React.Fragment>
            <Grid xs={12} container>
              <Grid sm={1} lg={2} item></Grid>
              <Grid
                xs={12}
                sm={10}
                lg={8}
                className={classes.containerBox}
                item
              >
                <Grid xs={12} item>
                  <PagePath
                    path={[
                      { name: 'Home', path: '/home' },
                      { name: 'Watchlist', path: '/watchlist' },
                    ]}
                  />
                  {/* <p className={classes.path}>
                  {'Home'} <span>{'>>'}</span> {'Watchlist'}
                </p> */}
                </Grid>
                <WatchListHeader
                  watchList
                  data={'Watchlist'}
                  onSearch={handleChange}
                  onClose={handleClose}
                  searchValue={searchTerm}
                  onClickAway={handleClickAway}
                  open={open}
                  onClick={handleClick}
                  clear={handleClear}
                  sort={sort}
                  setSort={setSort}
                  onSelect={handleSelected}
                  results={results}
                  disabled={empty === true ? true : false}
                />
                {/* <FilterButton button={button} setButton={setButton} /> */}
                <Grid xs={12} item>
                  {loadingData ? (
                    <Spinner styles={{ minHeight: '60vh' }} />
                  ) : (
                    <React.Fragment>
                      {results.length === 0 ? (
                        <div className={classes.noResults}>
                          {' '}
                          No results found{' '}
                        </div>
                      ) : (
                        <MoviesList
                          results={results}
                          tag={'watchlist'}
                          source={'Watchlist'}
                        />
                      )}
                    </React.Fragment>
                  )}
                </Grid>
              </Grid>
              <Grid sm={1} lg={2} item></Grid>
            </Grid>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    minHeight: '75vh',
  },
  noResults: {
    fontSize: '21px',
    color: 'white',
    textAlign: 'center',
    margin: '50px 0',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 'clamp(10px, 0.9vw, 14px)',
    margin: '20px 0px 4px 0px',
  },
  signinBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  containerBox: {
    padding: '0 20px',
  },
  [theme.breakpoints.down('xs')]: {
    path: {
      fontSize: 10,
      textTransform: 'uppercase',
      marginLeft: 16,
      marginTop: 16,
      '& span': {
        fontSize: 8,
      },
    },
    pageTitle: {
      fontSize: 16,
      color: '#ffffff',
      marginLeft: 16,
      fontWeight: 'bold',
    },
    mainImgBox: {
      display: 'flex',
      justifyContent: 'center',
    },
    containerBox: {
      padding: '0',
    },
    mainImg: {
      width: 92,
      height: 92,
    },
    imgTitle: {
      fontSize: 18,
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 500,
      marginTop: 16,
      marginBottom: 0,
    },
    mainBox: {
      display: 'flex',
      justifyContent: 'center',
    },
    imgDesc: {
      fontSize: 13,
      color: '#BEB4D6',
      textAlign: 'center',
      fontWeight: 500,
      marginTop: 11,
      marginBottom: 34,
    },
    contentBox: {
      padding: 0,
    },
    newAccButton: {
      backgroundColor: '#FF4275',
      border: '0.5px solid #FF4275',
      fontSize: 14,
      fontWeight: 500,
      textTransform: 'capitalize',
      color: 'white',
      width: 187,
      height: 40,
      borderRadius: 20,
      opacity: 1,
    },
    imgSignIn: {
      marginTop: 30,
      marginBottom: 53,
      color: 'white',
      fontWeight: 500,
      fontSize: 13,
      '& span': {
        color: '#03F87E',
        textDecoration: 'underline',
      },
    },
  },
}));
