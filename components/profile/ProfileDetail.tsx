import {
  AppBar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Hidden,
  Tab,
  Tabs,
  makeStyles,
} from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import React, { useContext, useEffect } from 'react';

import ImageComponent from '../Images';
import { PillButton } from '../PillButton';
import ProfileMovies from './ProfileMovies';
import { Theme } from '@material-ui/core/styles';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';

const windowAny: any = typeof window !== 'undefined' && window;
function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <div> {children}</div>}</div>;
}

export default function ProfileDetail(props) {
  const classes = useStyles();
  const _ht_clientid = cookie.load('_ht_clientid');
  const [value, setValue] = React.useState(0);
  const [userName, setUserName] = React.useState('');
  const [userImage, setUserImage] = React.useState(
    `https://images.ottplay.com/static/profile2.svg`
  );
  const [editDetail, setEditDetail] = React.useState(true);
  const [button, setButton] = React.useState([0]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const { webfox, webstore, actions, actionDispatch, setLoading } = useContext(
    WebfoxContext
  );
  const { languages, streamingServices } = webstore;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  const providersArr: any = getLocalStorageData(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)) ||
      [],
    streamingServices.selectedStreamingServices || []
  );
  const { width } = React.useContext(ViewportContext);
  const hiddenFileInput: any = React.useRef(null);

  useEffect(() => {
    setUserName(props.userData.data.name);
    console.log('props.userData.name: ', props.userData);
  });

  const handleClick = (event) => {
    if (hiddenFileInput != null) {
      hiddenFileInput.current.click();
    }
    firebaseAnalytics.logEvent('profileEditPhoto', {
      eventCategory: 'profile_edit_photo',
      eventAction: 'cta_click',
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage.track_event('profileEditPhoto', {
      eventCategory: 'profile_edit_photo',
      eventAction: 'cta_click',
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
  };

  const handleChanged: any = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserImage(`${reader.result}`);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const onSelect: any = (e) => {};

  return (
    <div className={classes.root}>
      <Grid
        item
        xs={width >= 600 ? (value === 2 ? 9 : 12) : 12}
        container
        direction="row"
      >
        <Card className={classes.cardRoot}>
          <div className={classes.image}>
            <CardMedia className={classes.cover} image={userImage} />
            {editDetail ? (
              ''
            ) : (
              <div className={classes.cam}>
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  ref={hiddenFileInput}
                  style={{ display: 'none' }}
                  onChange={handleChanged}
                />
                <ImageComponent
                  src="https://images.ottplay.com/static/cam.svg"
                  // onClick={handleClick}
                  alt="camera icon"
                />{' '}
              </div>
            )}{' '}
          </div>
          <Grid xs={12} container>
            <Grid xs={10} sm={11} item container>
              <CardContent className={classes.cardContent}>
                {editDetail ? (
                  <React.Fragment>
                    <div className={classes.channelName}>{userName}</div>
                    {/* <Hidden only={['sm', 'md', 'lg', 'xl']}>
                      <div className={classes.channelEmail}>
                        amolpatel@gmail.com
                      </div>
                    </Hidden> */}
                  </React.Fragment>
                ) : (
                  <Grid xs={12} className={classes.inputBox} container>
                    <Grid xs={6} sm={7} item>
                      <input
                        className={classes.inputField}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </Grid>
                    <Grid
                      xs={6}
                      sm={5}
                      style={{ display: 'flex', alignItems: 'center' }}
                      item
                    >
                      <PillButton
                        className={classes.button}
                        text={'Update'}
                        onClick={() => {
                          setEditDetail(!editDetail);
                          firebaseAnalytics.logEvent('profileEditName', {
                            eventCategory: 'profile_edit_name',
                            eventAction: 'cta_click',
                            userType: getUserType(_ht_clientid ? true : false),
                            user_unique_id: _ht_clientid
                              ? _ht_clientid
                              : device_UUID,
                            preferredLanguages: getPreferredLanguages(
                              languagesArr
                            ),
                            preferredProviders: getPreferredProviders(
                              providersArr
                            ),
                          });
                          windowAny.Moengage &&
                            windowAny.Moengage.track_event('profileEditName', {
                              eventCategory: 'profile_edit_name',
                              eventAction: 'cta_click',
                              userType: getUserType(
                                _ht_clientid ? true : false
                              ),
                              user_unique_id: _ht_clientid
                                ? _ht_clientid
                                : device_UUID,
                              preferredLanguages: getPreferredLanguages(
                                languagesArr
                              ),
                              preferredProviders: getPreferredProviders(
                                providersArr
                              ),
                            });
                        }}
                        endIcon={
                          <ImageComponent
                            src="https://images.ottplay.com/static/rightArrow.svg"
                            alt=""
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Grid>
            <Grid
              xs={2}
              sm={1}
              className={classes.editImg}
              onClick={() => {
                setEditDetail(!editDetail);
              }}
            >
              {/* {editDetail ? (
                <ImageComponent src="https://images.ottplay.com/static/edit.svg" alt="edit icon" />
              ) : (
                <ImageComponent
                  src="https://images.ottplay.com/static/cross.svg"
                  alt="cross icon"
                />
              )} */}
            </Grid>
          </Grid>
        </Card>
        <AppBar position="static" className={classes.tabBox}>
          <Tabs value={value} className={classes.tabs} onChange={handleChange}>
            <Tab className={classes.tabText} label="Liked" />
            {/* <Tab className={classes.tabText} label="Reviewed" /> */}
            <Tab className={classes.tabText} label="Hidden" />
          </Tabs>
        </AppBar>
      </Grid>

      {/* ad codes
      {value === 1 ? (
        <Grid item xs={3} className={classes.ad_container}>
          <ImageComponent src={ads} alt="" />
        </Grid>
      ) : null} */}

      <Grid xs={12}>
        <TabPanel value={value} index={0}>
          {/* <FilterButton
            button={button}
            setButton={setButton}
            onSelect={onSelect}
          /> */}
          <ProfileMovies data={'liked'} />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          <Reviewed />
        </TabPanel> */}
        <TabPanel value={value} index={1}>
          <ProfileMovies data={'hidden'} />
        </TabPanel>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    padding: '0px 20px',
    position: 'relative',
  },
  cardRoot: {
    display: 'flex',
    flexGrow: 1,
    background: '#170732 0% 0% no-repeat padding-box',
    borderRadius: '12px 12px 0 0',
    width: '100%',
    padding: '11px 19px 17px 30px',
    boxShadow: 'none',
  },
  button: {
    color: '#FFFFFF',
    backgroundColor: '#FF4376',
    whiteSpace: 'nowrap',
    border: '1px solid #FF4376',
    margin: '10px 5px',
    width: 213,
    height: 55,
    borderRadius: 28,
    fontSize: 24,
    fontWeight: 500,
    textTransform: 'none',
    '& svg': {
      width: 20,
      height: 14,
      '&$a': {
        color: 'black',
      },
    },
  },
  image: {
    display: 'flex',
  },
  cam: {
    marginTop: '45%',
    marginLeft: '-15%',
  },
  inputField: {
    fontSize: '34px',
    background: 'rgba(3, 248, 126, 0.4)',
    opacity: '1',
    textAlign: 'left',
    color: '#FFFFFF',
    borderBottom: '1px solid #1890ff',
    outline: 'none',
    border: 'none',
    fontWeight: 'bold',
    width: 213,
    height: 55,
  },
  tabBox: {
    background: '#170732 0% 0% no-repeat padding-box',
    fontSize: '12px',
    zIndex: 0,
    borderRadius: '0px 0px 12px 12px',
    marginBottom: '2%',
  },
  tabs: {
    margin: '0px 10px',
  },
  tabText: {
    textTransform: 'capitalize',
    color: '#FFFFFF',
    fontSize: 'clamp(16px, 2vw, 20px)',
  },
  inputBox: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
  },
  channelName: {
    textAlign: 'left',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    padding: '0px 0px 0px 40px !important',
    fontSize: '34px',
    width: '100%',
    // marginBottom: '20px',
    fontWeight: 'bold',
    '@media (max-width: 1440px)': {
      fontSize: '34px',
    },
    '@media (max-width: 768px)': {
      fontSize: '32px',
    },
    '@media (max-width: 425px)': {
      fontSize: '28px',
    },
  },
  cover: {
    width: 'clamp(50px, 2vw, 107px)',
    height: 'clamp(50px, 2vw, 107px)',
  },
  cardContent: {
    color: '#ffffff',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    padding: '0px !important',
  },
  editImg: {
    textAlign: 'right',
    width: '100%',
    '& img': {
      width: 'clamp(30px, 1.5vw, 44px)',
      height: 'clamp(30px, 1.5vw, 44px)',
      marginTop: 9,
    },
  },
  ad_container: {
    top: 0,
    right: 0,
    position: 'absolute',
    paddingLeft: 5,
    '& img': {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  ad_image_bottom: {
    marginLeft: '1%',
    '& img': {
      // width: '90%'
    },
    [theme.breakpoints.down('xl')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      padding: 0,
    },
    cam: {
      marginTop: '50%',
      marginLeft: '-25%',
      '& img': {
        width: '20px',
        height: '20px',
      },
    },
    inputBox: {
      paddingLeft: 0,
    },
    inputField: {
      height: '40px',
      fontSize: 16,
      borderRadius: '28px',
      paddingLeft: '10px',
    },
    button: {
      fontSize: 16,
      height: '40px',
      margin: '0px 5px',
    },
    editImg: {
      '& img': {
        width: 'clamp(30px, 1.5vw, 44px)',
        height: 'clamp(30px, 1.5vw, 44px)',
      },
    },
    cardRoot: {
      background: 'transparent',
      padding: '0px 16px',
      marginBottom: 5,
    },
    channelName: {
      width: '100%',
      fontSize: 16,
      fontWeight: 500,
      paddingLeft: '15px !important',
    },
    // editImg: {
    //   display: 'flex',
    //   justifyContent: 'flex-end',
    //   alignItems: 'center',
    //   '& img': {
    //     marginTop: 0,
    //   },
    // },
    tabBox: {
      background: 'transparent',
      boxShadow: 'none',
      // borderBottom: '1px solid #A89ABF',
      borderBottom: 'none',
      borderRadius: 0,
      padding: '0px 16px',
    },
    tabs: {
      margin: 0,
      'MuiTabs-flexContainer-271': {
        justifyContent: 'space-between',
      },
    },
    channelEmail: {
      color: '#D6C6F4',
      fontSize: 10,
      paddingLeft: 15,
      fontWeight: 400,
      marginTop: 2,
    },
    cardContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  },
}));
