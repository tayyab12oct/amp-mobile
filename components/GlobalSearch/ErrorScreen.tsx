import { Grid } from '@material-ui/core';
import ImageComponent from '../Images';
import { PillButton } from '../PillButton';
import React from 'react';
import Router from 'next/router';
import { Theme } from '@material-ui/core/styles';
// import { history } from '../../configureStore';
import { makeStyles } from '@material-ui/styles';

export function NotFound(props) {
  const classes = useStyles();

  const handleTry = () => {};

  return (
    <div className={classes.root}>
      <Grid xs={12} container>
        <Grid xs xl={3} md={2} sm item></Grid>
        <Grid
          xs={12}
          xl={6}
          md={8}
          container
          justify="center"
          style={{ marginTop: '8%' }}
        >
          <Grid xs={12} sm={6} item className={classes.text}>
            <ImageComponent
              src="https://images.ottplay.com/static/search.svg"
              alt="error image"
              className={classes.img}
            />
          </Grid>
          {props.onBoard === true ? (
            <>
              <Grid
                xs={12}
                sm={6}
                item
                direction="row"
                alignItems="center"
                className={classes.text}
              >
                <Grid xs className={classes.textLook}>
                  Your quest to find best movies and shows end here.
                </Grid>
                <Grid
                  xs
                  className={classes.secondLetter}
                  style={{ fontWeight: 300 }}
                >
                  <b>Complete</b> the <b>onboarding process</b> to get{' '}
                  <b>personalized recommendations</b>
                </Grid>
                <Grid xs className={classes.buttonBox}>
                  <PillButton
                    text={'Proceed'}
                    endIcon={
                      <ImageComponent
                        src="https://images.ottplay.com/static/rightArrow.svg"
                        alt=""
                      />
                    }
                    className={classes.button}
                    onClick={() => {
                      Router.push('/onboard/language');
                      localStorage.setItem('fromForYou', 'true');
                    }}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid
                xs={12}
                sm={6}
                item
                direction="row"
                alignItems="center"
                className={classes.text}
              >
                <Grid xs className={classes.firstLetter}>
                  Oops !
                </Grid>
                <Grid xs className={classes.secondLetter}>
                  We could not find any content for "{props.item}"
                </Grid>
                <Grid xs className={classes.smallText}>
                  Try searching some other keyword to get the best content and
                  suggestions
                </Grid>
                <Grid xs style={{ marginTop: '3%' }}>
                  <PillButton
                    text={'Try Again'}
                    endIcon={
                      <ImageComponent
                        src="https://images.ottplay.com/static/rightArrow.svg"
                        alt=""
                      />
                    }
                    className={classes.button}
                    onClick={() => {
                      Router.push('/search');
                      props.handleReload();
                    }}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        <Grid xs xl={3} md={2} sm item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '72vh',
  },
  button: {
    color: '#FFFFFF',
    backgroundColor: '#FF4376',
    whiteSpace: 'nowrap',
    border: '1px solid #FF4376',
    margin: '3% 5px',
    width: 206,
    height: 55,
    borderRadius: 28,
    fontSize: 20,
    fontWeight: 500,
    textTransform: 'none',
    '&:hover': {
      background: '#FF4376',
    },
    '& svg': {
      width: 20,
      height: 14,
      '&$a': {
        color: 'black',
      },
    },
  },
  img: {
    width: '275px',
    height: '276px',
  },
  firstLetter: {
    fontSize: '48px',
    color: '#FFFFFF',
    fontWeight: 600,
    marginBottom: '2%',
  },
  secondLetter: {
    fontSize: '22px',
    color: '#FFFFFF',
    fontWeight: 500,
    marginBottom: '6%',
  },
  buttonBox: {
    marginTop: '3%',
  },
  textLook: {
    color: ' #03F87E',
    textTransform: 'capitalize',
    opacity: 1,
    fontWeight: 'bold',
    fontSize: 'clamp(25px, 0.8vw, 45px)',
    marginBottom: '2%',
  },
  smallText: {
    fontSize: '16px',
    color: '#9080AD',
    fontWeight: 500,
    marginTop: '5%',
  },
  text: {
    textAlign: 'center',
  },
}));
