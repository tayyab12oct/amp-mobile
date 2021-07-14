import { Theme, makeStyles } from '@material-ui/core';

import ImageComponent from '../Images';
import { PublishDetails } from './PublishDetails';
import React from 'react';
import { getWebpUrl } from '../../utils/helper';

export function NewsCard({ ...props }) {
  const {
    item,
    handleClick,
    type,
    filter,
    setFilter,
    contentType,
    sourceSelected,
  } = props;
  const classes = useStyles();

  const getTitle = () => {
    switch (contentType) {
      case 'news':
        return item.title ? item.title : null;
      case 'interview':
        return item.title ? item.title : null;
      case 'listicle':
        return item.name ? item.name : null;
      default:
        return null;
    }
  };

  const getImageUrl = () => {
    switch (contentType) {
      case 'news':
      case 'interview':
        return item?.cover_image && item?.cover_image?.url
          ? getWebpUrl(item?.cover_image?.url, {
              width: 100,
              height: 'auto',
            })
          : null;
      case 'listicle':
        return item?.images && item?.images?.length > 0
          ? getWebpUrl(item?.images[0]?.url, {
              width: 100,
              height: 'auto',
            })
          : null;
      default:
        return null;
    }
  };

  return (
    <div
      className={classes.newsCardWrap}
      onClick={() => {
        handleClick(
          item.link,
          item._id,
          item.publisher,
          item.publisher_short,
          item.ottplay_id,
          item.seo_url
        );
      }}
    >
      {getImageUrl() ? (
        <div className={classes.posterImageWrap}>
          <div className={classes.crad}>
            <div className={classes.posterImageContent}>
              <ImageComponent
                className={classes.posterImage}
                src={
                  getImageUrl()
                    ? getImageUrl()
                    : 'https://images.ottplay.com/static/poster_default.png'
                }
                alt="review_image"
              />
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={[
          classes.detailsWrap,
          type === 'listing' ? classes.detailsWrapMob : '',
        ].join(' ')}
        style={{ width: getImageUrl() ? '60%' : '100%' }}
      >
        <div
          className={[
            classes.newsTitle,
            type === 'listing' && classes.newsTitleLite,
          ].join(' ')}
          dangerouslySetInnerHTML={{
            __html: getTitle(),
          }}
        />
        <div className={classes.publishDetails}>
          {item?.news_type && item?.news_type === 'interviews'
            ? item.news_type
            : null}
          {item?.news_type &&
          item?.news_type === 'interviews' &&
          item?.source?.name ? (
            <div className={classes.dot}></div>
          ) : null}
          {item?.source?.name ? item.source.name : null}
        </div>
        {/* <PublishDetails
          item={item}
          type={type}
          filter={filter}
          setFilter={setFilter}
          contentType={contentType}
          sourceSelected={sourceSelected}
        /> */}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  newsCardWrap: {
    borderBottom: '1px dashed #A89ABF50',
    display: 'flex',
    paddingTop: '15px',
    paddingBottom: '8px',
    //flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    '&:hover': {
      '& $newsTitle': {
        color: '#29F87E',
      },
    },
  },
  newsTitle: {
    fontSize: 'clamp(12px, 1vw, 16px)',
    letterSpacing: '0px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    fontWeight: 500,
  },
  newsTitleLite: {
    fontWeight: 400,
  },
  posterImageWrap: {
    width: '40%',
    marginRight: 'clamp(12px, 1vw, 16px)',
  },
  crad: {
    width: '100%',
    paddingBottom: '65%',
    position: 'relative',
  },
  posterImageContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  posterImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  detailsWrap: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  publishDetails: {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    fontSize: 'clamp(10px, 0.8vw, 12px)',
    paddingTop: '7px',
    color: '#A89ABF70',
    fontWeight: 500,
    letterSpacing: '0px',
  },
  dot: {
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    backgroundColor: '#7B6E91',
    margin: '0px 6px',
  },
  detailsWrapMob: {},
  '@media (max-width: 1440px)': {
    newsCardWrap: {
      padding: '14px 0px',
    },
  },
}));
