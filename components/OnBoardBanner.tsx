import { Button, Grid, Hidden } from '@material-ui/core';

import ImageComponent from './Images';
import React from 'react';
import { firebaseAnalytics } from './firebaseConfig';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { ViewportContext } from './ViewportProvider';

const windowAny: any = typeof window !== 'undefined' && window;
function OnBoardBanner({ ...props }) {
  const classes = useStyles();
  const router = useRouter();
  const { width } = React.useContext(ViewportContext);

  const handleClose = () => {
    typeof window !== 'undefined' &&
      sessionStorage.setItem('non-onboard', 'true');
    router.push('/');
  };

  const proceedFromWelcome = () => {
    firebaseAnalytics.logEvent('welcome', {
      eventCategory: 'onboarding_welcome',
      eventAction: 'proceed',
      eventValue: 5,
    });
    windowAny.Moengage &&
      windowAny.Moengage.track_event('welcome', {
        eventCategory: 'onboarding_welcome',
        eventAction: 'proceed',
        eventValue: 5,
      });
    router.push('/onboard/language');
  };

  const renderMobileView = () => {
    return (
      <Grid container xs={12} className={classes.mobileFooter}>
        <Grid item xs={8}>
          <div className={classes.mobileMainText}>
            <span className={classes.mobileLeftText}>
              Don’t know what to watch?
            </span>
            <br />
            Tell us your preferences and <br /> get personalized recommendations
          </div>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={
              <ImageComponent
                src="/static/images/footerBackArrow.svg"
                alt=""
                width="8px"
                height="8px"
              />
            }
            onClick={props.proceedFromWelcome}
          >
            {'Proceed'}
          </Button>
        </Grid>
        <div className={classes.alignCloseButton}>
          <ImageComponent
            alt="close"
            className={classes.close}
            src="/static/images/green-close.svg"
            onClick={props.handleClose}
          />
        </div>
      </Grid>
    );
  };

  return (
    <React.Fragment>
      {width < 600 ? (
        renderMobileView()
      ) : (
        <Grid xs={12} container className={classes.footer}>
          <Grid sm={1} lg={2} item></Grid>
          <Grid xs={12} sm={10} lg={8} item>
            <Grid xs={12} container className={classes.contentWrap}>
              <Grid xs={10} item className={classes.textWrap}>
                <div className={classes.logoWrap}>
                  <ImageComponent
                    src="/static/images/footerWatch.svg"
                    alt="footer Image"
                    width="54px"
                    height="54px"
                  />
                </div>
                <div className={classes.leftText}>
                  Don’t know
                  <br />
                  what to watch?
                </div>
                <div className={classes.border}></div>
                <div className={classes.mainText}>
                  Tell us your preferences and get personalized recommendations
                </div>
              </Grid>
              <Grid xs={2} item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  endIcon={
                    <ImageComponent
                      src="/static/images/footerBackArrow.svg"
                      alt=""
                      width="8px"
                      height="8px"
                    />
                  }
                  onClick={props.proceedFromWelcome}
                >
                  {'Proceed'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid sm={1} lg={2} item></Grid>
          <div
            className={[classes.alignEnd, classes.alignCloseButton].join(' ')}
          >
            <ImageComponent
              alt="close"
              className={classes.close}
              src="/static/images/green-close.svg"
              onClick={props.handleClose}
            />
          </div>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default OnBoardBanner;

const useStyles = makeStyles((theme) => ({
  border: {
    borderLeft: '1px solid #cccccc40',
    height: '70%',
    margin: '0px 26px',
  },
  contentWrap: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: '8px',
  },
  textWrap: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  logoWrap: {
    marginRight: '25px',
  },
  mainText: {
    fontSize: 'clamp(12px, 1.2vw, 18px)',
    fontWeight: 500,
  },
  alignEnd: {
    paddingLeft: '5.8rem',
    '@media (max-width:1024px ) and (min-width:768px )': {
      paddingLeft: '2rem',
      marginTop: '15px',
    },
    '@media (max-width: 1366px) and (min-width:1024px)': {
      paddingLeft: '3.8rem',
    },
  },
  alignCloseButton: {
    position: 'absolute',
    right: '14px',
  },
  button: {
    color: '#29F87E',
    backgroundColor: '#130827',
    whiteSpace: 'nowrap',
    border: '1px solid #29F87E',
    borderRadius: 28,
    fontSize: 'clamp(12px, 1vw, 14px)',
    fontWeight: 600,
    height: '35px',
    minWidth: '77px',
    padding: '8px 20px',
    textTransform: 'none',
    '& svg': {
      minWidth: 20,
      minHeight: 14,
    },
    '&:hover': {
      color: '#29F87E',
      backgroundColor: '#130827',
      border: '1px solid #29F87E',
    },
  },
  close: {
    width: 20,
    height: 20,
    cursor: 'pointer',
    marginTop: 8,
  },
  leftText: {
    fontSize: 'clamp(12px, 1.2vw, 18px)',
    color: '#FFE310',
    fontWeight: 'bold',
    minWidth: '150px',
  },
  footer: {
    backgroundColor: '#130827',
    borderTop: '1px solid #cccccc40',
    color: 'white',
    minHeight: '80px',
  },
  mobileFooter: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #cccccc40',
    backgroundColor: '#130827',
    color: 'white',
    minHeight: '60px',
    position: 'relative',
  },
  mobileMainText: {
    marginLeft: '12px',
    fontSize: '10px',
    lineHeight: '11px',
    fontWeight: 400,
  },
  mobileLeftText: {
    fontSize: '10px',
    lineHeight: '16px',
    color: '#FFE310',
    fontWeight: 600,
  },

  [theme.breakpoints.down('xs')]: {
    button: {
      height: '25px',
      minWidth: '79px',
      fontSize: '10px',
      fontWeight: 500,
      padding: '6px 12px',
    },
    alignCloseButton: {
      top: '-8px',
    },
    close: {
      marginTop: '0px',
      width: 16,
      height: 16,
    },
  },
}));
