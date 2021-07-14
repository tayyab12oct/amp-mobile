import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import { PagePath, Spinner } from '..';
import React, { useContext, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { HOME_SCREEN_SECTIONS } from '../../utils/constants';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MoviesList } from '../MoviesList';
import { ViewportContext } from '../ViewportProvider';
import { WatchListHeader } from '../watchlist/WatchListHeader';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';
import { makeStyles } from '@material-ui/core/styles';

const windowAny: any = typeof window !== 'undefined' && window;
export default function SeeAll({ props, location }) {
  const classes = useStyles();
  const _ht_clientid = cookie.load('_ht_clientid');
  const { width } = React.useContext(ViewportContext);
  const [button, setButton] = React.useState([]);
  const [results, setResults] = React.useState(
    location &&
      location.state &&
      location.state.data &&
      location.state.data.data
      ? [...location.state.data.data]
      : []
  );
  const [unSortedResults, setUnSortedResults] = React.useState(
    location &&
      location.state &&
      location.state.data &&
      location.state.data.data
      ? [...location.state.data.data]
      : []
  );
  const [loadingData, setLoadingData] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState('relavence');
  const [empty, setEmpty] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(
    location.state.data.lastPage !== 0 && location.state.data.lastPage !== page
      ? true
      : false
  );
  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );
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
    window.scrollTo(0, 0);
    firebaseAnalytics.logEvent('seeall', {
      screen_view:
        '/seeall' +
        (location && location.state && location.state.title
          ? '/' + location.state.title
          : '') +
        (location && location.state && location.state.title
          ? '/' + location.state.title
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
    windowAny.Moengage.track_event('seeall', {
      screen_view: '/seeall',
      name:
        location && location.state && location.state.title
          ? location.state.title
          : '',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
  });
  React.useEffect(() => {
    if (
      location.state.data.lastPage !== 0 &&
      location.state.data.lastPage !== page
    ) {
      const sectionName = location.state.title;
      switch (sectionName) {
        // case HOME_SCREEN_SECTIONS.EDITORS_CHOICE: {
        //   fetchEditorsChoiceData(getParams(sectionName));
        //   break;
        // }
        case HOME_SCREEN_SECTIONS.FREE_TICKET_JUNCTION:
          fetchFreeTicketJunctionData(getParams(sectionName));
          break;
        case HOME_SCREEN_SECTIONS.TOP_ORIGINALS:
          fetchTopOriginalsData(getParams(sectionName));
          break;
        case HOME_SCREEN_SECTIONS.TOP_DOCUMENTARIES:
          fetchTopDocumentariesData(getParams(sectionName));
          break;
        case HOME_SCREEN_SECTIONS.RECENTLY_VIEWED:
          fetchRecentlyPlayedMoviesData(getParams(sectionName));
          break;
        case HOME_SCREEN_SECTIONS.TIME_TO_KILL:
          fetchTimeToKillData(getParams(sectionName));
          // setShowTimeToKillWidget(true);
          break;
        case HOME_SCREEN_SECTIONS.EDITORS_CHOICE: {
          fetchSectionData(getParams(sectionName));
          break;
        }
        case HOME_SCREEN_SECTIONS.HOT_ON_HOTSTAR: {
          fetchSectionData(getParams(sectionName));
          break;
        }
        case HOME_SCREEN_SECTIONS.PRIME_VIDEO_PATAKAS: {
          fetchSectionData(getParams(sectionName));
          break;
        }
        case HOME_SCREEN_SECTIONS.PICKS_FROM_NETFLIX: {
          fetchSectionData(getParams(sectionName));
          break;
        }
        case HOME_SCREEN_SECTIONS.SONY_LIV: {
          fetchSectionData(getParams(sectionName));
          break;
        }
        case HOME_SCREEN_SECTIONS.ZINGER_ZEE5: {
          fetchSectionData(getParams(sectionName));
          break;
        }
        // default:
        //   fetchEditorsChoiceData(getParams(sectionName));
        //   break;
      }
    }
  }, [page]);
  const fetchSectionData = (params) => {
    webfox
      .getSectionData(params)
      .then((resp) => {
        const response = { ...resp.data };
        let result = [];
        if (response.rank && response.rank.length > 0) {
          const sortedData = response.rank
            .filter((item) => {
              if (item.show != null || item.movie != null) return true;
              else return false;
            })
            .sort((a, b) => a.order - b.order);
          result = sortedData.map((item) => item.show || item.movie);
        }

        const payload = {
          data: result,
          section: params.section,
          lastPage: response.lastPage,
        };
        actionDispatch(actions.FETCH_SECTION_DATA_SUCCESS, payload);
      })
      .catch(() => {
        actionDispatch(actions.FETCH_SECTION_DATA_FAILURE, params.section);
      });
  };
  const getParams = (sectionName = '') => {
    let params = {};
    if (
      sectionName === HOME_SCREEN_SECTIONS.EDITORS_CHOICE ||
      sectionName === HOME_SCREEN_SECTIONS.HOT_ON_HOTSTAR ||
      sectionName === HOME_SCREEN_SECTIONS.PICKS_FROM_NETFLIX ||
      sectionName === HOME_SCREEN_SECTIONS.PRIME_VIDEO_PATAKAS ||
      sectionName === HOME_SCREEN_SECTIONS.TRENDING ||
      sectionName === HOME_SCREEN_SECTIONS.SONY_LIV ||
      sectionName === HOME_SCREEN_SECTIONS.ZINGER_ZEE5
    ) {
      params = {
        module_name: 'Home',
        platform: 'web',
        section: sectionName,
        language: languages.name.length > 0 ? languages.name.toString() : '',
      };
    } else {
      params = {
        limit: 20,
        responseType: 'full',
        liked_ids:
          webstore.likedMovieCard.liked.length > 0
            ? webstore.likedMovieCard.liked.toString()
            : '',
        lang: languagesArr.length > 0 ? languagesArr.toString() : '',
      };
    }
    return params;
  };
  const handleClear = () => {
    // if (button.length > 0 || sort) {
    //   setEmpty(true);
    //   setButton([]);
    //   setSort('');
    //   setLoading(true);
    //   const params = {
    //     limit: 18,
    //     page: 1,
    //   };
    //   webfox.getAllMovies(params).then(({ data }) => {
    //     actionDispatch(actions.FETCH_MOVIES_SUCCESS, data || []);
    //     if (data && data.movies) {
    //       setResults(data.movies);
    //     }
    //     setLoadingData(false);
    //   });
    // }
  };

  const handleSelected = (sort) => {
    firebaseAnalytics.logEvent('sort_recommendations', {
      eventCategory: 'sort_recommendations',
      eventAction: window.location.pathname,
      eventLabel: 'sort_by',
      eventValue: sort,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage.track_event('sort_recommendations', {
      eventCategory: 'sort_recommendations',
      eventAction: window.location.pathname,
      eventLabel: 'sort_by',
      eventValue: sort,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    setEmpty(false);
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
      setResults([...unSortedResults]);
    }
  };
  const fetchData = () => {
    // if (location.state.data.lastPage !== 0) {
    //   setPage(page + 1);
    // }
  };
  const fetchTopDocumentariesData = async (params) => {
    actionDispatch(actions.INITIATE_FETCH_DOCUMENTARY_MOVIES);
    webfox
      .getDocumentaryMovies(params)
      .then((resp) => {
        const response = { ...resp.data };
        const payload = {
          data: response.result,
        };
        if (payload.data.length > 0) {
          const data = [...results, payload.data];
          if (data.length !== results.length) {
            setHasMore(true);
            setResults(payload.data);
          } else {
            setHasMore(false);
          }
        }
        actionDispatch(actions.FETCH_DOCUMENTARY_MOVIES_SUCCESS, payload);
      })
      .catch(() => {
        actionDispatch(actions.FETCH_DOCUMENTARY_MOVIES_FAILURE, []);
      });
  };
  const fetchFreeTicketJunctionData = async (params) => {
    actionDispatch(actions.INITIATE_FETCH_FREE_TICKET_JUNCTION);
    webfox
      .getFreeMovies(params)
      .then((resp) => {
        const response = { ...resp.data.data };
        const payload = {
          data: response.result,
        };
        // setResults(payload.data);
        if (payload.data.length > 0) {
          const data = [...results, payload.data];
          if (data.length !== results.length) {
            setHasMore(true);
            setResults(payload.data);
          } else {
            setHasMore(false);
          }
        }
        actionDispatch(actions.FETCH_FREE_TICKET_JUNCTION_SUCCESS, payload);
      })
      .catch(() => {
        actionDispatch(actions.FETCH_FREE_TICKET_JUNCTION_FAILURE, []);
      });
  };

  const fetchTopOriginalsData = async (params) => {
    actionDispatch(actions.INITIATE_FETCH_TOP_ORIGINALS);
    webfox
      .getTrendingMovies(params)
      .then((resp) => {
        const response = { ...resp.data.data };
        const payload = {
          data: response.result,
        };
        const data = [...results, payload.data];
        if (data.length !== results.length) {
          setHasMore(true);
        }
        // setResults(data);
        if (payload.data.length > 0) {
          const data = [...results, payload.data];
          if (data.length !== results.length) {
            setHasMore(true);
            setResults(payload.data);
          } else {
            setHasMore(false);
          }
        }
        actionDispatch(actions.FETCH_TOP_ORIGINALS_SUCCESS, payload);
      })
      .catch(() => {
        actionDispatch(actions.FETCH_TOP_ORIGINALS_FAILURE, []);
      });
  };
  const fetchTimeToKillData = async (params) => {
    webfox
      .getTimetokillMovies(params)
      .then((resp) => {
        const response = { ...resp.data };
        const payload = {
          data: response.result,
        };
        // setResults(payload.data);
        if (payload.data.length > 0) {
          const data = [...results, payload.data];
          if (data.length !== results.length) {
            setHasMore(true);
            setResults(payload.data);
          } else {
            setHasMore(false);
          }
        }
        actionDispatch(actions.FETCH_TIME_TO_KILL_MOVIES_SUCCESS, payload);
      })
      .catch(() => {
        actionDispatch(actions.FETCH_TIME_TO_KILL_MOVIES_FAILURE, []);
      });
  };
  const fetchRecentlyPlayedMoviesData = async (params) => {
    actionDispatch(actions.INITIATE_FETCH_RECENTLY_PLAYED_MOVIES);
    webfox
      .getRecentlyPlayedMovies(params)
      .then((resp) => {
        const response = { ...resp.data };
        const payload = {
          data: response.result,
        };
        setResults(payload.data);
        actionDispatch(
          actions.FETCH_FETCH_RECENTLY_PLAYED_MOVIES_SUCCESS,
          payload
        );
      })
      .catch(() => {
        actionDispatch(actions.FETCH_FETCH_RECENTLY_PLAYED_MOVIES_FAILURE, []);
      });
  };
  const refresh = () => {};
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
        name: 'See All',
        url: 'http://www.ottplay.com/' + window.location.pathname,
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
          '@id': 'http://www.ottplay.com/' + window.location.pathname,
          name: 'See All',
        },
      },
    ],
  };
  return (
    <div className={classes.root}>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationJSON)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchemaJSON)}
        </script>
      </Helmet>
      <Grid xs={12} container>
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} className={classes.containerBox} item>
          {/* <Grid xs={12} item>
              <p className={classes.path}>
                {'Home'} <span>{'>>'}</span> {location.state.title}
  
              </p>
            </Grid>
             */}
          <PagePath
            path={[
              { name: 'Home', path: '/home' },
              { name: `${location.state.title}`, path: null },
            ]}
          />
          <WatchListHeader
            data={
              location &&
              location.state &&
              location.state.title &&
              location.state.title
            }
            disabled={empty === true ? true : false}
            clear={handleClear}
            sort={sort}
            setSort={setSort}
            onSelect={handleSelected}
            results={results}
          />
          {/* <FilterButton
              button={button}
              setButton={setButton}
              onSelect={handleFilters}
            /> */}
          <Grid xs={12} item>
            <InfiniteScroll
              dataLength={results.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              refreshFunction={refresh}
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
            >
              <MoviesList
                source={'See All'}
                results={results}
                tag={'similar'}
                screen={'see_all'}
                dontShowProviders={
                  results.length > 0 &&
                  location &&
                  location.state &&
                  location.state.title &&
                  (location.state.title ===
                    HOME_SCREEN_SECTIONS.PICKS_FROM_NETFLIX ||
                    location.state.title ===
                      HOME_SCREEN_SECTIONS.HOT_ON_HOTSTAR ||
                    location.state.title ===
                      HOME_SCREEN_SECTIONS.PRIME_VIDEO_PATAKAS ||
                    location.state.title === HOME_SCREEN_SECTIONS.SONY_LIV ||
                    location.state.title === HOME_SCREEN_SECTIONS.ZINGER_ZEE5)
                }
                dontShowContentType={
                  results.length > 0 &&
                  location &&
                  location.state &&
                  location.state.title &&
                  location.state.title ===
                    HOME_SCREEN_SECTIONS.TOP_DOCUMENTARIES
                }
              />
            </InfiniteScroll>
          </Grid>
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",0
    flexGrow: 1,
    minHeight: '50vh',
    backgroundSize: 'contain',
    // backgroundColor: '#14062D',
    backgroundColor: 'transparent',
  },
  containerBox: {
    padding: '0 20px',
  },
  loading: {
    // height: '64rem',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */,
    },
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: '14px',
    '& span': {
      fontSize: 10,
      letterSpacing: -1,
      margin: '0px 4px',
    },
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
    containerBox: {
      padding: '0',
    },
  },
}));
