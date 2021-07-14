import { Theme, makeStyles } from '@material-ui/core';
import { getNewsSourceLogo, getWebpUrl } from '../../utils/helper';

import ImageComponent from '../Images';
import React from 'react';

export function ReviewNewsCard({ ...props }) {
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

  const renderAdditionalInfo = () => {
    return (
      <div className={classes.logoWarp}>
        {type === 'listing' && item.language?.length > 0 && (
          <div className={classes.subTitle} style={{ width: '30%' }}>
            {item.language[0]?.name ? item.language[0]?.name : null}
          </div>
        )}
        <div className={type === 'listing' ? classes.subContainer : ''}>
          {item.providerUnique &&
            item.providerUnique.length > 0 &&
            getPublishedProvider(item).length > 0 && (
              <div className={classes.subTitle}>
                {getPublishedProvider(item)
                  .slice(0, 2)
                  .map((prov, index) => {
                    return (
                      <span className={classes.providerIconWrap}>
                        {prov.icon_url ? (
                          <ImageComponent
                            className={classes.providerIcon}
                            src={getWebpUrl(prov.icon_url, {
                              width: 20,
                              height: 20,
                            })}
                            alt={prov.name ? prov.name : 'provider'}
                          />
                        ) : null}
                        <span>{prov.name}</span>
                      </span>
                    );
                  })}
                {getPublishedProvider(item).length > 2 ? (
                  <span> + {getPublishedProvider(item).length - 2} </span>
                ) : null}
              </div>
            )}
        </div>
      </div>
    );
  };

  const getPublishedProvider = (item) => {
    return item.providerUnique.filter((prov, index) => {
      return prov.status && prov.status === 'published';
    });
  };

  const getImageUrl = () => {
    switch (contentType) {
      case 'review':
        return item.details &&
          item.details.length > 0 &&
          item.details[0].posters &&
          item.details[0].posters.length > 0
          ? getWebpUrl(item.details[0].posters[0], {
              width: 100,
              height: 'auto',
            })
          : null;
      case 'listicle':
        return item.images && item.images.length > 0 && item.images[0].url
          ? item.images[0].url
          : null;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (contentType) {
      case 'review':
        return item.title ? item.title : null;
      case 'listicle':
        return item.name ? item.name : null;
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
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
              {item.rating ? (
                <div className={classes.ratingWrap}>
                  <span className={classes.rating}>
                    {item.rating.toFixed(1)}
                  </span>
                  <ImageComponent
                    src="/static/newImages/Polygon_5.svg"
                    alt="star"
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
        <div
          className={[
            classes.detailsWrap,
            type === 'listing' ? classes.detailsWrapMob : '',
          ].join(' ')}
        >
          <div>
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
              {item?.source?.name ? item.source.name : null}
            </div>
          </div>

          {type !== 'listing' && (
            <div style={{ paddingTop: '6px' }}>{renderAdditionalInfo()} </div>
          )}
        </div>
      </div>
      {type === 'listing' && (
        <div style={{ paddingTop: '12px' }}>{renderAdditionalInfo()} </div>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px dashed #A89ABF50',
    padding: '12px 0',
    cursor: 'pointer',
    justifyContent: 'space-between',
    '&:hover': {
      '& $newsTitle': {
        color: '#29F87E',
      },
    },
  },
  newsCardWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  detailsWrap: {
    width: '70%',
    paddingLeft: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  newsTitle: {
    fontSize: 'clamp(12px, 1vw, 16px)',
    letterSpacing: '0px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    fontWeight: 500,
    height: 'fit-content',
    wordBreak: 'break-word',
  },
  newsTitleLite: {
    fontWeight: 400,
    WebkitLineClamp: 4,
  },
  posterImageWrap: {
    width: '30%',
  },
  crad: {
    width: '100%',
    paddingBottom: '147%',
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
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  subTitle: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    color: '#D6C6F4',
    fontSize: 'clamp(12px, 0.8vw, 13px)',
    opacity: 0.7,
    gap: '6px',
  },
  logoWarp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoAlignment: {
    justifyContent: 'flex-end',
  },
  providerIcon: {
    marginRight: '6px',
  },
  providerIconWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    height: '22px',
    '& img': {
      height: '16px',
    },
    '&:hover': {
      '& img': {
        height: '16px',
        transition: 'all .2s ease',
      },
    },
  },
  ratingWrap: {
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
    backgroundColor: '#000000',
    borderRadius: '2px',
    position: 'absolute',
    left: '5px',
    bottom: '6px',
    color: '#19FF8C',
    fontSize: '13px',
  },
  rating: {
    paddingRight: '3px',
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
  subContainer: {
    width: '70%',
    paddingLeft: '16px',
  },
  [theme.breakpoints.down('xs')]: {
    detailsWrapMob: {
      justifyContent: 'flex-start',
    },
  },
}));
