import * as React from 'react';

import { Footer, NavBar, TopHeader } from '../components';
import { Grid, Hidden } from '@material-ui/core';

import Helmet from 'react-helmet';
import ImageComponent from '../components/Images';
import { Theme } from '@material-ui/core/styles';
import { ViewportContext } from '../components/ViewportProvider';
import { makeStyles } from '@material-ui/core/styles';

export default function About(props) {
  const { width } = React.useContext(ViewportContext);
  const classes = useStyles();
  const aboutUs = [
    {
      title: 'SMART TIMING',
      description:
        'If you have only 10 minutes, we’ll tell you what you can watch in 10 minutes. It could be a short film, stand up clip, a series of trailers, or an interview.',
      image: 'https://images.ottplay.com/static/aboutUs/timing.svg',
    },
    {
      title: 'SMART SEARCHING',
      description:
        'Based on the kind of shows or movies you like our recommendation engine searches over 100,000 titles to serve you only the best stuff you must see.',
      image: 'https://images.ottplay.com/static/aboutUs/smart_search.svg',
    },
    {
      title: 'SMART WATCHING',
      description:
        'Most apps just tell you what to watch from the streaming services you have subscribed to. We go beyond. There’s so much free content you’re missing out. We give you the best of both worlds.',
      image: 'https://images.ottplay.com/static/aboutUs/selective.svg',
    },
    {
      title: 'SMART MOODS',
      description:
        'There’s no point in watching a grim drama when you need cheering up. Our app lets you take your pick according to your mood.',
      image: 'https://images.ottplay.com/static/aboutUs/feedback.svg',
    },
    {
      title: 'SMART RATINGS',
      description:
        'Sometimes even IMDB ratings can lie. Which is why we have a rating of ratings to make an informed choice.',
      image: 'https://images.ottplay.com/static/aboutUs/rating.svg',
    },
    {
      title: 'SMART EXPERIMENTS',
      description:
        'For those who are experimental, we egg you on to watch the finest creations beyond movies and shows in languages that take you out of your comfort zone.',
      image: 'https://images.ottplay.com/static/aboutUs/practice.svg',
    },
  ];
  const renderProfileCard = (item) => {
    return (
      <div className={classes.cardWarp}>
        {/* <Helmet>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
          <a href="https://domain.xn--com-9o0a" rel="noindex,nofollow"></a>
        </Helmet> */}
        <div
          className={classes.cardImageWarp}
          style={{
            backgroundImage: `url(https://images.ottplay.com/static/aboutPageIcon.svg)`,
            backgroundPosition: 'center',
          }}
        >
          <ImageComponent
            src={item.image}
            className={classes.cardImage}
            alt="profile"
            // onClick={() => setShareImage(!shareImage)}
          />
        </div>
        <Grid xs={8} md={10} container direction="row" alignItems="center">
          <span className={classes.subHeader}>
            <b>{item.title}</b>
          </span>
          <div className={classes.about_content}>{item.description}</div>
        </Grid>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid xs={12} container>
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
                  <div className={classes.header}>{'About OTTplay'}</div>
                  <div
                    className={classes.about_content}
                    style={{ paddingTop: '5px' }}
                  >
                    Binge-watching is such a pleasure. Searching for
                    binge-watching is such a pain. With OTTplay, you can take
                    the pain out of the equation. <br /> As our SMART
                    recommendation engine handpicks the movies and shows that
                    match your taste and language preferences by diving deep
                    into the most number of OTT CHANNELS.
                  </div>
                </div>
                <div>
                  <div className={classes.header}>{'What you get'}</div>
                  <div
                    className={classes.small_content}
                    style={{ paddingTop: '5px' }}
                  >
                    It clearly tells WHAT to watch, WHERE to watch, HOW to
                    watch, and even WHEN to watch! Here are some cool features
                    of the app:
                  </div>
                  <div className={classes.list}>
                    {aboutUs.map((item, index) => {
                      return renderProfileCard(item);
                    })}
                  </div>
                  <div className={classes.final_content}>
                    Over and above this, you have a watchlist, Discover and all
                    the usual suspects you expect in a good family app. OTTplay
                    may not let you stream movies. But we do a damn good job of
                    serving you the very best.
                  </div>
                </div>
              </div>
              <div>
                <ImageComponent
                  src="https://images.ottplay.com/static/about_us.png"
                  alt="about us image"
                  className={classes.aboutUsImg}
                />
              </div>
            </div>
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
    </React.Fragment>
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
    padding: '40px 20px 0px 20px',
    minHeight: '80vh',
  },
  contentsWarp: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  news_source_link_box: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWarp: {
    display: 'flex',
    paddingBottom: '15px',
    alignItems: 'flex-start',
  },
  cardImage: {
    width: '60%',
    height: '60%',
    objectFit: 'scale-down',
  },
  cardImageWarp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
    width: 'clamp(82px, 2vw, 114px)',
    height: 'clamp(82px, 2vw, 114px)',
    borderRadius: '50%',
  },
  movie_option_container: {
    padding: '0px !important',
  },
  about_content: {
    opacity: '0.7',
    lineHeight: '1.5',
    textAlign: 'justify',
    color: 'white',
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    padding: '4px 0 20px 0',
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
  small_content: {
    opacity: '0.7',
    lineHeight: '1.5',
    textAlign: 'justify',
    color: 'white',
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    padding: '4px 0 20px 0',
  },
  final_content: {
    opacity: '0.7',
    lineHeight: '1.5',
    textAlign: 'justify',
    color: 'white',
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    padding: '4px 0 20px 0',
  },
  div_left: {},
  header: {
    textAlign: 'left',
    color: 'white',
    fontSize: 'clamp(16px, 2vw, 24px)',
    textTransform: 'capitalize',
  },
  subHeader: {
    textAlign: 'left',
    color: 'white',
    fontSize: 'clamp(14px, 1.5vw, 20px)',
    textTransform: 'capitalize',
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
  aboutUsImg: {
    width: '28vw',
    marginLeft: '12px',
  },
  list: {
    opacity: '0.7',
    lineHeight: '1.5',
    textAlign: 'left',
    color: 'white',
    paddingTop: '20px',
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
  [theme.breakpoints.down('xs')]: {
    mainBody: {
      paddingTop: '20px',
    },
    contentsWarp: {
      flexDirection: 'column-reverse',
      justifyContent: 'flex-start',
    },
    aboutUsImg: {
      width: '70vw',
    },
    list: {
      paddingTop: 10,
    },
    about_content: {
      padding: '4px 0 10px 0',
    },
    small_content: {
      padding: '4px 0 10px 0',
    },
    final_content: {
      padding: '0',
    },
    cardWarp: {
      paddingBottom: '10px',
    },
  },
}));
