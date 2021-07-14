import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Hidden,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../../utils/constants';
import { PillButton, RefineCard } from '../../../components';
import React, { useContext, useEffect, useState } from 'react';

import ImageComponent from '../../../components/Images';
import { NavBar } from '../../../components';
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

function Language() {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const { height } = React.useContext(ViewportContext);
  const [results, setResults] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const [check, setCheck] = React.useState(false);
  const { webfox, webstore, actions, actionDispatch, setLoading } = useContext(
    WebfoxContext
  );
  const { languages, streamingServices } = webstore;

  // const [langArray, setlangArray] = useState([]);
  let languagesArr: any = [];
  let providersArr: any = [];
  let providersNameArr: any = [];
  let langArray = [];
  useEffect(() => {
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
    langArray = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      webstore.languages.name
    );

    const windowAny: any = typeof window !== 'undefined' && window;

    windowAny &&
      windowAny.Moengage &&
      windowAny.Moengage.track_event('screen_view', {
        page_title: '/preferenceslanguages' + '/proceed CTA',
      });
  }, []);
  React.useEffect(() => {
    firebaseAnalytics.logEvent('screen_view', {
      page_title: '/preferenceslanguages' + '/proceed CTA',
    });

    const params = {
      limit: 12,
      module_name: 'Languages',
      platform: 'web',
    };

    webfox.getAllLanguageList(params).then(({ data, error }) => {
      //console.log('Language result. ', JSON.stringify(data));
      if (error) {
        actionDispatch(actions.FETCH_LANGUAGE_LIST_FAILURE, []);
      }
      //console.log('response: ' + JSON.stringify(data));
      actionDispatch(actions.FETCH_LANGUAGE_LIST_SUCCESS, data || []);
      // if (data && data.languages) {
      //   setResults(data.languages);
      //   setLoadingData(false);
      //   console.log('Language', data.languages);
      // }
      if (data && data.rank) {
        console.log('rank: ', data.rank);
        const arr = data.rank.filter(
          (e) => e.language && e.language['status'] === 'published'
        );
        console.log('arr: ', arr);
        setResults(arr);
        setLoadingData(false);
      }
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (webstore.languages.toggle) {
      firebaseAnalytics.logEvent('languageSelected', {
        eventCategory: 'onboarding_languages',
        eventAction: 'select_all',
        eventLabel:
          webstore.languages && webstore.languages.name
            ? webstore.languages.name.toString()
            : '',
        eventValue: webstore.languages.selectedLanguages.length,
      });
      windowAny.Moengage &&
        windowAny.Moengage.track_event('languageSelected', {
          eventCategory: 'onboarding_languages',
          eventAction: 'select_all',
          eventLabel:
            webstore.languages && webstore.languages.name
              ? webstore.languages.name.toString()
              : '',
          eventValue: webstore.languages.selectedLanguages.length,
        });
    }
  }, [webstore.languages.toggle]);

  const handleSwitch = (e) => {
    {
      const array = webstore.languages.selectedLanguages;
      const all = webstore.getLanguage.data.languages;
      results.map((item, index) => {
        actionDispatch(actions.SET_LANGUAGES, {
          toggle: !webstore.languages.toggle,
          language: item.language._id,
          name: item.language.name,
        });
      });
    }
    // setlangArray(
    //   getLocalStorageData(
    //     JSON.parse(
    //       localStorage.getItem('onboarding_selected_language_names')
    //     ) || [],
    //     webstore.languages.selectedLanguages
    //   )
    // );
  };

  const _ht_clientid = cookie.load('_ht_clientid');
  return (
    <React.Fragment>
      <div>
        <SEO>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
        <SEO
          Title="Language page"
          Description="OTTPLAY - Language page"
          siteNavigationJSON="{JSON.stringify(siteNavigationJSON)}"
          breadcrumbSchemaJSON="{JSON.stringify(breadcrumbSchemaJSON)}"
        />
      </div>
      <div className={classes.root} style={{ minHeight: '82vh' }}>
        {loadingData ? (
          <Spinner />
        ) : (
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
            >
              <Grid xs={12} item container>
                {/* <Hidden only={['xs']}>
              <Grid xs={12} md={5} sm={4} className={classes.topImgBox}>
                <CardMedia
                  component="img"
                  style={{ width: width > 1400 ? 309 : '60%' }}
                  image={language}
                />
              </Grid>
            </Hidden> */}

                <Grid xs={12} md={12} sm={12} item spacing={2}>
                  <Card className={classes.classRoot}>
                    <Hidden only={['sm', 'md', 'lg', 'xl']}>
                      <div className={classes.imgBox}>
                        <CardMedia
                          component="img"
                          className={classes.cover}
                          image="https://images.ottplay.com/static/new_logo.svg"
                        />
                      </div>
                    </Hidden>

                    <CardContent style={{ padding: 0 }}>
                      <Typography className={classes.name}>
                        Mind Your Language
                      </Typography>
                      <Grid xs={12} container>
                        <Grid xs={7} item>
                          <Typography className={classes.details}>
                            And tell us your preferences
                          </Typography>
                        </Grid>
                        <Grid xs={5} item>
                          <label
                            className={classes.selectAll}
                            htmlFor="refine-switch"
                          >
                            <span className={classes.selectSpan}>
                              {'Select All'}
                            </span>
                            <Switch
                              checked={
                                webstore.languages.name.length ===
                                  results.length && results.length > 0
                                  ? true
                                  : webstore.languages.toggle
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
                        </Grid>{' '}
                      </Grid>
                      <Grid
                        xs={12}
                        container
                        className={classes.refineBox}
                        spacing={2}
                      >
                        <React.Fragment>
                          {results.map((item, index) => {
                            // const array = webstore.languages.selectedLanguages;
                            const array = getLocalStorageData(
                              JSON.parse(
                                localStorage.getItem(
                                  LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES
                                )
                              ) || [],
                              webstore.languages.selectedLanguages
                            );
                            const isSelected = array.includes(
                              item.language.name
                            );
                            return (
                              <Grid
                                xs={6}
                                md={3}
                                className={classes.refinePillBox}
                                item
                              >
                                <RefineCard
                                  item={item}
                                  type={'Languages'}
                                  isSelected={isSelected}
                                  onSelect={() => {
                                    actionDispatch(actions.SET_LANGUAGES, {
                                      language: item.language._id,
                                      name: item.language.name,
                                    });
                                    firebaseAnalytics.logEvent(
                                      'languageSelected',
                                      {
                                        eventCategory: 'onboarding_languages',
                                        eventAction: 'select',
                                        eventLabel:
                                          webstore.languages &&
                                          webstore.languages.name
                                            ? webstore.languages.name.toString()
                                            : '',
                                        eventValue:
                                          webstore.languages.name.length,
                                      }
                                    );
                                    windowAny.Moengage &&
                                      windowAny.Moengage.track_event(
                                        'languageSelected',
                                        {
                                          eventCategory: 'onboarding_languages',
                                          eventAction: 'select',
                                          eventLabel:
                                            webstore.languages &&
                                            webstore.languages.name
                                              ? webstore.languages.name.toString()
                                              : '',
                                          eventValue:
                                            webstore.languages.name.length,
                                        }
                                      );
                                  }}
                                />
                              </Grid>
                            );
                          })}
                        </React.Fragment>
                      </Grid>
                    </CardContent>
                    <CustomCardContent>
                      <PillButton
                        text={"Let's Go"}
                        endIcon={
                          <ImageComponent
                            src="https://images.ottplay.com/static/rightArrow.svg"
                            alt=""
                          />
                        }
                        style={{
                          backgroundColor:
                            webstore.languages.name.length > 0
                              ? '#FF4275'
                              : '#35147A',
                          margin: 0,
                          border:
                            webstore.languages.name.length > 0
                              ? '0.5px solid #FF4275'
                              : '0.5px solid #35147A',
                          fontSize: 'clamp(13px, 1.2vw, 18px)',
                          fontWeight: '600',
                          textTransform: 'none',
                          color: 'white',
                          padding: '8px 30px',
                          borderRadius: '28px',
                          marginBottom: width > 600 ? 30 : 0,
                          pointerEvents:
                            webstore.languages.name.length > 0
                              ? 'auto'
                              : 'none',
                          opacity:
                            webstore.languages.name.length > 0 ? 1 : '0.3',
                        }}
                        onClick={() => {
                          const params = {
                            event: 'preferred_languages',
                            details: {
                              page_name: window.location.pathname,
                              preferred_providers: getPreferredProviders(
                                providersNameArr
                              ),
                              preferred_languages: getPreferredLanguages(
                                languagesArr
                              ),
                            },
                            context: contextParamsForREAnalytics,
                          };
                          webfox
                            .postREAnalytics(params)
                            .then(({ data, error }) => {});
                          Router.push('/onboard/interests');
                        }}
                      />
                    </CustomCardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid sm={1} lg={2} item></Grid>
          </Grid>
        )}
      </div>
    </React.Fragment>
  );
}

const CustomCardContent = withStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '3%',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      backgroundImage:
        'linear-gradient(to bottom, rgb(19,7,38,0), rgba(19,7,38,1))',
      marginLeft: 0,
      textAlign: 'center',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      paddingBottom: '12% !important',
    },
  },
}))(CardContent);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '85vh',
  },
  classRoot: {
    backgroundColor: 'transparent',
    height: 'auto',
    boxShadow: 'none',
  },
  topImgBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    width: 255,
    height: 60,
  },
  name: {
    fontSize: 'clamp(14px, 1.6vw, 28px)',
    letterSpacing: '0px',
    color: '#FFFFFF',
    marginTop: '30px',
    fontWeight: 550,
  },
  details: {
    color: '#BBB6D1',
    letterSpacing: '0',
    fontSize: 'clamp(10px, 1.1vw, 18px)',
  },
  reactSwitch: {
    border: '2px solid #554473',
    borderRadius: '23px !important',
    '& react-switch-handle': {
      top: 2,
      left: -2,
    },
  },
  button: {
    color: '#FFFFFF',
    whiteSpace: 'nowrap',
    border: '1px solid #FF4376',
    padding: '3px 20px',
    margin: '0 5px',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: 800,
    textTransform: 'none',
    height: '55px',
    width: '40%',
  },
  selectAll: {
    marginTop: '-5%',
    marginRight: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  selectSpan: {
    fontSize: 'clamp(10px, 1.1vw, 18px)',
    color: '#A89ABF',
    padding: '5px 15px 5px 5px',
  },
  refinePillBox: {
    padding: '2px !important',
  },
  refineBox: {
    marginTop: '2%',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      height: '100vh !important',
    },
    classRoot: {
      position: 'relative',
    },
    cover: {
      width: 139,
      height: 33,
      margin: '0 auto',
      objectFit: 'contain',
      marginTop: 20,
    },
    name: {
      fontWeight: 500,
      marginLeft: 10,
    },
    details: {
      marginLeft: 10,
    },
    reactSwitch: {
      border: '1px solid #554473',
    },
    selectSpan: {
      padding: '5px 5px 5px 5px',
    },
    selectAll: {
      marginTop: '-8%',
      marginRight: 10,
    },
    button: {
      width: 160,
      height: 40,
      fontSize: 13,
      padding: '12px 40px',
    },
    refineBox: {
      marginBottom: '35%',
      marginTop: 5,
      margin: 0,
      padding: '0px 5px',
    },
    refinePillBox: {
      padding: '0px !important',
    },
  },
}));

export default Language;
