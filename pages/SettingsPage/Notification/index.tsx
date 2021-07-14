import { Grid, Typography } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../../utils/constants';

import { PillButton } from '../../../components/PillButton';
import React from 'react';
import Switch from 'react-switch';
import { WebfoxContext } from '../../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../../components/firebaseConfig';
import { makeStyles } from '@material-ui/core/styles';
import ImageComponent from '../../../components/Images';

const windowAny: any = typeof window !== "undefined" && window;
const _ht_clientid = cookie.load('_ht_clientid');
export default function Notification() {
  const handleClose = () => {};
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: true,
    checkedC: false,
    checkedD: true,
    checkedE: false,
    checkedF: true,
    checkedG: false,
  });
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = React.useContext(WebfoxContext);
  const [toggle, setToggle] = React.useState(false);
  const { languages, streamingServices } = webstore;
  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  let languagesArr:any=[];
  let providersArr:any=[];
  React.useEffect(() => {

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
    firebaseAnalytics.logEvent('manage notifications', {
      screen_view:
        '/manage notifications ' +
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
    windowAny.Moengage && windowAny.Moengage.track_event('manage notifications', {
      screen_view: '/manage notifications ',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}> Manage Notifications </div>
      <Grid container spacing={1} className={classes.tabsHeader}>
        <Grid
          xs={10}
          item
          md={8}
          sm={8}
          lg={10}
          xl={10}
          className={classes.tabNames}
        >
          <Typography variant="caption" className={classes.title}>
            All Notifications
          </Typography>
        </Grid>
        <Grid
          xs={2}
          item
          md={3}
          sm={3}
          lg={2}
          xl={2}
          className={classes.tabNames}
        >
          <Switch
            checked={toggle}
            onChange={() => setToggle(!toggle)}
            onColor="#03f87e"
            offColor="#100426"
            offHandleColor="#494060"
            onHandleColor="#BBB6C9"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={40}
            width={72}
            className={classes.reactSwitch}
            id="refine-switch"
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.tabsHeader}>
        <Grid xs={2} item md={3} sm={3} lg={2} xl={2}>
          <ImageComponent src="https://images.ottplay.com/static/greyRecommend.svg" alt="ottplay" />
        </Grid>
        <Grid
          xs={10}
          item
          md={8}
          sm={8}
          lg={10}
          xl={10}
          className={classes.tabNames}
        >
          <Typography variant="caption">
            <div>
              <div className={classes.title}> Recommendations </div>
              <div className={classes.description}>
                {' '}
                Lorem Ipsum is simply dummy text of the printing{' '}
              </div>
              <div>
                <Grid container spacing={1} className={classes.tabsHeaderDaily}>
                  <Grid
                    xs={10}
                    item
                    md={8}
                    sm={8}
                    lg={9}
                    xl={9}
                    className={classes.tabNames}
                  >
                    <Typography variant="caption">Daily</Typography>
                  </Grid>
                  <Grid xs={2} item md={3} sm={3} lg={3} xl={3}>
                    <Switch
                      checked={toggle}
                      onChange={() => setToggle(!toggle)}
                      onColor="#03f87e"
                      offColor="#100426"
                      offHandleColor="#494060"
                      onHandleColor="#BBB6C9"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={40}
                      width={72}
                      className={classes.reactSwitch}
                      id="refine-switch"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.tabsHeaderDaily}>
                  <Grid
                    xs={10}
                    item
                    md={8}
                    sm={8}
                    lg={9}
                    xl={9}
                    className={classes.tabNames}
                  >
                    <Typography variant="caption">Weekly</Typography>
                  </Grid>
                  <Grid xs={2} item md={3} sm={3} lg={3} xl={3}>
                    <Switch
                      checked={toggle}
                      onChange={() => setToggle(!toggle)}
                      onColor="#03f87e"
                      offColor="#100426"
                      offHandleColor="#494060"
                      onHandleColor="#BBB6C9"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={40}
                      width={72}
                      className={classes.reactSwitch}
                      id="refine-switch"
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.tabsHeader}>
        <Grid xs={2} item md={3} sm={3} lg={2} xl={2}>
          <ImageComponent src="https://images.ottplay.com/static/greyRadio.svg" alt="radio" />
        </Grid>
        <Grid
          xs={10}
          item
          md={8}
          sm={8}
          lg={10}
          xl={10}
          className={classes.tabNames}
        >
          <Typography variant="caption">
            <div>
              <div className={classes.title}> News </div>
              <div className={classes.description}>
                {' '}
                Lorem Ipsum is simply dummy text of the printing{' '}
              </div>
              <div>
                <Grid container spacing={1} className={classes.tabsHeaderDaily}>
                  <Grid
                    xs={10}
                    item
                    md={8}
                    sm={8}
                    lg={9}
                    xl={9}
                    className={classes.tabNames}
                  >
                    <Typography variant="caption">Daily</Typography>
                  </Grid>
                  <Grid xs={2} item md={3} sm={3} lg={3} xl={3}>
                    <Switch
                      checked={toggle}
                      onChange={() => setToggle(!toggle)}
                      onColor="#03f87e"
                      offColor="#100426"
                      offHandleColor="#494060"
                      onHandleColor="#BBB6C9"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={40}
                      width={72}
                      className={classes.reactSwitch}
                      id="refine-switch"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.tabsHeaderDaily}>
                  <Grid
                    xs={10}
                    item
                    md={8}
                    sm={8}
                    lg={9}
                    xl={9}
                    className={classes.tabNames}
                  >
                    <Typography variant="caption">Weekly</Typography>
                  </Grid>
                  <Grid xs={2} item md={3} sm={3} lg={3} xl={3}>
                    <Switch
                      checked={toggle}
                      onChange={() => setToggle(!toggle)}
                      onColor="#03f87e"
                      offColor="#100426"
                      offHandleColor="#494060"
                      onHandleColor="#BBB6C9"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={40}
                      width={72}
                      className={classes.reactSwitch}
                      id="refine-switch"
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.tabsHeader}>
        <Grid xs={2} item md={3} sm={3} lg={2} xl={2}>
          <ImageComponent src="https://images.ottplay.com/static/greyCal.svg" alt="calendar" />
        </Grid>
        <Grid
          xs={10}
          item
          md={8}
          sm={8}
          lg={10}
          xl={10}
          className={classes.tabNames}
        >
          <Typography variant="caption">
            <div>
              <div className={classes.title}> New Release </div>
              <div className={classes.description}>
                {' '}
                Lorem Ipsum is simply dummy text of the printing{' '}
              </div>
              <div>
                <Grid container spacing={1} className={classes.tabsHeaderDaily}>
                  <Grid
                    xs={10}
                    item
                    md={8}
                    sm={8}
                    lg={9}
                    xl={9}
                    className={classes.tabNames}
                  >
                    <Typography variant="caption">Daily</Typography>
                  </Grid>
                  <Grid xs={2} item md={3} sm={3} lg={3} xl={3}>
                    <Switch
                      checked={toggle}
                      onChange={() => setToggle(!toggle)}
                      onColor="#03f87e"
                      offColor="#100426"
                      offHandleColor="#494060"
                      onHandleColor="#BBB6C9"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={40}
                      width={72}
                      className={classes.reactSwitch}
                      id="refine-switch"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.tabsHeaderDaily}>
                  <Grid
                    xs={10}
                    item
                    md={8}
                    sm={8}
                    lg={9}
                    xl={9}
                    className={classes.tabNames}
                  >
                    <Typography variant="caption">Weekly</Typography>
                  </Grid>
                  <Grid xs={2} item md={3} sm={3} lg={3} xl={3}>
                    <Switch
                      checked={toggle}
                      onChange={() => setToggle(!toggle)}
                      onColor="#03f87e"
                      offColor="#100426"
                      offHandleColor="#494060"
                      onHandleColor="#BBB6C9"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={40}
                      width={72}
                      className={classes.reactSwitch}
                      id="refine-switch"
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    textAlign: 'center',
    padding: '20px 20px',
  },
  title: {
    fontWeight: 'bolder',
    fontSize: '17px',
  },
  description: {
    opacity: '0.8',
  },
  header: {
    fontSize: '20px',
    marginBottom: '50px',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginBottom: '20px;',
  },
  img: {
    // width: "130px",
    marginBottom: '50px',
  },
  text: {
    padding: '0 100px',
  },
  reactSwitch: {
    border: '2px solid #554473',
    borderRadius: '23px !important',
  },
  createButton: {
    color: '#ffffff',
    marginTop: '50px',
    //margin: "80px 0 0 0",
    padding: ' 2px 15px 2px 15px',
    fontSize: '17px',
    borderRadius: '50px',
    textTransform: 'none',
    fontWeight: 'bold',
    backgroundColor: '#ff4275',
    minWidth: '300px',
  },
  tabsHeader: {
    padding: '0px',
    textAlign: 'left',
    display: 'flex',
    // alignItems: 'center',
    borderBottom: '0.5px solid #80808047',
    marginBottom: '10px',
  },
  tabsHeaderDaily: {
    padding: '0px',
    textAlign: 'left',
    display: 'flex',
    // alignItems: 'center',
  },
  tabNames: {
    textAlign: 'left',
    fontSize: '24px',
    fontFamily: 'Montserrat',
    letterSpacing: '0px',
    color: '#A89ABF',
    textTransform: 'capitalize',
    opacity: 1,
  },
});
