import { Footer, NavBar, TopHeader } from '../components';
import { Grid, Hidden } from '@material-ui/core';
import React, { Fragment } from 'react';

import ImageComponent from '../components/Images';
import { Theme } from '@material-ui/core/styles';
import { ViewportContext } from '../components/ViewportProvider';
import { makeStyles } from '@material-ui/core/styles';

export default function ContactUs(props) {
  const { width } = React.useContext(ViewportContext);
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        {/* <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <a href="https://domain.xn--com-9o0a" rel="noindex,nofollow"></a>
      </Helmet> */}
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={12}
          item
          container
          //spacing={2}
          direction="row"
          justify="space-between"
          alignItems="stretch"
        >
          <Hidden only={['xs']}>
            <Grid xs={1} lg={2} item></Grid>
          </Hidden>

          <Grid
            item
            xs={width < 600 ? 12 : 10}
            lg={8}
            className={classes.mainBody}
          >
            <div className={classes.contentsWarp}>
              <div>
                <div>
                  <div className={classes.header}>{'Share Feedback'}</div>
                  <div className={classes.about_content}>
                    {' '}
                    We are working towards making OTTplay a product that is
                    always at your fingertips. Your feedback is crucial to us to
                    decide which features to build and where we can improve. To
                    help us do our best, please share your feedback with us. You
                    can write to us at{' '}
                    <a href="mailto:feedbackottplay@htmedialabs.com">
                      feedbackottplay@htmedialabs.com
                    </a>
                  </div>
                </div>
                <div>
                  <div className={classes.subHeader}>Contact Us</div>
                  <div className={classes.about_content}>
                    Do email us in case of any questions or inquiries at
                    <a href="mailto:contactottplay@htmedialabs.com">
                      contactottplay@htmedialabs.com
                    </a>{' '}
                    and we will be happy to address your concerns.
                  </div>
                </div>
                {/* <div>
                <div className={classes.subHeader}>Get in Touch</div>
                <div className={classes.about_content}>
                  Fill the detail. Our team members will get back to you
                </div>
              </div> */}
              </div>
              <div>
                <ImageComponent
                  className={classes.contactUsImg}
                  src="https://images.ottplay.com/static/contact_us.png"
                  alt="contact us"
                />
              </div>
            </div>

            {/* <Grid item xs={12} sm={12} md={8} lg={8} className={classes.div_left}>
            <Grid direction="row" xs={12} container>
              <Grid direction="row" xs={6} container>
                <input
                  type="text"
                  className={classes.subscribeInput}
                  placeholder="Full Name"
                />
              </Grid>
              <Grid direction="row" xs={6} container>
                <input
                  type="text"
                  className={classes.subscribeInput}
                  placeholder="Email Address"
                />
              </Grid>
            </Grid>
            <Grid
              direction="row"
              xs={12}
              container
              style={{ margin: '20px 0 0px 0' }}
              spacing={10}
            >
              <Grid direction="row" xs={6} container>
                <input
                  type="text"
                  className={classes.subscribeInput}
                  placeholder="Mobile Number"
                />
              </Grid>
              <Grid direction="row" xs={6} container>
                <input
                  type="text"
                  className={classes.subscribeInput}
                  placeholder="Company"
                />
              </Grid>
            </Grid>
            <Grid
              direction="row"
              xs={12}
              container
              style={{ margin: '20px 0 0px 0' }}
            >
              <textarea
                rows={5}
                cols={70}
                className={classes.subscribeInput}
                style={{ width: '97.5%' }}
                placeholder="Message"
              />
            </Grid>
            <Grid
              direction="row"
              xs={12}
              container
              justify="center"
              style={{ margin: '20px 0px 10px 0px' }}
            >
              <PillButton
                text={'Send'}
                endIcon={<RightArrow />}
                style={{
                  backgroundColor: '#FF4275',
                  margin: 0,
                  border: '0.5px solid #FF4275',
                  fontSize: 'clamp(13px, 1.5vw, 18px)',
                  fontWeight: 600,
                  textTransform: 'none',
                  color: 'white',
                  padding: '2px 24px',
                  borderRadius: '28px',
                  pointerEvents: 'auto',
                  opacity: 1,
                }}
              />
            </Grid>
          </Grid> */}
            <div>
              <p className={classes.sourceHeader}>
                We are using the following News Publishers on the OTTplay
                platform
              </p>
              <div className={classes.news_source_link_box}>
                <div>
                  <h4 className={classes.subHeaderNews}>Hindustan Times</h4>
                  <p className={classes.news_source_content}>
                    Website -{' '}
                    <a
                      href="https://www.hindustantimes.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      hindustantimes.com
                    </a>
                  </p>
                  <p className={classes.news_source_content}>
                    Contact -{' '}
                    <a
                      href="https://www.hindustantimes.com/contact-us"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://www.hindustantimes.com/contact-us
                    </a>
                  </p>
                </div>

                <div>
                  <h4 className={classes.subHeaderNews}>Livemint</h4>
                  <p className={classes.news_source_content}>
                    Website -{' '}
                    <a
                      href="https://epaper.livemint.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      livemint.com
                    </a>
                  </p>
                  <p className={classes.news_source_content}>
                    Contact -{' '}
                    <a
                      href="https://epaper.livemint.com/Home/contactus"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://epaper.livemint.com/Home/contactus
                    </a>
                  </p>
                </div>

                <div>
                  <h4 className={classes.subHeaderNews}>Film Companion</h4>
                  <p className={classes.news_source_content}>
                    Website -{' '}
                    <a
                      href="https://www.filmcompanion.in"
                      target="_blank"
                      rel="noreferrer"
                    >
                      filmcompanion.in
                    </a>
                  </p>
                  <p className={classes.news_source_content}>
                    Contact -{' '}
                    <a
                      href="https://www.filmcompanion.in/contact-us/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://www.filmcompanion.in/contact-us/
                    </a>
                  </p>
                </div>

                <div>
                  <h4 className={classes.subHeaderNews}> Desimartini</h4>
                  <p className={classes.news_source_content}>
                    Website -{' '}
                    <a
                      href="https://www.desimartini.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      desimartini.com
                    </a>
                  </p>
                  <p className={classes.news_source_content}>
                    Contact -{' '}
                    <a
                      href="https://www.desimartini.com/contact-us.htm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://www.desimartini.com/contact-us.htm
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Grid>
          <Hidden only={['xs']}>
            <Grid xs={1} lg={2} item></Grid>
          </Hidden>
        </Grid>
      </div>
    </Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBody: {
    padding: '2% 20px 0px 20px',
    minHeight: '70vh',
  },
  contentsWarp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collapsable_container: {
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    borderTop: '2px solid #8b1b5d8c',
    borderBottom: '2px solid #8b1b5d8c',
    textAlign: 'left',
    padding: '15px 0',
  },
  movie_option_container: {
    padding: '0px !important',
  },
  about_content: {
    opacity: '0.7',
    lineHeight: '1.5',
    textAlign: 'left',
    color: 'white',
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    padding: '4px 0 20px 0',
    '& a': {
      color: '#FF4376',
      textDecoration: 'none',
      fontWeight: 600,
      marginLeft: 4,
    },
  },
  div_left: {},
  header: {
    textAlign: 'left',
    color: 'white',
    fontSize: 'clamp(16px, 1.8vw, 28px)',
    fontWeight: 500,
  },
  subHeader: {
    textAlign: 'left',
    color: 'white',
    fontSize: 'clamp(13px, 1.4vw, 18px)',
    fontWeight: 500,
  },
  contactUsImg: {
    width: '28vw',
  },
  sub_header1: {
    textTransform: 'capitalize',
    fontWeight: 'bolder',
  },
  movie_container: {
    margin: 0,
    [theme.breakpoints.down('lg')]: {
      // marginLeft: '-140px'
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  collapsable_div: {
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  collapsed_div: {
    opacity: '0.7',
    color: 'white',
    fontSize: '12px',
    textAlign: 'left',
    padding: '25px 10px',
    lineHeight: '2',
  },
  sub_header2: {
    textTransform: 'capitalize',
    fontWeight: 'bolder',
    fontSize: '18px',
  },
  innerInput: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    position: 'relative',
  },
  subscribeInput: {
    width: '95%',
    padding: '12px',
    backgroundColor: '#341A5380',
    borderRadius: '5px',
    outline: 'none',
    border: 'none',
    color: '#A89ABF',
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    fontFamily: 'Montserrat',
    '&::placeholder': {
      color: '#A89ABF',
      fontSize: 'clamp(12px, 1.1vw, 16px)',
      opacity: 1,
    },
    '&:-ms-input-placeholder': {
      color: '#A89ABF',
      fontSize: 'clamp(12px, 1.1vw, 16px)',
    },
    '&::-ms-input-placeholder': {
      color: '#A89ABF',
      fontSize: 'clamp(12px, 1.1vw, 16px)',
    },
  },
  news_source_content: {
    opacity: '0.7',
    lineHeight: '1.5',
    textAlign: 'left',
    color: 'white',
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    padding: '4px 0',
    margin: '0px',
    '& a': {
      textDecoration: 'underline',
      color: 'white',
      fontSize: 'clamp(12px, 1.1vw, 16px)',
      transition: '0.5s',
      '&:hover': {
        color: '#03F87E',
      },
    },
  },
  news_source_link_box: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sourceHeader: {
    textAlign: 'left',
    color: 'white',
    fontSize: 'clamp(14px, 1.5vw, 20px)',
    fontWeight: 500,
    margin: 0,
    paddingBottom: 12,
    borderBottom: '1px solid rgb(255 255 255 / 10%)',
  },
  subHeaderNews: {
    textAlign: 'left',
    color: 'white',
    fontSize: 'clamp(14px, 1.5vw, 20px)',
    textTransform: 'capitalize',
    margin: '10px 0px',
  },
  [theme.breakpoints.down('xs')]: {
    contentsWarp: {
      flexDirection: 'column-reverse',
      justifyContent: 'flex-start',
    },
    contactUsImg: {
      width: '70vw',
      paddingTop: '20px',
    },
    about_content: {
      padding: '4px 0 10px 0',
    },
    mainBody: {
      padding: '2% 18px 0px 18px',
      minHeight: '82vh',
    },
  },
}));
