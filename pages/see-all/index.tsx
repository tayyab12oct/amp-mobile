import { Footer, PagePath, Spinner } from '../../components';
import { Grid, Hidden } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import React, { useContext, useEffect } from 'react';

import { HOME_SCREEN_SECTIONS } from '../../utils/constants';
import { MoviesList } from '../../components/MoviesList';
import { NavBar } from '../../components';
import SEO from '../../components/Seo';
import { TopHeader } from '../../components/TopHeader';
import { ViewportContext } from '../../components/ViewportProvider';
import { WatchListHeader } from '../../components/watchlist/WatchListHeader';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

const initState = {
  result: [],
  totalCount: 0,
  page: 1,
  loadingData: true,
  unSortedResults: [],
  sort: 'relavence',
  empty: 'true',
  lastPage: 0,
};

const windowAny: any = typeof window !== 'undefined' && window;
export default function SeeAll({ props, location }) {
  const classes = useStyles();
  const router = useRouter();
  const { title, section } = router.query;
  const _ht_clientid = cookie.load('_ht_clientid');
  const { width } = React.useContext(ViewportContext);
  const [state, setState] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...JSON.parse(JSON.stringify(initState)),
    }
  );

  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );
  const { languages, streamingServices } = webstore;

  let languagesArr: any = [];
  let providersArr: any = [];
  languagesArr = getLocalStorageData(
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
    ]
  );
  providersArr = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
    ) || [],
    streamingServices.selectedStreamingServices || []
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
    firebaseAnalytics.logEvent('screen_view', {
      page_title:
        '/seeall' +
        (title ? '/' + title : '') +
        `${sessionStorage.getItem('prevPath')}`,
    });
    windowAny.Moengage &&
      windowAny.Moengage.track_event('screen_view', {
        page_title: '/seeall',
        name: title ? title : '',
      });
  }, []);

  React.useEffect(() => {
    if (section) {
      fetchSectionData();
    }
  }, [section]);

  React.useEffect(() => {
    state.loadingData && state.page > 1 && fetchSectionData();
  }, [state.loadingData]);

  const handleScroll = () => {
    const wrappedElement = document.getElementById('top-header');
    if (wrappedElement) {
      if (
        Math.round(wrappedElement.getBoundingClientRect().bottom) <=
          windowAny.innerHeight + 600 &&
        !state.loadingData &&
        state.page <= state.lastPage
      ) {
        setState({
          loadingData: true,
        });
      }
    }
  };

  React.useEffect(() => {
    const unlisten = () => {
      window.removeEventListener('scroll', handleScroll, false);
    };
    window.addEventListener('scroll', handleScroll, false);
    return () => {
      unlisten();
    };
  }, [state.result]);

  const fetchSectionData = () => {
    const params = {
      module_name: 'Home',
      platform: 'web',
      limit: width < 600 ? 10 : 30,
      section: section,
      page: state.page,
      language:
        languages.name.length > 0
          ? languages.name.toString()
          : getPreferredLanguages(languagesArr),
    };
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
          setState({
            result: state.result.concat(result),
            totalCount:
              state.page === 1 ? response.totalDocuments : state.totalCount,
            page: state.page + 1,
            loadingData: false,
          });
        } else {
          setState({ loadingData: false });
        }

        const payload = {
          data: result,
          section: params.section,
          lastPage: response.lastPage,
        };
        actionDispatch(actions.FETCH_SECTION_DATA_SUCCESS, payload);
      })
      .catch(() => {
        setState({ loadingData: false });
        actionDispatch(actions.FETCH_SECTION_DATA_FAILURE, params.section);
      });
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
    setState({ empty: false });
    if (sort === 'recentlyAdded') {
      setState({
        result: state.result.sort((a, b) => b.modified_on - a.modified_on),
      });
    } else if (sort === 'imdbScore') {
      setState({
        result: state.result.sort(
          (a, b) => b.ottplay_rating - a.ottplay_rating
        ),
      });
    } else if (sort === 'releaseYear') {
      setState({
        result: state.result.sort(function (a, b) {
          return b.release_date - a.release_date;
        }),
      });
    } else if (sort === 'criticScore') {
      setState({
        result: state.result.sort((a, b) => b.tmdb_rating - a.tmdb_rating),
      });
    } else if (sort === 'relavence') {
      setState({ result: [...state.unSortedResults] });
    }
  };

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
        url: 'http://www.ottplay.com/' + windowAny.location?.pathname,
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
          '@id': 'http://www.ottplay.com/' + windowAny.location?.pathname,
          name: 'See All',
        },
      },
    ],
  };
  return (
    <div className={classes.root} id="ottplay-movies-widget-see-all">
      <SEO>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationJSON)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchemaJSON)}
        </script>
      </SEO>

      <Grid xs={12} container>
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} className={classes.containerBox} item>
          <PagePath
            path={[
              { name: 'Home', path: '/home' },
              { name: `${title}`, path: null },
            ]}
          />
          <WatchListHeader
            data={title}
            disabled={state.empty === true ? true : false}
            clear={handleClear}
            sort={state.sort}
            setSort={(val) => {
              setState({ sort: val });
            }}
            onSelect={handleSelected}
            // results={state.result} hiding sort
          />
          {/* <FilterButton
            button={button}
            setButton={setButton}
            onSelect={handleFilters}
          /> */}
          {state.result && state.result.length > 0 ? (
            <Grid xs={12} item>
              <MoviesList
                source={'See All'}
                results={state.result}
                tag={'similar'}
                screen={'see_all'}
                dontShowProviders={
                  state.result.length > 0 &&
                  (title === HOME_SCREEN_SECTIONS.PICKS_FROM_NETFLIX ||
                    title === HOME_SCREEN_SECTIONS.HOT_ON_HOTSTAR ||
                    title === HOME_SCREEN_SECTIONS.PRIME_VIDEO_PATAKAS ||
                    title === HOME_SCREEN_SECTIONS.SONY_LIV ||
                    title === HOME_SCREEN_SECTIONS.ZINGER_ZEE5)
                }
                dontShowContentType={
                  state.result.length > 0 &&
                  title === HOME_SCREEN_SECTIONS.TOP_DOCUMENTARIES
                }
              />
            </Grid>
          ) : (
            ''
          )}
          {state.loadingData && (
            <Spinner
              styles={{
                height: state.page === 1 ? '60vh' : '40px',
              }}
            />
          )}
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // height: '100vh',
    // overflowY: 'auto',
    backgroundSize: 'contain',
    backgroundColor: 'transparent',
  },
  containerBox: {
    padding: '0 20px',
  },
  loading: {
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
