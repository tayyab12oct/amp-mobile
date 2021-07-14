import { Grid, Hidden, makeStyles } from '@material-ui/core';

import { Buttons } from '../../Buttons/Buttons';
import ImageComponent from '../../Images';
import { PagePath } from '../..';
import { PillButton } from '../../PillButton';
import React from 'react';
import { SSO_LOGIN_URL } from '../../../utils/constants';
import { firebaseAnalytics } from '../../firebaseConfig';

export default function WatchListSignIn(props: any) {
  const classes = useStyles();

  return (
    <Grid xs={12}>
      <Grid xs={12} className={classes.containerBox}>
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} item className={classes.contentBox}>
          <Grid xs={12} item style={{ paddingBottom: '10px' }}>
            <PagePath
              path={[
                { name: 'Home', path: '/home' },
                { name: 'Watchlist', path: '/watchlist' },
              ]}
            />
            {/* <p className={classes.path}>
              {'Home'} <span>{'>>'}</span> {'Watchlist'}
            </p> */}
          </Grid>
          {/* <p className={classes.path}>
            {"Discover"} <span>{">>"}</span> {"Watchlist"}
          </p> */}
          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <p className={classes.pageTitle}>{'Watchlist'}</p>
          </Hidden>
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
      <Grid xs={12} className={classes.containerBox}>
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} item className={classes.mainBox}>
          <Grid xs={12} md={2} item className={classes.mainImgBox}>
            <ImageComponent
              src="https://images.ottplay.com/static/signIn.png"
              alt="watchlist empty image"
              className={classes.mainImg}
            />
          </Grid>

          <Grid xs={12} md={8} item>
            <Grid xs={12} md={10} item>
              <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <p className={classes.imgTitle}>{'Create A Watchlist'}</p>
              </Hidden>
              <Hidden only={['xs']}>
                <p className={classes.imgTitle}>{'Watchlist'}</p>
              </Hidden>
            </Grid>
            <Grid xs={12} item className={classes.imgDescBox}>
              <p className={classes.imgDesc}>
                Save All The Movies & Shows You Want To Watch In One Place. Take
                Your Watchlist Wherever You Go
              </p>
            </Grid>
          </Grid>

          <Grid xs={12} md={2} className={classes.buttonBox} item>
            {props.token === undefined && (
              <React.Fragment>
                <Grid item>
                  <Hidden only={['sm', 'md', 'lg', 'xl']}>
                    <PillButton
                      className={classes.newAccButton}
                      text="Create Account"
                      endIcon={
                        <ImageComponent
                          src="https://images.ottplay.com/static/rightArrow.svg"
                          alt=""
                        />
                      }
                      onClick={() => window.open(SSO_LOGIN_URL, '_self')}
                    />
                  </Hidden>
                  <Hidden only={['xs']}>
                    <PillButton
                      className={classes.newAccButton}
                      text="Sign Up Now"
                      endIcon={
                        <ImageComponent
                          src="https://images.ottplay.com/static/rightArrow.svg"
                          alt=""
                        />
                      }
                      onClick={() => {
                        window.open(SSO_LOGIN_URL, '_self');
                        firebaseAnalytics.logEvent('ssoSignIn', {
                          eventCategory: 'sso_signin_cta',
                          eventAction: 'watchlist ',
                        });
                      }}
                    />
                  </Hidden>
                </Grid>
                <Grid item>
                  <Hidden only={['sm', 'md', 'lg', 'xl']}>
                    <p className={classes.imgSignIn}>
                      Already have an Account?{' '}
                      <span onClick={() => window.open(SSO_LOGIN_URL, '_self')}>
                        Sign in
                      </span>
                    </p>
                  </Hidden>
                  <Hidden only={['xs']}>
                    <p className={classes.imgSignIn}>
                      Member?{' '}
                      <span onClick={() => window.open(SSO_LOGIN_URL, '_self')}>
                        Sign in
                      </span>
                    </p>
                  </Hidden>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    minHeight: '50vh',
  },
  containerBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  signinBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 'clamp(10px, 0.9vw, 14px)',
    margin: '20px 0px 20px 0px',
    '& span': {
      fontSize: 10,
      letterSpacing: -1,
      margin: '0px 4px',
    },
  },
  mainImgBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImg: {
    width: 92,
    height: 92,
    marginLeft: -25,
  },
  imgTitle: {
    fontSize: 'clamp(16px, 1.8vw, 30px)',
    color: '#ffffff',
    textAlign: 'left',
    fontWeight: 500,
    marginTop: 6,
    marginBottom: 6,
  },
  contentBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBox: {
    display: 'flex',
    justifyContent: 'center',
    background: '#120137',
    padding: 25,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
  },
  imgDesc: {
    fontSize: 'clamp(13px, 1.1vw, 16px)',
    color: '#BEB4D6',
    textAlign: 'left',
    fontWeight: 500,
    marginTop: 2,
    lineHeight: '18px',
    width: '80%',
  },
  newAccButton: {
    backgroundColor: '#FF4275',
    border: '0.5px solid #FF4275',
    fontSize: 14,
    fontWeight: 500,
    textTransform: 'capitalize',
    color: 'white',
    minWidth: 195,
    height: 45,
    borderRadius: 20,
    opacity: 1,
  },
  imgSignIn: {
    color: 'white',
    fontWeight: 500,
    fontSize: 13,
    cursor: 'pointer',
    '& span': {
      color: '#03F87E',
      textDecoration: 'underline',
    },
  },
  [theme.breakpoints.down('xs')]: {
    contentBox: {
      display: 'block',
      justifyContent: 'center',
      padding: 0,
    },
    path: {
      fontSize: 10,
      textTransform: 'uppercase',
      marginLeft: 16,
      marginTop: 16,
      '& span': {
        fontSize: 8,
      },
    },
    pageTitle: {
      fontSize: 16,
      color: '#ffffff',
      marginLeft: 16,
      textAlign: 'left',
      fontWeight: 'bold',
    },
    mainImg: {
      width: 92,
      height: 92,
    },
    imgTitle: {
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 500,
      marginTop: 16,
      marginBottom: 0,
    },
    mainBox: {
      display: 'block',
      padding: 0,
      justifyContent: 'center',
      background: 'transparent',
    },
    imgDescBox: {
      display: 'flex',
      justifyContent: 'center',
    },
    imgDesc: {
      color: '#BEB4D6',
      textAlign: 'center',
      fontWeight: 500,
      marginTop: 11,
      marginBottom: 34,
      width: '80%',
    },
    newAccButton: {
      backgroundColor: '#FF4275',
      border: '0.5px solid #FF4275',
      fontSize: 14,
      fontWeight: 500,
      textTransform: 'capitalize',
      color: 'white',
      width: 187,
      height: 40,
      borderRadius: 20,
      opacity: 1,
    },
    imgSignIn: {
      marginTop: 30,
      marginBottom: 53,
      color: 'white',
      fontWeight: 500,
      fontSize: 13,
      '& span': {
        color: '#03F87E',
        textDecoration: 'underline',
      },
    },
  },
}));
