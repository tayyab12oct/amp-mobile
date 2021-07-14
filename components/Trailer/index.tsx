import * as React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import TrailerScreen from './TrailerScreen';

export default function Trailer({ location }) {
  const classes = useStyles();
  console.log('location.state', location.state.type);
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid sm={1} lg={2} item></Grid>
        <Grid item xs={12} sm={10} lg={8} className={classes.containerBox}>
          <p className={classes.path}>
            {'Home'} <span>{'>>'}</span> {location.state.type}
            <span> {'>>'}</span> {'Trailer'}
          </p>
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid sm={1} lg={2} item></Grid>
        <Grid item xs={12} sm={10} lg={8} className={classes.containerBox}>
          <TrailerScreen location={location.state.data} />
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '1%',
    padding: '0px 15px',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: '14px',
    textTransform: 'capitalize',
    marginTop: 0,
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      padding: 0,
    },
    path: {
      fontSize: 10,
      textTransform: 'uppercase',
      padding: '0px 15px',
      marginTop: 16,
      '& span': {
        fontSize: 8,
      },
    },
    containerBox: {
      padding: '0',
    },
  },
}));
