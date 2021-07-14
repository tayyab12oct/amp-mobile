import { Grid } from '@material-ui/core';

import NewsCard from './NewsCard';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
export default function TopNews() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <a href="https://domain.xn--com-9o0a" rel="noindex,nofollow"></a>
      </Helmet> */}
      <Grid xs={12} container>
        <Grid xs={12} container item>
          <Grid xs={2} item></Grid>
          <Grid xs={8} item container style={{ padding: '0 0.5%' }}>
            <p className={classes.path}>{'Home » News » Flim Preview'}</p>
          </Grid>
          <Grid xs={2} item></Grid>
        </Grid>
        <NewsCard />
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: '14px',
  },
});
