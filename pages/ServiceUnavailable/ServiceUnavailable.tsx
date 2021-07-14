import * as React from 'react';

import { Grid } from '@material-ui/core';
import ImageComponent from '../../components/Images';
import SEO from '../../components/Seo';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

export default function serviceUnavilable(props) {
  const classes = useStyles();
  const steps = [
    {
      id: 1,
      text:
        'Your IP address maybe blocked if you are using a VPN or web proxy, so please disable it and retry',
    },
    {
      id: 2,
      text: (
        <span>
          If you are still getting the error message, email us at{' '}
          <a
            href="mailto:support@ottplay.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            support@ottplay.com{' '}
          </a>
        </span>
      ),
    },
  ];

  const renderSteps = (item) => {
    return (
      <span className={classes.steps}>
        <span className={classes.bullet}></span>
        <span className={classes.stepDescription}>{item.text}</span>
      </span>
    );
  };

  return (
    <Grid container xs={12} className={classes.root}>
      <SEO>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </SEO>
      <div className={classes.ottLogo}>
        <ImageComponent
          src="https://images.ottplay.com/static/new_logo.svg"
          alt="ottplay icon"
        />
      </div>
      <div className={classes.ServiceUnavailableImage}>
        <ImageComponent
          src="https://images.ottplay.com/static/popcorn_dwn.svg"
          alt="error icon"
        />
      </div>

      <div className={classes.contentWrap}>
        <div className={classes.title}>
          {'Service is unavailable in your region'}
        </div>
        <div className={classes.subTitle}>
          {'OTTplay is only supported in India as of now'}
        </div>
        <div>
          <ImageComponent
            className={classes.blueSeparator}
            src="/static/mobile_images/blue_line.svg"
            alt="seperator"
          />
        </div>
        <div className={classes.causion}>
          {
            'If you are in India and have received this error, please follow the below steps:'
          }
        </div>
        <div>
          {steps.map((item, index) => {
            return renderSteps(item);
          })}
        </div>
      </div>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    padding: '24px',
  },
  ottLogo: {
    paddingTop: '60px',
    width: 'clamp(80px, 30vw, 260px)',
    height: 'auto',
    '& img': {
      width: '100%',
    },
  },
  ServiceUnavailableImage: {
    paddingTop: '64px',
    width: 'clamp(90px, 33vw, 178px)',
    height: 'auto',
    '& img': {
      width: '100%',
    },
  },
  contentWrap: {
    display: 'contents',
  },
  title: {
    paddingTop: '50px',
    fontSize: 'clamp(16px, 2vw, 28px)',
    color: 'white',
    fontWeight: 'bold',
    width: 'clamp(187px, 60vw, 530px)',
  },
  subTitle: {
    color: '#BBB6D1',
    fontSize: 'clamp(12px, 1.8vw, 18px)',
    fontWeight: 600,
    paddingTop: '6px',
  },
  blueSeparator: {
    margin: '20px 0px 8px 0px',
    height: '2px',
  },

  causion: {
    color: '#FFFFFF',
    fontSize: 'clamp(12px, 1.6vw, 16px)',
    paddingBottom: '30px',
    fontWeight: 600,
  },
  bullet: {
    minWidth: '10px',
    minHeight: '10px',
    backgroundColor: '#FF4376',
    borderRadius: '50%',
    marginRight: '8px',
  },
  stepDescription: {
    color: '#D6C6F4',
    fontSize: 'clamp(12px, 1.6vw, 16px)',
    '& a': {
      color: '#03F87E',
    },
  },
  steps: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '4px',
  },

  [theme.breakpoints.down('xs')]: {
    ottLogo: {
      paddingTop: '0px',
    },
    ServiceUnavailableImage: {
      paddingTop: '20px',
    },
    title: {
      paddingTop: '12px',
    },
    bullet: {
      minWidth: '6px',
      minHeight: '6px',
      margin: '6px 6px 0px 0px',
    },
    steps: {
      alignItems: 'flex-start',
      paddingTop: '10px',
    },
    blueSeparator: {
      width: '100%',
    },
  },
}));
