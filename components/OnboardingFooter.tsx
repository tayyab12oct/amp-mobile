import { Avatar, Grid, Typography } from '@material-ui/core';

import Link from 'next/link';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

export default function OnboardingFooter() {
  const classes = useStyles();
  // const url =
  //   process.env.REACT_APP_ENV === 'production'
  //     ? 'https://www.ottplay.com/'
  //     : 'https://stg.ottplay.com/';

  return (
    <div className={classes.footer} id="onBoardingFooter">
      <Grid xs={12} container style={{ marginTop: '1%' }}>
        <Grid xs={1} lg={2} item></Grid>
        <Grid xs={10} lg={8} item container>
          {/* <div className={classes.termsInline}> */}
          <Grid xs={12} container item className={classes.termsInline}>
            <Grid sm={7} lg={8} xl={7} item className={classes.leftContainer}>
              <Link href="/about-us">
                <a className={classes.links} rel="nofollow">
                  {'About OTTplay'}
                </a>
              </Link>

              <Link href="/terms-of-use">
                <a
                  //href={`${url}terms-of-use`}
                  className={classes.links}
                  rel="nofollow"
                >
                  {'Terms of Use'}
                </a>
              </Link>

              <Link href="/privacy-policy">
                <a
                  //href={`${url}privacy-policy`}
                  className={classes.links}
                  rel="nofollow"
                >
                  {'Privacy Policy'}
                </a>
              </Link>

              <Link href="/cookie-policy">
                <a
                  //href={`${url}cookie-policy`}
                  className={classes.links}
                  rel="nofollow"
                >
                  {'Cookie Policy'}
                </a>
              </Link>

              <Link href="/faq">
                <a
                  //href={`${url}faq`}
                  className={classes.links}
                  rel="nofollow"
                >
                  {'FAQ'}
                </a>
              </Link>

              <Link href="/contact-us">
                <a
                  //href={`${url}contact-us`}
                  className={classes.links}
                  rel="nofollow"
                >
                  {'Contact Us'}
                </a>
              </Link>
            </Grid>
            <Grid
              sm={5}
              lg={4}
              xl={5}
              item
              container
              className={classes.rightContainer}
            >
              <div className={classes.termsSection}>
                Copyright @ 2021 OTTplay, Hindustan Media Ventures Limited
              </div>
            </Grid>
          </Grid>
          {/* </div> */}
        </Grid>

        <Grid xs={1} lg={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    flexGrow: 1,
    position: 'sticky',
    //padding: "25px 317px",
    background: 'transparent',
    // background: 'rgb(63,94,251) linear-gradient(10deg, rgba(63,94,251,0) 0%, rgba(2,2,3,1) 43%)',
    // backgroundColor: "#100719",
    // background: 'rgb(63,94,251) linear-gradient(180deg, rgba(63,94,251,1) 0%, rgba(2,2,3,1) 43%)',
    // background: '#00FFFFFF linear-gradient(10deg, #00FFFFFF 0%, rgba(2,2,3,1) 43%)',
    // "&:before": {
    //   content: "''",
    //   top: 0,
    //   opacity: 0.3,
    //   position: "absolute",
    //   // borderTop: "1px solid #D6C6F44D",
    //   left: "0",
    //   width: "100%",
    //   backgroundColor: "#04000B",
    //   color: "#fff",
    //   textAlign: "right",
    // },
    // "@media (max-width: 1440px)": {
    //   padding: "25px 200px",
    // },
    // "@media (max-width: 1024px)": {
    //   padding: "25px 100px",
    // },
    // "@media (max-width: 768px)": {
    //   padding: "25px 25px",
    // },
  },
  termsInline: {
    borderTop: '0.5px solid #D6C6F480',
    // marginTop: "50px",
    opacity: '0.5',
    padding: '10px 20px 20px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsSection: {
    // display: 'flex',
    // marginTop: '20px',
    // flexDirection: 'column',
    textAlign: 'left',
    textAlignLast: 'center',
    color: '#D6C6F4',
    fontSize: 'clamp(12px, 0.8vw, 18px)',
    fontWeight: 300,
    // marginRight: '20px'
  },
  rightContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  links: {
    textDecoration: 'none !important',
    fontSize: 'clamp(12px, 1vw, 18px)',
    //fontWeight: 600,
    listStyle: 'none',
    marginRight: '10px',
    color: '#D6C6F4',
    //font: 'normal normal bold 17px Montserrat',
    padding: 0,
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typograph: {
    textAlign: 'left',
    margin: '10px',
    width: '20%',
  },
});
