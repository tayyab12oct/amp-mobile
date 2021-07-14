import { Theme, makeStyles } from '@material-ui/core';
import {
  getNewsSourceLogo,
} from '../../utils/helper';

import React from 'react';
import ImageComponent from '../Images';
import NextImageComponent from '../nextimage';


export function PublishDetails({ ...props }) {
  const {
    item,
    isTopNews,
    type,
    filter,
    setFilter,
    contentType,
    sourceSelected,
  } = props;
  const classes = useStyles();

  const handleLogoVisibility = () => {
    // ---TODO--for filters
    return (
      filter === 'all' ||
      type !== 'listing' ||
      (type === 'listing' && filter === 'all')
    );
  };

  const handleLogoClick = (e) => {
    e.stopPropagation();
    sourceSelected(item);

    // e.stopPropagation();
    // if (type !== 'listing') {
    //   history.push({
    //     pathname: '/news',
    //     state: {
    //       contentType: contentType,
    //       filter: item.publisher_short,
    //     },
    //   });
    // } else if (setFilter && item.publisher_short !== filter) {
    //   setFilter(item.publisher_short);
    // } else return;
  };

  return (
    <div className={classes.detailsWrap}>
      {item && item.source && item.source.name && (
        <div className={
          isTopNews
            ? classes.TopNewsPublisherImgWrap
            : classes.publisherImgWrap
        }>
          <ImageComponent
            className={
              isTopNews ? classes.TopNewsPublisherImg : classes.publisherImg
            }
            src={getNewsSourceLogo(item.source.name)}
            alt="ottplay"
            onClick={(e) => handleLogoClick(e)}
          />
          </div>
      )}
      {/* {item && item.news_published_date && (
        <div className={classes.details}>
          {timeSince(item.news_published_date)}
        </div>
      )} */}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  detailsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#A89ABF',
    letterSpacing: '0.28px',
    fontSize: 'clamp(11px, 0.8vw, 14px)',
    padding: '15px 0px 6px 0px',
  },
  publisherImgWrap: {
    marginRight: '12px',
    marginBottom: '8px',
    width: '37%',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      '& $publisherImg': {
        // maxWidth: '100%',
        // maxHeight: '100%',
        height: '22px',
        transition: 'all .2s ease',
      },
    },
  },
  publisherImg: {
    height: '20px',
    // maxWidth: '90%',
    // maxHeight: '90%',
  },
  TopNewsPublisherImgWrap: {
    width: '104px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      '& $TopNewsPublisherImg': {
        width: 'auto',
        height: '32px',
        transition: 'all .2s ease',
      },
    },
  },
  TopNewsPublisherImg: {
    marginRight: '12px',
    height: '30px',
  },
  details: {},
}));
