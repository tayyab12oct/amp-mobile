import * as React from 'react';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Hidden,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  HOME_SCREEN_SECTIONS,
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';

import ImageComponent from '../Images';
import Modal from 'react-modal';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';
import { removeHTMLTags } from '../../utils/helper';

const windowAny: any = typeof window !== "undefined" && window;
const _ht_clientid = cookie.load('_ht_clientid');
export default function CastCrewDescription(props) {
  const classes = useStyles();

  const { width } = React.useContext(ViewportContext);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const { webstore, webfox, actionDispatch, actions } = React.useContext(
    WebfoxContext
  );
  const isDescriptionOverflowing = () => {
    const ele = document.getElementById('movieShowSynopsis');
    if (ele) {
      if (ele.scrollHeight == ele.clientHeight) {
        return false;
      }
    }
    return true;
  };
  const { languages, streamingServices } = webstore;

  let languagesArr: any = [];
  let providersArr: any = [];
  React.useEffect(()=>{
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)) ||
        [],
      streamingServices.selectedStreamingServices || []
    );
  },[])
  return (
    <div className={classes.root}>
      <Grid xs={12} container>
        <Grid sm={1} lg={2} item></Grid>
        <Grid item xs={12} sm={10} lg={8} container className={classes.descBox}>
          <Grid xs={12} md={9} container>
            <Card className={classes.cardRoot}>
              <CardMedia
                className={classes.cover}
                image={props.img_url || "https://images.ottplay.com/static/poster_default.png"}
              />
              <CardContent className={classes.cardContent}>
                <Typography className={classes.channelName}>
                  {props.name}
                </Typography>
                <Typography className={classes.channelDesc}>
                  <div className={classes.profText}>{props.type}</div>
                  {(props.born || props.place) && (
                    <div className={classes.text}>
                      <span>
                        <b>Born : </b>
                        {props.born}
                      </span>
                      {props.place && <span> in {props.place}</span>}
                    </div>
                  )}
                  <Hidden only={['xs']}>
                    {props.description && props.description.length > 0 ? (
                      <Grid item xs={12}>
                        <div
                          id={'movieShowSynopsis'}
                          className={[
                            classes.desc,
                            classes.multiLineTruncating,
                          ].join(' ')}
                        >
                          {removeHTMLTags(
                            decodeURIComponent(props.description)
                          )}
                        </div>
                      </Grid>
                    ) : null}
                    {props.description &&
                    props.description.length > 0 &&
                    isDescriptionOverflowing() ? (
                      <div
                        className={classes.certificate}
                        onClick={() => {
                          setModalIsOpen(true);
                          if (props.content_type === 'cast') {
                            firebaseAnalytics.logEvent('actordetails/fullbio', {
                              screen_view:
                                '/actordetails/fullbio' +
                                (props && props.name ? '/' + props.name : '') +
                                (props && props.gender
                                  ? '/' + props.gender
                                  : '') +
                                (props && props._id ? '/' + props._id : '') +
                                '/' +
                                getUserType(_ht_clientid ? true : false) +
                                '/' +
                                getPreferredLanguages(languagesArr) +
                                '/' +
                                getPreferredProviders(providersArr) +
                                '/' +
                                _ht_clientid
                                  ? _ht_clientid
                                  : device_UUID,
                            });
                            windowAny.Moengage && windowAny.Moengage.track_event(
                              'actordetails/fullbio',
                              {
                                screen_view: '/actordetails/fullbio',
                                name: props && props.name ? props.name : '',
                                gender:
                                  props && props.gender ? props.gender : '',
                                id: props && props._id ? props._id : '',
                                userType: getUserType(
                                  _ht_clientid ? true : false
                                ),
                                preferredLanguages: getPreferredLanguages(
                                  languagesArr
                                ),
                                preferredProviders: getPreferredProviders(
                                  providersArr
                                ),
                                user_unique_id: _ht_clientid
                                  ? _ht_clientid
                                  : device_UUID,
                              }
                            );
                          } else {
                            firebaseAnalytics.logEvent('crewdetails/fullbio', {
                              screen_view:
                                '/crewdetails/fullbio' +
                                (props && props.name ? '/' + props.name : '') +
                                (props && props.gender
                                  ? '/' + props.gender
                                  : '') +
                                (props && props._id ? '/' + props._id : '') +
                                '/' +
                                getUserType(_ht_clientid ? true : false) +
                                '/' +
                                getPreferredLanguages(languagesArr) +
                                '/' +
                                getPreferredProviders(providersArr) +
                                '/' +
                                _ht_clientid
                                  ? _ht_clientid
                                  : device_UUID,
                            });
                            windowAny.Moengage && windowAny.Moengage.track_event(
                              'crewdetails/fullbio',
                              {
                                screen_view: '/crewdetails/fullbio',
                                name: props && props.name ? props.name : '',
                                gender:
                                  props && props.gender ? props.gender : '',
                                id: props && props._id ? props._id : '',
                                userType: getUserType(
                                  _ht_clientid ? true : false
                                ),
                                preferredLanguages: getPreferredLanguages(
                                  languagesArr
                                ),
                                preferredProviders: getPreferredProviders(
                                  providersArr
                                ),
                                user_unique_id: _ht_clientid
                                  ? _ht_clientid
                                  : device_UUID,
                              }
                            );
                          }
                        }}
                      >
                        <div className={classes.readMore}>Read More</div>
                      </div>
                    ) : null}
                  </Hidden>
                </Typography>
              </CardContent>
            </Card>
            <Modal
              isOpen={modalIsOpen}
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
                  top: width > 600 ? '0%' : '15%',
                  left: width > 600 ? '50%' : '0%',
                  right: '0%',
                  bottom: '0%',
                  border: '1px solid #ccc',
                  background: '#fff',
                  overflow: 'hidden',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '0',
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
              <Grid xs={12} item container className={classes.synopHeader}>
                <Grid xs={11} item className={classes.synopHeading}>
                  Biography
                  {/* Biography : {props.synopTitle} */}
                </Grid>
                <Grid
                  xs={1}
                  className={classes.synopClose}
                  item
                  onClick={() => setModalIsOpen(false)}
                >
                  <ImageComponent src="https://images.ottplay.com/static/close.svg" alt="close icon" />
                </Grid>
              </Grid>

              <Grid xs={12} className={classes.synopContentBox}>
                {/* <Grid xs={12} container className={classes.advert}>
                  <ImageComponent src={ads} alt="ad" />
                </Grid> */}
                <div className={classes.synopContent}>
                  <Grid xs={12} container>
                    <p className={classes.synopContentTitle}>
                      {props.synopTitle}
                    </p>
                    <p
                      className={classes.synopContentDesc} // contentEditable="true"
                      dangerouslySetInnerHTML={{
                        __html: decodeURIComponent(props.synopDescription),
                      }}
                    ></p>
                  </Grid>
                </div>
              </Grid>

              {/* <Grid xs={12} container className={classes.advert}>
                <ImageComponent src={ads1} alt="" className={classes.advert} />
              </Grid>
              <div className={classes.synopContent}>
                <Grid xs={12} container> */}
              {/* <div className={classes.synopTitle}>
                    {' '}
                    The story takes place in Gotham City, 1981.
                  </div> */}
              {/* <div
                    style={{
                      fontSize: '16px',
                      fontFamily: 'Montserrat',
                      height: '100%',
                    }}
                  >
                    <p>{props.synopDescription}</p>
                  </div>
                </Grid>
              </div> */}
            </Modal>
          </Grid>
          <Grid xs={12} md={3} container>
            {/* ad codes
            <Hidden only={['xs']}>
              <Grid xs={12} item className={classes.adsImg}>
                <ImageComponent src={ads} alt="ad" />
              </Grid>
            </Hidden> */}
            <Grid xs={12} item>
              <Hidden only={['sm', 'md', 'lg', 'xl']}>
                {props.description && props.description.length > 0 ? (
                  <Grid xs item>
                    <div className={classes.title}>About</div>
                    <Grid item xs={12}>
                      <div
                        id={'movieShowSynopsis'}
                        className={[
                          classes.desc,
                          classes.multiLineTruncating,
                        ].join(' ')}
                      >
                        {removeHTMLTags(decodeURIComponent(props.description))}
                      </div>
                    </Grid>
                  </Grid>
                ) : null}

                {props.description && props.description.length > 0 ? (
                  <div
                    className={classes.certificate}
                    onClick={() => setModalIsOpen(true)}
                  >
                    <div className={classes.readMore}>Read More</div>
                    <ImageComponent src="/static/mobile_images/about-border.svg" alt="border" />
                  </div>
                ) : null}
              </Hidden>
              {/* <Hidden only={['xs']}>
                <Card className={classes.subscribe}>
                  <CardContent className={classes.subContentBox}>
                    <div className={classes.subscribeTxt}>
                      {' '}
                      <span className={classes.subscribeImg}>
                        <ImageComponent src={sub} alt="" />
                      </span>
                      <span className={classes.subText}>
                        {' '}
                        Get the latest updates in your inbox
                      </span>
                    </div>

                    <div className={classes.innerInput}>
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
                  </CardContent>
                </Card>
              </Hidden> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
    marginTop: 1,
    color: '#ffffff',
  },
  profText: {
    color: '#D6C6F4',
    marginBottom: 5,
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    lineHeight: '20px',
    textTransform: 'capitalize',
  },
  text: {
    color: '#D6C6F4',
    marginBottom: 10,
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    lineHeight: '20px',
  },
  cardRoot: {
    display: 'flex',
    background: '#170732 0% 0% no-repeat padding-box',
    borderRadius: 12,
    width: 'calc(100% + 10px)',
    marginRight: 30,
  },
  descBox: {
    padding: '0px 16px',
  },
  adsImg: {
    marginBottom: 20,
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  subContentBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  subscribeTxt: {
    display: 'flex',
  },
  subscribeImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: 26,
      height: 26,
    },
  },
  cardContent: {
    color: '#ffffff',
    width: '68%',
    padding: 45,
    paddingBottom: '45px !important',
    borderRadius: '0px 12px 12px 0px',
    display: 'flex',
    flexDirection: 'column',
  },
  cover: {
    width: '32%',
    minHeight: '25rem',
    height: '100%',
  },
  channelName: {
    textAlign: 'left',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    fontWeight: 800,
    fontSize: 'clamp(18px, 2.2vw, 35px)',
    marginBottom: 5,
    lineHeight: '40px',
  },
  channelDesc: {
    textAlign: 'left',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    fontSize: '16px',
    // width: '80%'
  },
  certificate: {
    color: '#D6C6F4',
    fontSize: '16px',
    opacity: 0.7,
    '& img': {
      width: '100%',
    },
  },
  readMore: {
    cursor: 'pointer',
    color: '#FF3068',
    fontWeight: 600,
    fontSize: 'clamp(11px, 1.1vw, 14px)',
    marginTop: 5,
    paddingLeft: 4,
  },
  synopContentTitle: {
    fontSize: 'clamp(16px, 2.2vw, 28px)',
    color: '#000000',
    fontWeight: 600,
    margin: 0,
    marginTop: 10,
    width: '100%',
  },
  synopContentBox: {
    overflowY: 'auto',
    height: 'calc(100% - 70px)',
    marginTop: 15,
    marginBottom: 20,
    marginRight: 18,
    scrollbarWidth: 'thin',
    scrollbarColor: '#4A3FB3 #D9D9D9',
    '&::-webkit-scrollbar': {
      width: 12,
    },
    '&::-webkit-scrollbar-track': {
      background: '#D9D9D9',
      borderRadius: 20,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#4A3FB3',
      borderRadius: 20,
      border: '4px solid #D9D9D9',
    },
  },
  synopContentDesc: {
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    color: '#565656',
    fontWeight: 400,
    margin: 0,
    marginTop: 4,
    whiteSpace: 'break-spaces',
  },
  synopClose: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& img': {
      width: 'clamp(14px, 1.4vw, 23px)',
    },
  },
  synopHeader: {
    backgroundColor: '#dadada',
    boxShadow: '0px 3px 6px #00000029',
    textAlign: 'left',
    fontSize: '28px',
    letterSpacing: '0px',
    color: '#000000',
    padding: '10px 30px',
    cursor: 'pointer',
    marginBottom: 15,
  },
  advert: {
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      width: '80%',
    },
  },
  synopHeading: {
    fontSize: 'clamp(14px, 1.8vw, 20px)',
    fontWeight: 500,
  },
  synopContent: {
    padding: '20px 45px 20px 30px',
    paddingTop: 0,
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '18px',
    fontFamily: 'Montserrat',
    float: 'right',
    paddingRight: '8px',
  },
  subscribe: {
    height: '100%',
    width: '100%',
    background: '#170732 0% 0% no-repeat padding-box',
    padding: '1px 0',
    display: 'flex',
    borderRadius: '10px',
  },
  innerInput: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  subscribeInput: {
    height: 29,
    backgroundColor: '#361A74',
    borderRadius: '15px 0px 0px 15px',
    outline: 'none',
    border: 'none',
    opacity: 0.45,
    color: '#A89ABF',
    width: '70%',
    paddingRight: 12,
    paddingLeft: 12,
    '&::placeholder': {
      color: '#A89ABF',
      fontSize: 9,
      paddingRight: 12,
      paddingLeft: 12,
    },
  },
  button: {
    backgroundColor: 'transparent',
    fontSize: '10px',
    marginLeft: '0px',
    border: 'none',
    background: '#FF4275 !important',
    marginTop: '0px',
    borderRadius: '15px 15px 15px 15px',
    textTransform: 'none',
  },
  subText: {
    fontSize: '14px',
    color: '#D6C6F4',
    lineHeight: '15px',
    marginLeft: 10,
  },
  desc: {
    color: '#ffffff',
    overflow: 'hidden',
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    lineHeight: '20px',
  },
  multiLineTruncating: {
    padding: '0px',
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    paddingLeft: '3px !important',
  },
  [theme.breakpoints.down('xs')]: {
    descBox: {
      padding: '0px 15px',
    },
    cardRoot: {
      marginRight: 0,
      borderRadius: 2,
    },
    cover: {
      width: 110,
      minHeight: 146,
    },
    cardContent: {
      padding: '0px 16px',
      paddingBottom: '0px !important',
      display: 'flex',
      justifyContent: 'center',
      margin: '15px 0px',
    },
    channelName: {
      marginBottom: 5,
      lineHeight: '22px',
    },
    profText: {
      marginBottom: 0,
      fontWeight: 600,
      lineHeight: '14px',
      opacity: '0.7',
    },
    text: {
      marginBottom: 0,
      lineHeight: '14px',
      marginTop: 8,
      opacity: '0.7',
    },
    title: {
      marginTop: 10,
      marginBottom: 9,
      fontSize: 14,
      lineHeight: '17px',
      fontWeight: 800,
    },
    desc: {
      lineHeight: '18px',
    },
    readMore: {
      lineHeight: '18px',
      fontWeight: 600,
      marginTop: 0,
    },
    borderLine: {
      margin: '20px 0px',
    },

    synopHeader: {
      padding: '12px 15px',
    },
    synopHeading: {
      lineHeight: '19px',
      fontWeight: 800,
    },
    synopContentBox: {
      marginRight: 10,
      marginTop: 13,
      height: '80%',
      overflowX: 'hidden',
      overflowY: 'scroll',
    },
    advert: {
      marginBottom: 13,
    },
    synopContentTitle: {
      lineHeight: '20px',
      marginTop: 0,
    },
    synopContentDesc: {
      lineHeight: '16px',
      color: '#565656',
      marginTop: 8,
    },
    synopContent: {
      padding: '0px 15px 20px 15px',
    },
  },
}));
