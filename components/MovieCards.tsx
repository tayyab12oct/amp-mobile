import { Box, Button, Hidden, makeStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
  pushDataLocalStorage,
  sortProvidersByUserPreference,
} from '../utils/constants';
import React, { useContext, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import { IMAGES } from '../public/static/newImages';
import ImageComponent from './Images';
import Modal from 'react-modal';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ViewportContext } from './ViewportProvider';
import WatchNowModal from './WatchNowModal';
import { WebfoxContext } from '../services/webfox';
//mobile
import { contextParamsForREAnalytics } from '../utils/constants';
import cookie from 'react-cookies';
import { firebaseAnalytics } from './firebaseConfig';

// const addToWatchListButton = { tick, plus };
const windowAny: any = typeof window !== 'undefined' && window;
const moreProvider = (provider) => {
  if (provider && provider.length > 2) {
    return ' . +' + (provider.length - 2).toString();
  }
  return '';
};

export function OnHoverCard({
  id,
  isSelected,
  isLiked,
  isDisliked,
  isHidden,
  details,
  ...props
}) {
  const classes = useStyles();
  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );
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
  const { width } = React.useContext(ViewportContext);
  // const tickButton = { addIcon, addedIcon };
  // const likeButton = { likeIcon, likedIcon };
  // const disLikeButton = { dislikeIcon, dislikedIcon };
  // const trailerButton = { trailerIcon, watchIcon };
  // const hideButton = { hideIcon, unhideIcon };
  // const deleteButton = { disableShare, enableShare };
  const [likePopup, setLikePopup] = React.useState(false);
  const [dislikePopup, setDislikePopup] = React.useState(false);
  const [cardSection, setCardSection] = React.useState(true);
  const [likedList, setLikedList] = React.useState({});
  const [tickImage, setTickImage] = React.useState(false);
  const [likeImage, setLikeImage] = React.useState(false);
  const [disLikeImage, setDisLikeImage] = React.useState(false);
  const [trailerImage, setTrailerImage] = React.useState(false);
  const [hideImage] = React.useState(false);
  const [shareImage, setShareImage] = React.useState(false);
  const [modalOpen, setmodalOpen] = React.useState(false);

  const [hoverAdd, setHoverAdd] = React.useState(false);
  const [hoverLike, setHoverLike] = React.useState(false);
  const [hoverDislike, setHoverDislike] = React.useState(false);
  const [hoverTrailer, setHoverTrailer] = React.useState(false);
  const [hoverHide, setHoverHide] = React.useState(false);
  const [hoverShare, setHoverShare] = React.useState(false);
  const _ht_clientid = cookie.load('_ht_clientid');
  const handleLikePopup = () => {
    const timer = setTimeout(() => {
      setLikeImage(false);
      setLikePopup(false);
      setCardSection(true);
      props.setLikePopup(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  };

  //console.log('movie card test', props);

  const handleDislikePopup = () => {
    const timer = setTimeout(() => {
      setDisLikeImage(false);
      setDislikePopup(false);
      setCardSection(true);
      props.setDisLikePopup(false);
      getCategory();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  };

  const handleWatchNow = (event) => {
    event.stopPropagation();
    const currentPath = location.pathname;
    const params = {
      event:
        props.type === 'movie' ? 'movie_watchnow_cta' : 'show_watchnow_cta',
      details: {
        page_name: currentPath,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        // userType: getUserType(_ht_clientid ? true : false),
        // user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        content_type: props && props.type ? props.type : '',
        name: details && details.name ? details.name : '',
        formatted_id:
          details &&
          details.primary_language &&
          details.primary_language !== undefined &&
          details.primary_language.name &&
          details._id
            ? details.primary_language.name + '_' + details._id
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
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
    windowAny.Moengage &&
      windowAny.Moengage?.track_event(
        props.type === 'movie' ? 'moviewatchnowcta' : 'showwatchnowcta',
        {
          eventCategory:
            props.type === 'movie' ? 'movie_watchnow_cta' : 'show_watchnow_cta',
          eventAction: window.location.pathname,
          eventLabel:
            details.name +
            (details.primary_language &&
            details.primary_language.name != undefined
              ? `/${details.primary_language?.name}`
              : '') +
            (details._id ? '/' + details._id : '/' + details.id),
          eventValue: details.ottplay_rating,
        }
      );
    const par = {
      eventCategory:
        props.type === 'movie' ? 'movie_watchnow_cta' : 'show_watchnow_cta',
      eventAction: window.location.pathname,
      eventLabel: details.name,
      eventValue: details.match_score,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    };
    firebaseAnalytics.logEvent('watchnowdialog', {
      screen_view:
        '/watchnowdialog' +
        (props && props.sourcePage ? '/' + props.sourcePage : '') +
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
    windowAny.Moengage?.track_event('watchnowdialog', {
      screen_view: '/watchnowdialog',
      source: props && props.sourcePage ? props.sourcePage : '',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
    if (details.where_to_watch && details.where_to_watch.length == 1) {
      handleSingleProvider(details.where_to_watch[0]);
    } else {
      setmodalOpen(true);
    }
  };

  const handleREAnalytics = () => {
    const currentPath = location.pathname;
    const params = {
      event: props.type === 'movie' ? 'movie_watchnow' : 'show_watchnow',
      details: {
        page_name: currentPath,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        // userType: getUserType(_ht_clientid ? true : false),
        // user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        content_type: props && props.type ? props.type : '',
        name: details && details.name ? details.name : '',
        formatted_id:
          details &&
          details.primary_language &&
          details.primary_language !== undefined &&
          details.primary_language.name &&
          details._id
            ? details.primary_language.name + '_' + details._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params).then(({ data, error }) => {});
    firebaseAnalytics.logEvent(
      props.type === 'movie' ? 'moviewatchnow' : 'showwatchnow',
      {
        eventCategory:
          props.type === 'movie' ? 'movie_watchnow' : 'show_watchnow',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
    windowAny.Moengage?.track_event(
      props.type === 'movie' ? 'moviewatchnow' : 'showwatchnow',
      {
        eventCategory:
          props.type === 'movie' ? 'movie_watchnow' : 'show_watchnow',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
  };

  const handleCloseModal = () => {
    setmodalOpen(false);
  };

  const handleAddToWatchlist = (details) => {
    actionDispatch(actions.FETCH_ARRAY_OF_WATCHLIST, details);

    if (tickImage === true) {
      firebaseAnalytics.logEvent('removefromwatchlist', {
        eventCategory:
          props.type === 'movie'
            ? 'movie_removefromwatchlist'
            : 'show_removefromwatchlist',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      });
      windowAny.Moengage?.track_event('removefromwatchlist', {
        eventCategory:
          props.type === 'movie'
            ? 'movie_removefromwatchlist'
            : 'show_removefromwatchlist',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      });
    } else {
      firebaseAnalytics.logEvent('addToWatchList', {
        eventCategory:
          props.type === 'movie'
            ? 'movie_addtowatchlist'
            : 'show_addtowatchlist',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      });
      windowAny.Moengage?.track_event('addToWatchList', {
        eventCategory:
          props.type === 'movie'
            ? 'movie_addtowatchlist'
            : 'show_addtowatchlist',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      });
    }

    const params = {
      event:
        props.type === 'movie' ? 'movie_addtowatchlist' : 'show_addtowatchlist',
      details: {
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        // userType: getUserType(_ht_clientid ? true : false),
        // user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        content_type: props && props.type ? props.type : '',
        name: details && details.name ? details.name : '',
        formatted_id:
          details &&
          details.primary_language &&
          details.primary_language !== undefined &&
          details.primary_language.name &&
          details._id
            ? details.primary_language.name + '_' + details._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params).then(({ data, error }) => {});
    // pushDataLocalStorage(
    //   LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ,
    //   details,
    //   'OBJ'
    // );
    setTickImage(!tickImage);
  };
  const handleLike = (details) => {
    actionDispatch(actions.ADDED_TO_LIKED, details);
    setLikeImage(!likeImage);
    if (isLiked === false) {
      setLikePopup(true);
      props.setLikePopup(true);
      props.setHover(false);
      setCardSection(false);
      handleLikePopup();
    }

    firebaseAnalytics.logEvent(
      props.type === 'movie' ? 'movieLike' : 'showLike',
      {
        eventCategory: props.type === 'movie' ? 'movie_like' : 'show_like',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
    windowAny.Moengage?.track_event(
      props.type === 'movie' ? 'movieLike' : 'showLike',
      {
        eventCategory: props.type === 'movie' ? 'movie_like' : 'show_like',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
    const params1 = {
      event: props.type === 'movie' ? 'movie_like' : 'show_like',
      details: {
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        // userType: getUserType(_ht_clientid ? true : false),
        // user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        content_type: props && props.type ? props.type : '',
        name: details && details.name ? details.name : '',
        formatted_id:
          details &&
          details.primary_language &&
          details.primary_language !== undefined &&
          details.primary_language.name &&
          details._id
            ? details.primary_language.name + '_' + details._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };

    webfox.postREAnalytics(params1).then(({ data, error }) => {});
    pushDataLocalStorage(
      LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS,
      details._id,
      'ID'
    );
    // pushDataLocalStorage(
    //   LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ,
    //   details,
    //   'OBJ'
    // );
  };

  const handleHide = (details) => {
    actionDispatch(actions.ADDED_TO_HIDDEN, details);
    getCategory();
    firebaseAnalytics.logEvent(
      props.type === 'movie' ? 'movieHide' : 'showHide',
      {
        eventCategory: props.type === 'movie' ? 'movie_hide' : 'show_hide',
        eventAction: window.location.pathname,
        eventLabel: details.name,
        eventValue: details.match_score,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      }
    );
    windowAny.Moengage?.track_event(
      props.type === 'movie' ? 'movieHide' : 'showHide',
      {
        eventCategory: props.type === 'movie' ? 'movie_hide' : 'show_hide',
        eventAction: window.location.pathname,
        eventLabel: details.name,
        eventValue: details.match_score,
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      }
    );
    pushDataLocalStorage(
      LOCALSTORAGE_KEY_CONSTANTS.HIDDEN_DATA_OBJ,
      details,
      'OBJ'
    );
  };

  const handleDislike = (details) => {
    setDisLikeImage(!disLikeImage);
    actionDispatch(actions.ADDED_TO_DISLIKE, details);
    props.setDisLikePopup(true);
    props.setHover(false);
    setDislikePopup(true);
    setCardSection(false);
    handleDislikePopup();
    const params1 = {
      event: props.type === 'movie' ? 'movie_dislike' : 'show_dislike',
      details: {
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        // userType: getUserType(_ht_clientid ? true : false),
        // user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        content_type: props && props.type ? props.type : '',
        name: details && details.name ? details.name : '',
        formatted_id:
          details &&
          details.primary_language &&
          details.primary_language !== undefined &&
          details.primary_language.name &&
          details._id
            ? details.primary_language.name + '_' + details._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params1).then(({ data, error }) => {});
    firebaseAnalytics.logEvent(
      props.type === 'movie' ? 'movieDislike' : 'showDislike',
      {
        eventCategory:
          props.type === 'movie' ? 'movie_dislike' : 'show_dislike',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );

    windowAny.Moengage?.track_event(
      props.type === 'movie' ? 'movieUnlike' : 'showUnlike',
      {
        eventCategory: props.type === 'movie' ? 'movie_unlike' : 'show_unlike',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
    pushDataLocalStorage(
      LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_IDS,
      details._id,
      'ID'
    );
    pushDataLocalStorage(
      LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ,
      details,
      'OBJ'
    );
  };
  const getCategory = () => {
    let filteredData;
    let index = 0;
    const details_id = details._id ? details._id : details.id;
    switch (props.tag) {
      case 'movies':
        filteredData = webstore.moviesList.data;
        index = filteredData.findIndex((item) => {
          return item._id ? item._id === details_id : item.id === details_id;
        });
        if (index !== -1) {
          filteredData.splice(index, 1);
        }
        actionDispatch(
          actions.FETCH_MOVIES_SUCCESS,
          { movies: filteredData } || []
        );
        break;
      case 'shows':
        filteredData = webstore.showList.data;
        index = filteredData.findIndex((item) => {
          return item._id ? item._id === details_id : item.id === details_id;
        });
        if (index !== -1) {
          filteredData.splice(index, 1);
        }
        actionDispatch(
          actions.FETCH_SHOWS_SUCCESS,
          { shows: filteredData } || []
        );
        break;

      case 'for_you':
        filteredData = webstore.recommendedMovies.data;
        index = filteredData.findIndex((item) => {
          return item._id ? item._id === details_id : item.id === details_id;
        });
        if (index !== -1) {
          filteredData.splice(index, 1);
        }
        actionDispatch(
          actions.FETCH_RECOMMENDED_MOVIES_SUCCESS,
          filteredData || []
        );
        break;

      case 'watchlist':
        actionDispatch(actions.HIDE_ARRAY_OF_WATCHLIST, details || []);
        break;

      case 'similar':
        props.delete();
        break;

      case 'liked':
        actionDispatch(actions.HIDE_ADDED_TO_LIKED, details || []);
        break;

      case 'hidden':
        actionDispatch(actions.UNHIDE_MOVIE, details || []);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <div className={classes.cardWrap}>
        <div className={classes.cardMainContent}>
          <Card
            className={[classes.hoverSection, classes.center].join(' ')}
            onClick={props.onCardClick}
          >
            <CardActionArea
              className={classes.cardActionArea}
              disableRipple
              style={{
                height: '100%',
              }}
            >
              <div className={classes.hoverRoot}>
                <Grid
                  container
                  // spacing={2}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.hoverRootBox}
                  xs={12}
                >
                  <Grid item xs={4} className={classes.circularWrapper}>
                    <ImageComponent
                      className={classes.circularButton}
                      onMouseOver={() => setHoverAdd(true)}
                      onMouseLeave={() => setHoverAdd(false)}
                      src={
                        isSelected
                          ? 'https://images.ottplay.com/static/hoveradd.svg'
                          : hoverAdd
                          ? 'https://images.ottplay.com/static/hoverWatchlist.svg'
                          : 'https://images.ottplay.com/static/addd.svg'
                      }
                      alt="Watchlist_plus_icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWatchlist(details);
                      }}
                    />
                    <span className={classes.buttonText}>Watchlist</span>
                  </Grid>
                  <Grid item xs={4} className={classes.circularWrapper}>
                    <ImageComponent
                      className={classes.circularButton}
                      onMouseOver={() => setHoverLike(true)}
                      onMouseLeave={() => setHoverLike(false)}
                      src={
                        isLiked
                          ? 'https://images.ottplay.com/static/hoverlike.svg'
                          : hoverLike
                          ? 'https://images.ottplay.com/static/hoverHeart.svg'
                          : 'https://images.ottplay.com/static/likebutton.svg'
                      }
                      alt="Like_heart_icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(details);
                      }}
                    />
                    <span className={classes.buttonText}>Like</span>
                  </Grid>
                  {props.screen === 'home' ||
                  props.screen === 'movie' ||
                  props.screen === 'show' ? null : (
                    <Grid item xs={4} className={classes.circularWrapper}>
                      <ImageComponent
                        className={classes.circularButton}
                        onMouseOver={() => setHoverDislike(true)}
                        onMouseLeave={() => setHoverDislike(false)}
                        src={
                          disLikeImage || isDisliked
                            ? 'https://images.ottplay.com/static/hoverdislike.svg'
                            : hoverDislike
                            ? 'https://images.ottplay.com/static/hoverNotLike.svg'
                            : 'https://images.ottplay.com/static/dislikebutton.svg'
                        }
                        alt="Dislike_cross_icon"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDislike(details);
                        }}
                      />
                      <span className={classes.buttonText}>Dislike</span>
                    </Grid>
                  )}
                  {/* hidden */}
                  {/* <Grid item xs={4} className={classes.circularWrapper}>
                <ImageComponent
                  className={classes.circularButton}
                  onMouseOver={() => setHoverTrailer(true)}
                  onMouseLeave={() => setHoverTrailer(false)}
                  src={
                    trailerImage
                      ? trailerButton.watchIcon
                      : hoverTrailer
                      ? trailerHover
                      : trailerButton.trailerIcon
                  }
                  alt=""
                  onClick={() => setTrailerImage(!trailerImage)}
                />
                <span className={classes.buttonText}>Trailer</span>
              </Grid> */}
                  {props.screen === 'home' ||
                  props.screen === 'movie' ||
                  props.screen === 'show' ? null : (
                    <Grid item xs={4} className={classes.circularWrapper}>
                      <ImageComponent
                        onMouseOver={() => setHoverHide(true)}
                        onMouseLeave={() => setHoverHide(false)}
                        className={classes.circularButton}
                        src={
                          isHidden
                            ? 'https://images.ottplay.com/static/hoverunhide.svg'
                            : hoverHide
                            ? 'https://images.ottplay.com/static/hideHover.svg'
                            : 'https://images.ottplay.com/static/unhidebutton.svg'
                        }
                        alt="Hide_icon"
                        //onClick={() => setHideImage(!hideImage)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHide(details);
                        }}
                      />
                      <span className={classes.buttonText}>Hide</span>
                    </Grid>
                  )}
                  {/* hidden */}
                  {/* <Grid item xs={4} className={classes.circularWrapper}>
                <ImageComponent
                  className={classes.circularButton}
                  onMouseOver={() => setHoverShare(true)}
                  onMouseLeave={() => setHoverShare(false)}
                  src={
                    shareImage
                      ? deleteButton.enableShare
                      : hoverShare
                      ? HoverShare
                      : deleteButton.disableShare
                  }
                  alt=""
                  onClick={() => setShareImage(!shareImage)}
                />
                <span className={classes.buttonText}>Share</span>
              </Grid> */}
                  <Grid
                    xs={12}
                    item
                    className={classes.playButtonBox}
                    style={{
                      padding: '8px 0px 8px 0px',
                      margin: '15px 5px 10px',
                    }}
                  >
                    <Button
                      onClick={handleWatchNow}
                      className={
                        details &&
                        details.where_to_watch &&
                        details.where_to_watch.length > 0
                          ? classes.playButton
                          : [classes.playButton, classes.disableButton].join(
                              ' '
                            )
                      }
                    >
                      <ImageComponent
                        src="/static/mobile_images/play_icon_mobile.svg"
                        alt="video play icon"
                      />
                      Watch Now
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </CardActionArea>
          </Card>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.8)',
          },
          content: {
            position: 'fixed',
            border: '1px solid #2A1D3F',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            borderRadius: width > 600 ? 4 : 0,
            outline: 'none',
            padding: '0px',
            zIndex: '999',
            margin: 'auto',
            width: '604px',
            height: '600px',
            display: 'table',
          },
        }}
        onAfterOpen={() => {
          document.body.style.overflow = 'hidden';
        }}
        onAfterClose={() => {
          document.body.style.overflow = 'auto';
        }}
      >
        <WatchNowModal
          handleClose={handleCloseModal}
          handleWatchNow={handleREAnalytics}
          whereToWatch={sortProvidersByUserPreference(
            details.where_to_watch || details.providers,
            providersNameArr
          )}
        />
      </Modal>
    </React.Fragment>
  );
}

function LikePopup({ details, ...props }) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);

  const handleClosePopup = (e) => {
    e.stopPropagation();
    props.setLikePopup(false);
  };

  return (
    <React.Fragment>
      <div className={classes.cardWrap}>
        <div className={classes.cardMainContent}>
          <Card className={[classes.hoverSection, classes.center].join(' ')}>
            <CardActionArea className={classes.cardActionArea} disableRipple>
              <div className={classes.hoverRoot}>
                <Grid
                  container
                  // spacing={2}
                  direction="column"
                  justify="flex-end"
                  alignItems="flex-end"
                  xs={12}
                >
                  <ImageComponent
                    src="https://images.ottplay.com/static/dislikeCross.svg"
                    alt="dislikeCrossIcon"
                    onClick={(e) => handleClosePopup(e)}
                  />
                  <Grid
                    item
                    className={classes.dislikeTitle}
                    style={{ padding: '0px 12px' }}
                  >
                    <span className={classes.dislikedHeading}>
                      {`You Liked ${details.name}`}
                    </span>
                    <span className={classes.dislikeContent}>
                      Like the movies & shows you've seen so we can get to know
                      your taste better.
                    </span>
                  </Grid>
                </Grid>
              </div>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

function DisLikePopup({ details, ...props }) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);

  const handleClosePopup = (e) => {
    e.stopPropagation();
    props.setDisLikePopup(false);
  };

  return (
    <React.Fragment>
      <div className={classes.cardWrap}>
        <div className={classes.cardMainContent}>
          <Card className={[classes.hoverSection, classes.center].join(' ')}>
            <CardActionArea className={classes.cardActionArea} disableRipple>
              <div className={classes.hoverRoot}>
                <Grid
                  container
                  // spacing={2}
                  direction="column"
                  justify="flex-end"
                  alignItems="flex-end"
                  xs={12}
                >
                  <ImageComponent
                    src="https://images.ottplay.com/static/dislikeCross.svg"
                    alt="dislikeCrossIcon"
                    onClick={(e) => handleClosePopup(e)}
                  />
                  <Grid
                    item
                    className={classes.dislikeTitle}
                    style={{ padding: '0px 12px' }}
                  >
                    <span className={classes.dislikedHeading}>
                      Didn’t Like It?
                    </span>
                    <span className={classes.dislikeContent}>
                      We’ll try not to recommend movies & shows like this in the
                      future. If you haven’t seen it and didn’t like it, swipe
                      left to remove instead.
                    </span>
                  </Grid>
                </Grid>
              </div>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export function MovieCards({ details, ...props }) {
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  const [likePopup, setLikePopup] = React.useState(false);
  const [disLikePopup, setDisLikePopup] = React.useState(false);
  const { width } = React.useContext(ViewportContext);
  const [loaded, setLoaded] = React.useState(false);
  const [hoveredMovie, setHoveredMovie] = React.useState(null);

  useEffect(() => {
    const card = document.getElementById('movieCard');
    if (card) {
      card.addEventListener(
        'mouseenter',
        function () {
          setHover(true);
        },
        false
      );

      card.addEventListener(
        'mouseleave',
        function () {
          setHover(false);
        },
        false
      );
    }
  }, []);

  return (
    <React.Fragment>
      <Card className={classes.root} onMouseLeave={() => setHover(false)}>
        <CardActionArea className={classes.cardActionArea} disableRipple>
          {/*</Card>{props.isDisliked ? (
            props.disliked ) :*/}

          {props && props.awards != undefined ? (
            <>
              {/* <span className={classes.awardTag}>
                <ImageComponent src={awards} className={classes.imdbImage} alt="" />
              </span>
              <CardMedia
                className={classes.mediaCard}
                component="img"
                alt="card Image"
                image={props.image || card}
                title="card Image"
              /> */}
            </>
          ) : // hover === true ? (
          //   props.children(setLikePopup, setDisLikePopup, setHover)
          // ) :
          likePopup === true ? (
            <>
              <LikePopup details={details} setLikePopup={setLikePopup} />
            </>
          ) : disLikePopup === true ? (
            <>
              <DisLikePopup
                details={details}
                setDisLikePopup={setDisLikePopup}
              />
            </>
          ) : (
            <div className={classes.imdbTagBox}>
              {details && details.ottplay_rating ? (
                <span className={classes.imdbTag}>
                  <b>{props.rating.toFixed(1) || 0}</b>
                  <ImageComponent
                    src="https://images.ottplay.com/static/reel_logo.png"
                    className={classes.imdbImage}
                    alt=""
                  />
                  <b className={classes.imdbText}>OTTplay Rating</b>
                </span>
              ) : null}
              <div className={classes.cardWrap}>
                <div
                  className={classes.hoverCardUnique}
                  style={{ position: 'absolute' }}
                >
                  {props.children(setLikePopup, setDisLikePopup, setHover)}
                </div>
                <div className={classes.cardMainContent}>
                  <CardMedia
                    //new listing movie & show
                    onMouseOver={() => {
                      width > 600 ? setHover(true) : setHover(false);
                    }}
                    onMouseLeave={() => setHover(false)}
                    className={[
                      classes.center,
                      loaded ? classes.mediaCard : classes.mediaCardLoader,
                    ].join(' ')}
                    component="img"
                    alt={props.title}
                    image={
                      loaded
                        ? props.image ||
                          'https://images.ottplay.com/static/poster_default.png'
                        : 'https://images.ottplay.com/static/poster_default.png'
                    }
                    title={props.title}
                    onLoad={() => setLoaded(true)}
                  />
                </div>
              </div>

              {/* <ImageComponent
                onMouseOver={() => setHover(true)}
                src={props.image || card}
                className={classes.mediaCard}
                style={{ maxHeight: width > 1300 ? '240px' : '210px', height: width > 1300 ? '240px' : '210px' }}
                alt="Card Image"
              /> */}
              <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <ImageComponent
                  className={classes.addToWatchListButton}
                  src={
                    props.isSelected
                      ? 'https://images.ottplay.com/static/Group 7583.svg'
                      : 'https://images.ottplay.com/static/Group 13518.svg'
                  }
                  alt="WatchList_Icon"
                  // onClick={() => handleAddToWatchlist(props.details)}
                />
                <div className={classes.bgMask} />
              </Hidden>
            </div>
          )}
        </CardActionArea>
        <CardContent className={classes.content}>
          {/* <div className={width < 600 ? classes.dotWarp : ''}>
            <Typography gutterBottom component="p" className={classes.match}>
              {props.match && props.match > 0 ? `${props.match}% Match` : ' '}
            </Typography>
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
              <ImageComponent src={dotsIcon} alt="dotsIcon" />
            </Hidden>
          </div> */}
          {/* {details && details.match_score ? (
              <Typography gutterBottom component="p" className={classes.match}>
                {props.match}% Match
              </Typography>
            ) : null} */}
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.title}
            style={{
              lineHeight: width > 1300 ? '22px' : '18px',
              marginLeft:
                width < 600
                  ? props.screen == 'home' || props.screen == 'see_all'
                    ? 0
                    : 12
                  : 0,
            }}
            onClick={props.onCardClick}
          >
            {props.title}
          </Typography>
        </CardContent>
        <CardActions
          className={classes.platforms}
          style={{ marginTop: width > 1300 ? '8px' : '2px' }}
        >
          <span className={classes.movie}>
            {props && (props.type === 'web_series' || props.type === 'tv_shows')
              ? 'Show'
              : props && props.type === 'short_film'
              ? 'Movie'
              : props.type}
            {props.provider && props.provider.length > 0 && (
              <span className={classes.platformsDesc}>
                {props.type && <span> . </span>}
                <span>
                  {props.provider.slice(0, 2).join(' . ') +
                    moreProvider(props.provider)}{' '}
                </span>
              </span>
            )}
          </span>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export const handleSingleProvider = (card) => {
  window.open(card.movie_url ? card.movie_url : card.show_url);
};

export function MobileMovieCards({
  id,
  isSelected,
  isLiked,
  isDisliked,
  isHidden,
  details,
  ...props
}) {
  console.log('props.screen MobileMovieCards', props.screen);
  const classes = useStyles();
  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );
  const { width } = React.useContext(ViewportContext);
  const [tickImage, setTickImage] = React.useState(false);
  const [likeImage, setLikeImage] = React.useState(false);
  const [disLikeImage, setDisLikeImage] = React.useState(false);
  const [trailerImage, setTrailerImage] = React.useState(false);
  const [shareImage, setShareImage] = React.useState(false);
  const [modalOpen, setmodalOpen] = React.useState(false);
  const [dropdown, setDropdown] = React.useState(false);
  const _ht_clientid = cookie.load('_ht_clientid');
  const [likePopup, setLikePopup] = React.useState(false);
  const [dislikePopup, setDislikePopup] = React.useState(false);
  const [cardSection, setCardSection] = React.useState(true);
  const [loaded, setLoaded] = React.useState(false);
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
  const handleWatchNow = () => {
    const params = {
      event:
        props && props.type && props.type === 'movie'
          ? 'movie_watchnow_cta'
          : 'show_watchnow_cta',
      details: {
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: props && props.type ? props.type : '',
        name: details && details.name ? details.name : '',
        formatted_id:
          details &&
          details.primary_language &&
          details.primary_language !== undefined &&
          details.primary_language.name &&
          details._id
            ? details.primary_language.name + '_' + details._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params).then(({ data, error }) => {});
    firebaseAnalytics.logEvent('watchnowdialog', {
      screen_view:
        '/watchnowdialog' +
        (props && props.sourcePage ? '/' + props.sourcePage : '') +
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
    windowAny.Moengage?.track_event('watchnowdialog', {
      screen_view: '/watchnowdialog',
      source: props && props.sourcePage ? props.sourcePage : '',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
    if (details.where_to_watch && details.where_to_watch.length == 1) {
      handleSingleProvider(details.where_to_watch[0]);
    } else {
      setmodalOpen(true);
    }
  };
  const handleREAnalytics = () => {
    const params = {
      event: props.type === 'movie' ? 'movie_watchnow' : 'show_watchnow',
      details: {
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: props && props.type ? props.type : '',
        name: details && details.name ? details.name : '',
        formatted_id:
          details &&
          details.primary_language &&
          details.primary_language !== undefined &&
          details.primary_language.name &&
          details._id
            ? details.primary_language.name + '_' + details._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params).then(({ data, error }) => {});
  };

  const handleCloseModal = () => {
    setmodalOpen(false);
  };

  const handleLikePopup = () => {
    const timer = setTimeout(() => {
      setLikeImage(false);
      setLikePopup(false);
      setCardSection(true);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  };

  const handleDislikePopup = () => {
    const timer = setTimeout(() => {
      setDisLikeImage(false);
      setDislikePopup(false);
      setCardSection(true);
      getCategory();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  };

  const handleAddToWatchlist = (details) => {
    actionDispatch(actions.FETCH_ARRAY_OF_WATCHLIST, details);

    // firebaseAnalytics.logEvent('addToWatchList', {
    //   eventCategory:
    //     props.type === 'movie' ? 'movie_addtowatchlist' : 'show_addtowatchlist',
    //   eventAction: window.location.pathname,
    //   eventLabel: details.name,
    //   eventValue: details.match_score,
    //   userType: getUserType(_ht_clientid ? true : false),
    //   user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    //   preferredLanguages: getPreferredLanguages(languagesArr),
    //   preferredProviders: getPreferredProviders(providersArr),
    // });
    if (tickImage === true) {
      firebaseAnalytics.logEvent('removefromwatchlist', {
        eventCategory:
          props.type === 'movie'
            ? 'movie_removefromwatchlist'
            : 'show_removefromwatchlist',
        eventAction: window.location.pathname,
        eventLabel: details.name,
        eventValue: details.match_score,
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      });
      windowAny.Moengage?.track_event('removefromwatchlist', {
        eventCategory:
          props.type === 'movie'
            ? 'movie_removefromwatchlist'
            : 'show_removefromwatchlist',
        eventAction: window.location.pathname,
        eventLabel: details.name,
        eventValue: details.match_score,
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      });
    } else {
      firebaseAnalytics.logEvent('addToWatchList', {
        eventCategory:
          props.type === 'movie'
            ? 'movie_addtowatchlist'
            : 'show_addtowatchlist',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      });
      windowAny.Moengage?.track_event('addToWatchList', {
        eventCategory:
          props.type === 'movie'
            ? 'movie_addtowatchlist'
            : 'show_addtowatchlist',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      });
    }
    const params = {
      event:
        props.type === 'movie' ? 'movie_addtowatchlist' : 'show_addtowatchlist',
      details: {
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: props && props.type ? props.type : '',
        name: details && details.name ? details.name : '',
        formatted_id:
          details &&
          details.primary_language &&
          details.primary_language !== undefined &&
          details.primary_language.name &&
          details._id
            ? details.primary_language.name + '_' + details._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params).then(({ data, error }) => {});
    setTickImage(!tickImage);
    //localStorage.setItem('watchlist added', JSON.stringify(actionDispatch(actions.FETCH_ARRAY_OF_WATCHLIST, details)));
  };

  // const params = {
  //   movieId: details.movie_id || details.id,
  // };

  const handleLike = (details) => {
    actionDispatch(actions.ADDED_TO_LIKED, details);
    setLikeImage(!likeImage);
    // webfox.postAllLikesMovie(params).then(({ data, error }) => {
    //   if (error) {
    //     actionDispatch(actions.POST_LIKED_MOVIE_FAILURE, []);
    //   }
    //   actionDispatch(actions.POST_LIKED_MOVIE_SUCCESS, data || []);
    // });
    if (isLiked === false) {
      setLikePopup(true);
      setCardSection(false);
      handleLikePopup();
    }
    firebaseAnalytics.logEvent(
      props.type === 'movie' ? 'movieLike' : 'showLike',
      {
        eventCategory: props.type === 'movie' ? 'movie_like' : 'show_like',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
    windowAny.Moengage?.track_event(
      props.type === 'movie' ? 'movieLike' : 'showLike',
      {
        eventCategory: props.type === 'movie' ? 'movie_like' : 'show_like',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
    const params1 = {
      event: props.type === 'movie' ? 'movie_like' : 'show_like',
      details: {
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: props && props.type ? props.type : '',
        name: details && details.name ? details.name : '',
        formatted_id:
          details &&
          details.primary_language &&
          details.primary_language !== undefined &&
          details.primary_language.name &&
          details._id
            ? details.primary_language.name + '_' + details._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params1).then(({ data, error }) => {});
  };

  const handleHide = (details) => {
    actionDispatch(actions.ADDED_TO_HIDDEN, details);
    getCategory();
  };

  const handleDislike = (details) => {
    setDisLikeImage(!disLikeImage);
    actionDispatch(actions.ADDED_TO_DISLIKE, details);
    // webfox.postAllDislikedMovie(params).then(({ data, error }) => {
    // });
    setDislikePopup(true);
    setCardSection(false);
    handleDislikePopup();
    const params1 = {
      event: props.type === 'movie' ? 'movie_dislike' : 'show_dislike',
      details: {
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: props && props.type ? props.type : '',
        name: details && details.name ? details.name : '',
        formatted_id:
          details &&
          details.primary_language &&
          details.primary_language !== undefined &&
          details.primary_language.name &&
          details._id
            ? details.primary_language.name + '_' + details._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params1).then(({ data, error }) => {});
    // getCategory();
    // let filteredData = webstore.moviesList.data;
    // let index = filteredData.findIndex(item => item.id === details.id);
    // if (index !== -1) {
    //   filteredData.splice(index, 1);
    // }

    // actionDispatch(
    //   actions.FETCH_MOVIES_SUCCESS,
    //   { movies: filteredData } || []
    // );
    pushDataLocalStorage(
      LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_IDS,
      details._id,
      'ID'
    );
    pushDataLocalStorage(
      LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ,
      details,
      'OBJ'
    );
  };

  const getCategory = () => {
    let filteredData;
    let index = 0;
    const details_id = details._id ? details._id : details.id;
    switch (props.tag) {
      case 'movies':
        filteredData = webstore.moviesList.data;
        index = filteredData.findIndex((item) => {
          return item._id ? item._id === details_id : item.id === details_id;
        });
        if (index !== -1) {
          filteredData.splice(index, 1);
        }
        actionDispatch(
          actions.FETCH_MOVIES_SUCCESS,
          { movies: filteredData } || []
        );
        break;
      case 'shows':
        filteredData = webstore.showList.data;
        index = filteredData.findIndex((item) => {
          return item._id ? item._id === details_id : item.id === details_id;
        });
        if (index !== -1) {
          filteredData.splice(index, 1);
        }
        actionDispatch(
          actions.FETCH_SHOWS_SUCCESS,
          { movies: filteredData } || []
        );
        break;

      case 'for_you':
        filteredData = webstore.recommendedMovies.data;
        index = filteredData.findIndex((item) => {
          return item._id ? item._id === details_id : item.id === details_id;
        });
        if (index !== -1) {
          filteredData.splice(index, 1);
        }
        actionDispatch(
          actions.FETCH_RECOMMENDED_MOVIES_SUCCESS,
          filteredData || []
        );
        break;

      case 'similar':
        props.delete();
        break;

      case 'watchlist':
        actionDispatch(actions.HIDE_ARRAY_OF_WATCHLIST, details || []);
        break;

      case 'liked':
        actionDispatch(actions.HIDE_ADDED_TO_LIKED, details || []);
        break;

      case 'hidden':
        actionDispatch(actions.UNHIDE_MOVIE, details || []);
        break;

      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Grid
          item
          xs={12}
          className={classes.popupBox}
          style={{ display: likePopup ? 'block' : 'none' }}
        >
          <Grid xs={12} item className={classes.dropCloseBox}>
            <ImageComponent
              src="https://images.ottplay.com/static/dislikeCross.svg"
              alt="close icon"
              className={classes.popupCloseIcon}
              onClick={() => setLikePopup(false)}
            />
          </Grid>
          <Grid xs={12} item>
            <Typography component="p" className={classes.popupTitle}>
              {`You Liked ${details.name}`}
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <Typography component="p" className={classes.popupDesc}>
              Like the shows you've seen so we can get to know your taste
              better.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          className={classes.popupBox}
          style={{ display: dislikePopup ? 'block' : 'none' }}
        >
          <Grid xs={12} item className={classes.dropCloseBox}>
            <ImageComponent
              src="https://images.ottplay.com/static/dislikeCross.svg"
              alt="close icon"
              className={classes.popupCloseIcon}
              onClick={(e) => {
                e.stopPropagation();
                setDislikePopup(false);
              }}
            />
          </Grid>
          <Grid xs={12} item>
            <Typography component="p" className={classes.popupTitle}>
              Didn’t Like It?
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <Typography component="p" className={classes.popupDesc}>
              We’ll try not to recommend shows like this in the future. If you
              haven’t seen it and didn’t like it, swipe left to remove instead.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={5}
          className={classes.mediaCardBox}
          style={{ display: cardSection ? 'block' : 'none' }}
        >
          <div className={classes.cardWrap}>
            <div className={classes.cardMainContent}>
              <CardMedia
                className={[
                  loaded ? classes.mediaCard : classes.mediaCardLoader,
                  classes.center,
                ].join(' ')}
                component="img"
                alt="movie Image"
                image={
                  loaded
                    ? props.image ||
                      'https://images.ottplay.com/static/poster_default.png'
                    : 'https://images.ottplay.com/static/poster_default.png'
                }
                onLoad={() => setLoaded(true)}
                onClick={props.onCardClick}
              />
              {details.ottplay_rating ? (
                <div className={classes.imdbBox}>
                  <Box className={classes.imdbInnerBox}>
                    <span className={classes.imdbRating}>
                      <b>{props.rating.toFixed(1)}</b>
                      <ImageComponent
                        src="https://images.ottplay.com/static/reel_logo.png"
                        className={classes.imdbImage}
                        alt=""
                      />
                      <b className={classes.imdbText}>OTTplay Rating</b>
                    </span>
                    {/* <CardMedia
                  component="img"
                  alt="imdb Image"
                  image={imdbTag}
                  className={classes.imdbImg}
                /> */}
                  </Box>
                </div>
              ) : null}
            </div>
          </div>
        </Grid>

        <Grid item xs={7} style={{ display: cardSection ? 'block' : 'none' }}>
          {/* {props.match && props.match > 0 ? (
            <Typography gutterBottom component="p" className={classes.match}>
              {props.match}% Match
            </Typography>
          ) : null} */}
          <Typography
            variant="body2"
            component="p"
            className={classes.title}
            style={{
              lineHeight: width > 1300 ? '22px' : '18px',
              marginLeft:
                width < 600
                  ? props.screen == 'home' || props.screen == 'see_all'
                    ? 0
                    : 12
                  : 0,
            }}
            onClick={props.onCardClick}
          >
            {props.title}
          </Typography>
          <CardActions className={classes.platformsBox}>
            <div className={classes.movie}>
              {`${details.content_type}`}
              {details.genre ? (
                <span className={classes.platformsDesc}>
                  {`. ${
                    details.genre || details.genres.map((gen) => gen.name)
                  }`}
                </span>
              ) : null}
            </div>
          </CardActions>
          <CardActions className={classes.platformsBox}>
            {props.provider && props.provider.length > 0 ? (
              <div className={classes.movie}>
                {`On`}
                <span className={classes.platformsDesc}>{` . ${
                  props.provider.slice(0, 2).join(' . ') +
                  moreProvider(props.provider)
                }`}</span>
              </div>
            ) : null}
          </CardActions>
          <Grid container direction="row" xs={12} className={classes.buttonBox}>
            <Grid
              item
              className={classes.circularWrapper}
              onClick={() => handleAddToWatchlist(details)}
            >
              <ImageComponent
                className={classes.circularButton}
                src={
                  isSelected
                    ? '/static/mobile_images/add_icon_green_fill_mobile.svg'
                    : '/static/mobile_images/add_icon_white_mobile.svg'
                }
                alt="add button"
              />
            </Grid>
            <Grid
              item
              className={classes.circularWrapper}
              onClick={(e) => {
                e.stopPropagation();
                handleLike(details);
              }}
            >
              <ImageComponent
                className={classes.circularButton}
                src={
                  isLiked
                    ? '/static/mobile_images/like_icon_green_fill_mobile.svg'
                    : '/static/mobile_images/like_icon_white_mobile.svg'
                }
                alt="like button"
              />
            </Grid>
            {props.screen == 'home' ||
            props.screen == 'movie' ||
            props.screen == 'show' ? null : (
              <Grid
                item
                className={classes.circularWrapper}
                onClick={() => handleDislike(details)}
              >
                <ImageComponent
                  className={classes.circularButton}
                  src={
                    isDisliked
                      ? '/static/mobile_images/dislike_icon_red_fill_mobile.svg'
                      : '/static/mobile_images/dislike_icon_white_mobile.svg'
                  }
                  alt="dislike button"
                />
              </Grid>
            )}
            {/* <Grid item className={classes.circularWrapper}>
              <ImageComponent
                className={classes.circularButton}
                src={trailerImage ? trailerWhiteFillIcon : trailerWhiteIcon}
                alt="trailer button"
                onClick={() => setTrailerImage(!trailerImage)}
              />
            </Grid> */}
            <Grid xs={12} item className={classes.playButtonBox}>
              <Button
                onClick={handleWatchNow}
                className={
                  details &&
                  details.where_to_watch &&
                  details.where_to_watch.length > 0
                    ? classes.playButtonMob
                    : [classes.playButtonMob, classes.disableButton].join(' ')
                }
              >
                <ImageComponent
                  src="/static/mobile_images/play_icon_mobile.svg"
                  alt="video play icon"
                />
                Watch Now
              </Button>
              {props.screen == 'home' ||
              props.screen == 'movie' ||
              props.screen == 'show' ? null : (
                <div onClick={() => setDropdown(!dropdown)}>
                  <ImageComponent
                    src="/static/mobile_images/more_icon_mobile.svg"
                    alt="more button"
                    className={classes.dotsButton}
                  />
                </div>
              )}
              <Modal
                isOpen={modalOpen}
                style={{
                  overlay: {
                    position: 'fixed',
                    display: 'flex',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 999,
                    overflow: 'hidden',
                    background: 'rgba(0,0,0,0.8)',
                  },
                  content: {
                    position: 'unset',
                    overflow: 'hidden',
                    border: '1px solid #170732',
                    background: '#170732',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: width > 600 ? 4 : 0,
                    outline: 'none',
                    padding: '0px',
                    zIndex: '999',
                    margin: 'auto',
                    width: 'fit-content',
                    maxWidth: '100vw',
                    maxHeight: 'calc(100vh - 135px)',
                    display: 'table',
                  },
                }}
                onAfterOpen={() => {
                  document.body.style.overflow = 'hidden';
                }}
                onAfterClose={() => {
                  document.body.style.overflow = 'auto';
                }}
              >
                <WatchNowModal
                  handleWatchNow={handleREAnalytics}
                  handleClose={handleCloseModal}
                  whereToWatch={sortProvidersByUserPreference(
                    details.where_to_watch || details.providers,
                    providersNameArr
                  )}
                />
              </Modal>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        xs={12}
        className={classes.dropBox}
        style={{ display: dropdown ? 'flex' : 'none' }}
      >
        <Grid xs={12} item className={classes.dropCloseBox}>
          <ImageComponent
            src="https://images.ottplay.com/static/dislikeCross.svg"
            alt="close icon"
            className={classes.dropCloseIcon}
            // onClick={() => setDropdown(!dropdown)}
          />
        </Grid>
        {/* <Grid
          item
          className={classes.dropInnerBox}
          onClick={() => setShareImage(!shareImage)}
        >
          <ImageComponent src={shareIcon} alt="share icon" className={classes.dropIcon} />
          <Typography gutterBottom component="p" className={classes.dropLabel}>
            Share
          </Typography>
        </Grid> */}
        <Grid
          xs={12}
          item
          className={classes.dropInnerBox}
          onClick={() => handleHide(details)}
        >
          <ImageComponent
            src="/static/mobile_images/hide_green_icon_mobile.svg"
            alt="hide icon"
            className={classes.dropIcon}
          />
          <Typography gutterBottom component="p" className={classes.dropLabel}>
            Hide
          </Typography>
        </Grid>
        {/* <Grid xs={12} item className={classes.dropInnerBox}>
          <ImageComponent
            src={removeIcon}
            alt="remove icon"
            className={classes.dropIcon}
          />
          <Typography gutterBottom component="p" className={classes.dropLabel}>
            Remove
          </Typography>
        </Grid>
        <Grid xs={12} item className={classes.dropInnerBox}>
          <ImageComponent
            src={similarTitlesIcon}
            alt="similar titles icon"
            className={classes.dropIcon}
          />
          <Typography gutterBottom component="p" className={classes.dropLabel}>
            Similar Titles
          </Typography>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

export const DisLikeCard = ({ details, ...props }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.hoverSection}>
        <CardActionArea className={classes.cardActionArea} disableRipple>
          <div className={classes.hoverRoot}>
            <Grid
              container
              // spacing={2}
              direction="column"
              justify="flex-end"
              alignItems="flex-end"
              xs={12}
            >
              <ImageComponent
                src="https://images.ottplay.com/static/dislikeCross.svg"
                alt="dislike_icon"
                // onClick={props.onClick}
              />
              <Grid
                item
                className={classes.dislikeTitle}
                style={{ padding: '0px 12px' }}
              >
                <span className={classes.dislikedHeading}>Didn’t Like It?</span>
                <span className={classes.dislikeContent}>
                  We’ll try not to recommend movies & shows like this in the
                  future. If you haven’t seen it and didn’t like it, swipe left
                  to remove instead.
                </span>
              </Grid>
            </Grid>
          </div>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  hoverRoot: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
  },
  hoverRootBox: {
    margin: 0,
    '& img': {
      width: 'clamp(20px, 2.8vw, 40px)',
    },
  },
  root: {
    fontFamily: `"Montserrat", "Arial", "sans-serif" !important`,
    width: '100%',
    // height: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    outline: 'none',
    boxShadow: 'none',
    margin: '10px 0px 0',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      opacity: 1,
    },
  },
  hoverCardUnique: {
    width: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  cardWrap: {
    display: 'block',
    content: '',
    position: 'relative',
    paddingBottom: '150%', // to maintain aspect ratio 2:3
    cursor: 'pointer',
    backgroundColor: '#1E0B40',
    borderRadius: '8px',
    '&:hover': {
      '& $hoverCardUnique': {
        zIndex: 3,
      },
    },
  },
  cardMainContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  center: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '8px',
  },
  cardActionArea: {
    '&:hover': {
      color: 'transparent',
    },
  },
  content: {
    padding: '6px 0px 0px',
  },
  match: {
    letterSpacing: '0.84px',
    fontSize: '12px',
    color: '#03F87E',
    fontWeight: 600,
    textTransform: 'uppercase',
    opacity: 1,
  },
  dotWarp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '8%',
    minHeight: '25px',
  },
  imdbTagBox: {
    position: 'relative',
  },
  mediaCard: {
    // position: 'relative',
    borderRadius: '6px',
    width: '100%',
    // border: '1px solid #3d2f58',
    background: 'rgb(25, 5, 71)',
    objectFit: 'cover',
  },
  mediaCardLoader: {
    borderRadius: '6px',
    width: '100%',
    // border: '1px solid #3d2f58',
    background: 'rgb(25, 5, 71)',
    objectFit: 'contain',
  },
  imdbImage: {
    width: '18px',
    marginLeft: '5px',
  },
  imdbTag: {
    position: 'absolute',
    backgroundColor: 'rgb(0, 0, 0)',
    bottom: '5%',
    left: '6%',
    color: '#fff',
    padding: '4px 5px',
    zIndex: 2,
    fontSize: '9px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: `"Montserrat", "Arial", "sans-serif"`,
  },
  imdbText: {
    color: '#FD4376',
    marginLeft: 3,
  },
  addToWatchListButton: {
    position: 'absolute',
    bottom: '18%',
    right: '6%',
    width: '30px',
    zIndex: 2,
  },
  bgMask: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height: '40%',
    width: '100%',
    background:
      'linear-gradient(rgba(0,0,0,0) ,rgba(27,13,58,0.8), rgba(27,13,58,1))',
  },
  awardTag: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: '225px',
    left: '0px',
    padding: '4px 5px',
    zIndex: 1,
  },
  title: {
    textAlign: 'left',
    fontSize: 'clamp(16px, 1vw, 24px)',
    letterSpacing: '0px',
    color: ' #FFFFFF',
    opacity: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 700,
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    cursor: 'pointer',
    padding: '0px 2px 0px 2px',
    '&:hover': {
      color: '#29F87E',
    },
  },
  movie: {
    textAlign: 'left',
    fontSize: 'clamp(12px, 1vw, 14px)',
    letterSpacing: '0px',
    fontWeight: 'bold',
    color: '#D6C6F4',
    padding: '0px',
    textTransform: 'capitalize',
  },
  platforms: {
    textAlign: 'left',
    opacity: '0.6',
    fontSize: 'clamp(10px, 1vw, 14px)',
    letterSpacing: '0px',
    color: '#D6C6F4',
    padding: '0px 2px 0px 2px',
    lineHeight: 'clamp(16px, 1.3vw, 20px)',
  },
  platformsDesc: {
    textAlign: 'left',
    opacity: '0.8',
    fontSize: 'clamp(12px, 1vw, 14px)',
    letterSpacing: '0px',
    color: '#D6C6F4',
    padding: '0px',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    fontWeight: 400,
    paddingLeft: 2,
  },
  circularWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 8px !important',
  },
  circularButton: {
    //border: '1px solid #FFFFFF  ',
    background: '#03F87E',
    opacity: 1,
    backgroundColor: 'transparent',
    height: '50px',
    width: '50px',
    //height: '100%',
    // /width: '100%',
    //borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //margin: "12px 5px 5px 6px",
    //zIndex: 1000000,
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
  },
  buttonText: {
    color: '#fff',
    fontSize: '11px',
    textAlign: 'center',
    letterSpacing: '0px',
    opacity: 0.3,
  },
  hoverSection: {
    backgroundImage: `url(${IMAGES.inside_bg_movies})`,
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#1B0D3A',
    // background:
    //   ' transparent radial-gradient(closest-side at 65% 50%, #4E44BE 0%, #1B0D3A 100%)',
    // border: '1px solid #432B86',
    borderRadius: '6px',
    opacity: 1,
    padding: '6px',
    //padding: "10px 10px 20px 14px",
    width: '100%',
    // maxWidth: '180px'
  },
  hoverButtonSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  dislikeHoverSection: {
    padding: '10px 20px 0 20px',
    background:
      ' transparent radial-gradient(closest-side at 65% 50%, #4E44BE 0%, #1B0D3A 100%)',
    border: '1px solid #432B86',
    borderRadius: '6px',
    opacity: 1,
    width: '100%',
  },
  dislikeTitle: {
    display: 'flex',
    flexDirection: 'column',
  },
  dislikedHeading: {
    color: '#FFFFFF',
    fontSize: 'clamp(12px, 1vw, 16px)',
    fontWeight: 'bold',
    marginTop: '8px',
  },
  dislikeContent: {
    color: '#D6C6F4',
    fontSize: 'clamp(10px, 1vw, 14px)',
    marginTop: '8px',
  },
  playButtonBox: {
    justifyContent: 'center',
    marginTop: '2%',
    margin: '0px !important',
    display: 'flex',
    alignItems: 'center',
  },
  playButton: {
    width: 123,
    height: 32,
    background: '#04E075',
    color: '#100721',
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 15,
    marginTop: 0,
    //marginRight: 15,
    textTransform: 'capitalize',
    '&:hover': {
      background: '#04E075',
    },
    '&:focus': {
      background: '#04E075',
    },
    '& img': {
      width: 13,
      height: 14,
      marginRight: 4,
    },
  },
  disableButton: {
    background: 'grey',
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      marginTop: 0,
    },
    match: {
      fontSize: 10,
      marginLeft: 13,
      fontWeight: 700,
      marginBottom: '1%',
    },
    platformsBox: {
      textAlign: 'left',
      opacity: '0.8',
      fontSize: 10,
      letterSpacing: '0px',
      color: '#D6C6F4',
      padding: '0px',
      overflow: 'hidden',
      marginTop: '1.5%',
      height: 'auto',
      marginLeft: 13,
    },
    platforms: {
      color: '#D6C6F4',
      marginTop: 0,
      height: 'auto',
      marginLeft: '2px !important',
      fontWeight: 400,
    },
    movie: {
      color: '#D6C6F4',
    },
    buttonBox: {
      paddingLeft: 13,
      marginTop: '1rem',
      columnGap: '3rem',
    },
    circularWrapper: {
      alignItems: 'flex-start',
      padding: '0px !important',
      margin: '18px 0px',
    },
    circularButton: {
      width: 30,
      height: 30,
      marginRight: 10,
      position: 'absolute',
    },
    playButtonBox: {
      justifyContent: 'flex-start',
      marginTop: '8%',
      display: 'flex',
      alignItems: 'center',
    },
    playButtonMob: {
      // width: 120,
      // height: 30,
      background: '#04E075',
      color: '#100721',
      fontSize: 12,
      fontWeight: 700,
      borderRadius: 15,
      // marginTop: 5,
      marginRight: 15,
      padding: '4px 12px',
      textTransform: 'capitalize',
      marginTop: '1rem',
      '&:hover': {
        background: '#04E075',
      },
      '&:focus': {
        background: '#04E075',
      },
      '& img': {
        width: 13,
        height: 14,
        marginRight: 4,
      },
    },
    dotsButton: {
      width: 17,
      height: 17,
      marginTop: '1rem',
    },
    dropBox: {
      marginTop: 15,
      padding: 20,
      paddingBottom: 10,
      paddingTop: 8,
      // background: `url(${dropBg})`,
      // background: "radial-gradient(circle, rgba(78,68,190,1) 34%, rgba(30,16,65,1) 70%)",
      background: '#190547',
      // background:
      //   'linear-gradient(0deg, rgba(27,13,58,1) 0%, rgba(78,68,190,1) 30%, rgba(78,68,190,1) 70%, rgba(27,13,58,1) 100%)',
      border: '1px solid #432B86',
      borderRadius: 8,
      transition: '.5s',
    },
    dropInnerBox: {
      display: 'flex',
      alignItems: 'center',
      // paddingTop: 10,
      paddingBottom: 10,
      borderBottom: '1px solid rgb(41 30 96 / 33%)',
      '&:first-child': {
        paddingTop: 0,
      },
      '&:last-child': {
        borderBottom: 'none',
      },
    },
    dropCloseBox: {
      display: 'block',
      textAlign: 'right',
    },
    dropIcon: {
      width: 18,
      height: 19,
      marginLeft: 15,
    },
    dropCloseIcon: {
      width: 30,
      float: 'right',
      marginRight: '-4%',
    },
    dropLabel: {
      color: '#ffffff',
      fontSize: 13,
      marginLeft: 15,
      marginBottom: 0,
    },
    imdbBox: {
      position: 'absolute',
      bottom: 0,
      paddingBottom: 10,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 20,
      width: '100%',
      background:
        'transparent linear-gradient(180deg, #1B0D3400 0%, #1b0d3480 50%, #1B0D34BE 100%) 0% 0% no-repeat padding-box',
    },
    imdbInnerBox: {
      display: 'flex',
      // height: 21,
      padding: '3px 6px',
      background: 'black',
      width: 'fit-content',
      borderRadius: 4,
      alignItems: 'center',
    },
    imdbRating: {
      color: '#FFFFFF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 'clamp(8px, 2.6vw, 11px)',
      // marginRight: 6,
    },
    imdbImg: {
      width: 23,
      height: 13,
      borderRadius: 2,
    },
    mediaCardBox: {
      position: 'relative',
    },
    popupBox: {
      background:
        'linear-gradient(0deg, rgba(27,13,58,1) 0%, rgba(78,68,190,1) 30%, rgba(78,68,190,1) 70%, rgba(27,13,58,1) 100%)',
      border: '1px solid #432B86',
      borderRadius: 8,
      padding: '50px 40px',
    },
    popupTitle: {
      fontSize: 18,
      color: '#ffffff',
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    popupDesc: {
      fontSize: 12,
      color: '#ffffff',
      fontWeight: 500,
    },
    popupCloseIcon: {
      width: 30,
      float: 'right',
      marginRight: '-10%',
      marginTop: '-16%',
    },
  },
}));
