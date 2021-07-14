import * as React from 'react';

import { Grid, Theme, makeStyles } from '@material-ui/core';

import { PillButton } from '../PillButton';
import { Typography } from '@material-ui/core';

import ImageComponent from '../Images';

export function BottomCard() {
  const classes = useStyles();

  const timeRemaining = [
    { img: "https://images.ottplay.com/static/time1.svg", time: '15mins' },
    { img: "https://images.ottplay.com/static/time2.svg", time: '30mins' },
    { img: "https://images.ottplay.com/static/time3.svg", time: '45mins' },
    { img: "https://images.ottplay.com/static/time4.svg", time: '60mins' },
  ];

  return (
    <div className={classes.root}>
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={12}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid
          xs={8}
          sm={8}
          md={6}
          lg={6}
          container
          className={classes.backgroundOne}
        >
          <Grid xs={6} item>
            <div>
              <div className={classes.textOne}>Rate to Curate</div>
              <Typography className={classes.signupText}>
                You’ve Probably Seen Some Of These Recommendations Already -
                Swipe Or Rate To Clear ‘Em Out.
              </Typography>
            </div>
          </Grid>
          <Grid xs={6} item>
            <ImageComponent src="https://images.ottplay.com/static/bottomad1.png" alt="ads" style={{ width: '100%' }} />
          </Grid>
        </Grid>

        <Grid
          xs={8}
          sm={8}
          md={5}
          lg={5}
          container
          className={classes.backgroundTwo}
        >
          <Grid xs={12} container item className={classes.mainTwo}>
            <Grid xs={6} item>
              <div className={classes.textQuiz}>Movie QUIZ</div>
              <div style={{ marginTop: '10px' }}>
                <b className={classes.text80s}>80s and 90s Film Alphabet </b>
              </div>
              <PillButton
                text={'Play & Win'}
                className={classes.createButton}
                style={{ marginTop: '20px' }}
              />
            </Grid>
            <Grid xs={6} item>
              <ImageComponent src="https://images.ottplay.com/static/homePlayad.png" alt="signup" style={{ width: '100%' }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '25px 0 35px 0',
    color: '#ffffff',
  },
  backgroundOne: {
    background: `url("https://images.ottplay.com/static/homeTime.png")`,
    backgroundRepeat: 'no-repeat',
    padding: '22px 30px 36px 30px',
    borderRadius: '10px',
    marginBottom: '3%',
    // maxHeight: '300px'
  },
  backgroundTwo: {
    background: `url("https://images.ottplay.com/static/homeSignup.png")`,
    backgroundRepeat: 'no-repeat',
    marginTop: '0px',
    marginBottom: '3%',
    // maxHeight: '300px',
    padding: '20px',
  },
  textQuiz: {
    fontSize: '25px',
    color: '#A89ABF',
  },
  textOne: {
    fontSize: '24px',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  text80s: {
    color: '#FFFFFF',
    fontSize: '28px',
  },
  time: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: '20px',
  },
  signupText: {
    marginTop: '10px',
    color: '#FFFFFF',
    fontSize: '20px',
    fontWeight: 'lighter',
  },
  mainTwo: {
    display: 'flex',
    alignItems: 'center',
  },
  createButton: {
    marginTop: '30px',
    border: '1px solid #03F87E',
    color: '#03F87E',
    padding: '5px 20px',
    fontSize: '18px',
    fontWeight: 200,
    borderRadius: '50px',
    textTransform: 'none',
    background: '#190D2E 0% 0% no-repeat padding-box',
    '&:hover': {
      backgroundColor: '#190D2E',
    },
  },
}));
