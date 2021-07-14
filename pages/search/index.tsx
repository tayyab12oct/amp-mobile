import { Button, Grid, Hidden } from '@material-ui/core';
import {
  HOME_SCREEN_SECTIONS,
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  generatePermalink,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import React, { useContext, useEffect } from 'react';

import { GenreButtons } from '../../components/GlobalSearch/GenreButtons';
import Helmet from 'react-helmet';
import ImageComponent from '../../components/Images';
import { NavBar } from '../../components/NavBar';
import { NotFound } from '../../components/GlobalSearch/ErrorScreen';
import Router from 'next/router';
import SEO from '../../components/Seo';
import { SearchCard } from '../../components/SearchCard/SearchCard';
import { Spinner } from '../../components/Spinner';
import { Theme } from '@material-ui/core/styles';
import { TopHeader } from '../../components/TopHeader';
import { ViewportContext } from '../../components/ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';
import { getCardSize } from '../../utils/helper';
import { makeStyles } from '@material-ui/core/styles';

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');

const initState = {
  results: [],
  button: 'common',
  totalCount: 0,
  page: 1,
  loadingData: true,
  color: '1px solid #A89ABF',
  searchItem: '',
  enter: false,
  search: [],
  recent: false,
  startIndex: 0,
  endIndex: 6,
  correctText: '',
  canClearRecentData: true,
  isSearchTypingInprogress: false,
};

export default function GlobalSearch() {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const { height } = React.useContext(ViewportContext);
  const { webfox, webstore, actions, actionDispatch, setLoading } = useContext(
    WebfoxContext
  );
  const [state, setState] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...JSON.parse(JSON.stringify(initState)),
      canClearRecentData: webstore.recents.history.length > 0 ? true : false,
    }
  );

  const observer = React.useRef(null);
  const lastSearchElement = React.useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          state.search.length < state.totalCount &&
            !state.loadingData &&
            setState({ loadingData: true });
        }
      });
      if (node) observer.current.observe(node);
    },
    [state.loadingData, state.search, state.totalCount]
  );

  const { languages, streamingServices } = webstore;
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
    languages.name || []
  );
  const providersArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
    ) || [],
    streamingServices.selectedStreamingServices || []
  );
  const providersNameArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
  );

  const params = {
    query: state.searchItem,
    language:
      'English,Hindi,Tamil,Telugu,Kannada,Marathi, Gujarati,Punjabi, Malayalam',
    limit: 36,
    page: state.page,
  };

  const sectionDataParams = {
    module_name: 'Home',
    platform: 'web',
    section: HOME_SCREEN_SECTIONS.TRENDING,
    language: languagesArr.length > 0 ? languagesArr.toString() : '',
    limit: 24,
  };

  useEffect(() => {
    firebaseAnalytics.logEvent('screen_view', {
      page_title:
        '/search' +
        (webstore.recents.history.length > 0 ? '/recent-yes' : '/recent-no'),
    });
    windowAny.Moengage &&
      windowAny.Moengage.track_event('screen_view', {
        page_title: '/search/',
        recent: webstore.recents.history ? 'recent-yes' : 'recent-no',
        searchItem: state.searchItem,
      });
  }, [state.searchItem]);

  useEffect(() => {
    setLoading(true);
    webfox
      .getSectionData(sectionDataParams)
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
          movies: result,
          lastPage: response.lastPage,
          nextPage: response.nextPage,
        };
        if (response && response.rank) {
          setState({
            results:
              response.rank.length > 0
                ? state.results.concat(result)
                : result.concat,
            loadingData: false,
          });
        }
        actionDispatch(actions.FETCH_MOVIES_SUCCESS, payload || []);
      })
      .catch(() => {
        actionDispatch(actions.FETCH_MOVIES_FAILURE, []);
        setState({
          loadingData: false,
        });
      });
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    setState({
      searchItem: e.target.value,
      isSearchTypingInprogress: true,
      // enter: false,
      // page: 1,
      // search: [],
      // totalCount: 0,
      // loadingData: false,
    });
  };

  useEffect(() => {
    const searchTypingThrottle = setTimeout(() => {
      state.searchItem.length > 2 &&
        setState({
          loadingData: true,
          isSearchTypingInprogress: false,
          enter: false,
          page: 1,
          search: [],
          totalCount: 0,
        });
    }, 200);

    return () => {
      clearTimeout(searchTypingThrottle);
    };
  }, [state.searchItem]);

  useEffect(() => {
    state.loadingData &&
      (state.page === 1 || state.search.length < state.totalCount) &&
      state.searchItem.length &&
      handleData(state.button);
  }, [state.loadingData]);

  const handleData = (button) => {
    setState({
      color: '2px solid #03F87E',
    });
    return webfox
      .getAllSearch(button, params)
      .then(({ data, error, syserror }) => {
        if (error) {
          actionDispatch(actions.FETCH_ALL_SEARCH_FAILURE, []);
          setState({
            search: [],
            loadingData: false,
          });
        } else {
          actionDispatch(actions.FETCH_ALL_SEARCH_SUCCESS, data || []);
          let search: any = state.search;
          if (data && data.results) {
            data.results.map((show, index) => {
              if (show.movie_id) {
                return show.movie_id;
              } else show.movie_id = show.show_id;
              delete show.show_id;
            });
            search = search.concat(data.results);
          }
          setState({
            search: search,
            page: state.page + 1,
            totalCount:
              state.page === 1 && data && data.totalDocuments
                ? data.totalDocuments
                : state.totalCount,
            loadingData: false,
            correctText: data && data.responseSearchQuery,
          });
        }
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && state.searchItem.length > 2) {
      setState({
        enter: !state.enter,
        loadingData: true,
        page: 1,
        search: [],
        totalCount: 0,
      });
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const Recents = () => {
    const handleCard = (key, type, detail, name, s_url, p_url) => {
      let url = '';
      if (p_url === null || p_url === undefined || p_url === '') {
        url = generatePermalink(type, s_url);
      } else {
        url = p_url;
      }
      const params = {
        event: 'title_click',
        details: {
          page_name: window.location.pathname,
          preferred_providers: getPreferredProviders(providersNameArr),
          preferred_languages: getPreferredLanguages(languagesArr),
          content_type: type ? type : '',
          name: name ? name : '',
          formatted_id:
            detail &&
            detail.primary_language &&
            detail.primary_language !== undefined &&
            detail.primary_language.name &&
            detail._id
              ? detail.primary_language.name + '_' + detail._id
              : '',
        },
        context: contextParamsForREAnalytics,
      };
      webfox.postREAnalytics(params).then(({ data, error }) => {});
      //console.log('handleCard: ', { key, type, detail, name, url });
      actionDispatch(actions.ADDED_TO_RECENTS, detail);
      // if (type === 'cast') {
      //   history.push({
      //     pathname: `/${url}`,
      //     state: { key, type, name, sourcePage: 'Search' },
      //   });
      // } else if (type === 'crew') {
      //   history.push({
      //     pathname: `/${url}`,
      //     state: { key, type, name, sourcePage: 'Search' },
      //   });
      // } else if (type === 'movie') {
      //   history.push({
      //     pathname: `/movie/${url}`,
      //     state: { key, type, name, source: 'Search' },
      //   });
      // } else if (type === 'show') {
      //   history.push({
      //     pathname: `/show/${url}`,
      //     state: { key, type, name, source: 'Search' },
      //   });
      // }
      Router.push({
        pathname: `/${url}`,
      });
    };

    return (
      <React.Fragment>
        {webstore.recents.history
          .slice(state.startIndex, state.endIndex)
          .map((history, i) => {
            const initials = history && history.details;
            return (
              <Grid item xs={12} key={i}>
                <SearchCard
                  className="searchCardFlex"
                  rating={
                    history.details && history.details.ottplay_rating
                      ? initials.ottplay_rating
                      : history.ottplay_rating
                  }
                  type={
                    history.content_type ? history.content_type : history.type
                  }
                  year={
                    history.details && history.details.release_year
                      ? initials.release_year
                      : history.release_year
                  }
                  details={history}
                  description={
                    history.casts &&
                    history.casts
                      .filter(
                        (cast) => cast && cast.cast && cast.cast.name != null
                      )
                      .map((cast) =>
                        cast && cast.cast && cast.cast.name
                          ? cast.cast.name
                          : null
                      )
                      .slice(0, 2)
                      .join(', ')
                  }
                  image={
                    history.posters && history.posters[0]
                      ? history.posters[0]
                      : history && history.img_url
                      ? history.img_url
                      : history.headshot
                  }
                  onClick={() =>
                    handleCard(
                      history.id ? history.id : history.movie_id,
                      history.content_type
                        ? history.content_type
                        : history.type,
                      history,
                      history.name,
                      history.seo_url,
                      history.permalink
                    )
                  }
                  name={history.name}
                  key={history.id ? history.id : history.movie_id}
                  //isSelected={isSelected !== -1}
                />
              </Grid>
            );
          })
          .reverse()}
      </React.Fragment>
    );
  };

  const handleClear = () => {
    webstore.recents.history = [];
    setState({
      recent: false,
      canClearRecentData: false,
    });
  };

  const MySearch = (props) => {
    const handleCard = (key, type, detail, name, s_url, p_url) => {
      let url = '';
      if (p_url === null || p_url === undefined || p_url === '') {
        url = generatePermalink(type, s_url);
      } else {
        url = p_url;
      }
      const params = {
        event: 'title_click',
        details: {
          page_name: window.location.pathname,
          preferred_providers: getPreferredProviders(providersNameArr),
          preferred_languages: getPreferredLanguages(languagesArr),
          content_type: type ? type : '',
          name: name ? name : '',
          formatted_id:
            detail &&
            detail.primary_language &&
            detail.primary_language !== undefined &&
            detail.primary_language.name &&
            detail._id
              ? detail.primary_language.name + '_' + detail._id
              : '',
        },
        context: contextParamsForREAnalytics,
      };
      webfox.postREAnalytics(params).then(({ data, error }) => {});
      actionDispatch(actions.ADDED_TO_RECENTS, detail);
      setState({
        recent: true,
      });
      Router.push({
        pathname: `/${url}`,
      });
      // if (type === 'cast') {
      //   history.push({
      //     pathname: `/${url}`,
      //     state: { key, type, name, sourcePage: 'Search' },
      //   });
      // } else if (type === 'crew') {
      //   history.push({
      //     pathname: `/${url}`,
      //     state: { key, type, name, sourcePage: 'Search' },
      //   });
      // } else if (type === 'movie' || type === 'short_film') {
      //   history.push({
      //     pathname: `/${url}`,
      //     state: { key, type, name, source: 'Search' },
      //   });
      // } else if (type === 'show') {
      //   let url1 = '';
      //   url1 = `/${url}`;
      //   history.push({
      //     pathname: url1,
      //     state: { key, type, name },
      //   });
      // }
    };

    return (
      <React.Fragment>
        {props.results &&
          props.results.map((detail, i) => {
            const initials = detail && detail.details;
            const array: any = webstore.watchlistArr.watchlistArr;

            let isSelected;
            if (array != null) {
              isSelected = array.findIndex(
                (item) => item.movie_id === detail.movie_id
              );
            }
            return (
              <Grid
                item
                xs={12}
                // sm={3}
                // md={2}
                key={i}
                ref={
                  props.results.length === i + 1 && state.searchItem.length > 2
                    ? lastSearchElement
                    : null
                }
              >
                <SearchCard
                  className="searchCardFlex"
                  rating={
                    detail.details && detail.details.ottplay_rating
                      ? initials.ottplay_rating
                      : detail.ottplay_rating
                  }
                  type={detail.content_type ? detail.content_type : detail.type}
                  year={
                    detail.details && detail.details.release_year
                      ? initials.release_year
                      : detail.release_year
                  }
                  description={
                    detail.casts &&
                    detail.casts
                      .filter(
                        (cast) => cast && cast.cast && cast.cast.name != null
                      )
                      .map((cast) => cast && cast.cast && cast.cast.name)
                      .slice(0, 2)
                      .join(', ')
                  }
                  details={detail}
                  image={
                    detail.posters && detail.posters[0]
                      ? detail.posters[0]
                      : detail && detail.img_url
                      ? detail.img_url
                      : detail.headshot
                  }
                  onClick={() =>
                    handleCard(
                      detail.id ? detail.id : detail.movie_id,
                      detail.content_type ? detail.content_type : detail.type,
                      detail,
                      detail.name,
                      detail.seo_url,
                      detail.permalink
                    )
                  }
                  name={detail.name}
                  key={detail.id ? detail.id : detail.movie_id}
                  //isSelected={isSelected !== -1}
                />
              </Grid>
            );
          })}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div>
        <SEO
          Title="Search page"
          Description="Here, you can search for a particular movie or show that you want to jump to straight away. 
          Under the search bar, you will find the titles that are trending right now across all OTT platforms."
          // />
        />
        <SEO>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
      </div>
      <div
        className={classes.root}
        style={{
          minHeight: height > 900 ? '82vh' : width > 600 ? '82vh' : '100vh',
        }}
      >
        {/* <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <a href="https://domain.xn--com-9o0a" rel="noindex,nofollow"></a> */}
        {/* </Helmet> */}
        <Grid xs={12} container>
          <Grid sm={1} lg={2}></Grid>
          <Grid xs={12} sm={10} lg={8}>
            <Grid xs={12} item>
              <div className={classes.pageTitle}>{'Search'}</div>
            </Grid>
            <Grid xs={12} container className={classes.searchInputBox} item>
              <Grid
                xs={11}
                item
                className={['searchTool', classes.search_mini].join(' ')}
              >
                <span className="closeSearch">
                  <ImageComponent
                    src="https://images.ottplay.com/static/globalSearch.svg"
                    alt="search icon"
                  />
                </span>
                <input
                  autoFocus
                  className="searchBar"
                  placeholder="Search"
                  onChange={handleChange}
                  value={state.searchItem}
                  onKeyPress={handleKeyPress}
                  // onKeyDown={() =>
                  //   setState({
                  //     enter: false,
                  //     page: 1,
                  //     search: [],
                  //     totalCount: 0,
                  //     loadingData: false,
                  //   })
                  // }
                />
                <span
                  className="leftSearch"
                  onClick={() => setState({ searchItem: '' })}
                >
                  <ImageComponent
                    src="https://images.ottplay.com/static/close.png"
                    alt="search icon"
                  />
                </span>
              </Grid>
              <Grid
                xs={1}
                item
                style={{ cursor: 'pointer', marginTop: '0.2rem' }}
              >
                {' '}
                <span onClick={handleGoBack}>
                  <ImageComponent
                    // style={{ cursor: 'pointer' }}
                    src="https://images.ottplay.com/static/new-delete.svg"
                    alt="search icon"
                  />
                </span>{' '}
              </Grid>
            </Grid>

            <Grid
              xs={12}
              container
              item
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              {state.searchItem.length > 2 &&
              (state.search.length > 0 ||
                (!state.loadingData && !state.isSearchTypingInprogress)) ? (
                <GenreButtons
                  button={state.button}
                  setButton={(button) => {
                    setState({
                      button: button,
                      page: 1,
                      loadingData: true,
                      search: [],
                      totalCount: 0,
                    });
                  }}
                  onSelect={() => {}}
                  from="search"
                />
              ) : webstore.recents.history.length > 0 &&
                state.searchItem.length === 0 &&
                state.canClearRecentData ? (
                <React.Fragment>
                  <Grid
                    xs={12}
                    container
                    item
                    className={classes.searchOuterBox}
                  >
                    <Grid
                      item
                      xs={10}
                      style={{
                        float: 'right',
                        paddingRight: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <h2 className="recentText">Recent</h2>
                    </Grid>
                    <Grid item xs={2} className={classes.clearCarousel}>
                      <Grid item className={classes.subWrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.clear}
                          startIcon={
                            <ImageComponent
                              alt="clear icon"
                              src="https://images.ottplay.com/static/searchClear.svg"
                            />
                          }
                          onClick={handleClear}
                        >
                          Clear
                        </Button>
                      </Grid>
                      <Hidden only={['xs']}>
                        <ImageComponent
                          // onClick={() => {
                          //   if (state.startIndex > 0) {
                          //     setState({
                          //       startIndex: state.startIndex - 1,
                          //       endIndex: state.endIndex - 1,
                          //     });
                          //   }
                          // }}
                          src="https://images.ottplay.com/static/slide_left_arrow.svg"
                          alt="left arrow"
                        />{' '}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <ImageComponent
                          // onClick={() => {
                          //   if (
                          //     webstore.recents.history.length > 6 &&
                          //     state.endIndex <=
                          //       webstore.recents.history.length - 1
                          //   ) {
                          //     setState({
                          //       startIndex: state.startIndex + 1,
                          //       endIndex: state.endIndex + 1,
                          //     });
                          //   }
                          //   // if (startIndex > 0) {
                          //   //   setStartIndex(startIndex - 1);
                          //   //   setEndIndex(endIndex - 1);
                          //   // }
                          // }}
                          src="https://images.ottplay.com/static/slide_right_arrow.svg"
                          alt="right arrow"
                        />
                      </Hidden>
                    </Grid>
                  </Grid>
                  {width > 600 ? (
                    <div
                      className={classes.gridContainer}
                      style={{
                        overflowX: 'auto',
                        gridTemplateColumns: getCardSize(
                          webstore.recents.history,
                          'widget'
                        ),
                      }}
                    >
                      <Recents />
                    </div>
                  ) : (
                    <Grid
                      container
                      item
                      xs={12}
                      // spacing={2}
                      className="searchResultListBox"
                    >
                      <Recents />
                    </Grid>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {state.searchItem.length === 0 &&
                  !state.canClearRecentData ? (
                    <h2 className="historyText">No Recent History</h2>
                  ) : null}
                </React.Fragment>
              )}

              {state.enter && state.correctText != undefined ? (
                <React.Fragment>
                  <h2 className="resultText">
                    Showing you results for <b>{state.correctText}</b>
                  </h2>
                  <h2>
                    Search instead for <a>{state.searchItem}</a>
                  </h2>
                </React.Fragment>
              ) : null}
              {state.searchItem.length === 0 ? (
                <h2 className="trendingText">This Is Trending</h2>
              ) : null}
              <Grid
                item
                xs={12}
                container
                // spacing={2}
                className="searchResultListBox"
              >
                {state.searchItem.length === 0 ? (
                  width > 600 ? (
                    <div
                      className={classes.gridContainer}
                      style={{
                        gridTemplateColumns: getCardSize(state.results),
                      }}
                    >
                      <MySearch results={state.results} />
                    </div>
                  ) : (
                    <MySearch results={state.results} />
                  )
                ) : state.search.length > 0 && state.searchItem.length > 2 ? (
                  width > 600 ? (
                    <div
                      className={classes.gridContainer}
                      style={{
                        gridTemplateColumns: getCardSize(state.search),
                      }}
                    >
                      <MySearch results={state.search} />
                    </div>
                  ) : (
                    <MySearch results={state.search} />
                  )
                ) : (
                  state.searchItem.length > 2 &&
                  !state.loadingData &&
                  !state.isSearchTypingInprogress && (
                    <NotFound item={state.searchItem} />
                  )
                )}
                {state.loadingData && (
                  <Spinner
                    styles={{
                      height: state.page === 1 ? '60vh' : '40px',
                    }}
                  />
                )}
              </Grid>
              {/* </div> */}
            </Grid>
          </Grid>
          <Grid sm={1} lg={2}></Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    marginTop: '1%',
    marginBottom: '20px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    padding: '0.5rem 8px',
    width: '100%',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
  },
  subWrapper: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  loading: {
    height: '1200px',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */,
    },
  },
  clear: {
    color: '#A89ABF',
    fontSize: '16px',
    backgroundColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
    textTransform: 'none',
    marginLeft: '8px',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
      '& img': {
        width: 10,
        height: 10,
      },
    },
  },
  searchInputBox: {
    padding: '0px 8px',
  },
  searchOuterBox: {
    margin: '20px 0 0 0.75%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: '7px 0 0 0',
    },
  },
  clearCarousel: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 -15px',
    justifyContent: 'flex-end',
  },
  expandGlobalSearch: {
    backgroundColor: '#000000',
    padding: '25px 500px 25px 50px',
    outline: 'none',
    border: 'none',
    color: '#ffffff',
    opacity: 0.6,
    fontSize: '18px',
    borderBottom: '2px solid',
    borderBottomColor: '#03F87E',
    webkitTransition: 'padding 0.6s ease-in-out',
    transition: 'padding 0.6s ease-in-out',
  },
  search_mini: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
      marginTop: 0,
    },
  },
  pageTitle: {
    fontSize: 'clamp(18px, 1.5vw, 30px)',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    padding: '0px 8px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px 16px',
      marginTop: 5,
    },
  },
}));
