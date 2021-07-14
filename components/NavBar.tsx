import { Avatar, Grid } from '@material-ui/core';

import ActiveLink from '../containers/ActiveLink';
import ImageComponent from './Images';
import { LOCALSTORAGE_KEY_CONSTANTS } from '../utils/constants';
import Link from 'next/link';
import React from 'react';
import Router from 'next/router';
import { SearchBox } from './SearchBox';
import { Theme } from '@material-ui/core/styles';
import { ViewportContext } from './ViewportProvider';
import { WebfoxContext } from '../services/webfox';
import { makeStyles } from '@material-ui/styles';

const checkIsTabActive = (path) => {
  if (typeof window !== 'undefined' && path == window.location.pathname) {
    return true;
  } else {
    return false;
  }
};

export function NavBar({ isVertual }) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const { webstore } = React.useContext(WebfoxContext);
  // const url =
  //   process.env.REACT_APP_ENV === 'production'
  //     ? 'https://www.ottplay.com/'
  //     : 'https://stg.ottplay.com/';

  const handleClick = (event) => {
    // if (typeof window !== 'undefined') {
    //   window.location.href = url + 'search';
    // }
    Router.push('/search');
    event.preventDefault();
  };

  const resetData = () => {
    webstore.refine.forYou.selectedLanguages = [];
    webstore.refine.forYou.selectedGenres = [];
    webstore.refine.forYou.selectedStreamingServices = [];
    webstore.refine.forYou.selectedFreePaid = [];
    webstore.refine.forYou.selectedQuality = [];
    webstore.refine.forYou.selectedContentType = [];
    webstore.refine.forYou.selectedRuntimeMin = [];
    webstore.refine.forYou.selectedContentRating = [];
    webstore.refine.forYou.refineForYou = false;
    webstore.movieNavFilter = {};
    localStorage.removeItem(LOCALSTORAGE_KEY_CONSTANTS.MOVIE_NAV_FILTER_OBJ);
  };

  return (
    <div
      className={[classes.root, isVertual && classes.vertualNavBar].join(' ')}
      id={isVertual ? 'vertualNavBar' : 'navBar'}
    >
      <div>
        <Grid
          xs={12}
          container
          style={{
            backgroundColor: isVertual ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
          }}
        >
          <Grid xs={1} lg={2} item></Grid>

          <Grid
            item
            xs={10}
            lg={8}
            container
            className={classes.containerBar}
            style={{
              // backgroundColor: isVertual ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
              height: isVertual ? '52px' : '65px',
            }}
          >
            <Grid item xs={12} md={10} container>
              <Grid
                item
                xs={12}
                sm={2}
                style={{ alignSelf: 'center', display: 'flex' }}
                className={classes.topBar}
              >
                <ActiveLink href={'/'}>
                  <Avatar
                    alt="logo"
                    src="https://images.ottplay.com/static/new_logo.svg"
                    className={classes.logo}
                  />
                </ActiveLink>
              </Grid>
              {/* <Grid item xs={1} sm={1} md={1} lg={1}></Grid> */}
              <Grid item xs={12} sm={10}>
                <div
                  className={classes.navigation}
                  style={{
                    marginTop: '0px',
                    marginLeft: width > 1600 ? -15 : 0,
                  }}
                >
                  <div
                    className={classes.navWrapper}
                    onClick={() => resetData()}
                  >
                    <ActiveLink href={`/`}>
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/') && classes.active,
                          isVertual && classes.vertualNavText,
                        ].join(' ')}
                      >
                        Home
                      </span>
                    </ActiveLink>
                    <div
                      className={[
                        classes.arrowPointer,
                        checkIsTabActive('/') && classes.activeArrow,
                      ].join(' ')}
                    ></div>
                  </div>
                  <div
                    className={classes.navWrapper}
                    onClick={() => resetData()}
                  >
                    <Link
                      href={`/foryou`}
                      // exact={true}
                      // activeClassName={classes.active}
                      // className={classes.tab}
                      // style={{ top: isVertual ? '40px' : '46px' }}
                    >
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/foryou') && classes.active,
                          isVertual && classes.vertualNavText,
                        ].join(' ')}
                      >
                        <ImageComponent
                          alt="heart"
                          src="https://images.ottplay.com/static/interestHeart.svg"
                          className={classes.navHeartIcon}
                        />
                        For You
                      </span>
                    </Link>

                    {/* <a href={`${url}foryou`}>
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/foryou') && classes.active,
                        ].join(' ')}
                      >
                        <ImageComponent
                          alt="heart"
                          src="https://images.ottplay.com/static/interestHeart.svg"
                          className={classes.navHeartIcon}
                        />
                        For You
                      </span>
                    </a> */}

                    <div
                      className={[
                        classes.arrowPointer,
                        checkIsTabActive('/foryou') && classes.activeArrow,
                      ].join(' ')}
                    ></div>
                  </div>
                  <div
                    className={classes.navWrapper}
                    onClick={() => resetData()}
                  >
                    <ActiveLink href={`/movies`}>
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/movies') && classes.active,
                          isVertual && classes.vertualNavText,
                        ].join(' ')}
                      >
                        Movies
                      </span>
                    </ActiveLink>

                    <div
                      className={[
                        classes.arrowPointer,
                        checkIsTabActive('/movies') && classes.activeArrow,
                      ].join(' ')}
                    ></div>
                  </div>
                  <div
                    className={classes.navWrapper}
                    onClick={() => resetData()}
                  >
                    <ActiveLink
                      href={`/shows`}
                      // exact={true}
                      // activeClassName={classes.active}
                      // className={classes.tab}
                      // style={{ top: isVertual ? '40px' : '46px' }}
                    >
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/shows') && classes.active,
                          isVertual && classes.vertualNavText,
                        ].join(' ')}
                      >
                        Shows
                      </span>
                    </ActiveLink>
                    {/* <a href={`${url}shows`}>
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/shows') && classes.active,
                        ].join(' ')}
                      >
                        Shows
                      </span>
                    </a> */}

                    <div
                      className={[
                        classes.arrowPointer,
                        checkIsTabActive('/shows') && classes.activeArrow,
                      ].join(' ')}
                    ></div>
                  </div>
                  <div
                    className={classes.navWrapper}
                    onClick={() => resetData()}
                  >
                    <ActiveLink
                      href={`/all-genre`}
                      // exact={true}
                      // activeClassName={classes.active}
                      // className={classes.tab}
                      // style={{ top: isVertual ? '40px' : '46px' }}
                    >
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/all-genre') && classes.active,
                          isVertual && classes.vertualNavText,
                        ].join(' ')}
                      >
                        Genres
                      </span>
                    </ActiveLink>

                    {/* <a href={`${url}all-genre`}>
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/all-genre') && classes.active,
                        ].join(' ')}
                      >
                        Genres
                      </span>
                    </a> */}

                    <div
                      className={[
                        classes.arrowPointer,
                        checkIsTabActive('/all-genre') && classes.activeArrow,
                      ].join(' ')}
                    ></div>
                  </div>
                  <div
                    className={classes.navWrapper}
                    onClick={() => resetData()}
                  >
                    <ActiveLink
                      href={`/all-language`}
                      // exact={true}
                      // activeClassName={classes.active}
                      // className={classes.tab}
                      // style={{ top: isVertual ? '40px' : '46px' }}
                    >
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/all-language') && classes.active,
                          isVertual && classes.vertualNavText,
                        ].join(' ')}
                      >
                        Languages
                      </span>
                    </ActiveLink>

                    {/* <a href={`${url}all-language`}>
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/all-language') && classes.active,
                        ].join(' ')}
                      >
                        Languages
                      </span>
                    </a> */}

                    <div
                      className={[
                        classes.arrowPointer,
                        checkIsTabActive('/all-language') &&
                          classes.activeArrow,
                      ].join(' ')}
                    ></div>
                  </div>
                  <div
                    className={classes.navWrapper}
                    onClick={() => resetData()}
                  >
                    <ActiveLink
                      href={`/all-news`}
                      // exact={true}
                      // activeClassName={classes.active}
                      // className={classes.tab}
                      // style={{ top: isVertual ? '40px' : '46px' }}
                    >
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/all-news') && classes.active,
                          isVertual && classes.vertualNavText,
                        ].join(' ')}
                      >
                        News
                      </span>
                    </ActiveLink>

                    <div
                      className={[
                        classes.arrowPointer,
                        checkIsTabActive('/all-news') && classes.activeArrow,
                      ].join(' ')}
                    ></div>
                  </div>
                  <div
                    className={classes.navWrapper}
                    onClick={() => resetData()}
                  >
                    <ActiveLink
                      href={`/watchlist`}
                      // exact={true}
                      // activeClassName={classes.active}
                      // className={classes.tab}
                      // style={{ top: isVertual ? '40px' : '46px' }}
                    >
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/watchlist') && classes.active,
                          isVertual && classes.vertualNavText,
                        ].join(' ')}
                      >
                        Watchlist
                      </span>
                    </ActiveLink>

                    {/* <a href={`${url}watchlist`}>
                      <span
                        className={[
                          classes.navText,
                          checkIsTabActive('/watchlist') && classes.active,
                        ].join(' ')}
                      >
                        Watchlist
                      </span>
                    </a> */}

                    <div
                      className={[
                        classes.arrowPointer,
                        checkIsTabActive('/watchlist') && classes.activeArrow,
                      ].join(' ')}
                    ></div>
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              md={2}
              className={
                classes.searchWrap +
                ' ' +
                (window.location.pathname === '/search'
                  ? classes.hide
                  : classes.show)
              }
            >
              <SearchBox
                className={classes.globalSearch}
                navbar={isVertual}
                placeholder={'Search'}
                onClick={handleClick}
                rightSearch="/static/newImages/search-icon-green.svg"
              />
            </Grid>
          </Grid>

          <Grid xs={1} lg={2}></Grid>
        </Grid>
      </div>

      {/* <div>{search && <GlobalSearch />}</div> */}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'unset',
    padding: 'padding: 5px 5px 0px 5px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  root: {
    marginTop: '5px',
  },
  navHeartIcon: {
    width: 15,
    height: 12,
    marginRight: 5,
  },
  vertualNavBar: {
    position: 'fixed',
    top: 0,
    zIndex: 4,
    backgroundColor: 'rgba(27, 12, 79, 0.5)',
    backdropFilter: 'blur(50px)',
    marginTop: '0px',
    width: '100%',
    height: 0,
    overflow: 'hidden',
    transition: 'height 1s',
  },
  arrowPointer: {
    width: '100%',
    height: 0,
    borderBottom: '1px solid transparent',
  },
  activeArrow: {
    borderBottomColor: '#03F87E',
  },
  containerBar: {},
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '0px',
    paddingLeft: '18px',
    '@media (max-width: 1024px)': {
      paddingLeft: '16px',
    },
    '@media (max-width: 768px)': {
      paddingLeft: '10px',
    },
  },

  // drawer: {
  //   display: 'none',
  //   '@media (max-width: 425px)': {
  //     display: 'flex'
  //   }
  // },
  navigation: {
    width: '100%',
    height: '100%',
    display: 'flex',
    // marginLeft: -15,
    justifyContent: 'space-evenly',
    alignItems: 'center',

    // '@media (max-width: 425px)': {
    //   display: 'none'
    // }
  },
  hide: {
    display: 'none !important',
  },
  show: {
    display: 'contents',
  },
  searchWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: '30px',
    },
  },
  globalSearch: {
    backgroundColor: '#130726',
    outline: 'none',
    color: '#ffffff',
    paddingLeft: '16px',
    paddingBottom: '2px',
    height: 35,
    width: '100%',
    fontSize: 'clamp(10px, 1.3vw, 14px)',
    border: '1px solid #3A176A',
    borderRadius: '18px',
    '&::placeholder': {
      fontSize: 'clamp(10px, 1vw, 14px)',
      color: '#d6c6f4',
      opacity: '0.7',
    },
  },
  expandGlobalSearch: {
    backgroundColor: '#000000',
    padding: '25px 500px 25px 50px',
    outline: 'none',
    border: 'none',
    color: '#ffffff',
    opacity: 0.6,
    fontSize: '18px',
    borderBottom: '2px solid #03F87E',
    webkitTransition: 'padding 0.6s ease-in-out',
    transition: 'padding 0.6s ease-in-out',
  },
  logo: {
    width: '100%',
    height: 38,
    // height: 'auto',
    borderRadius: 'inherit',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    '& img': {
      width: 115,
      //height: 'auto',
      height: 26,
      // marginLeft: '20px',
      // [theme.breakpoints.up('lg')]: {
      //   width: 130,
      // },
    },
  },
  navWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: '#ffffff',
  },
  tab: {
    // marginTop: 15,
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    height: '100%',
    color: '#fff',
    textTransform: 'none',
    fontSize: 'clamp(14px, 0.8vw, 20px)',
    textDecoration: 'none',
    // '@media (max-width: 1600px)': {
    //   fontSize: '1vw',
    // },
  },
  navText: {
    // minWidth: '100px',
    // bottom: '4px',
    // left: '-35px',
    height: '4rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // color: '#fff',
    // [theme.breakpoints.down('xs')]: {
    //   fontSize: '11px',
    //   left: '-15px',
    // },
  },
  vertualNavText: {
    height: '3rem',
  },
  active: {
    backgroundColor: 'transparent',
    color: '#03F87E',
    fontWeight: 600,
    opacity: 1,
  },
  navbar: {
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    transition: 'all .2s ease',
  },
  scrolled: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'lightblue',
  },
  topBar: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));
