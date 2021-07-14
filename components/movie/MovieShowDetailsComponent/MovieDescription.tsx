import 'tippy.js/dist/tippy.css';

import * as React from 'react';

import { Card, CardMedia, Grid, Hidden } from '@material-ui/core';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
  pushDataLocalStorage,
} from '../../../utils/constants';
import { useContext, useState } from 'react';

import ImageComponent from '../../Images';
import Modal from 'react-modal';
import MovieTrailer from '../../MovieTrailer';
import Router from 'next/router';
import { Theme } from '@material-ui/core/styles';
import Tippy from '@tippy.js/react';
import { ViewportContext } from '../../ViewportProvider';
import { WebfoxContext } from '../../../services/webfox';
import { contextParamsForREAnalytics } from '../../../utils/constants';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../firebaseConfig';
import { makeStyles } from '@material-ui/styles';
import { removeHTMLTags } from '../../../utils/helper';
import { timeConvert } from '../../../utils/helper';

const windowAny: any = typeof window !== 'undefined' && window;
if (process.env.NODE_ENV !== 'development') Modal.setAppElement('body');

export default function MovieDescription(props) {
  const classes = useStyles();
  const _ht_clientid = cookie.load('_ht_clientid');
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { width } = React.useContext(ViewportContext);

  const [tickImage, setTickImage] = useState(false);
  const [likeImage, setLikeImage] = useState(false);
  const [disLikeImage, setDisLikeImage] = useState(false);
  const [reviewImage, setReviewImage] = useState(true);
  const [shareImage, setShareImage] = useState(true);
  const [hoverTooltip, setHoverTooltip] = React.useState(false);

  const [hoverAdd, setHoverAdd] = React.useState(false);
  const [hoverLike, setHoverLike] = React.useState(false);
  const [hoverDislike, setHoverDislike] = React.useState(false);

  const [unlike, setUnlike] = React.useState();

  const handleAddToWatchlist = (details) => {
    actionDispatch(actions.FETCH_ARRAY_OF_WATCHLIST, details);

    // firebaseAnalytics.logEvent('addToWatchList', {
    //   eventCategory:
    //     details.content_type === 'movie'
    //       ? 'movie_addtowatchlist'
    //       : 'show_addtowatchlist',
    //   eventAction: window.location.pathname,
    //   eventLabel: details.name,
    //   eventValue: details.match_score ? details.match_score : '',
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
          (details &&
          details.primary_language &&
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
          (details &&
          details.primary_language &&
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
    console.log('firebaseAnalytics: ', {
      eventCategory:
        details.content_type === 'movie'
          ? 'movie_addtowatchlist'
          : 'show_addtowatchlist',
      eventAction: window.location.pathname,
      eventLabel: details.name,
      eventValue: details.match_score ? details.match_score : '',
      userType: getUserType(false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    setTickImage(!tickImage);
    // pushDataLocalStorage(
    //   LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ,
    //   details,
    //   'OBJ'
    // );
  };

  const params = {
    movieId: props.details.movie_id,
  };

  const handleLike = (details) => {
    // webfox.postAllLikesMovie(params).then(({ data, error }) => {
    //   if (error) {
    //     actionDispatch(actions.POST_LIKED_MOVIE_FAILURE, []);
    //   }
    //   actionDispatch(actions.POST_LIKED_MOVIE_SUCCESS, data || []);
    // });
    actionDispatch(actions.ADDED_TO_LIKED, details);
    if (props.isDisliked) {
      actionDispatch(actions.ADDED_TO_DISLIKE, details);
    }

    /*actionDispatch(actions.ADDED_TO_LIKED, {
      details,
      unlike: !webstore.likeArr.unlike,
    });*/
    setLikeImage(!likeImage);
    setDisLikeImage(false);
    firebaseAnalytics.logEvent(
      details.content_type === 'movie' ? 'movieLike' : 'showLike',
      {
        eventCategory:
          details.content_type === 'movie' ? 'movie_like' : 'show_like',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details &&
          details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
    windowAny.Moengage.track_event(
      details.content_type === 'movie' ? 'movieLike' : 'showLike',
      {
        eventCategory:
          details.content_type === 'movie' ? 'movie_like' : 'show_like',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details &&
          details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
    console.log('props.content_type: ', details.content_type);
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
    // webfox.postREAnalytics(params1).then(({ data, error }) => {});
    // pushDataLocalStorage(
    //   LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS,
    //   details._id,
    //   'ID'
    // );
    // pushDataLocalStorage(
    //   LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ,
    //   details,
    //   'OBJ'
    // );
  };

  const handleDislike = (details) => {
    setDisLikeImage(!disLikeImage);
    setLikeImage(false);
    if (props.isLiked) {
      actionDispatch(actions.ADDED_TO_LIKED, details);
    }
    actionDispatch(actions.ADDED_TO_DISLIKE, details);

    /*actionDispatch(actions.ADDED_TO_DISLIKE, {
      details,
      liking: !webstore.dislikedMovie.liking,
    });*/
    webfox.postAllDislikedMovie(params).then(({ data, error }) => {
      console.log('Post ', JSON.stringify(data));
    });
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
    firebaseAnalytics.logEvent(
      details.content_type === 'movie' ? 'movieDislike' : 'showDislike',
      {
        eventCategory:
          details.content_type === 'movie' ? 'movie_dislike' : 'show_dislike',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details &&
          details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
    windowAny.Moengage.track_event(
      details.content_type === 'movie' ? 'movieDislike' : 'showDislike',
      {
        eventCategory:
          details.content_type === 'movie' ? 'movie_dislike' : 'show_dislike',
        eventAction: window.location.pathname,
        eventLabel:
          details.name +
          (details &&
          details.primary_language &&
          details.primary_language.name != undefined
            ? `/${details.primary_language?.name}`
            : '') +
          (details._id ? '/' + details._id : '/' + details.id),
        eventValue: details.ottplay_rating,
      }
    );
    // pushDataLocalStorage(
    //   LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_IDS,
    //   details._id,
    //   'ID'
    // );
    // pushDataLocalStorage(
    //   LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ,
    //   details,
    //   'OBJ'
    // );
  };

  const handleCritics = (type, name, key) => {
    Router.push({
      pathname: `/movie/${props.details.name
        .toLowerCase()
        .replace(/ /g, '-')}/${props.details.movie_id}/critics-review`,
      query: { type, name, key },
    });
  };

  const moreProvider = (provider) => {
    if (provider && provider.length > 2) {
      return ' . +' + (provider.length - 2).toString();
    }
    return '';
  };

  const setsynopContentBoxHeight = () => {
    const ele = document.getElementById('movieSynopHeader');
    if (ele) {
      return `calc(100% - ${ele.clientHeight + 50 + 'px'}`;
    }
    return 'calc(100% - 80px)';
  };

  const isDescriptionOverflowing = () => {
    const ele = document.getElementById('movieShowSynopsis');
    if (ele) {
      if (ele.scrollHeight == ele.clientHeight) {
        return false;
      }
    }
    return true;
  };

  const handleCastCrew = (crewObj, id, name, type, url) => {
    Router.push({
      pathname: `/${url}`,
      query: { id, name, type, url, sourcePage: props.sourcePage },
    });
  };

  const handleShare = () => {
    setShareImage(!shareImage);
    setShareModalOpen(true);
  };

  const handleShareClose = () => {
    setShareImage(!shareImage);
    setShareModalOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid
        // xs={12}
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.movie_container}
      >
        <Hidden only={['xs']}>
          <Grid item sm={1} lg={2} className={classes.ctaIcons}>
            <Grid
              item
              // xs={12}
              container
              spacing={2}
              direction="column"
              justify="center"
              className={classes.movie_cta}
            >
              <Grid item xs={12} className={classes.movie_option_container}>
                <ImageComponent
                  src={
                    props.isSelected
                      ? 'https://images.ottplay.com/static/Group 7583.svg'
                      : hoverAdd
                      ? 'https://images.ottplay.com/static/addHooverDetail.svg'
                      : 'https://images.ottplay.com/static/Group 13518.svg'
                  }
                  className={classes.movie_option}
                  // onMouseOver={() => setHoverAdd(true)}
                  // onMouseLeave={() => setHoverAdd(false)}
                  alt="tick-icon"
                  // onClick={() => handleAddToWatchlist(props.details)}
                />
              </Grid>

              <Grid item xs={12} className={classes.movie_option_container}>
                <ImageComponent
                  src={
                    props.isLiked
                      ? 'https://images.ottplay.com/static/Group 13511.svg'
                      : hoverLike
                      ? 'https://images.ottplay.com/static/hoverLikeDetail.svg'
                      : 'https://images.ottplay.com/static/Group 7044.svg'
                  }
                  className={classes.movie_option}
                  // onMouseOver={() => setHoverLike(true)}
                  // onMouseLeave={() => setHoverLike(false)}
                  alt="like icon"
                  // onClick={() => handleLike(props.details)}
                />
              </Grid>
              <Grid item xs={12} className={classes.movie_option_container}>
                <ImageComponent
                  src={
                    props.isDisliked
                      ? 'https://images.ottplay.com/static/dislikeddetail.svg'
                      : hoverDislike
                      ? 'https://images.ottplay.com/static/hoverdislikedetail.svg'
                      : 'https://images.ottplay.com/static/Group 8470.svg'
                  }
                  className={classes.movie_option}
                  // onMouseOver={() => setHoverDislike(true)}
                  // onMouseLeave={() => setHoverDislike(false)}
                  alt="dislike icon"
                  // onClick={() => handleDislike(props.details)}
                />
              </Grid>
              {/* <Grid item xs={12} className={classes.movie_option_container}>
                <ImageComponent
                  src={
                    reviewImage
                      ? reviewButton.review
                      : reviewButton.reviewSelect
                  }
                  className={classes.movie_option}
                  onMouseOver={() => setReviewImage(!reviewImage)}
                  onMouseOut={() => setReviewImage(!reviewImage)}
                  alt=""
                  onClick={() =>
                    handleCritics(
                      props.details.content_type,
                      props.details.name,
                      props.details.movie_id
                    )
                  }
                />
              </Grid> */}
              <Grid item xs={12} className={classes.movie_option_container}>
                <ImageComponent
                  src={
                    shareImage
                      ? 'https://images.ottplay.com/static/shareIcon.svg'
                      : 'https://images.ottplay.com/static/Group 13517.svg'
                  }
                  className={classes.movie_option}
                  // onMouseOver={() => setShareImage(!shareImage)}
                  // onMouseOut={() => setShareImage(!shareImage)}
                  alt=""
                  // onClick={() => handleShare()}
                />
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid
          item
          xs={12}
          sm={10}
          lg={8}
          container
          className={classes.contentBox}
          direction="row"
        >
          <Grid item xs={12} sm={5} className={classes.contentLeftBox}>
            <Grid className={classes.paper}>
              <Grid
                item
                xs={12}
                container
                spacing={1}
                direction="column"
                justify="center"
                alignItems="flex-start"
                className={classes.leftBox}
              >
                <Grid item xs={12} className={classes.movieNameBox}>
                  <div className={classes.movieName}>{props.name}</div>
                </Grid>
                <div className={classes.oneLine}>
                  <Grid item className={classes.matchBox}>
                    <div className={classes.iconBox}>
                      {props.details.match ? (
                        <span className={classes.match}>
                          {props.match}% MATCH
                        </span>
                      ) : null}
                      {/* <span
                        className={classes.imgBox}
                        onMouseOver={() => setHoverTooltip(true)}
                        onMouseLeave={() => setHoverTooltip(false)}
                      >
                        <Tippy
                          placement={'top-end'}
                          className={classes.tooltip}
                          content={<span>Because you watched Joker</span>}
                        >
                          <ImageComponent
                            style={{ cursor: 'pointer' }}
                            src={hoverTooltip ? help_hover : help}
                            alt=""
                          />
                        </Tippy>
                      </span> */}
                      {props.rating ? (
                        <span className={classes.rating}>
                          <b>{props.rating.toFixed(1)}</b>
                          <ImageComponent
                            src="https://images.ottplay.com/static/reel_logo.png"
                            alt="rating icon"
                          />{' '}
                        </span>
                      ) : null}

                      {props.criticScore ? (
                        <span className={classes.score}>
                          {' '}
                          {props.criticScore}{' '}
                        </span>
                      ) : null}

                      {props.details.criticScore ? (
                        <span className={classes.certificate}>
                          {' '}
                          Critics Score{' '}
                        </span>
                      ) : null}
                    </div>
                  </Grid>
                  <React.Fragment>
                    {props &&
                      props.details &&
                      props.details.primary_language &&
                      props.details.primary_language.name && (
                        <Grid item className={classes.release}>
                          <div
                            style={{
                              padding: '2px 5px',
                              display: 'flex',
                              justifyContent: 'center',
                              width: 'max-content',
                            }}
                          >
                            {props.details.primary_language.name}
                          </div>
                        </Grid>
                      )}
                    {props.release_year === null ? null : (
                      <Grid item className={classes.release}>
                        <div
                          style={{
                            padding: '2px 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            width: 'max-content',
                          }}
                        >
                          {props.release_year}
                        </div>
                      </Grid>
                    )}
                    {props.details.run_time === 0 ||
                    props.details.run_time === undefined ||
                    props.details.run_time === null ? null : (
                      <Grid item className={classes.release}>
                        <div
                          style={{
                            padding: '2px 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            width: 'max-content',
                          }}
                        >
                          {props.details.run_time != null &&
                          props.details.run_time != 0
                            ? timeConvert(props.details.run_time)
                            : ''}
                        </div>
                      </Grid>
                    )}
                    {props.certification &&
                      props.certification.length > 0 &&
                      props.certification.map((item) =>
                        item.certification != '' ? (
                          <Grid item className={classes.release}>
                            <div
                              style={{
                                padding: '2px 5px',
                                display: 'flex',
                                justifyContent: 'center',
                                width: 'max-content',
                              }}
                            >
                              {item.certification}
                            </div>
                          </Grid>
                        ) : null
                      )}
                  </React.Fragment>
                </div>
                <Grid item xs={12} className={classes.leftInnerBox}>
                  <ImageComponent
                    className={classes.borderLine}
                    src="https://images.ottplay.com/static/Rectangle 3137.svg"
                    alt="border"
                  />
                </Grid>
                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                  <Grid item xs={12} className={classes.ctaIcons}>
                    <Grid
                      item
                      // xs={12}
                      container
                      spacing={2}
                      direction="row"
                      justify="center"
                      className={classes.movie_cta}
                    >
                      <Grid
                        item
                        xs={2}
                        className={classes.movie_option_container}
                      >
                        <ImageComponent
                          src={
                            props.isSelected
                              ? 'https://images.ottplay.com/static/Group 7583.svg'
                              : 'https://images.ottplay.com/static/Group 13518.svg'
                          }
                          className={classes.movie_option}
                          // onMouseOver={() => setTickImage(!tickImage)}
                          // onMouseOut={() => setTickImage(!tickImage)}
                          alt="tick icon"
                          // onClick={() => handleAddToWatchlist(props.details)}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        className={classes.movie_option_container}
                      >
                        <ImageComponent
                          src={
                            props.isLiked
                              ? 'https://images.ottplay.com/static/Group 13511.svg'
                              : 'https://images.ottplay.com/static/Group 7044.svg'
                          }
                          className={classes.movie_option}
                          // onMouseOver={() => setHoverLike(true)}
                          // onMouseLeave={() => setHoverLike(false)}
                          alt="like icon"
                          // onClick={() => handleLike(props.details)}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        className={classes.movie_option_container}
                      >
                        <ImageComponent
                          src={
                            props.isDisliked
                              ? 'https://images.ottplay.com/static/dislikeddetail.svg'
                              : hoverDislike
                              ? 'https://images.ottplay.com/static/hoverdislikedetail.svg'
                              : 'https://images.ottplay.com/static/Group 8470.svg'
                          }
                          className={classes.movie_option}
                          // onMouseOver={() => setHoverDislike(true)}
                          // onMouseLeave={() => setHoverDislike(false)}
                          alt="dislike icon"
                          // onClick={() => handleDislike(props.details)}
                        />
                      </Grid>
                      {/* <Grid
                        item
                        xs={2}
                        className={classes.movie_option_container}
                      >
                        <ImageComponent
                          src={
                            reviewImage
                              ? reviewButton.review
                              : reviewButton.reviewSelect
                          }
                          className={classes.movie_option}
                          onMouseOver={() => setReviewImage(!reviewImage)}
                          onMouseOut={() => setReviewImage(!reviewImage)}
                          alt=""
                          onClick={() =>
                            handleCritics(
                              props.details.content_type,
                              props.details.name,
                              props.details.movie_id
                            )
                          }
                        />
                      </Grid> */}
                      <Grid
                        item
                        xs={2}
                        className={classes.movie_option_container}
                      >
                        <ImageComponent
                          src={
                            shareImage
                              ? 'https://images.ottplay.com/static/shareIcon.svg'
                              : 'https://images.ottplay.com/static/Group 13517.svg'
                          }
                          className={classes.movie_option}
                          // onMouseOver={() => setShareImage(!shareImage)}
                          // onMouseOut={() => setShareImage(!shareImage)}
                          alt=""
                          // onClick={() => handleShare()}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Hidden>
                <Grid item xs={12} className={classes.certificate}>
                  <div style={{ display: 'flex', whiteSpace: 'pre-wrap' }}>
                    <b>
                      <span>
                        {props.content_type}
                        {props.genres && props.genres.length > 0 ? ' . ' : ''}
                      </span>
                    </b>{' '}
                    {/* {props.genres.join(' . ')} */}
                    {props.genres && props.genres.length > 0 ? (
                      <span>
                        {props.genres.map((genre, index) => {
                          return (
                            <span
                              className={classes.link}
                              onClick={() =>
                                Router.push({
                                  pathname:
                                    props.content_type === 'Movie'
                                      ? '/movies'
                                      : '/shows',
                                  query: {
                                    forPage: 'genres',
                                    // data: { name: `${genre}` },
                                  },
                                })
                              }
                            >
                              {genre}
                              {index !== props.genres.length - 1 ? ' . ' : ' '}
                            </span>
                          );
                        })}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </Grid>
                {props.providers && props.providers.length > 0 ? (
                  <Grid item xs={12} className={classes.certificate}>
                    <div>
                      {/* <b>On . </b> {props.providers.join(' . ')} */}
                      <b>On . </b>
                      {props.providers.slice(0, 2).map((item, index) => {
                        return (
                          <span
                            className={classes.link}
                            onClick={() =>
                              window.open(
                                item.movie_url ? item.movie_url : item.show_url
                              )
                            }
                          >
                            {item.provider.name}
                            {index < props.providers.slice(0, 2).length - 1
                              ? '. '
                              : null}
                          </span>
                        );
                      })}
                      {moreProvider(props.providers)}
                    </div>
                  </Grid>
                ) : null}
                {props.director_details !== null &&
                props.director_details !== '' ? (
                  <Grid item xs={12} className={classes.certificate}>
                    <div>
                      <b>Director . </b>{' '}
                      <span
                        className={classes.link}
                        onClick={() =>
                          handleCastCrew(
                            props.director_details,
                            props.director_details.id,
                            props.director_details.name,
                            props.director_details.content_type,
                            props.director_details.seo_url
                          )
                        }
                      >
                        {props.director_details.name}
                      </span>
                    </div>
                  </Grid>
                ) : null}
                {props.cast_details != null && props.cast_details.length > 0 ? (
                  <Grid item xs={12} className={classes.certificate}>
                    <div>
                      <b>Starring . </b>
                      {props.cast_details.map((item, index) => {
                        return (
                          <span
                            className={classes.link}
                            onClick={() =>
                              handleCastCrew(
                                item,
                                item.id,
                                item.name,
                                item.content_type,
                                item.seo_url
                              )
                            }
                          >
                            {item.name}
                            {index < props.cast_details.length - 1
                              ? ', '
                              : null}
                          </span>
                        );
                      })}
                    </div>
                  </Grid>
                ) : null}
                {props.description && props.description.length > 0 ? (
                  <Grid item xs={12} className={classes.descBox}>
                    <div
                      id={'movieShowSynopsis'}
                      className={[
                        classes.desc,
                        classes.multiLineTruncating,
                      ].join(' ')}
                    >
                      {removeHTMLTags(decodeURIComponent(props.description))}
                    </div>
                  </Grid>
                ) : null}
                {props.description &&
                props.description.length > 0 &&
                props.description.replace(/\s/g, '').length > 0 &&
                isDescriptionOverflowing() ? (
                  <Grid item xs={12} className={classes.descBox}>
                    <div
                      className={classes.readMoreBox}
                      onClick={() => setModalIsOpen(true)}
                    >
                      <div className={classes.readMore}>Read More</div>
                    </div>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
            <Modal
              isOpen={modalIsOpen}
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
                  top: width > 600 ? '0%' : '15%',
                  left: width > 600 ? '50%' : '0%',
                  right: '0%',
                  bottom: '0%',
                  border: '1px solid #ccc',
                  background: '#fff',
                  overflow: 'hidden',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '0px',
                  outline: 'none',
                  padding: '0px',
                  zIndex: '999',
                  overflowY: 'hidden',
                },
              }}
              onAfterOpen={() => {
                document.body.style.overflow = 'hidden';
              }}
              onAfterClose={() => {
                document.body.style.overflow = 'auto';
              }}
            >
              <Grid
                xs={12}
                item
                container
                className={classes.synopHeader}
                id="movieSynopHeader"
              >
                <Grid xs={11} item className={classes.synopHeading}>
                  Synopsis
                  {/* : {props.synopTitle} */}
                </Grid>
                <Grid
                  xs={1}
                  className={classes.synopClose}
                  item
                  onClick={() => setModalIsOpen(false)}
                >
                  <ImageComponent
                    src="https://images.ottplay.com/static/close.svg"
                    alt="close icon"
                  />
                </Grid>
              </Grid>

              <Grid
                xs={12}
                className={classes.synopContentBox}
                style={{ height: setsynopContentBoxHeight() }}
              >
                {/* ad codes
                <Grid xs={12} container className={classes.advert}>
                  <ImageComponent src={ads} alt="ad" />
                </Grid> */}
                <div className={classes.synopContent}>
                  <Grid xs={12} container>
                    <p className={classes.synopContentTitle}>
                      {props.synopTitle}
                    </p>
                    <p
                      className={classes.synopContentDesc}
                      dangerouslySetInnerHTML={{
                        __html: decodeURIComponent(props.description),
                      }}
                    >
                      {/* {props.synopDescription} */}
                    </p>
                    {props.faq ? (
                      <React.Fragment>
                        <p
                          className={classes.faqDesc}
                          // dangerouslySetInnerHTML={{
                          //   __html: decodeURIComponent(props.description),
                          // }}
                        >
                          {props.faq}
                        </p>
                      </React.Fragment>
                    ) : null}
                  </Grid>
                </div>
              </Grid>
            </Modal>
            <Modal
              isOpen={shareModalOpen}
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
                  background: 'rgb(42, 29, 63)',
                  overflow: 'hidden',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: width > 600 ? 4 : 0,
                  outline: 'none',
                  padding: '0px',
                  zIndex: '999',
                  margin: 'auto',
                  width: '400px',
                  height: 'auto',
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
              <Grid xs={12} container>
                <Grid container xs={12} className={classes.header}>
                  <Grid xs={10} sm={6} item>
                    <div className={classes.pageHeader}>Share via</div>
                  </Grid>
                  <Grid xs={2} sm={6} item className={classes.closeGrid}>
                    <div className={classes.closeContainer}>
                      <ImageComponent
                        src="https://images.ottplay.com/static/close.svg"
                        alt="close icon"
                        // onClick={() => handleShareClose()}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container xs={12} className={classes.shareBox}>
                  <FacebookShareButton
                    url={`https://www.ottplay.com/${props.details.content_type}/${props.seo}`}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={`https://www.ottplay.com/${props.details.content_type}/${props.seo}`}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={`https://www.ottplay.com/${props.details.content_type}/${props.seo}`}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <LinkedinShareButton
                    url={`https://www.ottplay.com/${props.details.content_type}/${props.seo}`}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  {/* <EmailShareButton
                    url={`https://www.ottplay.com/${props.details.content_type}/${props.seo}`}
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton> */}
                </Grid>
              </Grid>
            </Modal>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            style={{
              borderRadius: '0 8px 8px 0',
            }}
          >
            {props.trailer_url ? (
              <MovieTrailer
                height={width > 600 ? 400 : 210}
                url={props.trailer_url}
              />
            ) : (
              <Card className={classes.mediaBox}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt="card Image"
                  image={
                    props.backdrop ||
                    'https://images.ottplay.com/static/poster_default.png'
                  }
                />
              </Card>
            )}
          </Grid>
        </Grid>
        <Grid item sm={1} lg={2}></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#170732',
    height: '400px',
    width: '100%',
    borderRadius: '8px 0px 0px 8px',
    overflow: 'hidden',
  },
  borderLine: {
    width: '100%',
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginBottom: 4,
    marginLeft: 2,
  },
  socialIcons: {
    cursor: 'pointer',
  },
  media: {
    height: '400px',
    width: 'auto',
    padding: '25px 0px',
    borderRadius: '6px',
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      color: '#29F87E',
    },
  },
  //share modal
  header: {
    padding: '10px 20px 15px 18px',
  },
  pageHeader: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 'clamp(20px, 1.8vw, 30px)',
    fontWeight: 600,
    letterSpacing: '0px',
    opacity: 1,
  },
  closeGrid: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'right',
    cursor: 'pointer',
    '& img': {
      width: 15,
    },
  },
  shareBox: {
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px',
    paddingTop: '5px',
    // maxHeight: '30rem',
    '& svg': {
      marginRight: 10,
    },
  },
  //share modal
  oneLine: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    margin: '2%',
    marginLeft: '1px',
  },
  movieName: {
    color: '#ffffff',
    fontWeight: 700,
    fontSize: 'clamp(20px, 2vw, 35px)',
    lineHeight: 'clamp(18px, 2.3vw, 32px)',
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
  },
  imgBox: {
    width: 18,
    height: 19,
    marginRight: 15,
  },
  synopContentTitle: {
    fontSize: 'clamp(16px, 2.2vw, 28px)',
    color: '#000000',
    fontWeight: 600,
    margin: 0,
    width: '100%',
  },
  synopContentBox: {
    overflowY: 'auto',
    height: 'calc(100% - 70px)',
    marginTop: 15,
    marginRight: 18,
    scrollbarWidth: 'thin',
    scrollbarColor: '#4A3FB3 #D9D9D9',
    '&::-webkit-scrollbar': {
      width: 12,
    },
    '&::-webkit-scrollbar-track': {
      background: '#D9D9D9',
      borderRadius: 20,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#4A3FB3',
      borderRadius: 20,
      border: '4px solid #D9D9D9',
    },
  },
  synopContentDesc: {
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    color: '#565656',
    fontWeight: 400,
    margin: 0,
    marginTop: 4,
    textAlign: 'justify',
    whiteSpace: 'break-spaces',
  },
  faqDesc: {
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    color: '#565656',
    fontWeight: 400,
    margin: 0,
    marginTop: 4,
    textAlign: 'justify',
    whiteSpace: 'break-spaces',
  },
  synopClose: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& img': {
      width: 'clamp(14px, 1.4vw, 23px)',
    },
  },
  match: {
    color: '#03F87E',
    fontWeight: 600,
    margin: '5px',
    marginLeft: 2,
    fontSize: '18px',
  },
  contentBox: {
    padding: '0px !important',
  },
  leftBox: {
    margin: 0,
  },
  readMore: {
    cursor: 'pointer',
    color: '#FF3068',
    fontSize: 'clamp(12px, 1.1vw, 14px)',
    fontWeight: 600,
    paddingLeft: 4,
  },
  score: {
    color: '#03F87E',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 'clamp(12px, 1.1vw, 16px)',
  },
  release: {
    backgroundColor: '#342c45',
    color: '#D6C6F4',
    fontSize: 'clamp(13px, 1.1vw, 16px)',
    background: '#331A5D 0% 0% no-repeat padding-box',
    borderRadius: '4px',
    opacity: 0.7,
    margin: '0 5px',
  },
  certificate: {
    color: '#D6C6F4',
    fontSize: 'clamp(13px, 1.1vw, 16px)',
    opacity: 0.7,
    width: '100%',
    padding: '0px 6px 2px 6px !important',
  },
  readMoreBox: {
    color: '#D6C6F4',
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    opacity: 0.8,
    width: '100%',
    padding: '0px 0px 2px 0px !important',
    lineHeight: '10px',
  },
  desc: {
    fontSize: 'clamp(13px, 1.1vw, 16px)',
    padding: '0px !important',
    color: '#ffffff',
    overflow: 'hidden',
  },
  multiLineTruncating: {
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    paddingLeft: '3px !important',
  },
  rating: {
    backgroundColor: '#000000',
    color: '#D6C6F4',
    fontSize: 'clamp(13px, 1.1vw, 16px)',
    borderRadius: '6px',
    padding: '3px 6px',
    display: 'flex',
    alignItems: 'center',
    marginRight: 8,
    '& img': {
      marginLeft: 4,
      width: 18,
    },
  },
  tooltip: {
    textAlign: 'right',
    fontSize: '12px',
    color: '#FFFFFF',
    backgroundColor: '#170732',
    border: '1px solid #03F87E',
    height: '42px',
    padding: '7px',
  },
  synopHeading: {
    fontSize: 'clamp(14px, 1.8vw, 20px)',
    fontWeight: 500,
  },
  synopHeader: {
    backgroundColor: '#D6C6F490',
    boxShadow: '0px 3px 6px #00000029',
    textAlign: 'left',
    fontSize: '28px',
    letterSpacing: '0px',
    color: '#000000',
    padding: '10px 30px',
    cursor: 'pointer',
    marginBottom: 15,
  },
  advert: {
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      width: '80%',
    },
  },
  synopContent: {
    padding: '20px 45px 20px 30px',
    paddingTop: 0,
  },
  ctaIcons: {
    padding: '0px !important',
    color: '#FFFFFF',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    display: 'flex',
    height: 400,
  },
  movie_container: {
    margin: 0,
  },
  movie_option_container: {
    [theme.breakpoints.down('md')]: {
      padding: '8px 8px 8px 0px !important',
    },
    cursor: 'pointer',
  },
  movie_option: {
    width: 'clamp(38px, 3.2vw, 52px)',
    height: 'clamp(38px, 3.2vw, 52px)',
  },
  movie_cta: {
    padding: '10px',
    margin: '10px',
    alignItems: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      width: '8px',
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 2px 0 0px',
    },
  },
  mediaBox: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#170732',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: 'none',
    borderLeft: '1px solid rgb(61 47 88 / 60%)',
  },
  [theme.breakpoints.down('xs')]: {
    movie_container: {
      margin: '0px !important',
    },
    mediaBox: {
      borderLeft: 'none',
    },
    contentLeftBox: {
      order: 1,
    },
    match: {
      fontSize: 13,
      marginLeft: 0,
    },
    tooltip: {
      '& img': {
        width: 15,
        height: 14,
      },
    },
    readMoreBox: {
      padding: '4px 0px 2px 0px !important',
    },
    media: {
      height: '250px',
      width: 'auto',
    },
    //share modal
    header: {
      padding: '15px 20px 5px 18px',
    },
    pageHeader: {
      fontWeight: 600,
    },
    closeContainer: {
      '& img': {
        width: 14,
      },
    },
    shareBox: {
      padding: '0 8px',
      paddingBottom: 30,
    },
    //share modal
    imgBox: {
      width: 15,
      height: 14,
      '& img': {
        width: 15,
        height: 14,
      },
    },
    oneLine: {
      margin: '2% 0px',
    },
    desc: {
      marginLeft: 0,
      height: 'auto',
    },
    descBox: {
      padding: '0px !important',
      paddingTop: '2px !important',
    },
    certificate: {
      marginLeft: 0,
      paddingLeft: '0px !important',
    },
    paper: {
      padding: '14px 16px',
      height: '100%',
      borderRadius: 0,
    },
    leftInnerBox: {
      paddingLeft: '0px !important',
    },
    matchBox: {
      paddingLeft: '0px !important',
    },
    movieNameBox: {
      paddingLeft: '0px !important',
      paddingTop: '0px !important',
      paddingBottom: '0px !important',
    },
    movie_cta: {
      justifyContent: 'normal',
      margin: 0,
      padding: '4px 0px 4px 0px !important',
    },
    ctaIcons: {
      minHeight: 0,
      height: 'auto',
      width: '100%',
    },
    movie_option_container: {
      padding: '0px !important',
    },
    synopHeader: {
      padding: '12px 15px',
    },
    synopHeading: {
      lineHeight: '19px',
      fontWeight: 800,
    },
    synopContentBox: {
      marginRight: 10,
      marginTop: 13,
      height: '80%',
      overflowX: 'hidden',
      overflowY: 'scroll',
    },
    advert: {
      marginBottom: 13,
    },
    synopContentTitle: {
      lineHeight: '20px',
      marginTop: 0,
    },
    synopContentDesc: {
      lineHeight: '16px',
      color: '#565656',
      marginTop: 8,
    },
    faqDesc: {
      lineHeight: '16px',
      color: '#565656',
      marginTop: 8,
    },
    synopContent: {
      padding: '0px 15px 20px 15px',
    },
  },
}));
