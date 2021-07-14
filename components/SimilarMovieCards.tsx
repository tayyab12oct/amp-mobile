import { Box, Button, makeStyles } from '@material-ui/core';
import { Grid, Hidden } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
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
import { IMAGES } from '../public/static/newImages';
import ImageComponent from './Images';
import Modal from 'react-modal';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ViewportContext } from './ViewportProvider';
import WatchNowModal from './WatchNowModal';
import { WebfoxContext } from '../services/webfox';
//mobile
import cookie from 'react-cookies';
import { firebaseAnalytics } from './firebaseConfig';

const windowAny: any = typeof window !== 'undefined' && window;
// const addToWatchListButton = { tick, plus };

export function OnHoverCard({
  id,
  isSelected,
  isLiked,
  isDisliked,
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
      setLikePopup(false);
      setCardSection(true);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  };

  const handleDislikePopup = () => {
    const timer = setTimeout(() => {
      setDislikePopup(false);
      setCardSection(true);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  };

  const handleWatchNow = () => {
    const currentPath = location.pathname;
    console.log('currentPath: ', currentPath);
    const params = {
      event:
        props.type === 'movie' ? 'movie_watchnow_cta' : 'show_watchnow_cta',
      details: {
        // page_name: currentPath,
        // title_type: props.type,
        // title_name: name,
        // title_id: id,
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
    firebaseAnalytics.logEvent('moviewatchnowcta', {
      // eventCategory: 'movie_watchnow_cta',
      eventCategory:
        details.type === 'movie' ? 'movie_watchnow_cta' : 'show_watchnow_cta',
      eventAction: window.location.pathname,
      eventLabel:
        details.name +
        (details.primary_language && details.primary_language.name != undefined
          ? `/${details.primary_language?.name}`
          : '') +
        (details._id ? '/' + details._id : '/' + details.id),
      eventValue: details.ottplay_rating,
    });
    windowAny.Moengage.track_event('moviewatchnowcta', {
      // eventCategory: 'movie_watchnow_cta',
      eventCategory:
        details.type === 'movie' ? 'movie_watchnow_cta' : 'show_watchnow_cta',
      eventAction: window.location.pathname,
      eventLabel:
        details.name +
        (details.primary_language && details.primary_language.name != undefined
          ? `/${details.primary_language?.name}`
          : '') +
        (details._id ? '/' + details._id : '/' + details.id),
      eventValue: details.ottplay_rating,
    });
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
    windowAny.Moengage.track_event('watchnowdialog', {
      screen_view: '/watchnowdialog',
      source: props && props.sourcePage ? props.sourcePage : '',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
    setmodalOpen(true);
  };

  const handleCloseModal = () => {
    setmodalOpen(false);
  };

  const handleAddToWatchlist = (details) => {
    actionDispatch(actions.FETCH_ARRAY_OF_WATCHLIST, details);

    // firebaseAnalytics.logEvent('addToWatchList', {
    //   // eventCategory: 'movie_addtowatchlist',
    //   eventCategory:
    //     details.type === 'movie'
    //       ? 'movie_addtowatchlist'
    //       : 'show_addtowatchlist',
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
      windowAny.Moengage.track_event('removefromwatchlist', {
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
      windowAny.Moengage.track_event('addToWatchList', {
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
        details.type === 'movie'
          ? 'movie_addtowatchlist'
          : 'show_addtowatchlist',
      details: {
        // page_name: window.location.pathname,
        // title_type: details.type,
        // title_name: name,
        // title_id: id,
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: details && details.type ? details.type : '',
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
    pushDataLocalStorage(
      LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ,
      details,
      'OBJ'
    );
    setTickImage(!tickImage);
    //localStorage.setItem('watchlist added', JSON.stringify(actionDispatch(actions.FETCH_ARRAY_OF_WATCHLIST, details)));
  };

  const params = {
    movieId: details.movie_id,
  };

  const handleLike = (details) => {
    webfox.postAllLikesMovie(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.POST_LIKED_MOVIE_FAILURE, []);
      }
      actionDispatch(actions.POST_LIKED_MOVIE_SUCCESS, data || []);
    });
    actionDispatch(actions.ADDED_TO_LIKED, details);
    setLikeImage(!likeImage);
    firebaseAnalytics.logEvent('movieLike', {
      eventCategory: details.type === 'movie' ? 'movie_like' : 'show_like',
      eventAction: window.location.pathname,
      eventLabel:
        details.name +
        (details.primary_language && details.primary_language.name != undefined
          ? `/${details.primary_language?.name}`
          : '') +
        (details._id ? '/' + details._id : '/' + details.id),
      eventValue: details.ottplay_rating,
    });
    windowAny.Moengage.track_event('movieLike', {
      eventCategory: details.type === 'movie' ? 'movie_like' : 'show_like',
      eventAction: window.location.pathname,
      eventLabel:
        details.name +
        (details.primary_language && details.primary_language.name != undefined
          ? `/${details.primary_language?.name}`
          : '') +
        (details._id ? '/' + details._id : '/' + details.id),
      eventValue: details.ottplay_rating,
    });
    const params1 = {
      event: details.type === 'movie' ? 'movie_like' : 'show_like',
      details: {
        // page_name: window.location.pathname,
        // title_type: details.type,
        // title_name: name,
        // title_id: id,
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: details && details.type ? details.type : '',
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
    pushDataLocalStorage(
      LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ,
      details,
      'OBJ'
    );
  };

  const handleHide = (details) => {
    actionDispatch(actions.ADDED_TO_HIDDEN, details);
    getCategory();
    console.log('deaa', details, details.movie_id);
    pushDataLocalStorage(
      LOCALSTORAGE_KEY_CONSTANTS.HIDDEN_DATA_OBJ,
      details,
      'OBJ'
    );
  };

  const handleDislike = (details) => {
    setDisLikeImage(!disLikeImage);
    actionDispatch(actions.ADDED_TO_DISLIKE, details);
    webfox.postAllDislikedMovie(params).then(({ data, error }) => {
      console.log('Post ', JSON.stringify(data));
    });
    handleDislikePopup();
    const params1 = {
      event: details.type === 'movie' ? 'movie_dislike' : 'show_dislike',
      details: {
        // page_name: window.location.pathname,
        // title_type: details.type,
        // title_name: name,
        // title_id: id,
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: details && details.type ? details.type : '',
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
    firebaseAnalytics.logEvent('movieLike', {
      eventCategory:
        details.type === 'movie' ? 'movie_dislike' : 'show_dislike',
      eventAction: window.location.pathname,
      eventLabel:
        details.name +
        (details.primary_language && details.primary_language.name != undefined
          ? `/${details.primary_language?.name}`
          : '') +
        (details._id ? '/' + details._id : '/' + details.id),
      eventValue: details.ottplay_rating,
    });
    windowAny.Moengage.track_event('movieLike', {
      eventCategory:
        details.type === 'movie' ? 'movie_dislike' : 'show_dislike',
      eventAction: window.location.pathname,
      eventLabel:
        details.name +
        (details.primary_language && details.primary_language.name != undefined
          ? `/${details.primary_language?.name}`
          : '') +
        (details._id ? '/' + details._id : '/' + details.id),
      eventValue: details.ottplay_rating,
    });
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
        console.log('filteredData---->', filteredData, index, details.id);
        actionDispatch(
          actions.FETCH_MOVIES_SUCCESS,
          { movies: filteredData } || []
        );
        break;
      case 'shows':
        filteredData = webstore.showList.data.shows;
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

      case 'for_you':
        filteredData = webstore.recommendations.data.movies;
        index = filteredData.findIndex((item) => {
          return item._id ? item._id === details_id : item.id === details_id;
        });
        if (index !== -1) {
          filteredData.splice(index, 1);
        }
        actionDispatch(
          actions.FETCH_RECOMMENDATIONS_SUCCESS,
          { movies: filteredData } || []
        );
        break;

      case 'watchlist':
        actionDispatch(actions.FETCH_ARRAY_OF_WATCHLIST, details || []);
        break;
      default:
        break;
    }
  };
  const handleREAnalytics = () => {
    const currentPath = location.pathname;
    console.log('currentPath: ', currentPath);
    const params = {
      event: props.type === 'movie' ? 'movie_watchnow' : 'show_watchnow',
      details: {
        // page_name: currentPath,
        // title_type: props.tag,
        // title_name: name,
        // title_id: id,
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: details && details.type ? details.type : '',
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
    firebaseAnalytics.logEvent('moviewatchnow', {
      eventCategory:
        details.type === 'movie' ? 'movie_watchnow' : 'show_watchnow',
      eventAction: window.location.pathname,
      eventLabel:
        details.name +
        (details.primary_language && details.primary_language.name != undefined
          ? `/${details.primary_language?.name}`
          : '') +
        (details._id ? '/' + details._id : '/' + details.id),
      eventValue: details.ottplay_rating,
    });
    windowAny.Moengage.track_event('moviewatchnow', {
      eventCategory:
        details.type === 'movie' ? 'movie_watchnow' : 'show_watchnow',
      eventAction: window.location.pathname,
      eventLabel:
        details.name +
        (details.primary_language && details.primary_language.name != undefined
          ? `/${details.primary_language?.name}`
          : '') +
        (details._id ? '/' + details._id : '/' + details.id),
      eventValue: details.ottplay_rating,
    });
  };
  return (
    <React.Fragment>
      <Hidden only={['xs']}>
        <Card
          className={classes.hoverSection}
          style={{
            maxHeight: width > 1300 ? '240px' : 'calc(75vw - 36px)',
            height: width > 1300 ? '240px' : 'calc(75vw - 36px)',
          }}
          // onClick={props.onCardClick}
        >
          <CardActionArea className={classes.cardActionArea} disableRipple>
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
                    // onMouseOver={() => setHoverAdd(true)}
                    // onMouseLeave={() => setHoverAdd(false)}
                    src={
                      isSelected || tickImage
                        ? 'https://images.ottplay.com/static/hoveradd.svg'
                        : hoverAdd
                        ? 'https://images.ottplay.com/static/hoverWatchlist.svg'
                        : 'https://images.ottplay.com/static/addd.svg'
                    }
                    alt="watchlist_icon"
                    // onClick={() => handleAddToWatchlist(details)}
                  />
                  <span className={classes.buttonText}>Watchlist</span>
                </Grid>
                <Grid item xs={4} className={classes.circularWrapper}>
                  <ImageComponent
                    className={classes.circularButton}
                    // onMouseOver={() => setHoverLike(true)}
                    // onMouseLeave={() => setHoverLike(false)}
                    src={
                      isLiked || likeImage
                        ? 'https://images.ottplay.com/static/hoverlike.svg'
                        : hoverLike
                        ? 'https://images.ottplay.com/static/hoverHeart.svg'
                        : 'https://images.ottplay.com/static/likebutton.svg'
                    }
                    alt="like_icon"
                    // onClick={() => handleLike(details)}
                  />
                  <span className={classes.buttonText}>Like</span>
                </Grid>
                <Grid item xs={4} className={classes.circularWrapper}>
                  <ImageComponent
                    className={classes.circularButton}
                    // onMouseOver={() => setHoverDislike(true)}
                    // onMouseLeave={() => setHoverDislike(false)}
                    src={
                      disLikeImage || isDisliked
                        ? 'https://images.ottplay.com/static/hoverdislike.svg'
                        : hoverDislike
                        ? 'https://images.ottplay.com/static/hoverNotLike.svg'
                        : 'https://images.ottplay.com/static/dislikebutton.svg'
                    }
                    alt="dislike_icon"
                    // onClick={() => handleDislike(details)}
                  />
                  <span className={classes.buttonText}>Dislike</span>
                </Grid>
                <Grid item xs={4} className={classes.circularWrapper}>
                  <ImageComponent
                    className={classes.circularButton}
                    onMouseOver={() => setHoverTrailer(true)}
                    onMouseLeave={() => setHoverTrailer(false)}
                    src={
                      trailerImage
                        ? 'https://images.ottplay.com/static/hovertrailer.svg'
                        : hoverTrailer
                        ? 'static/images/trailerHover.svg'
                        : 'https://images.ottplay.com/static/trailerbutton.svg'
                    }
                    alt="trailer_icon"
                    onClick={() => setTrailerImage(!trailerImage)}
                  />
                  <span className={classes.buttonText}>Trailer</span>
                </Grid>
                <Grid item xs={4} className={classes.circularWrapper}>
                  <ImageComponent
                    onMouseOver={() => setHoverHide(true)}
                    onMouseLeave={() => setHoverHide(false)}
                    className={classes.circularButton}
                    src={
                      hideImage
                        ? 'https://images.ottplay.com/static/hoverunhide.svg'
                        : hoverHide
                        ? 'https://images.ottplay.com/static/hideHover.svg'
                        : 'https://images.ottplay.com/static/unhidebutton.svg'
                    }
                    alt="hide_icon"
                    //onClick={() => setHideImage(!hideImage)}
                    onClick={() => handleHide(details)}
                  />
                  <span className={classes.buttonText}>Hide</span>
                </Grid>
                <Grid item xs={4} className={classes.circularWrapper}>
                  <ImageComponent
                    className={classes.circularButton}
                    // onMouseOver={() => setHoverShare(true)}
                    // onMouseLeave={() => setHoverShare(false)}
                    src={
                      shareImage
                        ? 'https://images.ottplay.com/static/enableShare.svg'
                        : hoverShare
                        ? 'https://images.ottplay.com/static/hoverShare.svg'
                        : 'https://images.ottplay.com/static/disableShare.svg'
                    }
                    alt="share_icon"
                    // onClick={() => setShareImage(!shareImage)}
                  />
                  <span className={classes.buttonText}>Share</span>
                </Grid>
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
                        : [classes.playButton, classes.disableButton].join(' ')
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
      </Hidden>
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
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '0%',
            border: '1px solid #2A1D3F',
            background: '#fff',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '0px',
            zIndex: '999',
            margin: 'auto',
            maxWidth: width > 1300 ? '46%' : '68%',
            maxHeight: '65%',
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
          // whereToWatch={details.where_to_watch || details.providers}
          whereToWatch={sortProvidersByUserPreference(
            details.where_to_watch || details.providers,
            providersNameArr
          )}
        />
      </Modal>
    </React.Fragment>
  );
}

export function SimilarMovieCards({ details, ...props }) {
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  const { width } = React.useContext(ViewportContext);

  useEffect(() => {
    const card = document.getElementById('movieCard');
    if (card) {
      card.addEventListener(
        'mouseenter',
        function () {
          console.log('mouseEntered----->');
          setHover(true);
          // highlight the mouseenter target
          // event.target.style.color = "purple";

          // reset the color after a short delay
          // setTimeout(function () {
          //   // event.target.style.color = "";
          //   setHover(false);
          // }, 10);
        },
        false
      );

      card.addEventListener(
        'mouseleave',
        function () {
          // highlight the mouseover target
          setHover(false);

          // reset the color after a short delay
          // setTimeout(function () {
          //   console.log('mouseover--setTimeout--->');
          //   setHover(false);
          // }, 10);
        },
        false
      );
    }
  }, []);

  const moreProvider = (provider) => {
    if (provider && provider.length > 2) {
      return ' . +' + (provider.length - 2).toString();
    }
    return '';
  };

  return (
    <React.Fragment>
      <Card className={classes.root} onMouseLeave={() => setHover(false)}>
        <CardActionArea className={classes.cardActionArea} disableRipple>
          {props.isDisliked ? (
            props.disliked
          ) : props.awards ? (
            <React.Fragment>
              <span className={classes.awardTag}>
                <ImageComponent
                  src="https://images.ottplay.com/static/awards.svg"
                  className={classes.imdbImage}
                  alt="award icon"
                />
              </span>
              <CardMedia
                className={classes.mediaCard}
                style={{
                  maxHeight: width > 1300 ? '240px' : 'calc(75vw - 36px)',
                  height: width > 1300 ? '240px' : 'calc(75vw - 36px)',
                }}
                onClick={props.onCardClick}
                component="img"
                alt="card Image"
                image={
                  props.image ||
                  'https://images.ottplay.com/static/poster_default.png'
                }
                title="card Image"
              />
            </React.Fragment>
          ) : hover === true ? (
            props.children
          ) : (
            <React.Fragment>
              {details.ottplay_rating ? (
                <span className={classes.imdbTag}>
                  <b>{props.rating.toFixed(1) || 0}</b>
                  <ImageComponent
                    src="https://images.ottplay.com/static/reel_logo.png"
                    className={classes.imdbImage}
                    alt="ottplay rating icon"
                  />
                  <b className={classes.imdbText}>OTTplay Rating</b>
                </span>
              ) : null}

              <ImageComponent
                className={classes.addToWatchListButton}
                src={
                  props.isSelected
                    ? 'https://images.ottplay.com/static/Group 7583.svg'
                    : 'https://images.ottplay.com/static/Group 13518.svg'
                }
                alt="watchlist icon"
                // onClick={() => handleAddToWatchlist(props.details)}
              />
              <div className={classes.bgMask} />
              <CardMedia
                onMouseOver={() => setHover(true)}
                className={classes.mediaCard}
                style={{
                  maxHeight: width > 1300 ? '240px' : 'calc(75vw - 36px)',
                  height: width > 1300 ? '240px' : 'calc(75vw - 36px)',
                }}
                component="img"
                alt="card Image"
                image={
                  props.image ||
                  'https://images.ottplay.com/static/poster_default.png'
                }
                title="card Image"
              />
            </React.Fragment>
          )}
          <CardContent className={classes.content}>
            {details.match_score ? (
              <Typography gutterBottom component="p" className={classes.match}>
                {props.match}% Match
              </Typography>
            ) : null}
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
        </CardActionArea>
        <CardActions
          className={classes.platforms}
          style={{ marginTop: width > 1300 ? '8px' : '2px' }}
        >
          <span className={classes.movie}>
            {props.type ? props.type : null}
            {props.provider && props.provider.length > 0 && (
              <span className={classes.platformsDesc}>
                {props.type ? <span> . </span> : null}
                <span>
                  {props.provider.join(' . ') + moreProvider(props.provider)}{' '}
                </span>
              </span>
            )}
          </span>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export function SimilarMobileMovieCards({ details, ...props }) {
  const moreProvider = (provider) => {
    if (provider && provider.length > 2) {
      return ' . +' + (provider.length - 2).toString();
    }
    return '';
  };
  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );

  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  const { width } = React.useContext(ViewportContext);

  const [tickImage, setTickImage] = React.useState(false);

  useEffect(() => {
    const card = document.getElementById('movieCard');
    if (card) {
      card.addEventListener(
        'mouseenter',
        function () {
          console.log('mouseEntered----->');
          setHover(true);
          // highlight the mouseenter target
          // event.target.style.color = "purple";

          // reset the color after a short delay
          // setTimeout(function () {
          //   // event.target.style.color = "";
          //   setHover(false);
          // }, 10);
        },
        false
      );

      card.addEventListener(
        'mouseleave',
        function () {
          // highlight the mouseover target
          setHover(false);

          // reset the color after a short delay
          // setTimeout(function () {
          //   console.log('mouseover--setTimeout--->');
          //   setHover(false);
          // }, 10);
        },
        false
      );
    }
  }, []);

  const handleAddToWatchlist = (detail) => {
    actionDispatch(actions.FETCH_ARRAY_OF_WATCHLIST, detail);
    setTickImage(!tickImage);
  };

  return (
    <React.Fragment>
      <Card className={classes.rootMobile} onMouseLeave={() => setHover(false)}>
        <CardActionArea className={classes.cardActionArea} disableRipple>
          {props.isDisliked ? (
            props.disliked
          ) : props.awards ? (
            <React.Fragment>
              <span className={classes.awardTag}>
                <ImageComponent
                  src="https://images.ottplay.com/static/awards.svg"
                  className={classes.imdbImage}
                  alt="award icon"
                />
              </span>
              <CardMedia
                className={classes.mediaCard}
                style={{
                  maxHeight: width > 1300 ? '240px' : 'calc(75vw - 36px)',
                  height: width > 1300 ? '240px' : 'calc(75vw - 36px)',
                }}
                onClick={props.onCardClick}
                component="img"
                alt="card Image"
                image={
                  props.image ||
                  'https://images.ottplay.com/static/poster_default.png'
                }
                title="card Image"
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {details.ottplay_rating ? (
                <span className={classes.imdbTag}>
                  <b>{props.rating.toFixed(1) || 0}</b>
                  <ImageComponent
                    src="https://images.ottplay.com/static/reel_logo.png"
                    className={classes.imdbImage}
                    alt="ottplay rating icon"
                  />
                  <b className={classes.imdbText}>OTTplay Rating</b>
                </span>
              ) : null}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWatchlist(details);
                }}
              >
                <ImageComponent
                  className={classes.addToWatchListButton}
                  src={
                    props.isSelected
                      ? 'https://images.ottplay.com/static/Group 7583.svg'
                      : 'https://images.ottplay.com/static/Group 13518.svg'
                  }
                  alt=""
                />
              </div>
              <div className={classes.bgMask} />
              <CardMedia
                onMouseOver={() => setHover(true)}
                className={classes.mediaCard}
                style={{
                  maxHeight: width > 1300 ? '240px' : 'calc(75vw - 36px)',
                  height: width > 1300 ? '240px' : 'calc(75vw - 36px)',
                }}
                onClick={props.onCardClick}
                component="img"
                alt="card Image"
                image={
                  props.image ||
                  'https://images.ottplay.com/static/poster_default.png'
                }
                title="card Image"
              />
            </React.Fragment>
          )}
        </CardActionArea>
        <CardContent className={classes.content}>
          {/* <div className={classes.dotWarp}>
            <Typography gutterBottom component="p" className={classes.match}>
              {props.match && props.match > 0 ? `${props.match}% Match` : ' '}
            </Typography>
            <ImageComponent src={dotsIcon} alt="dotsIcon" />
          </div> */}

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
            {props.type ? props.type : null}
            {props.provider && props.provider.length > 0 ? (
              <span className={classes.platformsDesc}>
                {props.type ? <span> . </span> : null}
                {`${props.provider.slice(0, 2).join(' . ')}` +
                  moreProvider(props.provider)}
              </span>
            ) : null}
          </span>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export const DisLikeCard = ({ details, ...props }) => {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);

  return (
    <React.Fragment>
      <Card
        className={classes.hoverSection}
        style={{
          maxHeight: width > 1300 ? '240px' : 'calc(75vw - 36px)',
          height: width > 1300 ? '240px' : 'calc(75vw - 36px)',
        }}
      >
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
                alt="dislike icon"
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
  },
  hoverRootBox: {
    margin: 0,
    '& img': {
      width: 'clamp(20px, 2.8vw, 40px)',
    },
  },
  root: {
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
  rootMobile: {
    width: '100%',
    borderRadius: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    outline: 'none',
    boxShadow: 'none',
    margin: '20px 0px 0',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      opacity: 1,
    },
  },
  cardActionArea: {
    width: 'auto',
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
    paddingRight: '16%',
    minHeight: '25px',
  },
  mediaCard: {
    position: 'relative',
    borderRadius: '6px',
    width: 145,
    border: '1px solid #3d2f58',
    background: 'rgb(25, 5, 71)',
  },
  imdbImage: {
    width: '18px',
    marginLeft: '5px',
  },
  imdbText: {
    color: '#FD4376',
    marginLeft: 5,
  },
  imdbTag: {
    position: 'absolute',
    backgroundColor: 'rgb(0, 0, 0)',
    bottom: '5%',
    left: '4%',
    color: '#fff',
    padding: '4px 5px',
    zIndex: 2,
    fontSize: '9px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: `"Montserrat", "Arial", "sans-serif"`,
  },
  addToWatchListButton: {
    position: 'absolute',
    bottom: '15%',
    right: '4%',
    width: '25px',
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
    border: '1px solid #432B86',
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
      width: '100%',
    },
    rootMobile: {
      marginTop: 0,
      minWidth: 145,
    },
    mediaCard: {
      width: 'calc(50vw - 24px)',
      height: 'calc(75vw - 36px)',
    },
    hoverSection: {
      width: 'calc(50vw - 24px)',
      height: 'calc(75vw - 36px)',
    },
    match: {
      fontSize: 10,
      marginLeft: 4,
      fontWeight: 700,
      marginBottom: '1%',
    },
    title: {
      marginLeft: '4px !important',
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
      height: 'auto',
      marginLeft: '2px !important',
      fontWeight: 400,
      display: 'inherit',
    },
    movie: {
      color: '#D6C6F4',
      textTransform: 'capitalize',
    },
    buttonBox: {
      marginLeft: 13,
      marginTop: '0',
    },
    circularWrapper: {
      alignItems: 'flex-start',
      padding: '0px !important',
      margin: '12px 0px',
    },
    circularButton: {
      width: 30,
      height: 30,
      marginRight: 10,
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
      marginTop: 0,
      padding: '4px 12px',
      marginRight: 15,
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
    dotsButton: {
      width: 17,
      height: 17,
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
      paddingLeft: 10,
      paddingTop: 20,
      width: '100%',
      background:
        'transparent linear-gradient(180deg, #1B0D3400 0%, #1b0d3480 50%, #1B0D34BE 100%) 0% 0% no-repeat padding-box',
    },
    imdbInnerBox: {
      display: 'flex',
      height: 21,
      padding: '4px 5px',
      background: 'black',
      width: 'fit-content',
      borderRadius: 4,
      alignItems: 'center',
    },
    imdbRating: {
      fontSize: 11,
      color: '#FFFFFF',
      marginRight: 6,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
