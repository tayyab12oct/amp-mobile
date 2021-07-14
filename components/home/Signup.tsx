import { Grid, Theme, makeStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import React, { useContext, useEffect } from 'react';

import { WebfoxContext } from '../../services/webfox';

import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';
import { useRouter } from 'next/router';
import ImageComponent from '../Images';

const windowAny: any = window;
export function Signup(props) {
  const router = useRouter();
  const classes = useStyles();
  const _ht_clientid = cookie.load('_ht_clientid');
  const timeRemaining = [
    { img: "https://images.ottplay.com/static/time2.svg", time: '15 mins' },
    { img: "https://images.ottplay.com/static/time1.svg", time: '30 mins' },
    { img: "https://images.ottplay.com/static/time3.svg", time: '45 mins' },
    { img: "https://images.ottplay.com/static/time4.svg", time: '60 mins' },
  ];
  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );
  const { languages, streamingServices } = webstore;

  let languagesArr: any = [];
  let providersArr: any = [];
  useEffect(()=>{
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)) ||
        [],
      streamingServices.selectedStreamingServices || []
    );
  },[])
  const handleIHaveGotMinClick = (tab: number) => {
    let time = 15;
    if (tab === 0) {
      time = 15;
    } else if (tab === 1) {
      time = 30;
    } else if (tab === 2) {
      time = 45;
    } else if (tab === 3) {
      time = 60;
    }
    firebaseAnalytics.logEvent('timeToKill', {
      eventCategory: 'time_to_kill',
      eventAction: window.location.pathname,
      eventLabel: 'time',
      eventValue: time,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage.track_event('timeToKill', {
      eventCategory: 'time_to_kill',
      eventAction: window.location.pathname,
      eventLabel: 'time',
      eventValue: time,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    router.push({
      pathname: '/I-have-got',
      query: {
        data: props.data,
        tab,
      },
    });
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          container
          direction="row"
          style={{ margin: '20px 0' }}
        >
          <Grid container xs={12} spacing={2}>
            <Grid xs={1} sm={1} md={3} lg={3} item></Grid>
            <Grid
              xs={10}
              sm={10}
              md={6}
              lg={6}
              container
              className={classes.backgroundOne}
            >
              <Grid xs={12} container className={classes.textOne}>
                Time To Kill....
              </Grid>
              <Grid xs={12} container className={classes.timeContainer}>
                {timeRemaining.map((remain, i) => {
                  return (
                    <Grid xs={3} item spacing={1}>
                      <div
                        className={classes.time}
                        onClick={() => handleIHaveGotMinClick(i)}
                      >
                        <ImageComponent
                          src={remain.img}
                          alt="clock icon"
                          style={{ width: '100%' }}
                        />
                        <div className={classes.timeText}>{remain.time}</div>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid xs={1} sm={1} md={3} lg={3} item></Grid>
            {/* <Grid
              xs={10}
              sm={10}
              md={5}
              lg={5}
              container
              spacing={3}
              className={classes.backgroundTwo}
              direction="column"
            >
              <Grid xs={12} container item className={classes.mainTwo}>
                <Grid xs={6} item>
                  <div className={classes.textOne}>Sign Up</div>
                  <div className={classes.signupText}>
                    Take your <b className={classes.textOne}>watchlist </b>
                    wherever you go
                  </div>
                  <PillButton
                    text={'Create Account'}
                    className={classes.createButton}
                  />
                </Grid>
                <Grid xs={6} item>
                  <ImageComponent
                    src={homeSignup}
                    alt="signup"
                    style={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    // margin: '25px 0 35px 0',
    color: '#ffffff',
  },
  backgroundOne: {
    background: `url("https://images.ottplay.com/static/homeTime.png")`,
    backgroundRepeat: 'no-repeat',
    padding: '22px 30px 36px 30px',
    borderRadius: '10px',
    backgroundSize: '100% 100%',
    maxHeight: '300px',
    // marginBottom: '3%',
  },
  backgroundTwo: {
    background: `url("https://images.ottplay.com/static/homeSignup.png")`,
    backgroundRepeat: 'no-repeat',
    padding: '0px 0% 5% 2%',
    backgroundSize: '100% 100%',
    marginTop: '0px',
    marginBottom: '3%',
    maxHeight: '300px',
    marginLeft: '0.5%',
  },
  timeContainer: {
    marginBottom: '10%',
  },
  textOne: {
    fontSize: '24px',
    color: '#FFFFFF',
    textAlign: 'left',
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
    fontSize: '22px',
    fontWeight: 'lighter',
  },
  mainTwo: {
    width: '100%',
    height: '100%',
    padding: '20px',
  },
  createButton: {
    marginTop: '20px',
    border: '1px solid #03F87E',
    color: '#03F87E',
    padding: '2px 20px',
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
