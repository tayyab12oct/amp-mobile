import React, { useState } from 'react';
import {
  SSO_LOGIN_URL,
  SSO_LOGOUT_URL,
  VARIABLE,
} from '../../../utils/constants';

import ImageComponent from '../../../components/Images';
import { PillButton } from '../../../components/PillButton';
import { Theme } from '@material-ui/core/styles';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../../components/firebaseConfig';
import { makeStyles } from '@material-ui/core/styles';

export default function SignIn() {
  const [signInPage, setsignInPage] = useState(false);
  const [signUpPage, setsignUpPage] = useState(false);

  const handleClose = () => {};

  const [checked, setChecked] = React.useState(true);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSignOut = () => {
    cookie.remove('token', { path: '/' });
    cookie.remove('_ht_clientid', { path: '/' });
    firebaseAnalytics.logEvent('ssoLogout', {
      eventCategory: 'sso_logout',
    });
    window.open(SSO_LOGOUT_URL, '_self');
  };

  const handleSignUp = () => {
    firebaseAnalytics.logEvent('ssoSignIn', {
      eventCategory: 'sso_signin_cta',
      eventAction: 'settings',
    });
    window.open(SSO_LOGIN_URL, '_self');
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.firstroot}>
        <ImageComponent
          className={classes.active_tab}
          src="https://images.ottplay.com/static/new_logo.svg"
          alt="logo"
          // onClick={handleClose}
        />

        {cookie.load('token') ? (
          <React.Fragment>
            <div className={classes.text}> {VARIABLE.LOGOUT_MESSAGE} </div>
            <PillButton
              text={'Logout'}
              endIcon={
                <ImageComponent
                  src="https://images.ottplay.com/static/rightArrow.svg"
                  alt=""
                />
              }
              className={classes.createButton}
              onClick={handleSignOut}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={classes.text}>{VARIABLE.LOGIN_MESSAGE}</div>
            <PillButton
              text={'Continue'}
              endIcon={
                <ImageComponent
                  src="https://images.ottplay.com/static/rightArrow.svg"
                  alt=""
                />
              }
              className={classes.createButton}
              onClick={handleSignUp}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    textAlign: 'center',
    padding: '20px 50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: '20px',
    fontWeight: 'bolder',
    marginBottom: '30px',
  },
  linksContainer: {
    padding: '20px',
  },
  links: {
    color: 'White',
    opacity: '0.7',
    fontSize: '12px',
  },
  sublinks: {
    color: '#03f87e',
  },
  firstroot: {
    height: '100%',
    textAlign: 'center',
    padding: '150px 50px',
  },
  active_tab: {
    width: '140px',
    marginBottom: '20px',
  },
  signin_icons: {
    width: '50px',
  },
  text: {
    fontSize: 'clamp(12px, 1.2vw, 18px)',
  },
  signInIcons: {
    minWidth: '70%',
  },
  tandC: {
    fontSize: '10px',
    opacity: '0.5',
    marginTop: '18px',
  },
  notificationCheck: {
    fontSize: '10px',
    opacity: '0.8',
    lineHeight: 1,
    marginTop: '18px',
  },
  createButton: {
    color: '#ffffff',
    marginTop: '20px',
    padding: '8px 30px 8px 30px',
    fontSize: 'clamp(10px, 1vw, 17px)',
    borderRadius: '50px',
    textTransform: 'none',
    fontWeight: 700,
    backgroundColor: '#ff4275',
  },
  innerInput: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    position: 'relative',
    width: '100%',
  },
  mail: {
    position: 'absolute',
    top: '9px',
    left: '14px',
  },
  subscribeInput: {
    padding: '12px 76px 12px 20px',
    backgroundColor: 'black',
    borderRadius: '31px',
    outline: 'none',
    // border: "none",
    opacity: 0.45,
    border: '0.6px solid grey',
    width: '100%',
    fontSize: '14px',
    color: 'white',
    '@media (max-width: 425px)': {
      padding: '12px 40px',
    },
    '@media (max-width: 768px)': {
      padding: '12px 50px',
    },
  },
  button: {
    backgroundColor: 'transparent',
    padding: '8px 20px',
    fontSize: '13px',
    marginLeft: '0px',
    border: 'none',
    background: '#FF4275 !important',
    marginTop: '0px',
    borderRadius: '0px 31px 31px 0px',
    textTransform: 'none',
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    '&::before, &::after': {
      content: `''`,
      flex: 1,
      borderBottom: '1px solid #fff',
    },
    '&::before': {
      marginRight: '.25em',
    },
    '&::after': {
      marginLeft: '.25em',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      padding: '0px',
    },
  },
}));
