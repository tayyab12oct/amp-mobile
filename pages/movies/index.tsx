import {
  Footer,
  NavBar,
  PagePath,
  Spinner,
  TopHeader,
} from '../../components';
import { Grid, Hidden } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import React, { useContext, useEffect } from 'react';

import { ListingHeader } from '../../components/ListingHeader';
import { MoviesList } from '../../components/MoviesList';
import RefineFilter from '../../components/RefineFilter';
import SEO from '../../components/Seo';
import { ViewportContext } from '../../components/ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

const initState = {
  button: ['all'],
  result: [],
  unSortedResults: [],
  loadingData: true,
  page: 1,
  sort: 'relevance',
  totalData: 0,
  refineData: false,
  initialsLoading: false,
};

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');
export default function Movies({ allMoviesList, movie, ...props }) {
  const router = useRouter();
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const pillButtons = [];
  const { webfox, webstore, actions, actionDispatch, setLoading } = useContext(
    WebfoxContext
  );
  const { movieNavFilter } = webstore;
  const [state, setState] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...JSON.parse(JSON.stringify(initState)),
      refineData: webstore.refine.forYou.refineForYou,
    }
  );
  let typeData;
  if (movieNavFilter && movieNavFilter.dataType) {
    typeData = movieNavFilter.dataType;
  } else {
    typeData = 'language';
  }
  const { languages, streamingServices } = webstore;

  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  let providersArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
    ) || [],
    streamingServices.selectedStreamingServices || []
  );
  useEffect(() => {
    firebaseAnalytics.logEvent('movies', {
      screen_view:
        '/movies' +
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
      windowAny.Moengage.track_event('movies', {
        screen_view: '/movies',
        userType: getUserType(_ht_clientid ? true : false),
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      });
  }, []);

  useEffect(() => {
    if (width > 600) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    moviesList.data = [];
    if (webstore.refine.forYou.refineForYou) {
      setState({
        refineData: true,
      });
    }
  }, [
    webstore.refine.forYou.refineForYou,
    webstore.refine.forYou.filter.selectedLanguages,
    webstore.refine.forYou.filter.selectedGenres,
    webstore.refine.forYou.filter.selectedStreamingServices,
    webstore.refine.forYou.filter.selectedFreePaid,
    webstore.refine.forYou.filter.selectedQuality,
    webstore.refine.forYou.filter.selectedContentRating,
    webstore.refine.forYou.filter.selectedRuntimeMin,
  ]);

  const apiForMovies = (params) => {
    setState({
      loadingData: true,
    });
    webfox.getAllMovies(params).then(({ data, error }) => {
      //console.log('Movies result. ', JSON.stringify(data));
      if (error) {
        actionDispatch(actions.FETCH_MOVIES_FAILURE, []);
        setState({
          loadingData: false,
        });
      }
      if (data && data.movies) {
        setState({
          result:
            state.result.length > 0
              ? moviesList.data.concat(data.movies)
              : data.movies,
          totalData: data && data.totalDocuments ? data.totalDocuments : 0,
          lastPage: data && data.lastPage ? data.lastPage : 0,
          unSortedResults:
            state.unSortedResults.length > 0
              ? state.unSortedResults.concat(data.movies)
              : [...data.movies],
          page: state.page + 1,
          loadingData: false,
        });
        actionDispatch(
          actions.FETCH_MOVIES_SUCCESS,
          state.result.length > 0
            ? moviesList.data.concat(data.movies)
            : data.movies
        );
      } else {
        setState({
          loadingData: false,
        });
      }
    });
  };

  const getDefaultResult = () => {
    const params = {
      limit: width > 1720 ? 15 : 16,
      page: state.page,
      [typeData]:
        movieNavFilter && movieNavFilter.name
          ? movieNavFilter.name
          : languagesArr.toString() || null,
    };
    apiForMovies(params);
  };

  useEffect(() => {
    if (!state.refineData && state.page === 1) {
      getDefaultResult();
    }
  }, [state.page]);

  useEffect(() => {
    if (!state.refineData && state.loadingData && state.page > 1) {
      getDefaultResult();
    }
  }, [state.loadingData]);

  const handleFilters = (button) => {
    if (button.length > 0) {
      setState({
        empty: false,
      });
    } else
      setState({
        empty: true,
      });
    const temp = button.join(', ');
    const params = {
      limit: width > 1720 ? 15 : 16,
      // genre: temp,
      page: state.page,
    };

    setState({
      loadingData: true,
    });
    webfox.getAllMovies(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_MOVIES_FAILURE, []);
        setState({
          loadingData: false,
        });
      }
      if (data && data.movies) {
        setState({
          result: data.movies,
          loadingData: false,
        });
        actionDispatch(actions.FETCH_MOVIES_SUCCESS, data.movies);
      } else {
        setState({
          loadingData: false,
        });
      }
    });
  };

  const { moviesList } = webstore;

  useEffect(() => {
    setState({
      result: moviesList.data,
    });
  }, [moviesList.data]);

  const getFilteredResult = () => {
    const params = {
      limit: width > 1720 ? 15 : 16,
      page: state.page,
      language:
        webstore.refine.forYou.filter.selectedLanguages.length > 0
          ? webstore.refine.forYou.filter.selectedLanguages.toString()
          : null,
      provider:
        webstore.refine.forYou.selectedStreamingServicesName.length > 0
          ? webstore.refine.forYou.selectedStreamingServicesName.toString()
          : null,
      genre:
        webstore.refine.forYou.selectedGenresName.length > 0
          ? webstore.refine.forYou.selectedGenresName.toString()
          : null,
      subscription_type:
        webstore.refine.forYou.filter.selectedFreePaid.length > 0
          ? webstore.refine.forYou.filter.selectedFreePaid.toString()
          : null,
      // subscription_type:
      //   webstore.refine.forYou.filter.selectedContentType.length > 0
      //     ? webstore.refine.forYou.filter.selectedContentType.toString()
      //     : null,
      certifications:
        webstore.refine.forYou.filter.selectedContentRating.length > 0
          ? webstore.refine.forYou.filter.selectedContentRating.toString()
          : null,
      runtime_from:
        webstore.refine.forYou.selectedRuntimeMin2.length > 0
          ? parseInt(webstore.refine.forYou.selectedRuntimeMin2.toString())
          : null,
      runtime_to:
        webstore.refine.forYou.filter.selectedRuntimeMin.length > 0
          ? parseInt(
              webstore.refine.forYou.filter.selectedRuntimeMin.toString()
            )
          : null,
      quality:
        webstore.refine.forYou.filter.selectedQuality.length > 0
          ? webstore.refine.forYou.filter.selectedQuality.toString()
          : null,
    };
    apiForMovies(params);
  };

  useEffect(() => {
    if (
      webstore.refine.forYou.refineForYou &&
      state.refineData &&
      state.page === 1
    ) {
      setLoading(true);
      getFilteredResult();
    }
  }, [
    webstore.refine.forYou.refineForYou,
    webstore.refine.forYou.filter.selectedLanguages,
    webstore.refine.forYou.filter.selectedGenres,
    webstore.refine.forYou.filter.selectedStreamingServices,
    webstore.refine.forYou.filter.selectedFreePaid,
    webstore.refine.forYou.filter.selectedQuality,
    webstore.refine.forYou.filter.selectedContentRating,
    webstore.refine.forYou.filter.selectedRuntimeMin,
    state.page,
    state.refineData,
  ]);

  useEffect(() => {
    if (
      webstore.refine.forYou.refineForYou &&
      state.refineData &&
      state.loadingData &&
      state.page > 1
    ) {
      getFilteredResult();
    }
  }, [state.loadingData]);

  const handleScroll = (e) => {
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

  useEffect(() => {
    const unlisten = () => {
      // window.scrollTo(0, 0);
      window.removeEventListener('scroll', handleScroll, false);
    };

    window.addEventListener('scroll', handleScroll, false);
    return () => {
      unlisten();
    };
  }, [state.result]);

  const handleSelected = (sort) => {
    setState({
      loadingData: true,
      empty: false,
    });
    if (sort === 'recentlyAdded') {
      setState({
        result: state.result.sort((a, b) => b.modified_on - a.modified_on),
      });
    } else if (sort === 'rating') {
      setState({
        result: state.result.sort(
          (a, b) => b.ottplay_rating - a.ottplay_rating
        ),
      });
    } else if (sort === 'release_date') {
      setState({
        result: state.result.sort(function (a: any, b: any) {
          const date1 = new Date(b.release_date);
          const date2 = new Date(a.release_date);
          const diff = Math.abs(date1.getTime() - date2.getTime());
          const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          return diffDays;
        }),
      });
    } else if (sort === 'criticScore') {
      setState({
        result: [...state.result.sort((a, b) => b.tmdb_rating - a.tmdb_rating)],
      });
    } else if (sort === 'relevance') {
      setState({
        result: [...state.unSortedResults],
      });
    }
    setState({
      loadingData: false,
    });
  };

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
          name: 'Movies',
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
            name: 'Movies',
          },
        },
      ],
    };
  }, []);
  return (
    <div className={classes.root} id={'all-movie-list'}>
      <div>
        <SEO
          Title="Movie Detail Page"
          Description="Movie Detail Page"
          siteNavigationJSON={JSON.stringify(siteNavigationJSON)}
          breadcrumbSchemaJSON={JSON.stringify(breadcrumbSchemaJSON)}
        />
        <SEO>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
      </div>
      <Grid xs={12} container>
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} className={classes.containerBox} item>
          <PagePath
            path={[
              { name: 'Home', path: '/home' },
              { name: 'Movies', path: '/movies' },
            ]}
          />
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} className={classes.containerBox} item>
          <div className={classes.headerText}>
            {state.totalData > 0 && (
              <React.Fragment>
                <div>{state.totalData}</div>
                <div style={{ paddingLeft: '5px' }}>movie titles</div>
              </React.Fragment>
            )}
          </div>
          <ListingHeader
            from={'movie'}
            pillButtons={pillButtons}
            sort={state.sort}
            setSort={(sort) =>
              setState({
                sort: sort,
              })
            }
            results={state.result}
            onSort={handleSelected}
            button={state.button}
            setButton={(btn) =>
              setState({
                button: btn,
              })
            }
            onSelect={handleFilters}
            enableRefine={true}
            setRefineState={(val) =>
              setState({ refineState: val, loadingData: true, page: 1 })
            }
            handleRefine={() => {}}
          />
          <Grid xs={12} container>
            <Hidden only={['xs']}>
              <Grid
                sm={3}
                item
                className={state.loadingData ? classes.filterBlur : ''}
              >
                <RefineFilter
                  setRefineState={(val) => {
                    setState({
                      refineState: val,
                      loadingData: true,
                      page: 1,
                    });
                  }}
                />
              </Grid>
            </Hidden>
            <Grid
              xs={12}
              sm={9}
              item
              style={{ padding: width >= 600 ? '0 0 0 1rem' : '0px' }}
            >
              {!state.loadingData && state.result.length === 0 ? (
                <React.Fragment>
                  <div className={classes.errorBlock}>
                    <div className={classes.secondLetter}>
                      No results to show for the filters applied
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className={classes.loading}>
                    <MoviesList
                      results={state.result}
                      screen={'movie'}
                      tag={'movies'}
                      source={'Movie'}
                    />
                  </div>
                  {state.loadingData && (
                    <Grid xs={12} item>
                      <Spinner
                        styles={{
                          height: state.page === 1 ? '60vh' : '5vh',
                        }}
                        from="movies"
                      />
                    </Grid>
                  )}
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    flexGrow: 1,
    backgroundSize: 'contain',
    backgroundColor: 'transparent',
  },
  containerBox: {
    padding: '0 20px',
  },
  loading: {
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */,
    },
  },
  headerText: {
    color: 'white',
    fontSize: 'clamp(14px, 1.4vw, 20px)',
    fontWeight: 'bold',
    transition: '.5s',
    display: 'flex',
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
      padding: '0px 16px',
    },
    margin: '1% 0',
  },
  filterBlur: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  secondLetter: {
    fontSize: 'clamp(14px, 1.6vw, 22px)',
    color: '#FFFFFF',
    fontWeight: 500,
    textAlign: 'center',
    padding: '0px 20px',
  },
  errorBlock: {
    flexDirection: 'column',
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 'clamp(10px, 0.9vw, 14px)',
    margin: '15px 0px 4px 0px',
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
