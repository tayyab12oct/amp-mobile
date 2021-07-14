import React, { useEffect } from 'react';

import ForYouHeader from '../foryou/ForYouHeader';
import { Grid } from '@material-ui/core';
import Helmet from 'react-helmet';
import MoodsCardList from './MoodsCardList';
import SEO from '../../components/Seo';
import { makeStyles } from '@material-ui/core/styles';

export default function Moods() {
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
            <p className={classes.path}>{'Home » I Am In The Mood For…'}</p>
          </Grid>
          <Grid xs={2} item></Grid>
        </Grid>
        <ForYouHeader data={'All Moods'} />
        <MoodsCardList />
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: '14px',
  },
});
