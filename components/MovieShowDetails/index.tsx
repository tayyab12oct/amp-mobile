import * as React from 'react';

import {
  AD_CODES,
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
  sortProvidersByUserPreference,
} from '../../utils/constants';
import {
  CastAndCrew,
  CriticsReview,
  CriticsUsersReviewMobile,
  Episodes,
  MovieDescription,
  PhotoThumbnail,
  TopNews,
  TrailerAndVideos,
  UserReview,
  WhereToWatch,
} from './MovieShowDetailsComponent';
import { Grid, Hidden } from '@material-ui/core';
import { PagePath, Spinner } from '..';
import { getWebpUrl, removeHTMLTags } from '../../utils/helper';

import GoogleAdOttPlay from '../GoogleAds';
import SEO from '../Seo';
import { SimilarMovie } from '../SimilarMovie';
import { Theme } from '@material-ui/core/styles';
import { TrailerById } from '../TrailerById';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';

const windowAny: any = window;
export function MovieShowDetails({ location, ...props }) {
  const router = useRouter();
  const classes = useStyles();

  const [results, setResults] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const [similar, setSimilar] = React.useState<any[]>([]);
  const [episodes, setEpisodes] = React.useState<any[]>([]);
  const [selectedView, setSelectedView] = React.useState(1);
  const [filteredEpisodes, setFilteredEpisodes] = React.useState<any[]>([]);
  const [similarName, setSimilarName] = React.useState('');
  const [criticsReview, setCriticsReview] = React.useState<any[]>([]);
  const _ht_clientid = cookie.load('_ht_clientid');
  const {
    webfox,
    actions,
    webstore,
    actionDispatch,
    setLoading,
  } = React.useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  const providersArr: any = getLocalStorageData(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)) ||
      [],
    streamingServices.selectedStreamingServices || []
  );
  const providersNameArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
  );
  const seoId = window.location.pathname.split('/');
  const seoKey =
    seoId[1] === 'movie'
      ? window.location.pathname.slice(7)
      : seoId[1] === 'web-series'
      ? window.location.pathname.slice(12)
      : seoId[1] === 'tv-shows'
      ? window.location.pathname.slice(10)
      : window.location.pathname.slice(6);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const params = {
      id: seoId[3],
    };

    const query = {
      seoUrl: seoKey,
    };

    {
      seoId[1] === 'movie' || seoId[1] === 'Movie'
        ? webfox.getMoviesDetailsList(query).then(({ data, error }) => {
            if (error) {
              actionDispatch(actions.FETCH_MOVIES_DETAILS_LIST_FAILURE, []);
            }
            actionDispatch(
              actions.FETCH_MOVIES_DETAILS_LIST_SUCCESS,
              data || []
            );
            if (data && data.movies) {
              const res = data.movies.filter((item) => {
                return seoKey === item.seo_url;
              });
              if (res.length > 0 && res[0] && res[0]['reviews']) {
                setCriticsReview(
                  res.length > 0 && res[0] && res[0]['reviews']
                    ? res[0]['reviews']
                    : '0'
                );
              }

              setResults(res);
              setLoadingData(false);
              setSimilarName(
                data &&
                  data.movies &&
                  data.movies.length > 0 &&
                  data.movies[0].name
                  ? data.movies[0].name
                  : ''
              );
              firebaseAnalytics.logEvent('movieShowDetails', {
                screen_view:
                  '/movieDetails' +
                  (data && data.movies && data.movies[0] && data.movies[0].name
                    ? '/' + data.movies[0].name
                    : '') +
                  (results[0] &&
                  results[0].primary_language &&
                  results[0].primary_language !== undefined &&
                  results[0].primary_language.name
                    ? '/' + results[0].primary_language.name
                    : '') +
                  (data &&
                  data.movies &&
                  data.movies[0] &&
                  data.movies[0].genres
                    ? '/' + data.movies[0].genres
                    : '') +
                  (data && data.movies && data.movies[0] && data.movies[0]._id
                    ? '/' + data.movies[0]._id
                    : '') +
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
              windowAny.Moengage.track_event('movieShowDetails', {
                screen_view: '/movieDetails',
                name:
                  data && data.movies && data.movies[0] && data.movies[0].name
                    ? data.movies[0].name
                    : '',
                primary_language:
                  results[0] &&
                  results[0].primary_language &&
                  results[0].primary_language !== undefined &&
                  results[0].primary_language.name
                    ? results[0].primary_language.name
                    : '',
                genre:
                  data && data.movies && data.movies[0] && data.movies[0].genres
                    ? '/' + data.movies[0].genres
                    : '',
                id:
                  data && data.movies && data.movies[0] && data.movies[0]._id
                    ? '/' + data.movies[0]._id
                    : '',
                source:
                  location && location.state && location.state.source
                    ? '/' + location.state.source
                    : '',
                userType: getUserType(_ht_clientid ? true : false),
                preferredLanguages: getPreferredLanguages(languagesArr),
                preferredProviders: getPreferredProviders(providersArr),
                user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
              });
            }
          })
        : webfox.getShowDetailsList(query).then(({ data, error }) => {
            if (error) {
              actionDispatch(actions.FETCH_SHOWS_DETAILS_LIST_FAILURE, []);
            }
            actionDispatch(
              actions.FETCH_SHOWS_DETAILS_LIST_SUCCESS,
              data || []
            );
            if (data && data.shows) {
              const res = data.shows.filter((item) => {
                return seoKey === item.seo_url;
              });
              // data.shows.map((show) => {
              //   show.movie_id = show.show_id;
              //   delete show.show_id;
              //   show.similarShows.map((show) => {
              //     show.movie_id = show.show_id;
              //     delete show.show_id;
              //   });
              // });

              setResults(res);
              setLoadingData(false);
              setSimilarName(data && data.shows[0] && data.shows[0].name);
              firebaseAnalytics.logEvent('movieShowDetails', {
                screen_view:
                  '/showDetails' +
                  (data && data.movies && data.movies[0] && data.movies[0].name
                    ? '/' + data.movies[0].name
                    : '') +
                  (data &&
                  data.movies &&
                  data.movies[0] &&
                  data.movies[0].genres
                    ? '/' + data.movies[0].genres
                    : '') +
                  (data && data.movies && data.movies[0] && data.movies[0]._id
                    ? '/' + data.movies[0]._id
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
              windowAny.Moengage.track_event('movieShowDetails', {
                screen_view: '/showDetails',
                name:
                  data && data.movies && data.movies[0] && data.movies[0].name
                    ? data.movies[0].name
                    : '',
                primary_language:
                  results[0] &&
                  results[0].primary_language &&
                  results[0].primary_language !== undefined &&
                  results[0].primary_language.name
                    ? results[0].primary_language.name
                    : '',
                genre:
                  data && data.movies && data.movies[0] && data.movies[0].genres
                    ? '/' + data.movies[0].genres
                    : '',
                id:
                  data && data.movies && data.movies[0] && data.movies[0]._id
                    ? '/' + data.movies[0]._id
                    : '',
                source:
                  location && location.state && location.state.source
                    ? '/' + location.state.source
                    : '',
                userType: getUserType(_ht_clientid ? true : false),
                preferredLanguages: getPreferredLanguages(languagesArr),
                preferredProviders: getPreferredProviders(providersArr),
                user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
              });
            }
          });
    }

    // const query = {
    //   query: data,
    // };

    webfox.episodeList(query).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_EPISODE_LIST_FAILURE, []);
      }
      actionDispatch(actions.FETCH_EPISODE_LIST_SUCCESS, data || []);
      if (data && data.episodes) {
        const newResult = data.episodes.map((v) =>
          Object.assign(v, {
            air_date: v.air_date && new Date(v.air_date).toDateString(),
          })
        );
        setEpisodes(newResult);
        //setSelectedView(data.episodes && data.episodes[0].season_number);
        setFilteredEpisodes(
          data.episodes.filter((data) => data.season_number == selectedView)
        );
      }

      setLoadingData(false);
    });

    const criticsReview = {
      seoUrl: seoKey,
    };

    // webfox.getCriticsReview(criticsReview).then(({ data, error }) => {
    //   if (data && data.critics) {
    //     // setCriticsReview(data.critics);
    //   }
    //   setLoadingData(false);
    // });

    setLoading(false);
  }, [seoId[3], selectedView]);

  React.useEffect(() => {
    const shows = {
      shows: similarName,
    };

    const movies = {
      query: {
        seokey: seoKey,
        responseType: 'full',
        type: seoId[1] === 'movie' ? 'movie' : 'show',
      },
    };

    webfox.getSimilarMovies(movies).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_SIMILAR_MOVIES_FAILURE, []);
      }
      actionDispatch(actions.FETCH_SIMILAR_MOVIES_SUCCESS, data || []);
      if (data && data.result) {
        const resultData = data.result.map((v) =>
          Object.assign(v, { img_url: v.posters && v.posters[0] })
        );
        setSimilar(resultData);
      }
    });
  }, [similarName]);

  const handleDropdown = (e) => {
    setSelectedView(e.target.value);
  };

  const casts: any = [];
  results[0] &&
    results[0].casts.map((item) => {
      casts.push(item);
    });
  results[0] &&
    results[0].crews.map((item) => {
      casts.push(item);
    });
  const uniqueCasts = Array.from(
    new Set(casts.map((a) => a.character_name))
  ).map((character_name) => {
    return casts.find((a) => a.character_name === character_name);
  });

  const data = results[0] && results[0].name;

  const cast: any = [];
  const crew: any = [];
  results[0] &&
    results[0].casts.map((c) => {
      if (c.cast && c.cast.name) {
        cast.push(c.cast);
      }
    });
  results[0] &&
    results[0].crews.map((c) => {
      if (c.crew && c.crew.name) {
        crew.push(c.crew);
      }
    });
  const getDirector = () => {
    const crews: any = [];
    if (results[0] && results[0].crews) {
      results[0].crews.map((c) => {
        if (
          c.role_name &&
          (c.role_name === 'Directing' ||
            c.role_name === 'Director' ||
            c.role_name === 'Writing' ||
            c.role_name === 'Writer')
        ) {
          if (c.crew && c.crew.name) {
            crews.push(c.crew);
          }
        }
      });
    }
    if (crews && crews.length > 0) {
      return crews[0];
    } else {
      return '';
    }
  };
  const getCreator = () => {
    const crews: any = [];
    if (results[0] && results[0].crews) {
      results[0].crews.map((c) => {
        if (
          c.role_name &&
          (c.role_name === 'Creator' ||
            c.role_name === 'Producer' ||
            c.role_name === 'producer')
        ) {
          if (c.crew && c.crew.name) {
            crews.push(c.crew);
          }
        }
      });
    }
    if (crews && crews.length > 0) {
      return crews;
    } else {
      return '';
    }
  };
  const handleAllPhotos = (resObj, type, name, key, data) => {
    router.push({
      pathname: '/photos',
      query: { type, name, key, data, resObj },
    });
  };

  const handleEpisodesAll = (
    resObj,
    key,
    view,
    url,
    name,
    genres,
    providers,
    cert
  ) => {
    router.push({
      pathname: `/all-episodes/${url}`,
      query: { key, view, name, genres, providers, cert, resObj },
    });
  };

  const handleSeeAllTrailers = (type, name, key, data, url) => {
    router.push({
      pathname: `/trailer/${url}`,
      query: { type, name, key, data },
    });
  };

  //code check
  const handleReviewClick = (contentType, url, seoUrl) => {
    if (contentType === 'critics') {
      //code check
      router.push({
        pathname: `/review/${seoUrl}`,
        // pathname: `/${results[0]['name']
        //   .toLowerCase()
        //   .replace(/ /g, '-')}/${type}/review-details`,
        // search: `?seoUrl=${seoUrl}`,
      });
    } else {
      window.open(url, '_blank');
    }
  };

  const handleSimilar = (data, type, name) => {
    if (type === 'movie') {
      firebaseAnalytics.logEvent('seeall', {
        screen_view:
          '/seeall/similar movies' +
          (data && data.name ? '/' + data.name : '') +
          (data && data.languages ? '/' + data.languages.toString() : '') +
          (data && data.genres ? '/' + data.genres.toString() : '') +
          (data && data._id ? '/' + data._id : '') +
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
        screen_view: '/seeall/similar movies',
        name: data && data.name ? data.name : '',
        primary_language:
          data && data.languages ? data.languages.toString() : '',
        genre: data && data.genres ? data.genres.toString() : '',
        id: data && data._id ? data._id : '',
        userType: getUserType(_ht_clientid ? true : false),
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      });
    } else {
      firebaseAnalytics.logEvent('seeall', {
        screen_view:
          '/seeall/similar shows' +
          (data && data.name ? '/' + data.name : '') +
          (data && data.languages ? '/' + data.languages.toString() : '') +
          (data && data.genres ? '/' + data.genres.toString() : '') +
          (data && data._id ? '/' + data._id : '') +
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
        screen_view: '/seeall/similar shows',
        name: data && data.name ? data.name : '',
        primary_language:
          data && data.languages ? data.languages.toString() : '',
        genre: data && data.genres ? data.genres.toString() : '',
        id: data && data._id ? data._id : '',
        userType: getUserType(_ht_clientid ? true : false),
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      });
    }
    router.push({
      pathname: `/similar/${type}/${name}`,
      query: { seoKey, seoId, name },
    });
  };

  const releaseYear = episodes.map((n) => new Date(n.air_date).getFullYear());

  const year = releaseYear.filter(function (value, index, array) {
    return array.indexOf(value) == index;
  });

  const type = results[0] && results[0].content_type;
  const { height } = React.useContext(ViewportContext);

  const handleWhereToWatchClick = () => {
    const params = {
      event:
        props.type === 'movie' ? 'movie_watchnow_cta' : 'show_watchnow_cta',
      details: {
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        // userType: getUserType(_ht_clientid ? true : false),
        // user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        // content_type: props.type,
        // name: results[0] && results[0].name,
        // formatted_id:
        //   results[0].primary_language &&
        //   results[0].primary_language.name + '_' + results[0]._id,
        content_type: props && props.type ? props.type : '',
        name: results[0] && results[0].name ? results[0].name : '',
        formatted_id:
          results[0] &&
          results[0].primary_language &&
          results[0].primary_language !== undefined &&
          results[0].primary_language.name &&
          results[0]._id
            ? results[0].primary_language.name + '_' + results[0]._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params).then(({ data, error }) => {});

    firebaseAnalytics.logEvent(
      props.type === 'movie' ? 'moviewatchnowcta' : 'showwatchnowcta',
      {
        eventCategory:
          props.type === 'movie' ? 'movie_watchnow_cta' : 'show_watchnow_cta',
        eventAction: window.location.pathname,
        eventLabel: results[0].name,
        eventValue: results[0].match_score,
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      }
    );
    windowAny.Moengage.track_event(
      props.type === 'movie' ? 'moviewatchnowcta' : 'showwatchnowcta',
      {
        eventCategory:
          props.type === 'movie' ? 'movie_watchnow_cta' : 'show_watchnow_cta',
        eventAction: window.location.pathname,
        eventLabel: results[0].name,
        eventValue: results[0].match_score,
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      }
    );
  };

  const getImageUrl = (details) => {
    return details.posters && details.posters[0]
      ? getWebpUrl(details.posters[0])
      : details.tmdb_posters
      ? details.tmdb_posters[0]
      : null;
  };

  return (
    <div
      className={classes.root}
      style={{ minHeight: height > 900 ? '82vh' : '82vh' }}
    >
      <Grid xs={12}>
        <Grid xs={12} container item>
          <Grid sm={1} lg={2} item></Grid>
          <Grid xs={12} sm={10} lg={8} item className={classes.pathBox}>
            {/* <p className={classes.path}>
              {type != undefined ? `Discover » ${type} » ${data}` : ''}
            </p> */}
            {type != undefined ? (
              // <PagePath
              //   path={[
              //     'Home',
              //     `${type === 'movie' ? 'Movies' : 'Shows'}`,
              //     `${data}`,
              //   ]}
              // />
              <PagePath
                path={[
                  { name: 'Home', path: '/home' },
                  {
                    name: `${type === 'movie' ? 'Movies' : 'Shows'}`,
                    path: `${type === 'movie' ? '/movies' : '/shows'}`,
                  },
                  {
                    name: `${data}`,
                    path: null,
                  },
                ]}
              />
            ) : // <p className={classes.path}>
            //   <a
            //     className="bread-crumb-link"
            //     onClick={() => history.push('/home')}
            //   >
            //     {'Home'}
            //   </a>{' '}
            //   <span>{'>>'}</span>{' '}
            //   <a
            //     className="bread-crumb-link"
            //     onClick={() => {
            //       type === 'show'
            //         ? history.push('/shows')
            //         : history.push('/movies');
            //     }}
            //   >
            //     {`${type === 'movie' ? 'Movies' : 'Shows'}`}{' '}
            //   </a>{' '}
            //   <span>{'>>'}</span> {`${data}`}
            // </p>
            null}
          </Grid>
          <Grid item sm={1} lg={2}></Grid>
        </Grid>

        {loadingData ? (
          <Spinner styles={{ height: '70vh' }} />
        ) : (
          <>
            {results &&
              results.map((details) => {
                const array =
                  JSON.parse(
                    localStorage.getItem(
                      LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ
                    )
                  ) || [];

                let isSelected;
                if (array != null) {
                  isSelected = array.findIndex((item) => {
                    const value = details._id
                      ? item._id === details._id
                      : item.id === details.id;
                    return value;
                  });
                }
                const likedArray: any = getLocalStorageData(
                  JSON.parse(
                    localStorage.getItem(
                      LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ
                    )
                  ) || [],
                  webstore.likeArr.liked
                );
                let isLiked;
                if (likedArray != null) {
                  isLiked = likedArray.findIndex((item) => {
                    const value = details._id
                      ? item._id === details._id
                      : item.id === details.id;
                    return value;
                  });
                }
                const hiddenArray: any = getLocalStorageData(
                  JSON.parse(
                    localStorage.getItem(
                      LOCALSTORAGE_KEY_CONSTANTS.HIDDEN_DATA_OBJ
                    )
                  ) || [],
                  webstore.hideMovie.hidden
                );
                let isHidden;
                if (hiddenArray != null) {
                  // isHidden = hiddenArray.findIndex((item) =>
                  //   movie._id ? item._id === movie._id : item.id === movie.id
                  // );
                  isHidden = hiddenArray.findIndex((item) => {
                    const value = details._id
                      ? item._id === details._id
                      : item.id === details.id;
                    return value;
                  });
                }
                // const dislikeArray: any = webstore.dislikedMovie.dislike;
                const dislikeArray: any = getLocalStorageData(
                  JSON.parse(
                    localStorage.getItem(
                      LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ
                    )
                  ) || [],
                  webstore.dislikedMovie.dislike
                );
                let isDisliked;
                if (dislikeArray != null) {
                  // isDisliked = dislikeArray.findIndex((item) =>
                  //   movie._id ? item._id === movie._id : item.id === movie.id
                  // );
                  isDisliked = dislikeArray.findIndex((item) => {
                    const value = details._id
                      ? item._id === details._id
                      : item.id === details.id;
                    return value;
                  });
                }

                const seasons = episodes.reduce((unique, o) => {
                  if (
                    !unique.some((obj) => obj.season_number === o.season_number)
                  ) {
                    unique.push(o);
                  }
                  return unique;
                }, []);
                const schema_seasons: any = [];
                seasons.map((item) => {
                  const e: any = [];
                  episodes.map((item2) => {
                    if (item2.season_number === item.season_number) {
                      e.push(item2);
                    }
                  });
                  const alt_e: any = [];
                  e.map((i) => {
                    alt_e.push({
                      '@type': 'TVEpisode',
                      episodeNumber: i.episode_number,
                      name: 'Episode ' + i.episode_number,
                    });
                  });
                  schema_seasons.push({
                    '@type': 'TVSeason',
                    datePublished: item.air_date,
                    name: 'Season ' + item.season_number,
                    numberOfEpisodes: e.length,
                    episode: alt_e,
                  });
                });
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
                      name: props.type === 'movie' ? 'Movies' : 'Shows',
                      url: 'http://www.ottplay.com/movies/',
                    },
                    {
                      '@type': 'SiteNavigationElement',
                      position: 3,
                      name:
                        results[0] && results[0].name ? results[0].name : '',
                      url:
                        'http://www.ottplay.com/movies/' +
                        (results[0] && results[0].seo_url
                          ? results[0].seo_url
                          : ''),
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
                      item: {
                        '@id': 'https://www.ottplay.com/home',
                        name: 'Home',
                      },
                    },
                    {
                      '@type': 'ListItem',
                      position: 2,
                      item: {
                        '@id':
                          'https://www.ottplay.com/' + props.type === 'movie'
                            ? 'movies'
                            : 'shows',
                        name: props.type === 'movie' ? 'Movies' : 'Shows',
                      },
                    },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      item: {
                        '@id':
                          'https://www.ottplay.com/' + props.type === 'movie'
                            ? 'movies'
                            : 'shows' +
                              (results[0] && results[0].seo_url
                                ? results[0].seo_url
                                : ''),
                        name:
                          results[0] && results[0].name
                            ? results[0].name
                            : null,
                      },
                    },
                  ],
                };
                const castsArr: any = [];
                results[0] &&
                  results[0].casts.length &&
                  results[0].casts.map((item) => {
                    castsArr.push({
                      '@type': 'Person',
                      url: '/name/nm' + item.cast.ottplay_id + '/',
                      name: item.cast.name,
                    });
                  });
                const creatorArr: any = [];
                getCreator().length > 0 &&
                  getCreator().map((item) => {
                    if (item && item.crew) {
                      creatorArr.push({
                        '@type': 'Person',
                        url: '/name/nm' + item.crew.ottplay_id + '/',
                        name: item.crew.name,
                      });
                    }
                  });
                let dirObj: any = {};
                if (getDirector() !== '') {
                  dirObj = {
                    '@type': 'Person',
                    url: '/name/nm' + getDirector().ottplay_id + '/',
                    name: getDirector().name,
                  };
                }
                const movieSchemaJSON = {
                  '@context': 'http://schema.org',
                  '@type': 'Movie',
                  url:
                    results[0] && results[0].seo_url ? results[0].seo_url : '',
                  name: results[0] && results[0].name ? results[0].name : '',
                  image:
                    (results[0].tmdb_posters && results[0].tmdb_posters[0]) ||
                    (results[0].posters && results[0].posters[0]) ||
                    'www.ottplay.com',
                  genre:
                    results[0] && results[0].genres.length > 0
                      ? results[0].genres.map((i) => i.name)
                      : null,
                  contentRating:
                    results[0] &&
                    results[0].certifications &&
                    results[0].certifications.certification
                      ? results[0].certifications.certification
                      : null,
                  actor: castsArr.length > 0 ? [...castsArr] : [],
                  director: { ...dirObj },
                  creator: creatorArr.length > 0 ? [...creatorArr] : [],
                  description:
                    results[0].seo && results[0].seo.meta_description
                      ? results[0].seo.meta_description
                      : null,
                  datePublished:
                    results[0] && results[0].onboarding_updated_on
                      ? new Date(results[0].onboarding_updated_on)
                          .toDateString()
                          .slice(4)
                      : null,
                  keywords:
                    results[0].seo &&
                    results[0].seo.meta_keywords &&
                    results[0].seo.meta_keywords?.length > 0
                      ? results[0].seo.meta_keywords.join(',')
                      : null,
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingCount: 1,
                    bestRating:
                      results[0] && results[0].ottplay_rating
                        ? results[0].ottplay_rating
                        : 0.0,
                    worstRating:
                      results[0] && results[0].ottplay_rating
                        ? results[0].ottplay_rating
                        : 0.0,
                    ratingValue:
                      results[0] && results[0].ottplay_rating
                        ? results[0].ottplay_rating
                        : 0.0,
                  },
                  duration:
                    'PT' +
                    Math.floor(results[0].run_time / 60) +
                    'H' +
                    (results[0].run_time % 60) +
                    'M',
                  trailer: {
                    '@type': 'VideoObject',
                    name: 'Official Trailer',
                    embedUrl:
                      results[0] &&
                      results[0].videos_trailers[0] &&
                      results[0].videos_trailers[0].video_url
                        ? results[0].videos_trailers[0].video_url
                        : 'www.ottplay.com',
                    thumbnail: {
                      '@type': 'ImageObject',
                      contentUrl:
                        results[0] &&
                        results[0].videos_trailers[0] &&
                        results[0].videos_trailers[0].video_url
                          ? results[0].videos_trailers[0].video_url
                          : 'www.ottplay.com',
                    },
                    thumbnailUrl:
                      results[0] &&
                      results[0].videos_trailers[0] &&
                      results[0].videos_trailers[0].thumbnail_url
                        ? results[0].videos_trailers[0].thumbnail_url
                        : 'www.ottplay.com',
                    description:
                      results[0] &&
                      results[0].videos_trailers[0] &&
                      results[0].videos_trailers[0].title
                        ? results[0].videos_trailers[0].title
                        : results[0].seo && results[0].seo.meta_description
                        ? results[0].seo.meta_description
                        : results[0] && results[0].name
                        ? results[0].name + ' trailer'
                        : 'OTTPlay',
                    uploadDate:
                      results[0] && results[0].onboarding_updated_on
                        ? new Date(results[0].onboarding_updated_on)
                            .toDateString()
                            .slice(4)
                        : new Date(),
                  },
                };
                const showSchemaJSON = {
                  '@context': 'http://schema.org',
                  '@type': 'tvseries',
                  actor: castsArr.length > 0 ? [...castsArr] : [],
                  author: {
                    '@type': 'Person',
                    url: '/name/nm' + getDirector().ottplay_id + '/',
                    name: getDirector().name,
                  },
                  name: results[0] && results[0].name ? results[0].name : '',
                  containsSeason: schema_seasons,
                };
                return (
                  <>
                    <SEO>
                      <meta
                        property="og:title"
                        content={
                          'Where to watch ' +
                          results[0].seo.meta_title +
                          ' online'
                        }
                      />
                      <meta property="og:site_name" content="OTTPlay" />
                      <meta
                        property="og:url"
                        content="https://www.ottplay.com/"
                      />
                      <meta
                        property="og:description"
                        content={results[0].seo.meta_description}
                      />
                      <meta property="og:type" content="website" />
                      <meta
                        property="og:image"
                        content={getImageUrl(details)}
                      />
                      <title>Movies/Shows page</title>
                      <meta
                        name="description"
                        content="On this page, you will find all the Movies/Shows available for streaming on different platforms. You can further sort the titles by their rating and release dates. 
          Want better recommendations? Simply ‘Like’ a title or add it to your ‘Watchlist’.
          Click on “Watch Now” to start streaming the title on the respective streaming platform."
                      />
                      <meta
                        name="title"
                        content={
                          results[0].seo && results[0].seo.meta_title
                            ? results[0].seo.meta_title
                            : ''
                        }
                      />
                      <meta
                        name="description"
                        content={
                          results[0].seo && results[0].seo.meta_description
                            ? results[0].seo.meta_description
                            : ''
                        }
                      />
                      <meta
                        name="keywords"
                        content={
                          results[0].seo &&
                          results[0].seo.meta_keywords &&
                          results[0].seo.meta_keywords?.length > 0
                            ? results[0].seo.meta_keywords.join()
                            : ''
                        }
                      />
                      <meta
                        itemProp="name"
                        content={
                          results[0] && results[0].name ? results[0].name : ''
                        }
                        data-react-SEO="true"
                      />
                      <meta
                        itemProp="name"
                        content="Home"
                        data-react-SEO="true"
                      />
                      <meta
                        itemProp="description"
                        content={
                          results[0].seo && results[0].seo.meta_description
                            ? results[0].seo.meta_description
                            : ''
                        }
                        data-react-SEO="true"
                      />
                      <meta
                        itemProp="image"
                        content={
                          (results[0].tmdb_posters &&
                            results[0].tmdb_posters[0]) ||
                          (results[0].posters && results[0].posters[0]) ||
                          'www.ottplay.com'
                        }
                        data-react-SEO="true"
                      />
                      <meta
                        itemProp="url"
                        content={
                          'https://www.ottplay.com/' + window.location.pathname
                        }
                        data-react-SEO="true"
                      />
                      <meta
                        itemProp="editor"
                        content="OTTPlay"
                        data-react-SEO="true"
                      />
                      <meta
                        itemProp="headline"
                        content={
                          results[0] && results[0].name ? results[0].name : ''
                        }
                        data-react-SEO="true"
                      />
                      <meta
                        itemProp="inLanguage"
                        content="English"
                        data-react-SEO="true"
                      />
                      <meta
                        itemProp="sourceOrganization"
                        content="Hindhustan Times"
                        data-react-SEO="true"
                      />
                      <meta
                        itemProp="keywords"
                        content={
                          results[0].seo &&
                          results[0].seo.meta_keywords &&
                          results[0].seo.meta_keywords?.length > 0
                            ? results[0].seo.meta_keywords
                            : ''
                        }
                        data-react-SEO="true"
                      />
                      <meta
                        itemProp="datePublished"
                        content={
                          results[0] && results[0].onboarding_updated_on
                            ? new Date(results[0].onboarding_updated_on)
                                .toDateString()
                                .slice(4)
                            : new Date().toDateString().slice(4)
                        }
                        data-react-SEO="true"
                      />
                      <meta
                        itemProp="dateModified"
                        content={
                          results[0] && results[0].onboarding_updated_on
                            ? new Date(results[0].onboarding_updated_on)
                                .toDateString()
                                .slice(4)
                            : new Date().toDateString().slice(4)
                        }
                      />
                      <script type="application/ld+json">
                        {JSON.stringify(siteNavigationJSON)}
                      </script>
                      <script type="application/ld+json">
                        {JSON.stringify(breadcrumbSchemaJSON)}
                      </script>
                      <script type="application/ld+json">
                        {results[0] &&
                        results[0].content_type &&
                        results[0].content_type === 'movie'
                          ? JSON.stringify(movieSchemaJSON)
                          : JSON.stringify(showSchemaJSON)}
                      </script>
                    </SEO>
                    {(results[0] &&
                      results[0].is_crawlable &&
                      results[0].is_crawlable === false) ||
                    (results[0] && results[0].is_crawlable === undefined) ||
                    results[0].is_crawlable === null ? (
                      <SEO>
                        <meta name="robots" content="noindex,nofollow" />
                        <meta name="googlebot" content="noindex,nofollow" />
                        <a
                          href="https://domain.xn--com-9o0a"
                          rel="noindex,nofollow"
                        ></a>
                      </SEO>
                    ) : (
                      <SEO>
                        <a href="" rel=""></a>
                      </SEO>
                    )}
                    <MovieDescription
                      name={details.name}
                      trailer_url={
                        details.videos_trailers.length > 0
                          ? details.videos_trailers[0] &&
                            details.videos_trailers[0].video_url
                          : null
                      }
                      // backdrop={
                      //   details.s3_backdrop.length > 0
                      //     ? details.s3_backdrop[0]
                      //     : null
                      // }
                      sourcePage={
                        details.content_type === 'show'
                          ? 'ShowDetail'
                          : 'MovieDetail'
                      }
                      // backdrop={
                      //   (details.tmdb_posters && details.tmdb_posters[0]) ||
                      //   (details.posters && details.posters[0])
                      // }
                      backdrop={getImageUrl(details)}
                      rating={details.ottplay_rating}
                      criticScore={details.critics_score}
                      match={details.match_score}
                      release_year={details.release_year}
                      runtime={details.run_time}
                      faq={details.faq}
                      providers={
                        details &&
                        details.where_to_watch &&
                        sortProvidersByUserPreference(
                          details.where_to_watch || details.providers,
                          providersNameArr
                        ).length > 0 &&
                        sortProvidersByUserPreference(
                          details.where_to_watch || details.providers,
                          providersNameArr
                        ).map((pro) => pro)
                      }
                      genres={
                        details.genres &&
                        details.genres.slice(0, 2).map((n) => n.name)
                      }
                      seo={details.seo_url}
                      certification={details.certifications}
                      details={details}
                      isSelected={isSelected !== -1}
                      isLiked={isLiked !== -1}
                      isDisliked={isDisliked !== -1}
                      content_type={
                        details.content_type.charAt(0).toUpperCase() +
                        details.content_type.slice(1)
                      }
                      // providers={details.providers.map(
                      //   (provider) => provider.name
                      // )}
                      description={
                        details.full_synopsis
                          ? encodeURIComponent(details.full_synopsis)
                          : // .replace(/(<([^>]+)>)/gi, '')
                            // .replace(/&nbsp;/gi, '')
                            // .replace(/[!&#$%*@;+-=_][0-9][;&#]/gi, '')
                            // .replace(/&#/g, '')
                            null
                      }
                      crew_details={crew.slice(0, 3).join(', ') || null}
                      director_details={getDirector()}
                      cast_details={cast.slice(0, 3) || null}
                      synopTitle={details.name}
                      synopDescription={
                        details.full_synopsis &&
                        encodeURIComponent(details.full_synopsis)
                        // .replace(/(<([^>]+)>)/gi, '')
                        // .replace(/&nbsp;/gi, '')
                        // .replace(/[!&#$%*@;+-=_][0-9][;&#]/gi, '')
                        // .replace(/&#/g, '')
                      }
                      // googleAd={
                      //   <GoogleAdOttPlay adInfo={AD_CODES.mobile['3']} />
                      // }
                    />
                    <Grid xs={12} container item>
                      <Grid sm={1} lg={2} item></Grid>
                      <Grid
                        xs={12}
                        sm={10}
                        lg={8}
                        item
                        className={classes.detailsLowerBox}
                      >
                        {(details.where_to_watch &&
                          details.where_to_watch.length > 0) ||
                        (details.providers && details.providers.length > 0) ? (
                          <WhereToWatch
                            handleWhereToWatchClick={handleWhereToWatchClick}
                            whereToWatch={sortProvidersByUserPreference(
                              details.where_to_watch || details.providers,
                              providersNameArr
                            )}
                            title={'Where to watch ' + details.name + ' ?'}
                            googleAd={
                              <GoogleAdOttPlay adInfo={AD_CODES.item9} />
                            }
                          />
                        ) : null}
                        {episodes.length > 0 ? (
                          <Episodes
                            episodes={
                              filteredEpisodes &&
                              filteredEpisodes.sort(
                                (a, b) => a.episode_number - b.episode_number
                              )
                            }
                            seasons={seasons}
                            handleDropdown={handleDropdown}
                            onClick={() =>
                              handleEpisodesAll(
                                details,
                                seoKey[3],
                                selectedView,
                                details.seo_url,
                                details.name,
                                details && details.genres,
                                details && details.where_to_watch,
                                details && details.certifications
                              )
                            }
                          />
                        ) : null}
                        {casts.length > 0 ? (
                          <CastAndCrew
                            crewDetail={casts}
                            title={details.name + ' Cast and Crew'}
                            sourcePage={
                              details.content_type === 'show'
                                ? 'ShowDetail'
                                : 'MovieDetail'
                            }
                          />
                        ) : null}
                        <Hidden only={['xs']}>
                          <Grid
                            item
                            xs={12}
                            container
                            className={classes.advert}
                          >
                            <GoogleAdOttPlay adInfo={AD_CODES.item10} />
                            {/* <Grid item xs={8}>
                              <ImageComponent src={ads} alt="" style={{ width: '100%' }} />
                            </Grid> */}
                          </Grid>
                        </Hidden>
                        {similar.length > 0 ? (
                          <SimilarMovie
                            screen={'home'}
                            data={
                              details.content_type === 'show'
                                ? 'Shows similar to ' + details.name
                                : 'Movies similar to ' + details.name
                            }
                            results={similar.slice(0, 10)}
                            handleSimilar={() =>
                              handleSimilar(
                                details,
                                details.content_type,
                                details.name
                              )
                            }
                            tag={'similar'}
                            sourcePage={
                              details.content_type === 'show'
                                ? 'ShowDetail'
                                : 'MovieDetail'
                            }
                          />
                        ) : null}
                        {/* ad codes
                        <Hidden only={['xs']}>
                          <Grid
                            xs={12}
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                          >
                            <Grid item md={2}></Grid>
                            <Grid
                              item
                              xs={12}
                              md={10}
                              container
                              className={classes.advert}
                            >
                              <ImageComponent src={ads} alt="" style={{ width: '100%' }} />
                            </Grid>

                            <Grid item xs={4}></Grid>
                          </Grid>
                        </Hidden> */}

                        {details.videos_trailers.length > 1 ? (
                          <TrailerById
                            trailers={details.videos_trailers.slice(0, 6)}
                            seeAllTrailers={() =>
                              handleSeeAllTrailers(
                                details.content_type,
                                details.name,
                                details.id,
                                details.videos_trailers,
                                details.seo_url
                              )
                            }
                          />
                        ) : null}

                        {/* {details.photos && details.photos.length > 0 ? (
                          <PhotoThumbnail
                            photos={details.photos}
                            allPhotos={() =>
                              handleAllPhotos(
                                details,
                                details.content_type,
                                details.name,
                                details.id,
                                details.photos
                              )
                            }
                          />
                        ) : null} */}

                        {/* Hidden */}
                        {/* {results[0]['reviews'] &&
                        results[0]['reviews'].length > 0 ? (
                          <Grid item xs={12} className={classes.reviewBox}>
                            <div className={classes.text}>
                              Reviews and Ratings
                            </div>
                          </Grid>
                        ) : null} */}

                        {/* <Hidden only={['xs']}> */}
                        {results[0]['reviews'] &&
                        results[0]['reviews'].filter(
                          (review) =>
                            review.headline !== '' && review.critic_review
                        ).length > 0 ? (
                          <>
                            <Grid item xs={12} className={classes.reviewBox}>
                              <div className={classes.text}>
                                Reviews and Ratings
                              </div>
                            </Grid>
                            <CriticsReview
                              criticsReviews={results[0]['reviews'].filter(
                                (review) =>
                                  review.headline !== '' && review.critic_review
                              )}
                              handleClick={handleReviewClick}
                            />
                          </>
                        ) : null}
                        {/* <UserReview location={data} /> */}
                        {/* </Hidden> */}
                        {/* <Hidden only={['sm', 'md', 'lg', 'xl']}>
                          {results[0]['reviews'] &&
                          results[0]['reviews'].length > 0 ? (
                            <CriticsUsersReviewMobile />
                          ) : null}
                        </Hidden> */}

                        {/* <TopNews /> */}
                      </Grid>
                      <Grid sm={1} lg={2} item></Grid>
                    </Grid>
                  </>
                );
              })}
          </>
        )}
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '70vh',
  },
  advert: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  pathBox: {
    padding: '0px 0px 10px 10px',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 'clamp(10px, 0.9vw, 14px)',
    margin: '8px 0px 8px 10px',
    textTransform: 'capitalize',
    '& span': {
      fontSize: 10,
      letterSpacing: -1,
      margin: '0px 4px',
    },
  },
  reviewBox: {
    paddingLeft: 10,
  },
  text: {
    margin: '40px 0 25px 0',
    fontSize: 'clamp(16px, 1.6vw, 24px)',
    color: '#ffffff',
    fontWeight: 500,
  },
  [theme.breakpoints.down('xs')]: {
    pathBox: {
      padding: '0px 0px 10px 2px',
    },
    path: {
      fontSize: 10,
      textTransform: 'uppercase',
      marginLeft: 16,
      marginTop: 16,
      '& span': {
        fontSize: 8,
      },
    },
    detailsLowerBox: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    text: {
      margin: 0,
    },
    reviewBox: {
      paddingLeft: 0,
    },
  },
}));
