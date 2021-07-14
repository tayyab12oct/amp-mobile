import { Button, makeStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  generatePermalink,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
} from '../../utils/constants';
import React, { useContext, useEffect } from 'react';

import ImageComponent from '../Images';
import { WebfoxContext } from '../../services/webfox';
import { contextParamsForREAnalytics } from '../../utils/constants';
import { removeAllHTMLTags } from '../../utils/helper';
import { useRouter } from 'next/router';

export function CastCrewListicleCard({ ...props }) {
  const router = useRouter();
  const { order, readMoreHandler, data } = props;
  const classes = useStyles();
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
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  const providersNameArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
  );
  const isBioOverflowing = () => {
    const ele = document.getElementById(`ListicleCastCrewBio${data.name}`);
    if (ele) {
      if (ele.scrollHeight == ele.clientHeight) {
        return false;
      }
    }
    return true;
  };
  const handleCastCrew = (crewObj, id, name, type, s_url, p_url) => {
    const currentPath = location.pathname;
    // let url = '';
    // if (p_url === null || p_url === undefined || p_url === '') {
    //   url = generatePermalink(type, s_url);
    // } else {
    //   url = p_url;
    // }
    const params = {
      event: 'title_click',
      details: {
        // page_name: currentPath,
        // title_type: type,
        // title_name: name,
        // title_id: id,
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: props && props.type ? props.type : '',
        name: crewObj && crewObj.name ? crewObj.name : '',
        formatted_id:
          crewObj &&
          crewObj.primary_language &&
          crewObj.primary_language.name + '_' + crewObj._id,
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params).then(({ data, error }) => {});
    router.push({
      pathname: `/${s_url}`,
      query: { id, name, type, s_url, sourcePage: props.sourcePage },
    });
  };
  return (
    <div className={classes.root}>
      <div
        className={classes.contentWrap}
        onClick={() => {
          handleCastCrew(
            data,
            data.id,
            data.name ? data.name : null,
            data.content_type ? data.content_type : null,
            data.seo_url ? data.seo_url : null,
            data.permalink ? data.permalink : null
          );
        }}
      >
        <div className={classes.imageorderWrap}>
          <div className={classes.orderWrap}>
            {order > 9 ? order : '0' + order}
          </div>
          <div className={classes.posterContainer}>
            <div className={classes.posterWrap}>
              <ImageComponent
                src={
                  data && data.headshot
                    ? data.headshot
                    : 'https://images.ottplay.com/static/poster_default.png'
                }
              />
            </div>
          </div>
        </div>
        <div className={classes.title}>{data.name ? data.name : ''}</div>
      </div>
      {data && data.full_bio && (
        <>
          {/* hide synopsis */}
          <div
            className={classes.synopsis}
            id={`ListicleCastCrewBio${data.name}`}
          >
            {removeAllHTMLTags(data.full_bio)}
          </div>
          {isBioOverflowing() && (
            <div
              className={classes.readMore}
              onClick={(e) => {
                e.stopPropagation();
                readMoreHandler(
                  true,
                  encodeURIComponent(data.full_bio),
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
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    width: '100%',
  },
  contentWrap: {
    cursor: 'pointer',
  },
  imageorderWrap: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: '11px',
  },
  orderWrap: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '86px',
    color: '#60537660',
    lineHeight: '86px',
    fontFamily: `"MS Reference", "Montserrat", "Arial", "sans-serif"`,
  },
  posterWrap: {
    display: 'block',
    content: '',
    position: 'relative',
    paddingBottom: '150%', // to maintain aspect ratio
    borderRadius: '4px',
    backgroundColor: '#1E0B40',
    '& img': {
      width: '100%',
      height: '100%',
      borderRadius: '4px',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      objectFit: 'cover',
      objectPosition: 'top',
    },
  },
  posterContainer: {
    width: '40%',
    maxWidth: '127px',
  },
  title: {
    fontSize: 'clamp(16px, 1.4vw, 14px)',
    fontWeight: 600,
    textTransform: 'capitalize',
    paddingBottom: '8px',
    cursor: 'pointer',
  },

  poster: {
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
    '& img': {
      borderRadius: '8px',
      width: '100%',
      height: '100%',
    },
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  synopsis: {
    cursor: 'pointer',
    color: '#ffffff',
    fontSize: 'clamp(13px, 1.2vw, 12px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    fontWeight: 400,
  },
  readMore: {
    cursor: 'pointer',
    paddingTop: '20px',
    fontSize: 'clamp(13px, 1.2vw, 12px)',
    color: '#FF4376',
    textTransform: 'capitalize',
    fontWeight: 600,
  },
  [theme.breakpoints.down('xs')]: {
    orderWrap: {
      fontSize: '100px',
      lineHeight: '100px',
    },
  },
}));
