import { Button, makeStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  generatePermalink,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  sortProvidersByUserPreference,
} from '../../utils/constants';
import React, { useContext, useEffect } from 'react';
import { removeAllHTMLTags, timeConvert } from '../../utils/helper';

import ImageComponent from '../Images';
import Modal from 'react-modal';
import MovieTrailer from '../MovieTrailer';
import { ViewportContext } from '../ViewportProvider';
import WatchNowModal from '../WatchNowModal';
import { WebfoxContext } from '../../services/webfox';
import { contextParamsForREAnalytics } from '../../utils/constants';
import { firebaseAnalytics } from '../firebaseConfig';
import { useRouter } from 'next/router';

export function MovieShowListicleCard({ ...props }) {
  const router = useRouter();
  const { order, data, readMoreHandler, description } = props;
  const classes = useStyles();
  const [modalOpen, setmodalOpen] = React.useState(false);
  const { width } = React.useContext(ViewportContext);
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage?.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  const providersNameArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage?.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
  );
  const renderOttyplayRating = () => {
    return (
      <span className={classes.imdbTag}>
        <b>{data.ottplay_rating}</b>
        <ImageComponent
          src="https://images.ottplay.com/static/reel_logo.png"
          className={classes.imdbImage}
          alt="ottplay rating icon"
        />
        <b className={classes.imdbText}>OTTplay Rating</b>
      </span>
    );
  };

  const handleCloseModal = () => {
    setmodalOpen(false);
  };

  const isBioOverflowing = () => {
    const ele =
      typeof window !== 'undefined'
        ? document?.getElementById(`ListicleMovieShowSyn${data.name}`)
        : null;
    if (ele) {
      if (ele.scrollHeight == ele.clientHeight) {
        return false;
      }
    }
    return true;
  };

  const renderTags = () => {
    return (
      <div className={classes.tagWrap}>
        {data.primary_language && data.primary_language.name ? (
          <div className={classes.tag}>{data.primary_language.name}</div>
        ) : (
          ''
        )}
        {data.release_year ? (
          <div className={classes.tag}>{data.release_year}</div>
        ) : (
          ''
        )}
        {data.run_time && data.run_time > 0 ? (
          <div className={classes.tag}>{timeConvert(data.run_time)}</div>
        ) : (
          ''
        )}
        {data.certifications &&
        data.certifications.length > 0 &&
        data.certifications[0].certification ? (
          <div className={classes.tag}>
            {data.certifications[0].certification}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  };

  const handleSingleProvider = (card) => {
    window.open(card.movie_url ? card.movie_url : card.show_url);
  };

  const renderWatchNowButton = () => {
    return (
      <Button
        className={[
          classes.playButton,
          data.where_to_watch.length < 1 && classes.disableButton,
        ].join(' ')}
        onClick={() => {
          firebaseAnalytics.logEvent(' watchnow_listicle_detail', {
            eventCategory: ' watchnow_listicle_detail',
            eventAction: data.name + '/' + data._id,
          });
          if (data.where_to_watch && data.where_to_watch.length == 1) {
            handleSingleProvider(data.where_to_watch[0]);
          } else {
            setmodalOpen(true);
          }
        }}
      >
        <ImageComponent
          src="/static/mobile_images/play_icon_mobile.svg"
          alt="video play icon"
        />
        Watch Now
      </Button>
    );
  };
  const handleCard = (obj, key, content_type, name, s_url, p_url) => {
    let url = '';
    if (p_url === null || p_url === undefined || p_url === '') {
      url = generatePermalink(content_type, s_url);
    } else {
      url = p_url;
    }
    const currentPath = location.pathname;
    const params = {
      event: 'title_click',
      details: {
        page_name: currentPath,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: props && props.type ? props.type : '',
        name: name !== undefined ? name : '',
        formatted_id:
          obj &&
          obj.primary_language &&
          obj.primary_language !== undefined &&
          obj.primary_language.name &&
          obj._id
            ? obj.primary_language.name + '_' + obj._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params).then(({ data, error }) => {});
    router.push({
      pathname: `/${url}`,
      query: { key, content_type, name, url, source: props.sourcePage },
    });
  };
  return (
    <div className={classes.root}>
      <div
        className={classes.contentWrap}
        onClick={() => {
          handleCard(
            data,
            data.data_id ? data.movie_id : data.id,
            data.content_type,
            data.name,
            data.seo_url,
            data.permalink
          );
        }}
      >
        <div className={classes.orderWrap}>
          <div className={classes.order}>{order}</div>
          <div className={classes.titleWrap}>
            <div className={classes.title}>{data.name}</div>
            {data.ottplay_rating ? renderOttyplayRating() : ''}
          </div>
        </div>

        <div className={classes.posterWrap}>
          <div className={classes.content}>
            <div className={classes.poster}>
              {/* {data.videos_trailers &&
              data.videos_trailers.length > 0 &&
              data.videos_trailers[0].video_url ? (
                <MovieTrailer
                  url={data.videos_trailers[0].video_url}
                  height={'100%'}
                />
              ) : ( */}
              <ImageComponent
                className={classes.posterImg}
                src={
                  data.backdrops &&
                  data.backdrops.length > 0 &&
                  data.backdrops[0].url
                    ? data.backdrops[0].url
                    : 'https://images.ottplay.com/static/poster_default.png'
                }
                alt="poster"
              />
              {/* )} */}
            </div>
          </div>
        </div>
        {/* hiding tags  */}
        {/* {renderTags()} */}
        {description && (
          <>
            <div
              id={`ListicleMovieShowSyn${data.name}`}
              className={classes.synopsis}
            >
              {removeAllHTMLTags(description)}
            </div>
            {isBioOverflowing() && (
              <div
                className={classes.readMore}
                onClick={(e) => {
                  e.stopPropagation();
                  readMoreHandler(
                    true,
                    encodeURIComponent(description),
                    data.name
                  );
                }}
              >
                read more
              </div>
            )}
          </>
        )}
      </div>
      {renderWatchNowButton()}

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
            background: 'rgb(19, 7, 38)',
            WebkitOverflowScrolling: 'touch',
            borderRadius: width > 600 ? 4 : 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            outline: 'none',
            padding: '0px',
            zIndex: '999',
            margin: 'auto',
            width: width < 600 ? '100%' : '604px',
            height: width < 600 ? '70vh' : '600px',
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
          whereToWatch={sortProvidersByUserPreference(
            data.where_to_watch || data.providers,
            providersNameArr
          )}
          title={data.name}
          rating={data.ottplay_rating}
          genres={data.genres && data.genres.slice(0, 2).map((n) => n.name)}
          content_type={data.content_type}
          poster={data.posters}
        />
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // backgroundColor: 'black',
  },
  contentWrap: {
    cursor: 'pointer',
  },
  orderWrap: {
    display: 'flex',
    color: 'white',
    alignItems: 'center',
    paddingBottom: '8px',
  },
  titleWrap: {
    paddingLeft: '8px',
  },
  readMore: {
    cursor: 'pointer',
    paddingBottom: '20px',
    fontSize: 'clamp(13px, 1.2vw, 12px)',
    color: '#FF4376',
    textTransform: 'capitalize',
    fontWeight: 600,
  },
  title: {
    fontSize: 'clamp(20px, 1.4vw, 16px)',
    lineHeight: 'clamp(22px, 1.4vw, 18px)',
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    cursor: 'pointer',
  },
  order: {
    fontSize: '57px',
    color: '#605376',
    fontWeight: 'bold',
  },
  poster: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  posterImg: {
    borderRadius: '8px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  movieTrailer: {
    display: 'contents !important',
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
    backgroundColor: '#10032475',
    color: '#fff',
    padding: '4px 5px',
    fontSize: '12px',
    borderRadius: '4px',
    display: 'flex',
    width: 'fit-content',
    alignItems: 'center',
    fontFamily: `"Montserrat", "Arial", "sans-serif"`,
  },
  posterWrap: {
    display: 'block',
    content: '',
    position: 'relative',
    paddingBottom: '60%', // to maintain aspect ratio
    cursor: 'pointer',
    backgroundColor: '#1E0B40',
    borderRadius: '8px',
    '&:focus, &:hover, &:active': {
      opacity: 0.8,
    },
    marginBottom: '11px',
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tagWrap: {
    gap: '4px',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '11px',
  },
  tag: {
    backgroundColor: '#28104D',
    borderRadius: '3px',
    padding: '6px 8px',
    color: '#D6C6F470',
    fontSize: '12px',
  },
  synopsis: {
    color: 'white',
    fontSize: 'clamp(16px, 1.2vw, 14px)',
    fontWeight: 600,
    marginBottom: '11px',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
  },
  playButton: {
    fontFamily: `"Montserrat", "Arial", "sans-serif"`,
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
    visibility: 'hidden',
  },
}));
