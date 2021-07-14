import * as React from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { Grid } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import ImageComponent from '../../components/Images';

export default function Recommendations(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container xs={12}>
        <Grid item xs={2}></Grid>
        <Grid item container xs={8} className={classes.feedbackContainer}>
          <Grid item xs={5}>
            <ImageComponent src="https://images.ottplay.com/static/recommendationText.svg" alt="recommendation" />
            {/* <div className={classes.heading}>What do you think about these Recommendations?</div> */}
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      width: '100%',
    },
    heading: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: '30px',
      marginBottom: '0px',
      '@media (max-width: 1440px)': {
        fontSize: '30px',
      },
      '@media (max-width: 1024px)': {
        fontSize: '30px',
      },
      '@media (max-width: 768px)': {
        fontSize: '25px',
      },
      '@media (max-width: 425px)': {
        fontSize: '22px',
      },
    },
    feedbackContainer: {
      backgroundImage: `url("https://images.ottplay.com/static/recommendation.svg")`,
      backgroundRepeat: 'no-repeat',
      padding: '10px',
    },
  })
);
