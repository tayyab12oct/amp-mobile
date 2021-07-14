import { FB_OTT, IN_OTT, TW_OTT, YT_OTT } from '../utils/constants';
import { Theme, makeStyles } from '@material-ui/core';

import ImageComponent from './Images';
import React from 'react';

function FollowUs() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.followWrap}>Stay Updated</div>

      <div className={classes.mediaWrap}>
        <div
          className={classes.iconWrap}
          onClick={() => window.open(FB_OTT, '_blank')}
        >
          <ImageComponent
            src={`/static/follow_images/fb.svg`}
            className={classes.iconStyle}
            alt="fb icon"
            width="24"
            height="24"
          />
          <span>Like</span>
        </div>
        <div
          className={classes.iconWrap}
          onClick={() => window.open(TW_OTT, '_blank')}
        >
          <ImageComponent
            src={`/static/follow_images/twitter.svg`}
            className={classes.iconStyle}
            alt="tweet icon"
            width="24"
            height="24"
          />
          Tweet
        </div>
        <div
          className={classes.iconWrap}
          onClick={() => window.open(IN_OTT, '_blank')}
        >
          <ImageComponent
            src={`/static/follow_images/inst.svg`}
            className={classes.iconStyle}
            alt="insta icon"
            width="24"
            height="24"
          />{' '}
          Follow
        </div>
        <div
          className={classes.iconWrap}
          onClick={() => window.open(YT_OTT, '_blank')}
        >
          <ImageComponent
            src={`/static/follow_images/utube.svg`}
            className={classes.iconStyle}
            alt="utube icon"
            width="24"
            height="24"
          />
          Subscribe
        </div>
      </div>
    </div>
  );
}

export default FollowUs;

const useStyles = makeStyles((theme: Theme) => ({
  followWrap: {
    marginTop: '1rem -.5rem 0 0',
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 700,
    [theme.breakpoints.down('xs')]: {
      padding: '0 4%',
    },
  },

  iconStyle: {
    cursor: 'pointer',
    marginRight: '10px',
    width: 'clamp(15px, 1.8vw, 30px)',
    opacity: '0.8',
  },
  mediaWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '1rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0 4%',
    },
  },
  iconWrap: {
    display: 'flex',
    cursor: 'pointer',
    margin: '0 .8rem 0 0',
    alignItems: 'center',
    color: '#A89ABF',
    fontSize: '0.8rem',
  },
}));
