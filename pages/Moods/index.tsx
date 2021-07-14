import React, { useEffect } from 'react';

import ForYouHeader from '../foryou/ForYouHeader';
import { Grid } from '@material-ui/core';
import { PillButton } from '../../components/PillButton';
import SEO from '../../components/Seo';
import { makeStyles } from '@material-ui/core/styles';

export default function Mood() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <SEO>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </SEO>
      <Grid xs={12} container>
        <Grid xs={12} container item>
          <Grid xs={2} item></Grid>
          <Grid xs={8} item container style={{ padding: '0 0.5%' }}>
            <p className={classes.path}>
              {'Home » I Am In The Mood For » Road Trips'}
            </p>
          </Grid>
          <Grid xs={2} item></Grid>
        </Grid>
        <ForYouHeader
          data={'Road Trips'}
          children={
            <PillButton text="See All Moods" style={{ color: '#03F87E' }} />
          }
        />
        {/* <WatchlistMovies /> */}
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
