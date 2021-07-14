import { Box, CardContent, Grid, Hidden } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  getLocalStorageData,
} from '../../utils/constants';
import React, { useEffect } from 'react';
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';

import { CastAndCrewCard } from '../../components';
import ImageComponent from '../../components/Images';
import { PillButton } from '../../components/PillButton';
import SEO from '../../components/Seo';
import { Spinner } from '../../components/Spinner';
import Switch from 'react-switch';
import { ViewportContext } from '../../components/ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import { useContext } from 'react';
import { useRouter } from 'next/router';

export default function Cast() {
  const router = useRouter();
  const classes = useStyles();
  const [results, setResults] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const { width } = React.useContext(ViewportContext);
  const [bottomReached, isbottomReached] = React.useState(true);

  const { webfox, webstore, actions, actionDispatch, setLoading } = useContext(
    WebfoxContext
  );
  const { languages } = webstore;

  let languagesArr: any = [];

  useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
  }, []);

  React.useEffect(() => {
    const params = {
      language: languagesArr.length > 0 ? languagesArr.toString() : '',
      limit: 40,
      module_name: 'Onboarding',
      platform: 'web',
      section: 'Cast',
    };
    webfox.getCastOnboardingList(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_CAST_LIST_FAILURE, []);
      }
      actionDispatch(actions.FETCH_CAST_LIST_SUCCESS, data || []);
      if (data && data.rank) {
        const arr = data.rank.filter(
          (e) => e.cast['status'] === 'published' && e.cast.headshot
        );
        setResults(arr);
        setLoadingData(false);
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
  }, [typeof window !== 'undefined' && window.location.pathname]);

  React.useEffect(() => {
    const wrappedElement = document.getElementById('onbording-wrapper');
    if (wrappedElement) {
      if (wrappedElement.getBoundingClientRect().bottom <= window.innerHeight) {
        isbottomReached(true);
      } else {
        isbottomReached(false);
      }
    }
  }, [loadingData]);

  const handleScroll = () => {
    const wrappedElement = document.getElementById('onbording-wrapper');
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
    return '40px';
  };

  const handleClose = () => {
    router.push('/onboard/crew');
  };

  const handleProceed = () => {
    router.push('/onboard/crew');
  };

  const handlePreviousLink = () => {
    router.push('/onboard/genres');
  };

  const handleSwitch = (e) => {
    {
      results.map((item, index) => {
        actionDispatch(actions.SET_CAST, {
          toggle: !webstore.cast.toggle,
          cast: item.cast._id,
          name: item.cast.name,
        });
      });
    }
  };

  const getCardSize = () => {
    if (results && results.length < 6) {
      if ((width < 600 && results.length < 2) || width > 600) {
        return 'repeat(auto-fit, 130px)';
      } else {
        return 'repeat(auto-fit, minmax(124px, 1fr))';
      }
    } else {
      return 'repeat(auto-fit, minmax(124px, 1fr))';
    }
  };

  const renderErrorMessage = () => {
    return (
      <div className={classes.errorMessage}>
        No Cast available for your choice.
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <SEO>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </SEO>
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
                      alt="back button"
                      onClick={handlePreviousLink}
                    />
                  </div>
                </div>
              </Hidden>
            </Grid>
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
              <Grid item xs={6} className={classes.topImg}>
                <ImageComponent
                  src="https://images.ottplay.com/static/new_logo.svg"
                  alt="streaming service icon"
                />
              </Grid>
              <Grid item xs={3}>
                <div className={classes.iconClass} style={{ float: 'right' }}>
                  <>
                    <div className={classes.close}>
                      <ImageComponent
                        src="https://images.ottplay.com/static/close.png"
                        alt="close icon"
                        onClick={handleClose}
                      />
                    </div>
                  </>
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
            <div className={classes.header1}>Select The Actors You Love!</div>
            <div className={classes.header2}>Based on your choice</div>
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
                  webstore.cast.name &&
                  results.length > 0 &&
                  webstore.cast.name.length === results.length
                    ? true
                    : webstore.cast.toggle
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
      <Grid xs={12} container item className={classes.cast}>
        <Grid sm={1} lg={2} item></Grid>
        <Grid
          item
          xs={12}
          sm={10}
          lg={8}
          container
          direction="row"
          alignItems="center"
        >
          {' '}
          {loadingData ? (
            <Spinner styles={{ minHeight: '60vh' }} />
          ) : results && results.length > 0 ? (
            <div
              className={classes.container}
              style={{
                gridTemplateColumns: getCardSize(),
              }}
            >
              {results.map((item, index) => {
                const array = webstore.cast.name;
                const isSelected = array.includes(item.cast.name);
                return (
                  <CastAndCrewCard
                    data={item}
                    isSelected={isSelected}
                    onSelect={() => {
                      actionDispatch(actions.SET_CAST, {
                        cast: item.cast._id,
                        name: item.cast.name,
                      });
                    }}
                  />
                );
              })}
            </div>
          ) : (
            renderErrorMessage()
          )}
          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <CustomCardContent>
              <PillButton
                text={webstore.cast.name.length > 0 ? 'Proceed' : 'Skip'}
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
                  alt="back icon"
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
                text={webstore.cast.name.length > 0 ? 'Proceed' : 'Skip'}
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
      zIndex: 2,
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
    fontSize: 'clamp(14px, 1.6vw, 28px)',
    fontWeight: 600,
    zIndex: 100,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(124px, 1fr))',
    gap: '1rem',
    padding: '0.5rem',
    width: '100%',
    color: '#ffffff',
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
    zIndex: 2,
    position: 'fixed',
    bottom: 0,
    transition: 'bottom 0.5s',
  },
  blurBg: {
    backgroundColor: 'rgba(27, 12, 79, 0.5)',
    backdropFilter: 'blur(50px)',
    zIndex: 9,
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
    container: {
      gap: '16px',
      padding: '0px 16px 16px 16px',
    },
    cast: {
      position: 'relative',
    },
    reactSwitch: {
      border: '1px solid #554473',
    },
    topImg: {
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
  },
  errorMessage: {
    minHeight: '60vh',
    display: 'flex',
    width: '100%',
    padding: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 'clamp(12px, 1.4vw, 16px)',
    textAlign: 'center',
  },
}));
