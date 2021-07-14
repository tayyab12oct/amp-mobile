import { Grid, Theme, makeStyles } from '@material-ui/core';
import { getWebpUrl, timeSince } from '../../utils/helper';

import React from 'react';
import ImageComponent from '../Images';

export function RelatedNews({ ...props }) {
  const { result, handleClick, title } = props;
  const classes = useStyles();

  const renderTitle = () => {
    return (
      <Grid xs={12} item className={classes.mainTitle}>
        {title ? title : 'Also Read'}
      </Grid>
    );
  };

  const topNewsCard = (item) => {
    return (
      <Grid
        xs={4}
        item
        className={classes.topNewsCardWrap}
        onClick={() => {
          handleClick(item._id);
        }}
      >
        {item && item.image_link_ottplay && (
          <ImageComponent
            className={classes.topNewsImage}
            src={getWebpUrl(item.image_link_ottplay, { width: 500, height:"auto" })}
            alt=""
          />
        )}
        {item.published_date && (
          <div className={classes.topNewsDateWarp}>
            {/* ---TODO---box-office
          <div className={classes.topNewsTag}>Box Office</div> */}
            <div>{timeSince(item.published_date)}</div>
          </div>
        )}
        <div
          className={classes.topNewsTitle}
          dangerouslySetInnerHTML={{
            __html: item.title,
          }}
        />
        {item && item.publisher_logo && (
          <ImageComponent src={getWebpUrl(item.publisher_logo)} />
        )}
      </Grid>
    );
  };

  const renderNewsCard = (item) => {
    return (
      <div
        className={classes.newsCardWrap}
        onClick={() => {
          handleClick(item._id);
        }}
      >
        <div
          className={classes.title}
          dangerouslySetInnerHTML={{
            __html: item.title,
          }}
        />
        <div className={classes.dateContainer}>
          {item && item.publisher_logo && (
            <ImageComponent src={getWebpUrl(item.publisher_logo)} />
          )}
          {item && item.published_date && (
            <div>{timeSince(item.published_date)}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Grid xs={12} container className={classes.root}>
      {renderTitle()}
      {topNewsCard(result[0])}
      <div className={classes.newsContainer}>
        {result.slice(1, result.length).map((item, index) => {
          return renderNewsCard(item);
        })}
      </div>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  mainTitle: {
    color: '#ffffff',
    fontWeight: 500,
    fontSize: 'clamp(14px, 1.2vw, 18px)',
    padding: '40px 0px 20px 0px',
  },
  newsContainer: {
    width: '66.66%',
    height: 'fit-content',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 48.5%)',
    gap: '12px 3%',
    padding: '0 0 0 3%',
    color: '#ffffff',
  },
  topNewsCardWrap: {
    cursor: 'pointer',
    '&:hover': {
      '& $topNewsTitle': {
        color: '#29F87E',
      },
    },
  },
  topNewsImage: {
    border: '1px solid #403557',
    borderRadius: '12px',
    width: '100%',
    height: 230,
  },
  topNewsTitle: {
    color: '#ffffff',
    fontSize: 'clamp(14px, 1.2vw, 18px)',
    padding: '14px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
  },
  topNewsDateWarp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#A89ABF',
    fontSize: 'clamp(10px, 0.8vw, 12px)',
    paddingTop: '20px',
  },
  topNewsTag: {
    backgroundColor: '#331A5D',
    padding: '6px 20px',
    borderRadius: '40px',
    color: '#ffffff',
    fontWeight: 300,
  },
  newsCardWrap: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#1E0B4060',
    borderRadius: '12px',
    padding: '14px',
    '&:hover': {
      '& $title': {
        color: '#29F87E',
      },
    },
  },
  title: {
    color: '#ffffff',
    fontSize: 'clamp(12px, 1vw, 16px)',
    fontWeight: 300,
    fontFamily: 'Montserrat',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#A89ABF',
    fontSize: 'clamp(10px, 0.8vw, 12px)',
    paddingTop: '8px',
    '& img': {
      maxWidth: '30%',
      maxHeight: '24px',
    },
  },
}));
