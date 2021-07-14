import { Card, Grid } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  SSO_LOGIN_URL,
  VARIABLE,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../utils/constants';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import React, { useContext, useEffect, useState } from 'react';
import { envSetup, hideForProduction } from '../utils/helper';
import { makeStyles, withStyles } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import { Drawer } from '@material-ui/core';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from './Buttons/Buttons';
import IconButton from '@material-ui/core/IconButton';
import ImageComponent from './Images';
import Link from 'next/link';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from 'react-modal';
import SettingsPage from '../pages/SettingsPage';
import { Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ViewportContext } from './ViewportProvider';
import { WebfoxContext } from '../services/webfox';
import { colors } from './CommonColors';
import cookie from 'react-cookies';
import { createStyles } from '@material-ui/core/styles';
import { firebaseAnalytics } from './firebaseConfig';
import { useRouter } from 'next/router';

// import Button from 'react-bootstrap/Button';
const windowAny: any = typeof window !== 'undefined' && window;
interface TopHeaderProps {
  //children: React.ReactElement;
  //onboarding: Boolean;
  //value: number;
}

const headerOptions = [
  {
    name: 'Home',
    img_path: '/static/mobile_images/movies_small.svg',
    path: '/home',
  },
  {
    name: 'For You',
    img_path: '/static/mobile_images/shows_small.svg',
    path: '/foryou',
    icon: '/static/mobile_images/interestHeart.svg',
  },
  {
    name: 'Movies',
    img_path: '/static/mobile_images/movies_small.svg',
    path: '/movies',
  },
  {
    name: 'Shows',
    img_path: '/static/mobile_images/shows_small.svg',
    path: '/shows',
  },
  {
    name: 'Genres',
    img_path: '/static/mobile_images/shows_small.svg',
    path: '/all-genre',
  },
  {
    name: 'Languages',
    img_path: '/static/mobile_images/movies_small.svg',
    path: '/all-language',
  },
  {
    name: 'News',
    img_path: '/static/mobile_images/movies_small.svg',
    path: '/all-news',
  },
  {
    name: 'Watchlist',
    img_path: '/static/mobile_images/shows_small.svg',
    path: '/watchlist',
  },
];

export function TopHeader(props) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const [showModal, setshowModal] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const classes1 = useStyles1();
  const [state, setState] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const _ht_clientid = cookie.load('_ht_clientid');
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );

  const { languages, streamingServices } = webstore;
  const router = useRouter();

  let languagesArr: any = [];
  let providersArr: any = [];

  useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      (languages && languages.name) || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],
      (streamingServices && streamingServices.selectedStreamingServices) || []
    );
  }, []);
  type Anchor = 'top' | 'left' | 'bottom' | 'right';

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    console.log('toggleDrawer: ', state);
    firebaseAnalytics.logEvent('profileClicked', {
      eventCategory: 'nav_profile_icon_click',
      eventAction: window.location.pathname,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage &&
      windowAny.Moengage.track_event('profileClicked', {
        eventCategory: 'nav_profile_icon_click',
        eventAction: window.location.pathname,
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      });
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const list = (anchor: Anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Grid
        xs={12}
        container
        direction="column"
        justify="center"
        className={classes1.sidebarBox}
      >
        <Grid xs={12} className={classes1.closeIconBox}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(!state)}
            style={{ paddingRight: '18px' }}
          >
            <ImageComponent
              src="https://images.ottplay.com/static/close_xs.svg"
              alt="close"
            />
          </IconButton>
        </Grid>
        {renderProfileCard()}
        <div className={classes1.menuWrap}>
          {headerOptions.map((header, index) => (
            <Grid
              xs={12}
              container
              // spacing={1}
              key={index}
            >
              {/* <Grid
              xs={5}
              item
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '10px 5px',
              }}
            >
              <ImageComponent src={header.img_path} alt="ottplay" />
            </Grid> */}
              {/* <Grid xs={12} item style={{ padding: '10px 5px' }}> */}
              <Link
                // exact
                // className={classes1.link}
                // activeClassName={classes1.active_link}
                href={header.path}
              >
                <a
                  className={
                    router.asPath == header.path
                      ? classes1.active_link
                      : classes1.link
                  }
                >
                  {header.icon ? (
                    <img
                      alt="heart"
                      src={header.icon}
                      className={classes1.navHeartIcon}
                      width="15"
                      height="12"
                    />
                  ) : (
                    ''
                  )}
                  {header.name}
                </a>
              </Link>
            </Grid>
            // </Grid>
          ))}
          <Grid xs={12} className={classes1.separatorLine}>
            {/* <img src={blue_line} alt="line" style={{ marginTop: '10%' }} /> */}
          </Grid>
          {/* social icons */}
          <Grid
            xs={12}
            className={classes1.subHeader}
            container
            justify="center"
          >
            {/* Sign in to synchronize your watchlist across all your devices
            <Grid
              xs={12}
              container
              direction="row"
              justify="space-evenly"
              className={classes1.socialIconsBox}
            >
              <ImageComponent
                src="https://images.ottplay.com/static/facebook.svg"
                alt="facebook"
                style={{ maxWidth: '36px', maxHeight: '36px', marginRight: 15 }}
              />
              <ImageComponent
                src="https://images.ottplay.com/static/google.svg"
                alt="google"
                style={{ maxWidth: '36px', maxHeight: '36px' }}
              /> */}
            {/* <img
              src={whatsapp}
              alt="whatsapp"
              style={{ maxWidth: '36px', maxHeight: '36px' }}
            />
            <ImageComponent
              src={phone}
              alt="phone"
              style={{ maxWidth: '36px', maxHeight: '36px' }}
            /> */}
            {/* </Grid> */}
            <Grid xs={12}>
              Download App
              {renderPlayStoreIcons()}
            </Grid>
            {hideForProduction() && (
              <div style={{ paddingTop: '20px' }}>{VARIABLE.BUILD_NUMBER}</div>
            )}
          </Grid>
        </div>
      </Grid>
    </div>
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    setSearch(true);
    router.push('/search');
    // event.preventDefault();
  };

  const handleOpenModal = () => {
    setshowModal(true);
    setAnchorEl(null);
    firebaseAnalytics.logEvent('settingClicked', {
      eventCategory: 'nav_settings_icon_click',
      eventAction: window.location.pathname,
    });
    windowAny.Moengage &&
      windowAny.Moengage.track_event('settingClicked', {
        eventCategory: 'nav_settings_icon_click',
        eventAction: window.location.pathname,
      });
  };

  const handleCloseModal = (event) => {
    setshowModal(false);
  };

  // env code
  const itemsEnv = [
    { id: '1', value: 'staging', option: 'Staging' },
    { id: '2', value: 'production', option: 'Production' },
  ];

  const [dropdown, setDropdown] = React.useState(false);
  const [env, setEnv] = React.useState(
    typeof window !== 'undefined' &&
      sessionStorage.getItem('env choice') !== null
      ? sessionStorage.getItem('env choice')
      : 'staging'
  );

  const handleEnv = (value: any) => {
    setDropdown(true);
    // setEnv(value);
    if (value === 'production') {
      sessionStorage.setItem('env', 'https://api.ottplay.com/api/');
      sessionStorage.setItem('env choice', 'production');
      window.location.reload(false);
    } else if (value === 'staging') {
      sessionStorage.setItem('env', 'https://stg-webapi.ottplay.com/api/');
      sessionStorage.setItem('env choice', 'staging');
      window.location.reload(false);
    }
  };
  // env code

  const renderMobileHeader = () => {
    return (
      <React.Fragment>
        {/* {search ? (
          <div>
            <GlobalSearch />
          </div>
        ) : ( */}
        <React.Fragment>
          <div className={classes1.root}>
            <AppBar position="static" className={classes1.haeder_mobile}>
              <Toolbar className={classes1.toolbar}>
                <IconButton
                  edge="start"
                  className={classes1.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(!state)}
                >
                  {state ? (
                    <ImageComponent
                      src="https://images.ottplay.com/static/close_xs.svg"
                      alt="close"
                    />
                  ) : (
                    <MenuIcon />
                  )}
                </IconButton>
                <Typography variant="h6" className={classes1.title}>
                  <Link href={`/`}>
                    <ImageComponent
                      src="https://images.ottplay.com/static/new_logo.svg"
                      alt="header"
                      width="50px"
                    />
                  </Link>
                </Typography>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                    height: '56px',
                  }}
                >
                  <li className={classes1.listHead}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      color="inherit"
                      style={{ padding: '5px 8px' }}
                      onClick={handleSearch}
                    >
                      <ImageComponent
                        src="https://images.ottplay.com/static/searchIcon.svg"
                        className={classes1.searchIcon}
                        alt="Search Icon"
                      />
                    </IconButton>
                  </li>

                  <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <StyledMenuItem onClick={() => profileRedirect()}>
                      <ImageComponent
                        src="https://images.ottplay.com/static/profile2.svg"
                        className={classes1.drawerIcons}
                        style={{ maxHeight: '20px' }}
                        alt="dropdown icon"
                      />
                      <ListItemText
                        className={classes1.listText}
                        primary={cookie.load('token') ? 'My Profile' : 'Login'}
                      ></ListItemText>
                    </StyledMenuItem>

                    <StyledMenuItem onClick={handleOpenModal}>
                      <ImageComponent
                        src="https://images.ottplay.com/static/setting.svg"
                        alt="Setting"
                        className={classes1.drawerIcons}
                        style={{ maxHeight: '20px' }}
                      />
                      <ListItemText
                        className={classes1.listText}
                        primary="Settings"
                      ></ListItemText>
                    </StyledMenuItem>

                    {/* <StyledMenuItem onClick={handleClose}>
                      <Notification
                        className={classes1.drawerIcons}
                        style={{ maxHeight: '20px' }}
                      />
                      <ListItemText
                        className={classes1.listText}
                        primary="Notifications"
                      ></ListItemText>
                    </StyledMenuItem> */}

                    <StyledMenuItem
                      onClick={handleClose}
                      style={{ borderBottom: 'none' }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <ListItemText
                          className={classes1.listText}
                          primary="Download App"
                        ></ListItemText>

                        <div
                          style={{
                            marginTop: '5%',
                            display: 'flex',
                          }}
                        >
                          <ImageComponent
                            src="https://images.ottplay.com/static/playStoreLogo.svg"
                            className={classes1.appIcons}
                            style={{ maxHeight: '20px' }}
                            alt="play store"
                            onClick={() =>
                              window.open(
                                'https://play.google.com/store/apps/details?id=com.ht.ottplay',
                                '_blank'
                              )
                            }
                            width="15"
                            height="20"
                          />
                          <span
                            style={{
                              width: '2px',
                              margin: '0 8%',
                              backgroundColor: colors.GREY,
                            }}
                          ></span>
                          <ImageComponent
                            src="https://images.ottplay.com/static/iosLogo.svg"
                            className={classes1.appIcons}
                            style={{ maxHeight: '20px' }}
                            alt="app store"
                            onClick={() =>
                              window.open(
                                'https://apps.apple.com/in/app/ottplay/id1536115085',
                                '_blank'
                              )
                            }
                            width="15"
                            height="18"
                          />
                        </div>
                      </div>
                    </StyledMenuItem>
                  </StyledMenu>

                  <li className={classes1.listHead}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      onClick={handleClick}
                      color="inherit"
                      style={{ paddingRight: 0 }}
                    >
                      <ImageComponent
                        src="https://images.ottplay.com/static/profile2.svg"
                        className={classes1.headerIcons}
                        alt="User Account"
                      />
                    </IconButton>
                  </li>
                </div>
              </Toolbar>
            </AppBar>
          </div>
          <div>
            {(['left'] as Anchor[]).map((anchor) => (
              <React.Fragment key={anchor}>
                <Drawer
                  classes={{
                    paper: classes1.drawerPaper,
                  }}
                  anchor={anchor}
                  open={state}
                  onClose={toggleDrawer(false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
        {/* )} */}
      </React.Fragment>
    );
  };

  const renderPlayStoreIcons = () => {
    //NOTE: same method is been used in multiple place, tale care while changing style
    return (
      <div
        className={classes.iconClass}
        style={{
          justifyContent: props.isOnboarding ? 'flex-end' : 'start',
        }}
      >
        <div
          className={classes.storeSection}
          onClick={() =>
            window.open(
              'https://play.google.com/store/apps/details?id=com.ht.ottplay',
              '_blank'
            )
          }
        >
          <ImageComponent
            src="https://images.ottplay.com/static/playStoreLogo.svg"
            className={classes.logoImg}
            alt="google play"
            width="15"
            height="20"
          />
          Google
        </div>
        <span className={classes.verticalLine}></span>
        <div
          className={classes.storeSection}
          onClick={() =>
            window.open(
              'https://apps.apple.com/in/app/ottplay/id1536115085',
              '_blank'
            )
          }
        >
          <ImageComponent
            src="https://images.ottplay.com/static/iosLogo.svg"
            className={classes.logoImg}
            alt="app store"
            width="15"
            height="18"
          />
          iOS
        </div>
      </div>
    );
  };

  const renderProfileCard = () => {
    const token = cookie.load('token');
    return (
      <Grid
        xs={12}
        className={classes1.profileCardWrap}
        onClick={(e) => {
          e.preventDefault();
          profileRedirect();
          toggleDrawer(false);
        }}
      >
        <div className={classes1.profileWrap}>
          <ImageComponent
            src="https://images.ottplay.com/static/profile2.svg"
            alt="profile"
          />
          <div>
            {/* <div>Me</div> */}
            <div className={classes1.profileName}>
              {token &&
              typeof window !== 'undefined' &&
              localStorage.getItem('userName')
                ? localStorage.getItem('userName')
                : typeof window !== 'undefined' &&
                  localStorage.getItem('userName')
                ? localStorage.getItem('userName')
                : 'Login/Register'}
            </div>
          </div>
        </div>

        <div className={classes1.profileRightArrow}>
          <ImageComponent
            src="https://images.ottplay.com/static/green_right_arrow.svg"
            alt="arrow"
          />{' '}
        </div>
      </Grid>
    );
  };

  const profileRedirect = () => {
    const token = cookie.load('token');
    setAnchorEl(null);
    const _ht_clientid = cookie.load('_ht_clientid');
    if (token && _ht_clientid) {
      router.push('/Profile');
    } else {
      firebaseAnalytics.logEvent('screen_view', {
        page_title:
          '/login' +
          (typeof window !== 'undefined' && window.location.pathname
            ? window.location.pathname
            : '/home'),
      });
      windowAny.Moengage?.track_event('screen_view', {
        page_title:
          '/login' +
          (typeof window !== 'undefined' && window.location.pathname
            ? window.location.pathname
            : '/home'),
      });
      window.open(SSO_LOGIN_URL, '_self');
    }
    firebaseAnalytics.logEvent('profileClicked', {
      eventCategory: 'nav_profile_icon_click',
      eventAction: window.location.pathname,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage &&
      windowAny.Moengage.track_event('profileClicked', {
        eventCategory: 'nav_profile_icon_click',
        eventAction: window.location.pathname,
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      });
  };

  const followUsDesign = () => {
    return (
      <div className={classes.followWrap}>
        Follow us on
        <br />
        <div>
          <ImageComponent
            src={`/static/follow_images/fb.svg`}
            className={classes.iconStyle}
            // onClick={handleOpenModal}
            alt="fb icon"
            width="24"
            height="24"
          />
          <ImageComponent
            src={`/static/follow_images/twitter.svg`}
            className={classes.iconStyle}
            // onClick={handleOpenModal}
            alt="fb icon"
            width="24"
            height="24"
          />
          <ImageComponent
            src={`/static/follow_images/inst.svg`}
            className={classes.iconStyle}
            // onClick={handleOpenModal}
            alt="fb icon"
            width="24"
            height="24"
          />
          <ImageComponent
            src={`/static/follow_images/utube.svg`}
            className={classes.iconStyle}
            // onClick={handleOpenModal}
            alt="fb icon"
            width="24"
            height="24"
          />
        </div>
      </div>
    );
  };
  return (
    <div className={classes.root}>
      {width < 600 ? (
        renderMobileHeader()
      ) : (
        <Grid xs={12} container item id="web-main-header">
          <Grid xs={1} lg={2} item></Grid>
          <Grid
            item
            xs={10}
            lg={8}
            container
            className={classes.outerContainer}
            style={{
              padding: width > 1300 ? '12px 0px 5px 0px' : '8px 0px 2px 0px',
            }}
          >
            {props.isOnboarding ? (
              <Grid
                item
                xs={3}
                className={classes.ott_logo_smal}
                style={{ float: 'right' }}
              >
                <ImageComponent
                  src="https://images.ottplay.com/static/ott_logo_small.svg"
                  alt="ottplay logo"
                />
              </Grid>
            ) : (
              <Grid item xs={3} sm={4} md={3}>
                {renderPlayStoreIcons()}
              </Grid>
            )}
            {/* ad codes
            {props.screen && (
              <Grid item xs={6} sm={5} md={6} lg={6} className={classes.ad_img}>
                <Card>
                  <ImageComponent src={ads} alt={ads} width="100%" />
                </Card>
              </Grid>
            )} */}

            <Grid item xs={3}></Grid>

            {props.isOnboarding ? (
              <Grid item xs={3} sm={4} md={3}>
                {renderPlayStoreIcons()}
              </Grid>
            ) : (
              <Grid item xs={5}>
                <div className={classes.columnWrap}>
                  <div className={classes.iconClass}>
                    {props.screen ? (
                      <React.Fragment>
                        {/* <div
                      style={{
                        position: 'relative',
                        marginTop: '12px',
                        marginRight: '15px',
                        // width: '35px'
                      }}
                      onClick={() => {
                        alert('read notifications');
                        firebaseAnalytics.logEvent('notificationClicked', {
                          eventCategory: 'nav_notification_icon_click',
                          eventAction: window.location.pathname,
                        });
                        windowAny.Moengage.track_event('notificationClicked', {
                          eventCategory: 'nav_notification_icon_click',
                          eventAction: window.location.pathname,
                        });
                      }}
                    >
                      <RefinedItems
                        count="3"
                        className={classes.notificationCount}
                      />
                      <Notification className={classes.iconStyle} />
                    </div> */}
                        {hideForProduction() && (
                          <React.Fragment>
                            <div className={classes.buildNumber}>
                              <span className={classes.number}>
                                {VARIABLE.BUILD_NUMBER}
                              </span>
                              <StyledDropdownButton text="ENV">
                                {itemsEnv.map((item, i) => (
                                  <Dropdown.Item
                                    key={i}
                                    i={i}
                                    value={item.value}
                                    className={
                                      env.includes(item.value)
                                        ? 'activeDropdownOption'
                                        : 'dropdownOption'
                                    }
                                    onClick={() => handleEnv(item.value)}
                                    eventKey={item.value}
                                  >
                                    {item.option}
                                    <hr
                                      style={{
                                        borderBottom: '1px solid #695197',
                                        margin: 0,
                                        opacity: 0.3,
                                        marginTop: '10px',
                                      }}
                                    />
                                  </Dropdown.Item>
                                ))}
                              </StyledDropdownButton>
                            </div>
                          </React.Fragment>
                        )}
                        <ImageComponent
                          src="https://images.ottplay.com/static/setting.svg"
                          className={classes.iconStyle}
                          onClick={handleOpenModal}
                          alt="settings icon"
                          width="24"
                          height="24"
                        />
                        <div style={{ display: 'flex' }}>
                          <ImageComponent
                            src="https://images.ottplay.com/static/profile2.svg"
                            className={classes.iconStyle}
                            style={{ marginLeft: '10px' }}
                            onClick={() => profileRedirect()}
                            alt="profile icon"
                            width="24"
                            height="34"
                          />
                          {cookie.load('token') ? (
                            <span className={classes.dot}></span>
                          ) : (
                            ''
                          )}
                        </div>
                      </React.Fragment>
                    ) : null}
                  </div>

                  {/* <div>{followUsDesign()}</div> */}
                </div>
              </Grid>
            )}
          </Grid>
          <Grid item xs={1} lg={2}></Grid>
        </Grid>
      )}
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
    </div>
  );
}

const StyledDropdownButton = withStyles((theme) => ({
  root: {
    sort: {
      color: '#03F87E',
      fontSize: '16px',
      outline: 'none',
      boxShadow: 'none',
      textTransform: 'none',
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        width: 56,
      },
    },
  },
}))(DropdownButton);

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backdropFilter: 'blur(34px)',
      // backgroundColor: 'rgb(47, 13, 82)',
      width: '100%',
      zIndex: theme.zIndex && theme.zIndex.drawer + 1000,
      // height: '40px',
      [theme.breakpoints && theme.breakpoints.down('xs')]: {
        zIndex: 2,
      },
    },
    closeIconBox: {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
    },
    sidebarBox: {
      marginTop: '8%',
      alignItems: 'flex-start',
      paddingTop: '5px',
      [theme.breakpoints && theme.breakpoints.down('xs')]: {
        marginTop: '0px',
      },
    },
    menuWrap: {
      padding: '0px 18px 10px 18px',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'right',
      '& img': {
        width: '60%',
        height: '36px',
      },
      [theme.breakpoints && theme.breakpoints.down('xs')]: {
        '& img': {
          width: 120,
          height: 30,
          verticalAlign: 'middle',
          marginRight: '25%',
        },
      },
    },
    haeder_mobile: {
      // height: '40px',
      // zIndex: theme.zIndex.drawer + 100
      // backgroundColor: colors.TOP_HEADER_MOBILE,
      backgroundImage: 'linear-gradient(to bottom, #680FAA28, #3579D828)',
      backgroundColor: '#1C0A3970',
      boxShadow: 'none',
    },
    toolbar: {
      // paddingRight: 0
    },
    listHead: {
      display: 'flex',
      listStyle: 'none',
      borderBottom: '0px solid red',
      // width: '30%',
      height: '100%',
      justifyContent: 'center',
      '&.active, &:hover, &.active:hover': {
        borderBottom: '2px solid red',
      },
    },
    list: {
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fullList: {
      width: 'auto',
    },
    listText: {
      color: '#A89ABF',
      '& span': {
        fontSize: '12px',
      },
    },
    drawerPaper: {
      width: '75%',
      backgroundColor: '#160732',
      position: 'absolute',
      // height: 'calc(100% - 56px)',
      // top: '56px',
    },
    link: {
      color: colors.WHITE,
      textDecoration: 'none',
      padding: '10px 0px',
      fontSize: '14px',
    },
    active_link: {
      color: colors.GREEN_HIGHLIGHT,
      textDecoration: 'none',
      padding: '10px 0px',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    subHeader: {
      marginTop: '6%',
      color: colors.LAVENDER,
      fontSize: '10px',
      textAlign: 'left',
      paddingRight: 13,
      justifyContent: 'flex-start',
    },
    drawerIcons: {
      width: '14px',
      // maxWidth: '20px',
      marginRight: 10,
    },
    appIcons: {
      maxWidth: '20px',
      margin: '0 5px',
    },
    socialIconsBox: {
      margin: '10% 0px',
      display: 'flex',
      justifyContent: 'flex-start',
    },
    headerIcons: {
      width: 20,
      height: 20,
    },
    searchIcon: {
      width: 17,
      height: 17,
      marginRight: 10,
    },
    settingsIcon: {
      width: 17,
      height: 17,
    },
    navHeartIcon: {
      width: 15,
      height: 12,
      marginRight: 5,
    },
    navText: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separatorLine: {
      width: '100%',
      height: '2px',
      borderBottom: '2px solid #21094A',
      marginTop: '11px',
    },
    profileCardWrap: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '50px',
      width: '100%',
      backgroundColor: '#00000049',
      padding: '10px 18px',
      alignItems: 'center',
    },
    profileWrap: {
      display: 'flex',
      color: 'white',
      alignItems: 'center',
      fontSize: '14px',
      '& img': {
        width: '33px',
        height: '33px',
        borderRadius: '50%',
        marginRight: '10px',
      },
    },
    profileName: {
      fontSize: '10px',
    },
    profileRightArrow: {
      '& img': {
        height: '13px',
      },
    },
  })
);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    [theme.breakpoints && theme.breakpoints.down('xs')]: {
      margin: '56 0 0 0',
    },
  },
  columnWrap: {
    display: 'flex',
    flexDirection: 'column',
    float: 'right',
  },
  followWrap: {
    marginTop: '.5rem -.5rem 0 0',
    color: '#A89ABF',
    float: 'right',
    fontSize: '0.7rem',
  },
  iconClass: {
    display: 'flex',
    color: '#ffffff',
    alignItems: 'center',
    fontSize: '14px',
    // marginRight: 15,
  },
  storeSection: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 'clamp(12px, 1vw, 18px)',
    cursor: 'pointer',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 13,
  },
  logoImg: {
    marginRight: '6px',
    width: 'clamp(15px, 1vw, 30px)',
  },
  ott_logo_smal: {
    display: 'flex',
    justifyContent: 'start',
    '& img': {
      width: 'clamp(180px, 2.4vw, 209px)',
    },
  },
  verticalLine: {
    borderLeft: '1px solid #fff',
    height: '30px',
    opacity: 0.1,
    margin: '0px 10px',
  },
  table: {
    width: '100%',
  },
  iconStyle: {
    cursor: 'pointer',
    marginRight: '10px',
    width: 'clamp(15px, 1.8vw, 30px)',
    opacity: '0.8',
  },
  buildNumber: {
    color: '#A89ABF',
    fontSize: '14px',
    marginRight: '10px',
    paddingRight: '10px',
    borderRight: '1px solid #A89ABF50',
    display: 'flex',
    alignItems: 'center',
  },
  number: {
    marginRight: 10,
  },
  dot: {
    height: '10px',
    width: '10px',
    backgroundColor: '#43FF37',
    borderRadius: '50%',
    marginTop: '1.5rem',
    marginLeft: '-1rem',
  },
  notificationCount: {
    position: 'absolute',
    top: '-15px',
    left: '13px',
    width: '25px',
    height: '25px',
    backgroundColor: '#FF4376',
    borderRadius: '50%',
    color: ' #ffffff',
    fontSize: '14px !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ad_img: {
    [theme.breakpoints && theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  outerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const StyledMenu = withStyles({
  paper: {
    // border: '1px solid red',
    top: '56px !important',
    right: '14px',
    minWidth: '140px',
    left: 'auto !important',
    backgroundColor: colors.PURPLE,
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    backgroundColor: colors.PURPLE,
    margin: '0px 14px',
    padding: '6px 0px',
    borderBottom: `1px solid ${colors.GREY}`,

    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      fontSize: 12,
      color: colors.LAVENDER,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginLeft: '5px',
    },

    '&:focus,&:hover,&$active': {
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: colors.GREEN_HIGHLIGHT,
        fontWeight: 600,
      },
    },
  },
}))(MenuItem);
