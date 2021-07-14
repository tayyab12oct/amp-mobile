import { Grid, Hidden } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import React, { useContext, useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import ImageComponent from '../Images';
import Switch from 'react-switch';
import VerticalTabs from '../Tab';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';

const _ht_clientid = cookie.load('_ht_clientid');
interface RefineTabProps {
  isOpen: Boolean;
  setModal: Function;
  handleRefine?: any;
  setRefineState?: any;
  from?: any;
}

const windowAny: any = typeof window !== 'undefined' && window;
export function RefineTab(props: RefineTabProps) {
  const classes = useStyles();
  const [toggle, setToggle] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  } as any);
  const [selectedIndex, setSelectedIndex] = React.useState('' as any);
  const [tab, setTab] = React.useState(0 as any);
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);
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
  useEffect(() => {
    firebaseAnalytics.logEvent('refine', {
      screen_view:
        '/refine' +
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
    windowAny.Moengage &&
      windowAny.Moengage.track_event('refine', {
        screen_view: '/refine',
        userType: getUserType(_ht_clientid ? true : false),
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      });
  });
  useEffect(() => {
    setToggle({
      ...toggle,
      //0: webstore.refine.forYou.selectedAllLanguages,
      0: webstore.refine.forYou.selectedAllStreams,
      1: webstore.refine.forYou.selectedAllLanguages,
      2: webstore.refine.forYou.selectedAllGenres,
      3: webstore.refine.forYou.selectedAllFreePaid,
      4: webstore.refine.forYou.selectedAllRuntimeMin,
      5: webstore.refine.forYou.selectedAllQuality,
      7: webstore.refine.forYou.selectedAllContentType,
      6: webstore.refine.forYou.selectedAllContentRating,
    });
  }, [
    webstore.refine.forYou.selectedAllLanguages,
    webstore.refine.forYou.selectedAllGenres,
    webstore.refine.forYou.selectedAllStreams,
    webstore.refine.forYou.selectedAllFreePaid,
    webstore.refine.forYou.selectedAllRuntimeMin,
    webstore.refine.forYou.selectedAllQuality,
    webstore.refine.forYou.selectedAllContentType,
    webstore.refine.forYou.selectedAllContentRating,
  ]);
  const handleChange = (active) => {
    setTab(active);
    // setToggle({
    //   active: toggle.active,
    // });
  };
  console.log('tab: ', tab);
  console.log('toggle.tab: ', toggle[tab]);
  return (
    <Grid xs={12} item container className={classes.root}>
      <Grid xs={12} item container className={classes.circularWrapper}>
        <Grid xs={6} className={classes.title} item>
          Refine
        </Grid>
        <Grid xs={5} item>
          <label htmlFor="refine-switch" className={classes.label}>
            <Hidden only={['xs']}>
              <span>Select All</span>
              <Switch
                checked={toggle[tab]}
                onChange={() => {
                  setToggle({
                    ...toggle,
                    [tab]: !toggle[tab],
                  });
                  // setToggle(!toggle);
                  if (toggle[tab] === 0) {
                    firebaseAnalytics.logEvent('refineApply', {
                      eventCategory: 'refine_select_all',
                      eventAction:
                        tab && tab === 0
                          ? 'Languages'
                          : tab && tab === 1
                          ? 'Providers'
                          : tab && tab === 2
                          ? 'Genre'
                          : '',
                      userType: getUserType(_ht_clientid ? true : false),
                      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
                      preferredLanguages: getPreferredLanguages(languagesArr),
                      preferredProviders: getPreferredProviders(providersArr),
                    });
                    windowAny.Moengage.track_event('refineApply', {
                      eventCategory: 'refine_select_all',
                      eventAction:
                        tab && tab === 0
                          ? 'Languages'
                          : tab && tab === 1
                          ? 'Providers'
                          : tab && tab === 2
                          ? 'Genre'
                          : '',
                      userType: getUserType(_ht_clientid ? true : false),
                      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
                      preferredLanguages: getPreferredLanguages(languagesArr),
                      preferredProviders: getPreferredProviders(providersArr),
                    });
                  }
                }}
                onColor="#03f87e"
                offColor="#100426"
                offHandleColor="#494060"
                onHandleColor="#BBB6C9"
                handleDiameter={18}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={40}
                className={classes.reactSwitch}
                id="refine-switch"
              />
            </Hidden>
            {tab === 4 || tab === 7 ? (
              ''
            ) : (
              <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <span>All</span>
                <Switch
                  checked={toggle[tab]}
                  onChange={() => {
                    setToggle({
                      [tab]: !toggle[tab],
                    });
                    // setToggle(!toggle);
                  }}
                  onColor="#03f87e"
                  offColor="#100426"
                  offHandleColor="#494060"
                  onHandleColor="#BBB6C9"
                  handleDiameter={18}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={22}
                  width={40}
                  className={classes.reactSwitch}
                  id="refine-switch"
                />
              </Hidden>
            )}
          </label>
        </Grid>

        <Grid
          xs={1}
          item
          className={classes.close}
          onClick={() => props.setModal(false)}
        >
          <ImageComponent
            src="https://images.ottplay.com/static/close.svg"
            alt="close icon"
          />
        </Grid>
      </Grid>
      <Grid xs={12} item className={classes.verticalTab}>
        <VerticalTabs
          from={props.from}
          toggle={toggle[tab]}
          tab={tab}
          setToggle={(tab, val) => {
            console.log('setToggle: ', tab + '---' + val);
            setToggle({ ...toggle, [tab]: val });
          }}
          handleChange={handleChange}
          refineClick={() => {
            props.setModal(false);
            props.handleRefine;
            props.setRefineState(true);
          }}
        />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: '#1C0B3E',
  },
  circularWrapper: {
    color: 'white',
    font: 'normal normal bold 28px/34px Montserrat',
    backgroundColor: '#23104a',
    boxShadow: '0px 3px 6px #00000029',
    zIndex: 100,
    height: '58px',
    padding: '10px 15px',
  },
  close: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '& img': {
      height: 'clamp(18px, 1.4vw, 25px)',
      width: 'clamp(18px, 1.4vw, 25px)',
    },
  },
  verticalTab: {
    height: 'calc(100% - 58px)',
    // padding: '20px 0px 0px 0px'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& span': {
      fontSize: 'clamp(10px, 1vw, 14px)',
      color: '#A89ABF',
      padding: '5px',
      fontWeight: 300,
    },
  },
  title: {
    fontSize: 'clamp(18px, 2vw, 35px)',
    fontWeight: 500,
  },
  reactSwitch: {
    border: '2px solid #554473',
    borderRadius: '23px !important',
  },
  [theme.breakpoints.down('xs')]: {
    title: {
      color: '#D6C6F4',
      marginTop: 4,
    },
    label: {
      marginRight: 10,
    },
    reactSwitch: {
      border: '1px solid #554473',
    },
  },
}));
