import { Theme, makeStyles } from '@material-ui/core';

import { IMAGES } from '../../public/static/newImages';
import React from 'react';
import ImageComponent from '../Images';

export function WatchNowCard({ ...props }) {
  const { logoUrl, rate, watchNowLink, handleWatchNowClick } = props;
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      onClick={() => handleWatchNowClick(watchNowLink)}
    >
      <div className={classes.logoWrap}>
        <ImageComponent className={classes.providerLogo} src={logoUrl} alt="prov" />
        {/* <div className={classes.subText}>Season 1</div> */}
      </div>
      <div className={classes.contentWrap}>
        <div className={classes.subText}>{rate}</div>
        <div className={classes.watchNow}>Watch Now</div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 'clamp(12px, 0.9vw, 13px)',
    backgroundColor: '#1C0C37',
    borderRadius: '6px',
    padding: '12px 8px 12px 20px',
    maxWidth: '279px',
    '&:focus, &:hover, &:active': {
      backgroundImage: `url(${IMAGES.inside_bg_watchnow})`,
      backgroundPosition: 'bottom',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
  },
  logoWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px 20px 0px 0px',
    width: '80px',
  },
  contentWrap: {
    borderLeft: '1px solid #9960F814',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'calc(100% - 80px)',
  },
  subText: {
    textAlign: 'center',
    color: '#9A8DB4',
  },
  watchNow: {
    paddingTop: '12px',
    color: '#03F87E',
    fontWeight: 600,
  },
  providerLogo: {
    width: '50px',
    marginBottom: '6px',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      minWidth: 'fit-content',
      paddingRight: '20px',
    },
  },
}));
