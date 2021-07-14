import { Grid, Hidden } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  device_UUID,
  getLocalStorageData,
} from '../../utils/constants';
import { PagePath, Spinner } from '../../components';
import React, { useContext, useEffect, useState } from 'react';

import { ListingHeader } from '../../components/ListingHeader';
import { MoviesList } from '../../components/MoviesList';
import { NotFound } from '../../components/GlobalSearch/ErrorScreen';
import { PillButton } from '../../components/PillButton';
import RefineFilter from '../../components/RefineFilter';
import SEO from '../../components/Seo';
import { ViewportContext } from '../../components/ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';
import { makeStyles } from '@material-ui/core/styles';

const initState = {
  button: ['all'],
  filterResults: false,
  result: [],
  unSortedResults: [],
  limit: 18,
  loadingData: true,
  paginationLoader: true,
  movies: [],
  currentPage: 1,
  page: 1,
  empty: true,
  sort: 'relevance',
  timer: 800,
  delay: null,
  initialsLoading: true,
  providerIds: null,
  languageNames: null,
  genreIds: null,
  castIds: null,
  crewIds: null,
  settingPage: false,
  sortPage: 'relevance',
  totalData: 0,
  refineState: false,
  additionalParams: { price: null, content_type: null },
  totalCount: 0,
  lastPage: 0,
  resultLength: 0,
  errorScreen: false,
};

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');
const pillButtons = [
  {
    id: '1',
    name: 'All',
    value: 'all',
  },
  {
    id: '2',
    name: 'My Providers',
    value: 'providers',
  },
  {
    id: '3',
    name: 'Free',
    value: 'free',
  },
  {
    id: '4',
    name: 'Movies',
    value: 'movie',
  },
  {
    id: '5',
    name: 'Shows',
    value: 'show',
  },
];
export default function ForYou({ movie, ...props }) {
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);
  const likedMovies: any = [];
  const likedShows: any = [];
  const unlikedMovies: any = [];
  const unlikedShows: any = [];
  const {
    languages,
    likedMovieCard,
    streamingServices,
    recommendedMovies,
    cast,
    crew,
  } = webstore;
  typeof window !== 'undefined' && localStorage.setItem('fromForYou', 'false');
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  const langLikedIdArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ)
    ) || [],
    []
  );
  langLikedIdArr
    .filter((e) => e.content_type === 'movie')
    .map((f) => likedMovies.push(f._id));

  langLikedIdArr
    .filter((e) => e.content_type === 'show')
    .map((f) => likedShows.push(f._id));

  const providerNameArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
  );
  const providerArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
    ) || [],
    streamingServices.selectedStreamingServices || []
  );
  const genIdArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.GENRE_IDS)
    ) || [],
    webstore.refineGenres.selectedRefineGenres.map((item) => item.genre) || []
  );
  const lagUnlikedIdArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ)
    ) || [],
    []
  );

  lagUnlikedIdArr
    .filter((e) => e.content_type === 'movie')
    .map((f) => unlikedMovies.push(f._id));

  lagUnlikedIdArr
    .filter((e) => e.content_type === 'show')
    .map((f) => unlikedShows.push(f._id));

  const castIdArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.CAST_IDS)
    ) || [],
    cast.selectedCast || []
  );
  const crewIdArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.CREW_IDS)
    ) || [],
    crew.selectedCrew || []
  );
  const classes = useStyles();

  const [state, setState] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...JSON.parse(JSON.stringify(initState)),
      providerIds: providerArr,
      languageNames: languagesArr,
      genreIds: genIdArr,
      castIds: castIdArr,
      crewIds: crewIdArr,
    }
  );

  const [results, setResults] = React.useState<any[]>([]);

  const { width } = React.useContext(ViewportContext);
  const providersArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
    ) || [],
    streamingServices.selectedStreamingServices || []
  );

  const handleScroll = () => {
    const appRoutes = document.getElementById('top-header');
    if (appRoutes) {
      if (
        Math.round(appRoutes.getBoundingClientRect().bottom) <=
          window.innerHeight + 600 &&
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
    if (results.length === 0 && state.paginationLoader === false) {
      firebaseAnalytics.logEvent('screen_view', {
        page_title:
          '/recommendedforyouerror' +
          '/Allow us some time to serve you the best recommendations' +
          '/' +
          `${sessionStorage.getItem('prevPath')}`,
      });
    }
  }, [results]);

  useEffect(() => {
    //console.log('state.page', state.page, state.loadingData);
  }, [state.page, state.loadingData, state.sortPage, state.totalData]);

  useEffect(() => {
    if (state.button.length === 0) {
      setState({
        filterResults: false,
      });
    }
  }, [state.button]);

  useEffect(() => {
    firebaseAnalytics.logEvent('screen_view', {
      page_title:
        '/recommendedforyou' +
        (state.refineState ? '/active-quick-filter' : ''),
    });
    windowAny.Moengage &&
      windowAny.Moengage.track_event('screen_view', {
        page_title:
          '/recommendedforyou' +
          (state.refineState ? '/active-quick-filter' : ''),
      });
    setState({
      errorScreen: true,
    });
  }, []);

  useEffect(() => {
    const unlisten = () => {
      // window.scrollTo(0, 0);
      window.removeEventListener('scroll', handleScroll, false);
    };

    window.addEventListener('scroll', handleScroll, false);
    return () => {
      unlisten();
    };
  }, [state.totalData, results, state.loadingData]);

  useEffect(() => {
    if (
      !webstore.refine.forYou.refineForYou &&
      state.page === 1 &&
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.ONBOARDING_DONE)
    ) {
      let params = {
        query: {
          movie_liked_ids: likedMovies.length > 0 ? likedMovies.toString() : '',
          show_liked_ids: likedShows.length > 0 ? likedShows.toString() : '',
          lang:
            state.languageNames.length > 0
              ? state.languageNames.toString()
              : '',
          providers:
            state.providerIds.length > 0 ? state.providerIds.toString() : '',
          genres: state.genreIds.length > 0 ? state.genreIds.toString() : '',
          casts: state.castIds.length > 0 ? state.castIds.toString() : '',
          crews: state.crewIds.length > 0 ? state.crewIds.toString() : '',
          movie_unliked_ids:
            unlikedMovies.length > 0 ? unlikedMovies.toString() : '',
          show_unliked_ids:
            unlikedShows.length > 0 ? unlikedShows.toString() : '',
          limit: width > 1720 ? 15 : 16,
          page: state.page,
          is_onboarding: true,
          isRefine: false,
          genresRefine: null,
          providersRefine: null,

          sort: state.sort,
        },
      };
      const forYouPageRefresh =
        typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.FOR_YOU_PAGE_REFRESH);
      if (forYouPageRefresh && state.filterResults === false) {
        params = {
          ...params,
          query: {
            ...params.query,
            // unique_id: device_UUID,
            // refresh: true,
            is_onboarding: false,
            isRefine: false,
          },
        };
      }
      if (state.additionalParams.price !== null) {
        params = {
          ...params,
          query: {
            ...params.query,
            // price: state.additionalParams.price,
          },
        };
      }
      if (state.additionalParams.content_type !== null) {
        params = {
          ...params,
          query: {
            ...params.query,
            // content_type: state.additionalParams.content_type,
          },
        };
      }

      fetchData(params);
    }
  }, [state.additionalParams, state.sortPage]);

  // Pagination for dafult page START
  useEffect(() => {
    if (
      !webstore.refine.forYou.refineForYou &&
      state.loadingData &&
      state.page > 1
    ) {
      let params = {
        query: {
          movie_liked_ids: likedMovies.length > 0 ? likedMovies.toString() : '',
          show_liked_ids: likedShows.length > 0 ? likedShows.toString() : '',
          lang:
            state.languageNames.length > 0
              ? state.languageNames.toString()
              : '',
          providers:
            state.providerIds.length > 0 ? state.providerIds.toString() : '',
          genres: state.genreIds.length > 0 ? state.genreIds.toString() : '',
          casts: state.castIds.length > 0 ? state.castIds.toString() : '',
          crews: state.crewIds.length > 0 ? state.crewIds.toString() : '',
          movie_unliked_ids:
            unlikedMovies.length > 0 ? unlikedMovies.toString() : '',
          show_unliked_ids:
            unlikedShows.length > 0 ? unlikedShows.toString() : '',
          limit: width > 1720 ? 15 : 16,
          page: state.page,
          is_onboarding: true,
          isRefine: false,
          genresRefine: null,
          providersRefine: null,
          sort: state.sort,
        },
      };
      const forYouPageRefresh =
        typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.FOR_YOU_PAGE_REFRESH);
      if (forYouPageRefresh && state.filterResults === false) {
        params = {
          ...params,
          query: {
            ...params.query,
            // unique_id: device_UUID,
            // refresh: true,
            is_onboarding: false,
            isRefine: false,
          },
        };
      }
      if (state.additionalParams.price !== null) {
        params = {
          ...params,
          query: {
            ...params.query,
            // price: state.additionalParams.price,
          },
        };
      }
      if (state.additionalParams.content_type !== null) {
        params = {
          ...params,
          query: {
            ...params.query,
            // content_type: state.additionalParams.content_type,
          },
        };
      }
      fetchData(params);
    }
  }, [state.loadingData]);
  // Pagination for dafult page END

  useEffect(() => {
    if (webstore.refine.forYou.refineForYou === true) {
      setState({ totalData: 0, page: 1, settingPage: true, loadingData: true });
    }
  }, [
    webstore.refine.forYou.refineForYou,
    webstore.refine.forYou.filter.selectedLanguages,
    webstore.refine.forYou.filter.selectedGenres,
    webstore.refine.forYou.filter.selectedStreamingServices,
    webstore.refine.forYou.filter.selectedFreePaid,
    webstore.refine.forYou.filter.selectedQuality,
    webstore.refine.forYou.filter.selectedContentType,
    webstore.refine.forYou.filter.selectedContentRating,
    webstore.refine.forYou.filter.selectedRuntimeMin,
    state.filterResults,
  ]);

  useEffect(() => {
    if (
      webstore.refine.forYou.refineForYou &&
      state.settingPage === true &&
      state.page === 1 &&
      state.loadingData
    ) {
      if (
        webstore &&
        webstore.refine &&
        webstore.refine.forYou &&
        webstore.refine.forYou.filter &&
        (webstore.refine.forYou.filter.selectedLanguages ||
          webstore.refine.forYou.filter.selectedStreamingServices ||
          webstore.refine.forYou.filter.selectedFreePaid ||
          webstore.refine.forYou.filter.selectedQuality ||
          webstore.refine.forYou.filter.selectedContentType ||
          webstore.refine.forYou.filter.selectedRuntimeMin ||
          webstore.refine.forYou.filter.selectedGenres)
      ) {
        let params = {
          query: {
            movie_liked_ids:
              likedMovies.length > 0 ? likedMovies.toString() : '',
            show_liked_ids: likedShows.length > 0 ? likedShows.toString() : '',
            lang:
              webstore.refine.forYou.filter.selectedLanguages.length > 0
                ? webstore.refine.forYou.filter.selectedLanguages.toString()
                : languagesArr.length > 0
                ? languagesArr.toString()
                : '',
            providers:
              state.providerIds.length > 0 ? state.providerIds.toString() : '',
            genres: state.genreIds.length > 0 ? state.genreIds.toString() : '',
            movie_unliked_ids:
              unlikedMovies.length > 0 ? unlikedMovies.toString() : '',
            show_unliked_ids:
              unlikedShows.length > 0 ? unlikedShows.toString() : '',
            casts: state.castIds.length > 0 ? state.castIds.toString() : '',
            crews: state.crewIds.length > 0 ? state.crewIds.toString() : '',
            limit: width > 1720 ? 15 : 16,
            page: state.page,
            is_onboarding: false,
            isRefine: state.refineState,
            genresRefine:
              webstore.refine.forYou.filter.selectedGenres.length > 0
                ? webstore.refine.forYou.filter.selectedGenres.toString()
                : null,
            providersRefine:
              webstore.refine.forYou.filter.selectedStreamingServices.length > 0
                ? webstore.refine.forYou.filter.selectedStreamingServices.toString()
                : null,
            price:
              webstore.refine.forYou.filter.selectedFreePaid?.length > 0
                ? webstore.refine.forYou.filter.selectedFreePaid.toString()
                : null,
            content_type:
              webstore.refine.forYou.filter.selectedContentType?.length > 0
                ? webstore.refine.forYou.filter.selectedContentType.toString()
                : null,
            runtime_to:
              webstore.refine.forYou.filter.selectedRuntimeMin?.length > 0
                ? parseInt(
                    webstore.refine.forYou.filter.selectedRuntimeMin.toString()
                  )
                : null,
            runtime_from:
              webstore.refine.forYou.selectedRuntimeMin2?.length > 0
                ? parseInt(
                    webstore.refine.forYou.selectedRuntimeMin2.toString()
                  )
                : null,
            quality:
              webstore.refine.forYou.filter.selectedQuality?.length > 0
                ? webstore.refine.forYou.filter.selectedQuality.toString()
                : null,
            certification:
              webstore.refine.forYou.filter.selectedContentRating?.length > 0
                ? webstore.refine.forYou.filter.selectedContentRating.toString()
                : null,
            sort: state.sort,
          },
        };
        if (state.additionalParams.price !== null) {
          params = {
            ...params,
            query: {
              ...params.query,
              providersRefine:
                webstore.refine.forYou.filter.selectedStreamingServices
                  ?.length > 0
                  ? webstore.refine.forYou.filter.selectedStreamingServices.toString()
                  : null,
              price: state.additionalParams.price,
            },
          };
        }
        if (state.additionalParams.content_type !== null) {
          params = {
            ...params,
            query: {
              ...params.query,
              providersRefine:
                webstore.refine.forYou.filter.selectedStreamingServices
                  ?.length > 0
                  ? webstore.refine.forYou.filter.selectedStreamingServices.toString()
                  : null,
              content_type: state.additionalParams.content_type,
            },
          };
        }
        setResults([]);
        fetchData(params);
      }
    }
  }, [
    state.settingPage,
    webstore.refine.forYou.refineForYou,
    webstore.refine.forYou.filter.selectedLanguages,
    webstore.refine.forYou.filter.selectedStreamingServices,
    webstore.refine.forYou.filter.selectedGenres,
    webstore.refine.forYou.filter.selectedFreePaid,
    webstore.refine.forYou.filter.selectedQuality,
    webstore.refine.forYou.filter.selectedContentType,
    webstore.refine.forYou.filter.selectedContentRating,
    webstore.refine.forYou.filter.selectedRuntimeMin,
    // state.page,
    state.additionalParams,
    state.filterResults,
    state.sortPage,
  ]);

  //Pagination after filter STRAT
  useEffect(() => {
    if (
      webstore.refine.forYou.refineForYou &&
      state.settingPage === true &&
      state.page > 1 &&
      state.loadingData
    ) {
      if (
        webstore &&
        webstore.refine &&
        webstore.refine.forYou &&
        webstore.refine.forYou.filter &&
        (webstore.refine.forYou.filter.selectedLanguages ||
          webstore.refine.forYou.filter.selectedStreamingServices ||
          webstore.refine.forYou.filter.selectedFreePaid ||
          webstore.refine.forYou.filter.selectedQuality ||
          webstore.refine.forYou.filter.selectedContentType ||
          webstore.refine.forYou.filter.selectedRuntimeMin ||
          webstore.refine.forYou.filter.selectedGenres)
      ) {
        let params = {
          query: {
            movie_liked_ids:
              likedMovies.length > 0 ? likedMovies.toString() : '',
            show_liked_ids: likedShows.length > 0 ? likedShows.toString() : '',
            lang:
              webstore.refine.forYou.filter.selectedLanguages.length > 0
                ? webstore.refine.forYou.filter.selectedLanguages.toString()
                : languagesArr.length > 0
                ? languagesArr.toString()
                : '',
            providers:
              state.providerIds.length > 0 ? state.providerIds.toString() : '',
            genres: state.genreIds.length > 0 ? state.genreIds.toString() : '',
            movie_unliked_ids:
              unlikedMovies.length > 0 ? unlikedMovies.toString() : '',
            show_unliked_ids:
              unlikedShows.length > 0 ? unlikedShows.toString() : '',
            casts: state.castIds.length > 0 ? state.castIds.toString() : '',
            crews: state.crewIds.length > 0 ? state.crewIds.toString() : '',
            limit: width > 1720 ? 15 : 16,
            page: state.page,
            is_onboarding: false,
            isRefine: state.refineState,
            genresRefine:
              webstore.refine.forYou.filter.selectedGenres?.length > 0
                ? webstore.refine.forYou.filter.selectedGenres.toString()
                : null,
            providersRefine:
              webstore.refine.forYou.filter.selectedStreamingServices?.length >
              0
                ? webstore.refine.forYou.filter.selectedStreamingServices.toString()
                : null,
            price:
              webstore.refine.forYou.filter.selectedFreePaid?.length > 0
                ? webstore.refine.forYou.filter.selectedFreePaid.toString()
                : null,
            content_type:
              webstore.refine.forYou.filter.selectedContentType?.length > 0
                ? webstore.refine.forYou.filter.selectedContentType.toString()
                : null,
            runtime_to:
              webstore.refine.forYou.filter.selectedRuntimeMin?.length > 0
                ? parseInt(
                    webstore.refine.forYou.filter.selectedRuntimeMin.toString()
                  )
                : null,
            runtime_from:
              webstore.refine.forYou.selectedRuntimeMin2?.length > 0
                ? parseInt(
                    webstore.refine.forYou.selectedRuntimeMin2.toString()
                  )
                : null,
            quality:
              webstore.refine.forYou.filter.selectedQuality?.length > 0
                ? webstore.refine.forYou.filter.selectedQuality.toString()
                : null,
            certification:
              webstore.refine.forYou.filter.selectedContentRating?.length > 0
                ? webstore.refine.forYou.filter.selectedContentRating.toString()
                : null,
            sort: state.sort,
          },
        };
        if (state.additionalParams.price !== null) {
          params = {
            ...params,
            query: {
              ...params.query,
              providersRefine:
                webstore.refine.forYou.filter.selectedStreamingServices
                  ?.length > 0
                  ? webstore.refine.forYou.filter.selectedStreamingServices.toString()
                  : null,
              price: state.additionalParams.price,
            },
          };
        }
        if (state.additionalParams.content_type !== null) {
          params = {
            ...params,
            query: {
              ...params.query,
              providersRefine:
                webstore.refine.forYou.filter.selectedStreamingServices
                  ?.length > 0
                  ? webstore.refine.forYou.filter.selectedStreamingServices.toString()
                  : null,
              content_type: state.additionalParams.content_type,
            },
          };
        }
        fetchData(params);
      }
    }
  }, [state.loadingData]);
  //Pagination after filter END

  useEffect(() => {
    setState({
      sortPage: state.sort,
      page: 1,
      totalData: 0,
      loadingData: true,
      results: [],
    });
  }, [state.sort]);

  const fetchData = (params) => {
    webfox.getRefinedRecommendedMovies(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_RECOMMENDED_MOVIES_FAILURE, []);
        setState({
          loadingData: false,
        });
      }
      if (state.page === 1) {
        setState({
          totalData: data && data.totalDocuments ? data.totalDocuments : 0,
          lastPage: data && data.lastPage ? data.lastPage : 0,
        });
      }

      if (data && data.result) {
        if (state.page === 1) {
          setResults([]);
          setResults([...data.result]);
          setState({
            unSortedResults: [...data.result],
          });
          actionDispatch(actions.FETCH_RECOMMENDED_MOVIES_SUCCESS, [
            ...data.result,
          ]);
        } else {
          results.length > 0
            ? setResults(() => {
                return results.concat([...data.result]);
              })
            : setResults([...data.result]);
          state.unSortedResults.length > 0
            ? setState({
                unSortedResults: state.unSortedResults.concat([...data.result]),
              })
            : setState({
                unSortedResults: [...data.result],
              });
          if (typeof window !== undefined) {
            localStorage.setItem(
              LOCALSTORAGE_KEY_CONSTANTS.FOR_YOU_PAGE_REFRESH,
              'true'
            );
          }
          actionDispatch(
            actions.FETCH_RECOMMENDED_MOVIES_SUCCESS,
            results.length > 0
              ? results.concat([...data.result])
              : [...data.result]
          );
        }
        setState({
          page: parseInt(state.page) + 1,
          loadingData: false,
        });
      } else {
        setState({
          loadingData: false,
        });
      }
    });
  };

  //Will be called on click of retry
  const reloadData = () => {
    setState({
      loadingData: true,
    });
    firebaseAnalytics.logEvent('error_retry_click', {
      eventCategory: 'error_retry_click',
      eventAction: window.location.pathname,
      eventLabel: 'Allow us some time to serve you the best recommendations',
    });
    let params = {
      query: {
        movie_liked_ids: likedMovies.length > 0 ? likedMovies.toString() : '',
        show_liked_ids: likedShows.length > 0 ? likedShows.toString() : '',
        lang:
          state.languageNames.length > 0 ? state.languageNames.toString() : '',
        providers:
          state.providerIds.length > 0 ? state.providerIds.toString() : '',
        genres: state.genreIds.length > 0 ? state.genreIds.toString() : '',
        casts: state.castIds.length > 0 ? state.castIds.toString() : '',
        crews: state.crewIds.length > 0 ? state.crewIds.toString() : '',
        movie_unliked_ids:
          unlikedMovies.length > 0 ? unlikedMovies.toString() : '',
        show_unliked_ids:
          unlikedShows.length > 0 ? unlikedShows.toString() : '',
        limit: width > 1720 ? 15 : 16,
        page: 1,
        is_onboarding: true,
        isRefine: false,
        providersRefine: null,
        genresRefine: null,
        sort: state.sort,
      },
    };
    const forYouPageRefresh =
      typeof window !== 'undefined' &&
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.FOR_YOU_PAGE_REFRESH);
    if (forYouPageRefresh) {
      params = {
        ...params,
        query: {
          ...params.query,
          // unique_id: device_UUID,
          // refresh: true,
          is_onboarding: false,
          isRefine: false,
        },
      };
    }
    setLoading(true);
    if (state.page === 1) {
      setResults([]);
    } else {
      setState({
        paginationLoader: true,
      });
    }
    fetchData(params);
  };

  useEffect(() => {
    setResults(recommendedMovies.data);
  }, [recommendedMovies.data]);

  const handleFilters = (button) => {
    setState({
      loadingData: true,
      filterResults: true,
    });
    if (button[0] === 'providers') {
      actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
        toggle: false,
        providers: 2,
        name: 'sd',
      });
      providerNameArr.map((item, i) => {
        actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
          providers: providerArr[i],
          name: item,
        });
      });
      actionDispatch(actions.REFINE_FOR_YOU_PAGE, {
        page: 'forYou',
      });

      setState({
        additionalParams: {
          ...state.additionalParams,
          content_type: 'provider',
        },
        page: 1,
        totalData: 0,
      });
    } else if (button[0] === 'free') {
      actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
        toggle: false,
        providers: 2,
        name: 'sd',
      });
      actionDispatch(actions.REFINE_FOR_YOU_PAGE, {
        page: 'forYou',
      });

      setState({
        additionalParams: {
          ...state.additionalParams,
          content_type: 'free',
          price: 'free',
        },
        page: 1,
        totalData: 0,
      });
    } else if (button[0] === 'movie' || button[0] === 'show') {
      actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
        toggle: false,
        providers: 2,
        name: 'sd',
      });
      actionDispatch(actions.REFINE_FOR_YOU_PAGE, {
        page: 'forYou',
      });
      setState({
        additionalParams: {
          ...state.additionalParams,
          content_type: button[0],
          price: null,
        },
        page: 1,
        totalData: 0,
      });
    } else if (button.length === 0) {
      setResults(recommendedMovies.data);
    } else if (button[0] === 'all') {
      actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
        toggle: false,
        providers: 2,
        name: 'sd',
      });
      actionDispatch(actions.REFINE_FOR_YOU_PAGE, {
        page: 'forYou',
      });
      setState({
        additionalParams: {
          ...state.additionalParams,
          content_type: null,
          price: null,
        },
        totalData: 0,
        page: 1,
      });
    }
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
          name: 'ForYou',
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
            name: 'For You',
          },
        },
      ],
    };
  }, []);
  return (
    <div className={classes.root} id="ottplay-foryou-page">
      <SEO>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <meta
          property="og:title"
          content={'Top movies and shows curated just for you'}
        />
        <meta property="og:site_name" content="OTTPlay" />
        <meta
          property="og:url"
          content={process.env.REACT_APP_FRONTEND_URL + 'foryou'}
        />
        <meta
          property="og:description"
          content="OTTplay curates movies and shows you can watch online from across 30+ OTTs in India"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content=" https://images.ottplay.com/images/like-for-you-cover-image-762.jpg"
        />
        <title>For You page</title>
        <meta
          name="description"
          content="This page gives a list of recommended movies and shows based on your preferences made at the time of signing in. 
          You can see the content based on MyProviders, Movies, Shows, and Free content customized according to the OTTs you have subscribed to, your chosen languages, favorite actors/actresses, and genres. You can further sort the available content by Relevance, OTTplay rating, and Release date. 
          The page also gives an option for adding movies to our watchlist and like movies for more similar recommendations. "
        />
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationJSON)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchemaJSON)}
        </script>
      </SEO>
      <div>
        <Grid xs={12}>
          {typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.ONBOARDING_DONE) ? (
            <div className={classes.bodyWrap}>
              <Grid sm={1} lg={2} item></Grid>
              <Grid
                xs={12}
                sm={10}
                lg={8}
                className={classes.containerBox}
                item
              >
                <PagePath
                  path={[
                    { name: 'Home', path: '/home' },
                    { name: 'For You', path: '/foryou' },
                  ]}
                />
                <div className={classes.headerText}>
                  {state.totalData > 0 && (
                    <>
                      <div>{state.totalData}</div>
                      <div style={{ paddingLeft: '5px' }}>
                        titles recommended just for you
                      </div>
                    </>
                  )}
                </div>
                <ListingHeader
                  from={'foryou'}
                  pillButtons={pillButtons}
                  sort={state.sort}
                  setSort={(srt) => setState({ sort: srt })}
                  results={results}
                  handleRefine={() => {}}
                  onSort={() => {}}
                  button={state.button}
                  setButton={(btn) => setState({ button: btn })}
                  onSelect={handleFilters}
                  setRefineState={(val) =>
                    setState({ refineState: val, loadingData: true, page: 1 })
                  }
                  enableRefine={true}
                />
                {/* <FilterButton
            button={state.button}
            setButton={setButton}
            onSelect={handleFilters}
            handleRefine={() => console.log('refine for u')}
          /> */}
                <Grid xs={12} container>
                  <Hidden only={['xs']}>
                    <Grid
                      sm={3}
                      item
                      className={state.loadingData ? classes.filterBlur : ''}
                    >
                      <RefineFilter
                        setRefineState={(val) =>
                          setState({
                            refineState: val,
                            loadingData: true,
                            page: 1,
                          })
                        }
                        from="foryou"
                      />
                    </Grid>
                  </Hidden>
                  <Grid
                    xs={12}
                    sm={9}
                    item
                    style={{ padding: width >= 600 ? '0 0 0 1rem' : '0px' }}
                  >
                    <>
                      {results.length === 0 &&
                      state.paginationLoader === false ? (
                        <>
                          {state.refineState && (
                            <>
                              <div className={classes.errorBlock}>
                                <div className={classes.secondLetter}>
                                  No results to show for the filters applied
                                </div>
                              </div>
                            </>
                          )}
                          {!state.refineState && (
                            <>
                              <div className={classes.errorBlock}>
                                <div className={classes.secondLetter}>
                                  Allow us some time to serve you the best
                                  recommendations
                                </div>
                                <PillButton
                                  text={'Retry'}
                                  className={classes.button}
                                  onClick={() => {
                                    // location.reload();
                                    reloadData();
                                  }}
                                />
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className={classes.loading}>
                          <MoviesList
                            results={results}
                            tag={'for_you'}
                            source={'For You'}
                          />
                        </div>
                      )}
                    </>
                    <>
                      {state.loadingData ? (
                        <Grid xs={12} item>
                          <Spinner
                            styles={{
                              height: state.page === 1 ? '60vh' : '40px',
                              marginTop: '2%',
                            }}
                          />
                        </Grid>
                      ) : (
                        <div />
                      )}
                    </>
                    {/* )} */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid sm={1} lg={2} item></Grid>
            </div>
          ) : state.errorScreen ? (
            <NotFound onBoard={true} />
          ) : (
            <div />
          )}
        </Grid>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '75vh',
    overflowX: 'hidden',
  },
  bodyWrap: {
    width: '100vw',
    display: 'flex',
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
  filterBlur: {
    opacity: 0.5,
    pointerEvents: 'none',
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
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 'clamp(10px, 0.9vw, 14px)',
    margin: '20px 0px 4px 0px',
  },
  [theme.breakpoints.down('xs')]: {
    path: {
      textTransform: 'uppercase',
      marginLeft: 16,
      marginTop: 16,
      marginBottom: 4,
      '& span': {
        fontSize: 8,
      },
    },
    containerBox: {
      padding: '0',
    },
  },
  button: {
    color: '#FFFFFF',
    backgroundColor: '#FF4376',
    whiteSpace: 'nowrap',
    border: '1px solid #FF4376',
    margin: '10px 5px',
    borderRadius: 28,
    fontSize: 'clamp(12px, 1.2vw, 20px)',
    fontWeight: 500,
    textTransform: 'none',
    padding: '4px 20px',
    '&:hover': {
      background: '#FF4376',
    },
    '& svg': {
      width: 20,
      height: 14,
      // '&$a': {
      //   color: 'black',
      // },
    },
  },
  secondLetter: {
    fontSize: 'clamp(14px, 1.6vw, 22px)',
    color: '#FFFFFF',
    fontWeight: 500,
    textAlign: 'center',
    padding: '0px 20px',
  },
  verticalLine: {
    borderLeft: '2px solid #fff',
    height: '20px',
    opacity: 0.1,
    margin: '0px 10px',
  },
  errorBlock: {
    flexDirection: 'column',
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
