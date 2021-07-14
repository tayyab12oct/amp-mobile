import {
  DESI_MARTINI,
  FB_OTT,
  HEALTHSHOTS,
  HINDUSTAN_TIMES,
  IN_OTT,
  LIVE_HINDUSTAN,
  LIVE_MINT,
  SHINE,
  SLURRP,
  SSO_LOGIN_URL,
  TW_OTT,
  YT_OTT,
} from '../utils/constants';

import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import ImageComponent from './Images';
import Modal from 'react-modal';
import { PillButton } from './PillButton';
import React from 'react';
import SettingsPage from '../pages/SettingsPage';
import { ViewportContext } from './ViewportProvider';
import { colors } from './CommonColors';
import { makeStyles } from '@material-ui/styles';

export function Footer() {
  const classes = useStyles();
  const mobileClasses = mobileStyles();
  const { width } = React.useContext(ViewportContext);
  if (process.env.NODE_ENV !== 'development') Modal.setAppElement('body');

  const [showModal, setshowModal] = React.useState(false);
  const handleOpenModal = () => {
    setshowModal(true);
  };
  const handleCloseModal = (event) => {
    setshowModal(false);
  };

  const renderFooter = () => {
    return (
      <Grid xs={12} container item className={classes.outerContainer}>
        <Grid xs={1} sm={1} md={1} lg={2} item></Grid>
        <Grid
          item
          xs={10}
          sm={10}
          md={10}
          lg={8}
          container
          style={{ padding: '0px 0.75% 0px 0.75%' }}
        >
          <div className={classes.footer}>
            <div className={classes.topSection}>
              <div className={classes.avatarSection}>
                <Avatar
                  alt="logo"
                  src="https://images.ottplay.com/static/new_logo.svg"
                  className={classes.logo}
                />
                <div className={classes.mediaText}>
                  Follow us
                  <div className={classes.media}>
                    <a rel="nofollow">
                      <ImageComponent
                        src={`/static/follow_images/fb.svg`}
                        alt="facebook_icon"
                        onClick={() => window.open(FB_OTT, '_blank')}
                        className={classes.socialMedia}
                      />
                    </a>
                    <a rel="nofollow">
                      <ImageComponent
                        src={`/static/follow_images/twitter.svg`}
                        alt="twitter_icon"
                        onClick={() => window.open(TW_OTT, '_blank')}
                        className={classes.socialMedia}
                      />
                    </a>
                    <a rel="nofollow">
                      <ImageComponent
                        src={`/static/follow_images/inst.svg`}
                        alt="instaram_icon"
                        onClick={() => window.open(IN_OTT, '_blank')}
                        className={classes.socialMedia}
                      />
                    </a>
                    <a rel="nofollow">
                      <ImageComponent
                        src={`/static/follow_images/utube.svg`}
                        alt="youtube_icon"
                        onClick={() => window.open(YT_OTT, '_blank')}
                        className={classes.socialMedia}
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className={classes.ulSection}>
                <ul className={classes.list}>
                  <li>
                    <a href="/foryou" rel="nofollow" className={classes.links}>
                      {'For You'}
                    </a>
                  </li>
                  <li>
                    <a href="/home" rel="nofollow" className={classes.links}>
                      {'Home'}
                    </a>
                  </li>
                  <li>
                    <a href="/movies" rel="nofollow" className={classes.links}>
                      {'Movies'}
                    </a>
                  </li>
                  <li>
                    <a href="/shows" rel="nofollow" className={classes.links}>
                      {'Shows'}
                    </a>
                  </li>

                  <li>
                    <a
                      href="/all-language"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'Language'}
                    </a>
                  </li>
                </ul>
              </div>

              <div className={classes.ulSection}>
                <ul className={classes.list}>
                  <li>
                    <a
                      href="/all-genre"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'Genre'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/all-provider"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'Streaming services'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/watchlist"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'Watchlist'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/all-news"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'Latest News'}
                    </a>
                  </li>
                  <li>
                    <a href="/reviews" rel="nofollow" className={classes.links}>
                      {'Reviews'}
                    </a>
                  </li>
                </ul>
              </div>

              <div className={classes.ulSection}>
                <ul className={classes.list}>
                  <li>
                    <a
                      href="/listicles"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'Listicles'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/interviews"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'Interviews'}
                    </a>
                  </li>

                  <li>
                    <a href="/search" rel="nofollow" className={classes.links}>
                      {'Search'}
                    </a>
                  </li>
                  <li>
                    <span className={classes.links} onClick={handleOpenModal}>
                      {'Settings'}
                    </span>
                  </li>
                  <li>
                    <a
                      href="/cookie-policy"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'Cookie Policy'}
                    </a>
                  </li>
                </ul>
              </div>

              <div className={classes.ulSection}>
                <ul className={classes.list}>
                  <li>
                    <a
                      href="/about-us"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'About'}
                    </a>
                  </li>
                  <li>
                    <a
                      // href="https://www.htmedia.in/terms-of-use"
                      href="/terms-of-use"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'Terms of Use'}
                    </a>
                  </li>
                  <li>
                    <a
                      // href="https://www.htmedia.in/privacy-policy"
                      href="/privacy-policy"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'Privacy Policy'}
                    </a>
                  </li>

                  <li>
                    <a href="/faq" rel="nofollow" className={classes.links}>
                      {'FAQ'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact-us"
                      rel="nofollow"
                      className={classes.links}
                    >
                      {'Contact Us'}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={classes.middleSection}>
              <div className={classes.storeSubSection}>
                <span className={classes.middleText}>Download app</span>
                <div className={classes.flexSection}>
                  <PillButton
                    startIcon={
                      <ImageComponent
                        src="https://images.ottplay.com/static/playStoreLogo.svg"
                        alt=""
                      />
                    }
                    onClick={() =>
                      window.open(
                        'https://play.google.com/store/apps/details?id=com.ht.ottplay',
                        '_blank'
                      )
                    }
                    style={{
                      backgroundColor: 'transparent',
                      padding: '7px 20px',
                      fontSize: '13px',
                      marginLeft: '0px',
                      marginTop: '10px',
                      fontWeight: '500',
                      border: '1px solid #D6C6F433',
                      //letterSpacing: '0.55px',
                    }}
                    text="Google Play"
                  />
                  <PillButton
                    startIcon={
                      <ImageComponent
                        src="https://images.ottplay.com/static/iosLogo.svg"
                        alt="appleStore_icon"
                      />
                    }
                    onClick={() =>
                      window.open(
                        'https://apps.apple.com/in/app/ottplay/id1536115085',
                        '_blank'
                      )
                    }
                    style={{
                      backgroundColor: 'transparent',
                      padding: '7px 20px',
                      fontSize: '13px',
                      marginTop: '10px',
                      fontWeight: '500',
                      border: '1px solid #D6C6F433',
                      //letterSpacing: '0.55px',
                    }}
                    text="App Store"
                  />
                </div>
              </div>

              {/* <div className={classes.inputEmail}>
                <span className={classes.middleText}>
                  Get the latest updates in your inbox
                </span>
                <div className={classes.innerInput}>
                  <span className={classes.mail}>
                    <ImageComponent
                      src="https://images.ottplay.com/static/footerMail.svg"
                      alt="inbox_icon"
                    />
                  </span>
                  <input
                    type="text"
                    className={classes.subscribeInput}
                    placeholder="Email Address"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(index) => console.log('')}
                    className={classes.button}
                  >
                    {' '}
                    Subscribe
                  </Button>
                </div>
              </div> */}

              <div className={classes.loginSection}>
                <span className={classes.middleText}>
                  Take your watchlist wherever you go
                </span>
                <div className={classes.flexSection}>
                  <PillButton
                    endIcon={
                      <ImageComponent
                        src="https://images.ottplay.com/static/rightArrow.svg"
                        alt="Right"
                      />
                    }
                    onClick={(index) => window.open(SSO_LOGIN_URL, '_self')}
                    style={{
                      backgroundColor: 'transparent',
                      padding: '7px 20px',
                      fontSize: '13px',
                      marginLeft: '0px',
                      marginTop: '10px',
                      fontWeight: '500',
                      border: '1px solid #D6C6F433',
                    }}
                    text="Sign In"
                  />
                  {/* <PillButton
                    endIcon={
                      <ImageComponent
                        src="https://images.ottplay.com/static/rightArrow.svg"
                        alt="Right"
                      />
                    }
                    onClick={(index) => console.log('')}
                    style={{
                      backgroundColor: 'transparent',
                      padding: '7px 20px',
                      fontSize: '13px',
                      marginTop: '10px',
                      fontWeight: '500',
                      border: '1px solid #D6C6F433',
                    }}
                    text="Create An Account"
                  /> */}
                </div>
              </div>
            </div>
            <div className={classes.termsInline}>
              <div className={classes.partnerWrap}>
                <span>
                  <b>Partner sites:</b>
                </span>
                <span onClick={() => window.open(HINDUSTAN_TIMES, '_blank')}>
                  {'   '}
                  Hindustan Times{' '}
                </span>{' '}
                <span style={{ margin: '1%' }}>
                  <b>&#183;</b>
                </span>
                <span onClick={() => window.open(LIVE_HINDUSTAN, '_blank')}>
                  {' '}
                  Live Hindustan{' '}
                </span>{' '}
                <span style={{ margin: '1%' }}>
                  <b>&#183;</b>
                </span>
                <span onClick={() => window.open(LIVE_MINT, '_blank')}>
                  {' '}
                  Live Mint
                </span>
                <span style={{ margin: '1%' }}>
                  <b>&#183;</b>
                </span>
                <span onClick={() => window.open(DESI_MARTINI, '_blank')}>
                  Desimartini{' '}
                </span>{' '}
                <span style={{ margin: '1%' }}>
                  <b>&#183;</b>
                </span>
                <span onClick={() => window.open(SHINE, '_blank')}>
                  {' '}
                  Shine{' '}
                </span>{' '}
                <span style={{ margin: '1%' }}>
                  <b>&#183;</b>
                </span>
                <span onClick={() => window.open(HEALTHSHOTS, '_blank')}>
                  {' '}
                  Healthshots{' '}
                </span>{' '}
                <span style={{ margin: '1%' }}>
                  <b>&#183;</b>
                </span>
                <span onClick={() => window.open(SLURRP, '_blank')}>
                  {' '}
                  Slurrp
                </span>
              </div>
            </div>
            <div className={classes.termsInline}>
              <div className={classes.termsSection}>
                © 2020 OTTplay, HT Media Labs. All rights reserved.
                <div className={classes.termsParaSection}>
                  About OTTplay - Binge-watching is such a pleasure. Searching
                  for binge-watching is such a pain. With OTTplay, you can take
                  the pain out of the equation. As our SMART recommendation
                  engine handpicks the movies and shows that match your taste
                  and language preferences by diving deep into the most number
                  of OTT CHANNELS. What You Get It clearly tells WHAT to watch,
                  WHERE to watch, HOW to watch, and even WHEN to watch! Here are
                  some cool features of the app: SMART TIMING If you have only
                  10 minutes, we’ll tell you what you can watch in 10 minutes.
                  It could be a short film, stand up clip, a series of trailers,
                  or an interview. SMART SEARCHING Based on the kind of shows or
                  movies you like our recommendation engine searches over
                  100,000 titles to serve you only the best stuff you must see.
                  SMART WATCHING Most apps just tell you what to watch from the
                  streaming services you have subscribed to. We go beyond.
                  There’s so much free content you’re missing out. We give you
                  the best of both worlds. SMART MOODS There’s no point in
                  watching a grim drama when you need cheering up. Our app lets
                  you take your pick according to your mood. SMART RATINGS
                  Sometimes even IMDB ratings can lie. Which is why we have a
                  rating of ratings to make an informed choice. SMART
                  EXPERIMENTS For those who are experimental, we egg you on to
                  watch the finest creations beyond movies and shows in
                  languages that take you out of your comfort zone. Over and
                  above this, you have a watchlist, Discover and all the usual
                  suspects you expect in a good family app. OTTplay may not let
                  you stream movies. But we do a damn good job of serving you
                  the very best.
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  };

  const renderMobileFooter = () => {
    return (
      <div className={mobileClasses.root}>
        <Grid xs={12} container>
          <Grid xs={12} container justify="center">
            <ImageComponent
              src="https://images.ottplay.com/static/ott_logo_small.svg"
              alt="blueSeperator"
              className={mobileClasses.watchTv_logo}
            />
          </Grid>
          <Grid
            xs={12}
            container
            className={mobileClasses.follow}
            justify="center"
          >
            Follow us
          </Grid>
          <Grid
            xs={12}
            container
            style={{ margin: '2% 0' }}
            spacing={2}
            direction="row"
            justify="center"
          >
            <ImageComponent
              src={`/static/follow_images/fb.svg`}
              alt="facebook"
              onClick={() => window.open(FB_OTT, '_blank')}
              className={classes.socialMedia}
            />

            <ImageComponent
              src={`/static/follow_images/twitter.svg`}
              alt="twitter"
              onClick={() => window.open(TW_OTT, '_blank')}
              className={classes.socialMedia}
            />

            <ImageComponent
              src={`/static/follow_images/inst.svg`}
              alt="instagram"
              onClick={() => window.open(IN_OTT, '_blank')}
              className={classes.socialMedia}
            />

            <ImageComponent
              src={`/static/follow_images/utube.svg`}
              alt="youtube"
              onClick={() => window.open(YT_OTT, '_blank')}
              className={classes.socialMedia}
            />
          </Grid>
          <Grid
            xs={12}
            container
            className={mobileClasses.follow}
            justify="center"
          >
            Download App
          </Grid>
          <Grid
            xs={12}
            container
            direction="row"
            justify="center"
            style={{ margin: '0 0 0 2%' }}
            spacing={1}
          >
            <div className={classes.flexSection}>
              <PillButton
                startIcon={
                  <ImageComponent
                    src="https://images.ottplay.com/static/playStoreLogo.svg"
                    alt=""
                  />
                }
                onClick={() =>
                  window.open(
                    'https://play.google.com/store/apps/details?id=com.ht.ottplay',
                    '_blank'
                  )
                }
                style={{
                  backgroundColor: '#0C0022',
                  padding: '7px 20px',
                  fontSize: '13px',
                  marginLeft: '0px',
                  marginTop: '10px',
                  fontWeight: '500',
                  border: '1px solid #D6C6F433',
                  //letterSpacing: '0.55px',
                }}
                text="Google Play"
              />
              <PillButton
                startIcon={
                  <ImageComponent
                    src="https://images.ottplay.com/static/iosLogo.svg"
                    alt="appleStore_icon"
                  />
                }
                onClick={() =>
                  window.open(
                    'https://apps.apple.com/in/app/ottplay/id1536115085',
                    '_blank'
                  )
                }
                style={{
                  backgroundColor: '#0C0022',
                  padding: '7px 20px',
                  fontSize: '13px',
                  marginTop: '10px',
                  fontWeight: '500',
                  border: '1px solid #D6C6F433',
                  //letterSpacing: '0.55px',
                }}
                text="App Store"
              />
            </div>
          </Grid>

          {/* <Grid
            xs={12}
            container
            className={mobileClasses.inbox}
            direction="row"
            alignItems="center"
          >
            <ImageComponent
              src={'/static/images/footerMail.svg'}
              alt="mail"
              style={{ maxWidth: 25, maxHeight: 25, marginRight: '10px' }}
            />
            Get the latest updates in your inbox
          </Grid> 
          <Grid
            xs={12}
            container
            style={{ marginTop: '5%', position: 'relative' }}
          >
            <input
              type="text"
              className={mobileClasses.subscribeInput}
              placeholder="Email Address"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={(index) => console.log('')}
              className={classes.button}
              style={{
                width: '40%',
                position: 'absolute',
                left: '60%',
                borderRadius: '31px',
                height: '36px',
                fontSize: '10px',
                fontWeight: 600,
              }}
            >
              Subscribe
            </Button>
          </Grid> */}
          <Grid
            xs={12}
            container
            className={mobileClasses.follow}
            justify="center"
          >
            Take your watchlist wherever you go
          </Grid>
          <Grid xs={12} container justify="center" style={{ margin: '2% 0' }}>
            <PillButton
              endIcon={
                <ImageComponent
                  src="https://images.ottplay.com/static/rightArrow.svg"
                  alt="Right"
                />
              }
              onClick={(index) => window.open(SSO_LOGIN_URL, '_self')}
              style={{
                backgroundColor: '#0C0022',
                padding: '7px 20px',
                fontSize: '12px',
                marginLeft: '0px',
                fontWeight: 400,
                // width: '100%',
                border: '1px solid #D6C6F433',
              }}
              text="Sign In"
            />

            {/* <Grid xs={7} item>
              <PillButton
                // endIcon={<RightArrow />}
                onClick={(index) => console.log('')}
                style={{
                  backgroundColor: 'transparent',
                  padding: '7px 20px',
                  fontSize: '12px',
                  marginTop: '10px',
                  color: 'white',
                  fontWeight: 400,
                  width: '100%',
                }}
                text="Create An Account"
              />
            </Grid> */}

            <Grid
              xs={12}
              item
              style={{
                height: '1px',
                backgroundColor: colors.LIGHT_BLACK,
                border: `1px solid ${colors.LIGHT_BORDER}`,
                marginTop: '20px',
              }}
            ></Grid>

            <Grid xs={12} container>
              <Grid xs={6} container direction="column">
                <ul className={mobileClasses.list}>
                  <li>
                    <a
                      href="/foryou"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'For You'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/home"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Home'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/movies"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Movies'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/shows"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Shows'}
                    </a>
                  </li>

                  <li>
                    <a
                      href="/all-language"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Language'}
                    </a>
                  </li>
                </ul>
              </Grid>
              <Grid xs={6} container direction="column">
                <ul className={mobileClasses.list}>
                  <li>
                    <a
                      href="/all-genre"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Genre'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/all-provider"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Streaming services'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/watchlist"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Watchlist'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/all-news"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Latest News'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/reviews"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Reviews'}
                    </a>
                  </li>
                </ul>
              </Grid>
            </Grid>

            <Grid xs={12} container>
              <Grid xs={6} container direction="column">
                <ul className={mobileClasses.list}>
                  <li>
                    <a
                      href="/listicles"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Listicles'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/interviews"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Interviews'}
                    </a>
                  </li>

                  <li>
                    <a
                      href="/search"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Search'}
                    </a>
                  </li>
                  <li>
                    <span
                      onClick={handleOpenModal}
                      className={mobileClasses.links}
                    >
                      {'Settings'}
                    </span>
                  </li>
                  <li>
                    <a
                      href="/cookie-policy"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Cookie Policy'}
                    </a>
                  </li>
                </ul>
              </Grid>
              <Grid xs={6} container direction="column">
                <ul className={mobileClasses.list}>
                  <li>
                    <a
                      href="/about-us"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'About'}
                    </a>
                  </li>
                  <li>
                    <a
                      // href="https://www.htmedia.in/terms-of-use"
                      href="/terms-of-use"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Terms of Use'}
                    </a>
                  </li>
                  <li>
                    <a
                      // href="https://www.htmedia.in/privacy-policy"
                      href="/privacy-policy"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Privacy Policy'}
                    </a>
                  </li>

                  <li>
                    <a
                      href="/faq"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'FAQ'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact-us"
                      rel="nofollow"
                      className={mobileClasses.links}
                    >
                      {'Contact Us'}
                    </a>
                  </li>
                </ul>
              </Grid>
              <Grid
                xs={12}
                item
                style={{
                  height: '1px',
                  backgroundColor: colors.LIGHT_BLACK,
                  border: `1px solid ${colors.LIGHT_BORDER}`,
                }}
              ></Grid>

              <div style={{ width: '100%' }}>
                <div className={mobileClasses.partnerWrap}>Partner sites:</div>
                <div className={mobileClasses.partnerWrap}>
                  <span onClick={() => window.open(HINDUSTAN_TIMES, '_blank')}>
                    Hindustan Times{' '}
                  </span>{' '}
                  <span style={{ margin: '2%' }}>
                    <b>&#183;</b>
                  </span>
                  <span onClick={() => window.open(LIVE_HINDUSTAN, '_blank')}>
                    {' '}
                    Live Hindustan{' '}
                  </span>{' '}
                  <span style={{ margin: '2%' }}>
                    <b>&#183;</b>
                  </span>
                  <span onClick={() => window.open(LIVE_MINT, '_blank')}>
                    {' '}
                    Live Mint
                  </span>
                </div>
                <div className={mobileClasses.partnerWrap}>
                  <span onClick={() => window.open(DESI_MARTINI, '_blank')}>
                    Desimartini{' '}
                  </span>{' '}
                  <span style={{ margin: '2%' }}>
                    <b>&#183;</b>
                  </span>
                  <span onClick={() => window.open(SHINE, '_blank')}>
                    {' '}
                    Shine{' '}
                  </span>{' '}
                  <span style={{ margin: '2%' }}>
                    <b>&#183;</b>
                  </span>
                  <span onClick={() => window.open(HEALTHSHOTS, '_blank')}>
                    {' '}
                    Healthshots{' '}
                  </span>{' '}
                  <span style={{ margin: '2%' }}>
                    <b>&#183;</b>
                  </span>
                  <span onClick={() => window.open(SLURRP, '_blank')}>
                    {' '}
                    Slurrp
                  </span>
                </div>
              </div>
              <Grid
                xs={12}
                item
                style={{
                  height: '1px',
                  backgroundColor: colors.LIGHT_BLACK,
                  border: `1px solid ${colors.LIGHT_BORDER}`,
                }}
              ></Grid>
              {/*<Grid xs={12} item className={classes.linksMobWarp}>
                <a
                  href="/about-us"
                  className={classes.linksMobFirst}
                  rel="nofollow"
                >
                  {'About OTTplay'}
                </a>
                <a
                  href="/terms-of-use"
                  className={classes.linksMob}
                  rel="nofollow"
                >
                  {'Terms of Use'}
                </a>
                <a
                  href="/privacy-policy"
                  className={classes.linksMob}
                  rel="nofollow"
                >
                  {'Privacy Policy'}
                </a>
                <a
                  href="/cookie-policy"
                  className={classes.linksMob}
                  rel="nofollow"
                >
                  {'Cookie Policy'}
                </a>
                <a href="/faq" className={classes.linksMob} rel="nofollow">
                  {'FAQ'}
                </a>
                <a
                  href="/contact-us"
                  className={classes.linksMob}
                  rel="nofollow"
                >
                  {'Contact Us'}
                </a>
              </Grid>
               */}
              <Grid
                xs={12}
                item
                style={{
                  fontSize: '10px',
                  color: colors.LIGHT_PURPLE,
                  textAlign: 'center',
                  marginTop: '0.5rem',
                  opacity: '0.6',
                }}
              >
                Copyright @ 2021 OTTplay, Hindustan Media Ventures Limited
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <React.Fragment>
      {width < 600 ? renderMobileFooter() : renderFooter()}
      <Modal
        isOpen={showModal}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.8)',
          },
          content: {
            position: 'fixed',
            top: '0px',
            left: width > 600 ? '50%' : '0px',
            right: '0px',
            bottom: '0px',
            border: '1px solid #100627',
            background: '#100627',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0px',
            outline: 'none',
            padding: '0px',
            zIndex: '999',
          },
        }}
        onAfterOpen={() => {
          document.body.style.overflow = 'hidden';
        }}
        onAfterClose={() => {
          document.body.style.overflow = 'auto';
        }}
      >
        <SettingsPage handleClose={handleCloseModal} />
      </Modal>
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  outerContainer: {
    backgroundColor: 'rgba(4, 0, 11, 0.3)',
    position: 'absolute',
    marginTop: '2%',
    paddingTop: '1%',
  },
  linksMobWarp: {
    display: 'flex',
    justifyContent: 'space-evenly',
    paddingTop: '8px',
    paddingBottom: '4px',
  },
  linksMob: {
    textDecoration: 'none !important',
    fontSize: '10px',
    listStyle: 'none',
    color: '#D6C6F4',
    padding: 0,
    marginLeft: 6,
    textAlign: 'center',
  },
  linksMobFirst: {
    textDecoration: 'none !important',
    fontSize: '10px',
    listStyle: 'none',
    color: '#D6C6F4',
    padding: 0,
    textAlign: 'center',
  },
  footer: {
    position: 'relative',
    // padding: '25px 317px',
    width: '100%',
    // backgroundColor: '#04000B',
    // margin: '35px 0px 35px',
    margin: '0px 0px 16px',
    // width: '100%',
    '&:before': {
      content: '',
      top: 0,
      borderTop: '1px solid #D6C6F44D',
      left: '0',
      width: '100%',
      backgroundColor: '#04000B',
      color: '#fff',
      textAlign: 'right',
    },
    // '@media (max-width: 1440px)': {
    //   padding: '25px 200px'
    // },
    // '@media (max-width: 1024px)': {
    //   padding: '25px 100px'
    // },
    // '@media (max-width: 768px)': {
    //   padding: '25px 25px'
    // }
  },
  middleText: {
    color: '#D6C6F4',
    fontSize: '14px',
    opacity: 0.85,
  },
  logo: {
    width: '155px',
    //height: "45px",
    marginTop: '5%',
    height: 'auto',
    borderRadius: 'inherit',
  },
  socialMedia: {
    width: '35px',
    marginRight: '12px',
    cursor: 'pointer',
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
  },
  ulSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  mediaText: {
    textAlign: 'left',
    color: '#D6C6F4',
    marginTop: '25%',
    fontSize: '14px',
  },
  media: {
    display: 'flex',
    marginTop: '5px',
    flexWrap: 'wrap',
  },
  middleSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '50px',
  },
  storeSubSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    color: '#D6C6F4',
    fontSize: '14px',
  },
  flexSection: {
    display: 'flex',
  },
  inputEmail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    color: '#D6C6F4',
  },
  innerInput: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    position: 'relative',
  },
  mail: {
    position: 'absolute',
    top: '9px',
    left: '14px',
  },
  subscribeInput: {
    padding: '12px 66px 12px 42px',
    backgroundColor: '#341A53',
    borderRadius: '31px 0px 0px 31px',
    outline: 'none',
    border: 'none',
    opacity: 0.45,
    color: '#A89ABF',
    '@media (max-width: 425px)': {
      padding: '12px 40px',
    },
    '@media (max-width: 768px)': {
      padding: '12px 50px',
    },
  },
  loginSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    color: '#D6C6F4',
    '@media (max-width: 1024px)': {
      marginTop: '20px',
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
  links: {
    textDecoration: 'none !important',
    color: 'unset !important',
    fontSize: 'clamp(12px, 1vw, 18px)',
    fontWeight: 500,
  },
  list: {
    listStyle: 'none',
    textAlign: 'left',
    opacity: 0.6,
    color: '#D6C6F4',
    lineHeight: '30px',
    padding: '0 0 0 5px',
  },
  termsInline: {
    borderTop: '0.5px solid #D6C6F4',
    marginTop: '20px',
    opacity: '0.5',
  },
  termsSection: {
    display: 'flex',
    marginTop: '20px',
    flexDirection: 'column',
    // textAlign: 'center',
    color: '#D6C6F4',
    fontSize: 'clamp(12px, 0.8vw, 18px)',
  },
  termsParaSection: {
    color: '#D6C6F4',
    marginTop: '20px',
    fontSize: '11px',
    lineHeight: '18px',
  },
  partnerWrap: {
    color: '#D6C6F4',
    margin: '1rem 0',
    '& span': {
      fontSize: '14px',
      cursor: 'pointer',
    },
  },
});

const mobileStyles = makeStyles({
  root: {
    // position: 'absolute',
    padding: '4%',
    // backgroundColor: '#100719',
    // bottom: 0
    backgroundColor: 'rgba(4, 0, 11, 0.3)',
    position: 'absolute',
    marginTop: '2%',
  },
  watchTv_logo: {
    maxHeight: '30px',
  },
  seperator: {
    margin: '20px 0',
  },
  follow: {
    color: colors.LIGHT_PURPLE,
    fontSize: '12px',
    fontWeight: 600,
    margin: '5% 0 0 0',
  },
  partnerWrap: {
    textAlign: 'center',
    color: '#D6C6F4',
    margin: '0.5rem',
    '& span': {
      fontSize: '12px',
    },
  },
  downloadApp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${colors.LIGHT_BORDER}`,
    borderRadius: '50%',
    // width: '100%',
    // height: '100%',
    width: '36px',
    height: '36px',
    margin: '0px 0px 0px 6px',

    '& img': {
      maxWidth: '50%',
      maxHeight: '50%',
    },
  },
  inbox: {
    color: colors.LIGHT_PURPLE,
    fontSize: '10px',
    fontWeight: 400,
    marginTop: '5%',
  },
  subscribeInput: {
    padding: '12px 12% 12px 12px',
    width: '80%',
    backgroundColor: colors.DARK_BLUE_OPAQUE,
    borderRadius: '31px',
    outline: 'none',
    border: 'none',
    color: colors.LAVENDER,
    height: '36px',
    fontSize: '10px',
  },
  list: {
    listStyle: 'none',
    textAlign: 'left',
    opacity: 0.6,
    padding: '0px',
    marginLeft: '10px',
  },
  links: {
    textDecoration: 'none !important',
    color: colors.LIGHT_PURPLE,
    fontWeight: 400,
  },
});
