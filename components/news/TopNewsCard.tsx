import { AD_CODES, SLURRP_URL } from '../../utils/constants';
import { Grid, Hidden, Theme, makeStyles } from '@material-ui/core';

import GoogleAdOttPlay from '../GoogleAds';
import ImageComponent from '../Images';
import NextImageComponent from '../nextimage';
import { PublishDetails } from './PublishDetails';
import React from 'react';
import { getWebpUrl } from '../../utils/helper';

export function TopNewsCard({ ...props }) {
  const {
    item,
    handleClick,
    type,
    filter,
    setFilter,
    contentType,
    sourceSelected,
    googleAd,
  } = props;
  const classes = useStyles();

  const getImageUrl = () => {
    switch (contentType) {
      case 'news':
        return item && item.cover_image?.url
          ? getWebpUrl(item.cover_image.url, { width: 426, height: 190 })
          : null;
      case 'interview':
        return item && item.cover_image?.url
          ? getWebpUrl(item.cover_image.url, { width: 426, height: 190 })
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

  const renderGoogleAd = () => {
    if (type !== 'listing') {
      switch (contentType) {
        case 'news':
          return <GoogleAdOttPlay adInfo={AD_CODES.item3} />;
        case 'interview':
          return <GoogleAdOttPlay adInfo={AD_CODES.home.ad_2} />;
        case 'listicle':
          return <GoogleAdOttPlay adInfo={AD_CODES.home.ad_1} />;
        default:
          return null;
      }
    } else return null;
  };

  return (
    <Grid xs={12} container>
      <div
        className={[
          classes.topNewsWrap,
          type === 'listing' ? classes.topNewsWrapWithotAd : '',
        ].join(' ')}
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
        <NextImageComponent
          wrapperClassName={`${classes.topNewsImageWrap} ${
            type === 'similar' ? classes.topSimilarNewsImageWrap : ''
          }`}
          className={classes.topNewsImage}
          height="190px"
          width="426px"
          minWidth="426px"
          maxWidth="426px"
          src={
            getImageUrl()
              ? getImageUrl()
              : 'https://images.ottplay.com/static/poster_default.png'
          }
          alt=""
        />
        <div
          className={[
            classes.topNewsDescription,
            type === 'similar' && classes.topSimilarNewsDescription,
          ].join(' ')}
        >
          <div
            className={[
              classes.topNewsTitle,
              type === 'listing' && classes.newsTitleLite,
            ].join(' ')}
            dangerouslySetInnerHTML={{
              __html: getTitle(),
            }}
          />
          <div className={classes.publishDetails}>
            {item?.source?.name ? item.source.name : null}
          </div>
          {/* <PublishDetails
            item={item}
            isTopNews={true}
            type={type}
            filter={filter}
            setFilter={setFilter}
            contentType={contentType}
            sourceSelected={sourceSelected}
          /> */}
        </div>
      </div>
      <Hidden only={['xs']}>
        {type !== 'similar' && type !== 'listing' && (
          <div className={classes.adBox}>{renderGoogleAd()}</div>
        )}
      </Hidden>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  topNewsWrap: {
    display: 'flex',
    cursor: 'pointer',
    width: 'calc(100% - 320px)',
  },
  topNewsWrapWithotAd: {
    width: '100%',
  },
  topNewsImage: {
    height: 240,
    objectFit: 'cover',
    borderRadius: '12px',
  },
  topNewsImageWrap: {
    width: '426px',
    height: '190px',
    maxWidth: '426px',
    minHeight: '190px',
  },
  adBox: {
    width: 320,
    height: 250,
    padding: '0px 0px 0px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  topSimilarNewsImageWrap: {
    width: '48%',
  },
  topNewsDescription: {
    width: '46%',
    paddingLeft: '24px',
    paddingRight: '24px',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  topSimilarNewsDescription: {
    width: '52%',
  },
  topNewsTitle: {
    // fontSize: 'clamp(24px, 2vw, 32px)',
    fontSize: 'clamp(20px, 1.6vw, 28px)',
    textAlign: 'left',
    lineHeight: '2rem',
    letterSpacing: '0.32px',
    fontWeight: 'bold',
    color: 'white',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    marginBottom: '12px',
  },
  newsTitleLite: {
    fontSize: 'clamp(20px, 1.2vw, 28px)',
  },
  publisherLogo: {
    width: '71px',
    marginBottom: '12px',
  },
  ad: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  publishDetails: {
    fontSize: 'clamp(10px, 0.8vw, 12px)',
    paddingTop: '7px',
    color: '#A89ABF70',
    fontWeight: 500,
    letterSpacing: '0px',
  },
  [theme.breakpoints.down('xs')]: {
    topNewsWrap: {
      width: '100%',
      flexDirection: 'column',
    },
    topNewsImageWrap: {
      width: '100%',
      maxHeight: '54vw',
      minHeight: '54vw',
    },
    topNewsImage: {
      height: '54vw',
    },
    topSimilarNewsImageWrap: {
      width: '100%',
    },
    topNewsDescription: {
      width: '100%',
      padding: '15px 0px 0px 0px',
      borderBottom: '1px dotted #A89ABF50',
    },
    topSimilarNewsDescription: {
      width: '100%',
      paddingLeft: 0,
    },
    topNewsTitle: {
      marginBottom: 0,
    },
    adBox: {
      padding: '10px 10px 10px 10px',
      justifyContent: 'center',
    },
  },
}));
