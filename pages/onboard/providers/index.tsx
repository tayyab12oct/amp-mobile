import { Box, CardContent, Grid, Hidden } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../../utils/constants';
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import { useContext, useState } from 'react';

import ImageComponent from '../../../components/Images';
import { NavBar } from '../../../components';
import { PillButton } from '../../../components/PillButton';
import React from 'react';
import { RefineCard } from '../../../components/RefineCard';
import Router from 'next/router';
import SEO from '../../../components/Seo';
import { Spinner } from '../../../components/Spinner';
import Switch from 'react-switch';
import { TopHeader } from '../../../components/TopHeader';
import { ViewportContext } from '../../../components/ViewportProvider';
import { WebfoxContext } from '../../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../../components/firebaseConfig';

const windowAny: any = typeof window !== 'undefined' && window;
export default function Providers() {
  const classes = useStyles();
  const _ht_clientid = cookie.load('_ht_clientid');
  const [results, setResults] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const [toggle, setToggle] = React.useState(false);
  const { width } = React.useContext(ViewportContext);
  const [bottomReached, isbottomReached] = React.useState(true);

  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;

  let languagesArr: any = [];
  let providersArr: any = [];
  let providersNameArr: any = [];

  React.useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],
      streamingServices.selectedStreamingServices || []
    );
    providersNameArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
      ) || [],
      streamingServices.name || []
    );
    const params = {
      limit: 45,
      module_name: 'Providers',
      platform: 'web',
    };

    firebaseAnalytics.logEvent('screen_view', {
      page_title: '/preferenceproviders',
    });
    windowAny &&
      windowAny.Moengage &&
      windowAny.Moengage.track_event('screen_view', {
        page_title: '/preferenceproviders',
      });

    webfox.getAllProviderList(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_PROVIDER_LIST_FAILURE, []);
      }
      actionDispatch(actions.FETCH_PROVIDER_LIST_SUCCESS, data || []);
      if (data && data.rank) {
        //console.log('rank: ', data.rank);
        const arr = data.rank.filter(
          (e) => e.provider && e.provider['status'] === 'published'
        );
        //console.log('arr: ', arr);
        setResults(arr);
        setLoadingData(false);
        //console.log('rank', data.rank);
      }
    });
    setLoading(false);
  }, []);

  React.useEffect(() => {
    const unlisten = () => {
      // window.scrollTo(0, 0);
      window.removeEventListener('scroll', handleScroll, false);
    };

    window.addEventListener('scroll', handleScroll, false);
    return () => {
      unlisten();
    };
  }, [typeof window !== 'undefined' ? window.location.pathname : '']);

  React.useEffect(() => {
    const wrappedElement =
      typeof window !== 'undefined' &&
      document.getElementById('onbording-wrapper');
    if (wrappedElement) {
      if (wrappedElement.getBoundingClientRect().bottom <= window.innerHeight) {
        isbottomReached(true);
      } else {
        isbottomReached(false);
      }
    }
  }, [loadingData]);

  const handleScroll = () => {
    const wrappedElement =
      typeof window !== 'undefined' &&
      document.getElementById('onbording-wrapper');
    if (wrappedElement) {
      isbottomReached(
        wrappedElement.getBoundingClientRect().bottom <= window.innerHeight + 70
      );
    }
  };

  const getOnBoardingFooterheight = () => {
    if (bottomReached) {
      const footerHeightEle =
        typeof window !== 'undefined' &&
        document.getElementById('onBoardingFooter');
      if (footerHeightEle) {
        return footerHeightEle.clientHeight + 'px';
      }
    }
    return '60px';
  };

  const handleClose = () => {
    Router.push('/onboard/recommendations');
    firebaseAnalytics.logEvent('providerSelected', {
      eventCategory: 'onboarding_providers',
      eventAction: 'skip',
    });
    windowAny.Moengage.track_event('providerSelected', {
      eventCategory: 'onboarding_providers',
      eventAction: 'skip',
    });
  };

  const handleProceed = () => {
    if (webstore.streamingServices.selectedStreamingServices.length > 0) {
      console.log(
        'webstore.streamingServices.selectedStreamingServices: ',
        webstore.streamingServices.selectedStreamingServices
      );
      const params = {
        event: 'preferred_ottproviders',
        details: {
          page_name: window.location.pathname,
          preferred_providers: getPreferredProviders(providersNameArr),
          preferred_languages: getPreferredLanguages(languagesArr),
        },
        context: contextParamsForREAnalytics,
      };
      webfox.postREAnalytics(params).then(({ data, error }) => {});
    }
    Router.push('/onboard/recommendations');
  };
  const handlePreviousLink = () => {
    Router.push('/onboard/crew');
  };
  const handlePrev = () => {
    Router.push('/onboard/crew');
  };

  //const [startIndex, setStartIndex] = useState(0);
  //const [endIndex, setEndIndex] = useState(16);
  const [itemsPerPage] = useState(width > 600 ? 16 : 45);
  const [currentPage, setCurrentpage] = useState(1);
  const { height } = React.useContext(ViewportContext);

  React.useEffect(() => {
    if (webstore.streamingServices.toggle) {
      firebaseAnalytics.logEvent('providerSelected', {
        eventCategory: 'onboarding_providers',
        eventAction: 'select_all',
        eventLabel:
          webstore.streamingServices &&
          webstore.streamingServices.selectedStreamingServices
            ? webstore.streamingServices.name.toString()
            : '',
        eventValue: webstore.streamingServices.selectedStreamingServices.length,
      });
      windowAny.Moengage &&
        windowAny.Moengage.track_event('providerSelected', {
          eventCategory: 'onboarding_providers',
          eventAction: 'select_all',
          eventLabel:
            webstore.streamingServices &&
            webstore.streamingServices.selectedStreamingServices
              ? webstore.streamingServices.name.toString()
              : '',
          eventValue:
            webstore.streamingServices.selectedStreamingServices.length,
        });
    }
  }, [webstore.streamingServices.toggle]);

  const handleSwitch = (e) => {
    {
      results.map((item, index) => {
        const array = webstore.languages.selectedLanguages;
        const all = webstore.getLanguage.data.languages;
        //   const isSelected = array.includes(item.id);
        actionDispatch(actions.SET_STREAMING_SERVICES, {
          toggle: !webstore.streamingServices.toggle,
          providers: item.provider._id,
          name: item.provider.name,
        });
      });
    }
  };

  return (
    <React.Fragment>
      <div>
        <SEO>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
        <SEO
          Title="Providers page"
          Description="OTTPLAY - Providers page"
          siteNavigationJSON="{JSON.stringify(siteNavigationJSON)}"
          breadcrumbSchemaJSON="{JSON.stringify(breadcrumbSchemaJSON)}"
        />
      </div>
      <div
        className={classes.root}
        // style={{ minHeight: height > 900 ? '82vh' : '82vh' }}
      >
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
          <Grid xs={12} container item>
            <Grid sm={1} lg={2} item></Grid>
            <Grid
              item
              xs={12}
              sm={10}
              lg={8}
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ padding: '20px 0.75%' }}
            >
              <Grid item xs={3}>
                <div className={classes.iconClass}>
                  <div className={classes.storeSection}></div>
                </div>
                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                  <div className={classes.iconClass} style={{ float: 'left' }}>
                    <div className={classes.back}>
                      <ImageComponent
                        src="https://images.ottplay.com/static/left_arrow.svg"
                        alt="back icon"
                        // onClick={handlePrev}
                      />
                    </div>
                  </div>
                </Hidden>
              </Grid>
              <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <Grid item xs={6} className={classes.topImg}>
                  <ImageComponent
                    src="https://images.ottplay.com/static/new_logo.svg"
                    alt="streaming service logo"
                  />
                </Grid>
                <Grid item xs={3}>
                  <div className={classes.iconClass} style={{ float: 'right' }}>
                    <React.Fragment>
                      <div className={classes.close}>
                        <ImageComponent
                          src="https://images.ottplay.com/static/close.png"
                          alt="close"
                          // onClick={handleClose}
                        />
                      </div>
                    </React.Fragment>
                  </div>
                </Grid>
              </Hidden>
            </Grid>
            <Grid item sm={1} lg={2}></Grid>
          </Grid>
        </Hidden>

        {/* Streaming  Services*/}
        <Grid xs={12} container item>
          <Grid sm={1} lg={2} item></Grid>
          <Grid
            item
            xs={12}
            sm={10}
            lg={8}
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.selectBlock}
          >
            <Grid item xs={8}>
              <div className={classes.header1}>Mere Paas ____ Hai</div>
              <Hidden only={['xs']}>
                <div className={classes.header2}>Choose now. Change later.</div>
              </Hidden>
              <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <div className={classes.header2}>Choose now. Change later.</div>
              </Hidden>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <label className={classes.selectAll} htmlFor="refine-switch">
                <span className={classes.selectSpan}>{'Select All'}</span>
                <Switch
                  checked={
                    webstore.streamingServices.selectedStreamingServices
                      .length === results.length && results.length > 0
                      ? true
                      : webstore.streamingServices.toggle
                  }
                  onChange={handleSwitch}
                  onColor="#03f87e"
                  offColor="#100426"
                  offHandleColor="#494060"
                  onHandleColor="#BBB6C9"
                  handleDiameter={width > 600 ? 27 : 18}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={width > 600 ? 31 : 22}
                  width={width > 600 ? 60 : 40}
                  className={classes.reactSwitch}
                  id="refine-switch"
                />
              </label>
            </Grid>
          </Grid>
          <Grid item sm={1} lg={2}></Grid>
        </Grid>
        <Grid xs={12} container item className={classes.providers}>
          <Grid sm={1} lg={2} item></Grid>
          <Grid
            item
            xs={12}
            sm={10}
            lg={8}
            container
            direction="row"
            className={classes.servicesBlock}
            //justify="space-between"
            alignItems="center"
            spacing={2}
          >
            {' '}
            {loadingData ? (
              <Spinner styles={{ minHeight: '60vh' }} />
            ) : (
              <React.Fragment>
                {/*{results.slice(startIndex, endIndex).map((item, index) => {*/}
                {results.map((item, index) => {
                  const array: any = getLocalStorageData(
                    JSON.parse(
                      localStorage.getItem(
                        LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS
                      )
                    ) || [],
                    streamingServices.selectedStreamingServices || []
                  );
                  const isSelected = array.includes(item.provider._id);
                  return (
                    <Grid
                      xs={6}
                      sm={4}
                      md={3}
                      className={classes.refinePillBox}
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      item
                    >
                      <RefineCard
                        item={item}
                        type={'Provider'}
                        isSelected={isSelected}
                        onSelect={() => {
                          actionDispatch(actions.SET_STREAMING_SERVICES, {
                            providers: item.provider._id,
                            name: item.provider.name,
                          });
                          firebaseAnalytics.logEvent('providerSelected', {
                            eventCategory: 'onboarding_providers',
                            eventAction: 'select',
                            eventLabel:
                              webstore.streamingServices &&
                              webstore.streamingServices
                                .selectedStreamingServices
                                ? webstore.streamingServices.name.toString()
                                : '',
                            eventValue:
                              webstore.streamingServices
                                .selectedStreamingServices.length,
                          });
                          windowAny.Moengage &&
                            windowAny.Moengage.track_event('providerSelected', {
                              eventCategory: 'onboarding_providers',
                              eventAction: 'select',
                              eventLabel:
                                webstore.streamingServices &&
                                webstore.streamingServices
                                  .selectedStreamingServices
                                  ? webstore.streamingServices.name.toString()
                                  : '',
                              eventValue:
                                webstore.streamingServices
                                  .selectedStreamingServices.length,
                            });
                        }}
                      />
                    </Grid>
                  );
                })}{' '}
              </React.Fragment>
            )}
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
              <CustomCardContent>
                <PillButton
                  text={'Show Recommendations'}
                  endIcon={
                    <ImageComponent
                      src="https://images.ottplay.com/static/rightArrow.svg"
                      alt=""
                    />
                  }
                  className={classes.createButton}
                  onClick={handleProceed}
                />

                <Box className={classes.spacer}></Box>
              </CustomCardContent>
            </Hidden>
          </Grid>
          <Grid item sm={1} lg={2}></Grid>
        </Grid>
        <Hidden only={['xs']}>
          <Grid
            xs={12}
            container
            item
            className={[classes.bottom, !bottomReached && classes.blurBg].join(
              ' '
            )}
            style={{
              bottom: bottomReached ? getOnBoardingFooterheight() : 0,
            }}
          >
            <Grid sm={1} lg={2} item></Grid>
            <Grid
              item
              xs={12}
              sm={10}
              lg={8}
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ padding: '10px 0.75%' }}
            >
              <Grid
                item
                xs={3}
                onClick={handlePreviousLink}
                style={{ cursor: 'pointer' }}
              >
                <div className={classes.previousLinkText}>
                  <ImageComponent
                    src="https://images.ottplay.com/static/chevron-pink-left.svg"
                    alt="left icon"
                    className={classes.previousLinkImg}
                  />
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    Go back
                  </span>
                </div>
              </Grid>
              <Grid
                item
                xs={6}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <PillButton
                  text={'Show Recommendations'}
                  endIcon={
                    <ImageComponent
                      src="https://images.ottplay.com/static/rightArrow.svg"
                      alt=""
                    />
                  }
                  className={classes.createButton}
                  onClick={handleProceed}
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid item sm={1} md={1} lg={2}></Grid>
          </Grid>
        </Hidden>
      </div>
    </React.Fragment>
  );
}

const CustomCardContent = withStyles((theme) => ({
  root: {
    marginLeft: '37%',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      backgroundImage:
        'linear-gradient(to bottom, rgb(19,7,38,0), rgba(19,7,38,1))',
      marginLeft: 0,
      textAlign: 'center',
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
    },
  },
}))(CardContent);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexDirection: 'row',
    paddingTop: 30,
    minHeight: 'calc(100vh - 120px)',
    paddingBottom: '90px',
  },
  header1: {
    color: 'white',
    //font: 'normal normal bold 28px/34px Montserrat',
    fontSize: 'clamp(14px, 1.6vw, 28px)',
    fontWeight: 600,
    zIndex: 100,
    // padding: '10px 0px',
  },
  selectBlock: {
    padding: '0px .75% 0 .75%',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& span': {
      fontSize: '18px',
      color: '#A89ABF',
      padding: '5px 15px 5px 5px',
    },
  },
  reactSwitch: {
    border: '2px solid #554473',
    borderRadius: '23px !important',
    '& react-switch-handle': {
      top: 2,
      left: -2,
    },
  },
  selectAll: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  close: {
    position: 'relative',
    width: '35px',
    cursor: 'pointer',
    marginLeft: '60px',
    opacity: 0.3,
    '&:hover': {
      opacity: 1,
    },
  },
  selectSpan: {
    fontSize: 'clamp(10px, 1.1vw, 18px)',
    color: '#A89ABF',
    padding: '5px 15px 5px 5px',
  },
  bottom: {
    position: 'fixed',
    bottom: 0,
    transition: 'bottom 0.5s',
  },
  blurBg: {
    zIndex: 1,
    backgroundColor: 'rgba(27, 12, 79, 0.5)',
    backdropFilter: 'blur(50px)',
  },

  header2: {
    color: 'white',
    fontSize: 'clamp(10px, 1.1vw, 18px)',
    fontWeight: 500,
    zIndex: 100,
    padding: '4px 0px 20px 0',
    opacity: 0.6,
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'right',
  },
  'react-switch': {
    border: '1px solid #984b92a8',
  },
  closeGrid: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  iconClass: {
    display: 'flex',
    color: '#ffffff',
    alignItems: 'center',
    fontSize: '14px',
  },
  storeSection: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 13,
  },
  previousLinkText: {
    color: '#ff4275',
    // color: '#A89ABF',
    fontSize: 'clamp(12px, 1.2vw, 22px)',
    display: 'flex',
  },
  previousLinkImg: {
    color: '#ff4275',
    marginRight: '5px',
    width: '12px',
    height: '12px',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    opacity: 0.8,
  },
  logoImg: {
    marginRight: '6px',
    width: '20px',
  },
  verticalLine: {
    borderLeft: '2px solid #fff',
    height: '24px',
    opacity: 0.3,
    margin: '6px',
  },
  table: {
    width: '100%',
  },
  iconStyle: {
    cursor: 'pointer',
    marginRight: '10px',
    width: '35px',
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
  createButton: {
    color: '#ffffff',
    //margin: "80px 0 0 0",
    padding: '4px 25px 4px 25px',
    fontSize: 'clamp(13px, 1.5vw, 18px)',
    borderRadius: '50px',
    textTransform: 'none',
    fontWeight: 600,
    backgroundColor: '#ff4275',
    minWidth: '160px',
  },
  topImg: {
    display: 'flex',
    justifyContent: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      height: 'auto',
      minHeight: '100vh !important',
      paddingTop: 0,
    },
    providers: {
      position: 'relative',
    },
    reactSwitch: {
      border: '1px solid #554473',
    },
    topImg: {
      // marginTop: 30,
      width: 139,
      height: 32,
    },
    selectSpan: {
      padding: '5px 5px 5px 5px',
    },
    selectAll: {
      marginRight: 18,
    },
    back: {
      marginLeft: 15,
      marginTop: 5,
      '& img': {
        width: 14,
        height: 14,
      },
    },
    createButton: {
      width: 'fit-content',
      height: 40,
      padding: '12px 30px',
    },
    close: {
      width: 14,
      marginRight: 15,
      opacity: 1,
      cursor: 'pointer',
      '& img': {
        width: 14,
      },
    },
    spacer: {
      height: 30,
    },
    header1: {
      fontSize: 14,
      marginTop: 19,
      marginLeft: 15,
    },
    header2: {
      fontSize: 10,
      marginTop: '2px',
      paddingBottom: 14,
      paddingTop: 0,
      marginLeft: 15,
    },
    label: {
      marginTop: 30,
      marginRight: 15,
      '& span': {
        fontSize: 10,
        paddingRoght: 5,
      },
    },
    selectBlock: {
      padding: 0,
    },
    servicesBlock: {
      marginBottom: '10%',
      margin: '0 10px',
    },
    refinePillBox: {
      padding: '0px !important',
    },
  },
}));
