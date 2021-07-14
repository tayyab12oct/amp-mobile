import { Genres, Languages, StreamingService } from '../../Refine';
import { Grid, Hidden } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../../utils/constants';
import React, { useContext, useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';


import { PillButton } from '../../PillButton';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { WebfoxContext } from '../../../services/webfox';

import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../firebaseConfig';

import ImageComponent from '../../Images';

const windowAny: any = window;
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  item: any;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, item, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.tabContent}
      {...other}
    >
      {value === index && (
        <Grid xs={12} lg={12} item container>
          {item.component}
        </Grid>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default React.memo(function VerticalTabs(props: any) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [clear, setClear] = useState({
    language: false,
    provider: false,
    genre: false,
  } as any);
  useEffect(() => {}, [clear]);
  //   useEffect(() => {
  //     if (props.toggle[props.tab]) {
  //       if (props.tab === 0) {
  //         setClear({
  //           ...clear,
  //           language: false,
  //         });
  //       } else if (props.tab === 1) {
  //         setClear({
  //           ...clear,
  //           provider: false,
  //         });
  //       } else if (props.tab === 2) {
  //         setClear({
  //           ...clear,
  //           genre: false,
  //         });
  //       }
  //     }
  //   }, [props.toggle, props.tab]);
  const setSelectAllClear = (val, data) => {
    setClear({ ...clear, [val]: data });
    if (val === 'provider') {
      props.setToggle(0, data);
    } else if (val === 'language') {
      props.setToggle(1, data);
    } else if (val === 'genre') {
      props.setToggle(2, data);
    }
    // if (val === 'language') {
    //   props.setToggle(0, data);
    // }
  };
  const refine = [
    {
      name: 'Streaming Service',
      unselected_image: "https://images.ottplay.com/static/streaming_unselected.svg",
      selected_image: "https://images.ottplay.com/static/Streaming_selected.svg",
      component: (
        <StreamingService
          forPage="refine"
          clear={clear.provider}
          selectAll={value === 0 ? props.toggle : false}
          setSelectAllClear={setSelectAllClear}
        />
      ),
    },
    {
      name: 'Languages',
      unselected_image: "https://images.ottplay.com/static/language_unselected.svg",
      selected_image: "https://images.ottplay.com/static/languages_selected.svg",
      component: (
        <Languages
          forPage="refine"
          clear={clear.language}
          selectAll={value === 1 ? props.toggle : false}
          setSelectAllClear={setSelectAllClear}
        />
      ),
    },
    {
      name: 'Genres',
      unselected_image: "https://images.ottplay.com/static/Genres_unselected.svg",
      selected_image: "https://images.ottplay.com/static/genres_selected.svg",
      component: (
        <Genres
          forPage="refine"
          clear={clear.genre}
          selectAll={value === 2 ? props.toggle : false}
          setSelectAllClear={setSelectAllClear}
        />
      ),
    },
    // {
    //   name: 'Rating',
    //   unselected_image: rating_unselected,
    //   selected_image: rating_selected,
    //   component: <RefineRating />,
    // },
    // {
    //   name: 'Content Type',
    //   unselected_image: Content_type_unselected,
    //   selected_image: content_type_selected,
    //   component: <ContentType />,
    // },
    // {
    //   name: 'Price',
    //   unselected_image: price_unselected,
    //   selected_image: price_selected,
    //   component: <RefineFreePaid />,
    // },
    // {
    //   name: 'Quality',
    //   unselected_image: hq_unselected,
    //   selected_image: quality_selected,
    //   component: <QualityFilter />,
    // },
    // {
    //   name: 'Runtime Minutes',
    //   unselected_image: runtime_minutes_unselected,
    //   selected_image: runtime_min_selected,
    //   component: <RefineRunTime />,
    // },
  ];

  const _ht_clientid = cookie.load('_ht_clientid');
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    // if (props.toggle) {
    //   props.setToggle(true);
    // } else {
    //   props.setToggle(false);
    // }
    props.handleChange(newValue);
  };
  const { webfox, webstore, actions, actionDispatch } = useContext(
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
  const getLabel = (item, event: Boolean) => {
    return (
      <>
        <Grid container spacing={1} className={classes.tabsHeader}>
          <Grid
            xs={2}
            item
            md={3}
            sm={3}
            lg={2}
            xl={2}
            className={classes.tab_icon}
          >
            <ImageComponent
              src={event ? item.selected_image : item.unselected_image}
              alt="label image"
            />
          </Grid>
          <Grid
            xs={8}
            item
            md={8}
            sm={7}
            lg={9}
            xl={9}
            className={classes.tabNames}
          >
            <Typography
              className={event ? classes.active_tab_text : classes.typo}
            >
              {item.name}
            </Typography>
          </Grid>
          <Grid xs={2} item md={1} sm={2} lg={1} xl={1}>
            <ImageComponent
              src={event ? "https://images.ottplay.com/static/green_right_arrow.svg" : "https://images.ottplay.com/static/grey_right_arrow.svg"}
              alt="rigth arrow"
            />{' '}
          </Grid>
        </Grid>
      </>
    );
  };

  const isTabActive = (tabId: number, value: number) => {
    return tabId === value;
  };

  const clearData = () => {
    firebaseAnalytics.logEvent('refineClear', {
      eventCategory: 'refine_clear',
      eventAction:
        value === 1
          ? 'language'
          : value === 0
          ? 'provider'
          : value === 2
          ? 'genre'
          : '',
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage.track_event('refineClear', {
      eventCategory: 'refine_clear',
      eventAction:
        value === 1
          ? 'language'
          : value === 0
          ? 'provider'
          : value === 2
          ? 'genre'
          : '',
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    if (value === 1) {
      setClear({ ...clear, language: true });
      props.setToggle(value, false);
    } else if (value === 0) {
      setClear({ ...clear, provider: true });
      props.setToggle(value, false);
    } else if (value === 2) {
      setClear({ ...clear, genre: true });
      props.setToggle(value, false);
    }
  };

  const refineData = () => {
    actionDispatch(actions.REFINE_FOR_YOU_PAGE, {
      page: 'forYou',
    });
    props.refineClick();
    firebaseAnalytics.logEvent('refineApply', {
      eventCategory: 'refine_apply',
      eventAction: 'category',
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage.track_event('refineApply', {
      eventCategory: 'refine_apply',
      eventAction: 'category',
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
  };

  return (
    <div className={classes.root}>
      <Grid xs={6} sm={5} md={4} item className={classes.sideBar}>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
          TabIndicatorProps={{
            style: {
              height: '0px',
            },
          }}
        >
          {refine.map((item, index) => {
            return (
              <Tab
                className={value === index ? classes.activeTab : classes.tab}
                label={
                  <React.Fragment>
                    {getLabel(item, isTabActive(index, value))}
                  </React.Fragment>
                }
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </Grid>
      <Grid
        xs={6}
        sm={7}
        md={8}
        item
        container
        className={classes.sidebarResults}
      >
        {refine.map((item, index) => {
          return (
            <TabPanel value={value} index={index} item={item}>
              {item.name}
            </TabPanel>
          );
        })}
      </Grid>
      <div className={classes.mobileRefineButtonContainer}>
        <PillButton
          className={classes.refine}
          style={{
            backgroundColor: 'transparent',
            fontSize: '14px',
            marginLeft: '0px',
            marginTop: '20px',
            border: '1px solid #735C98',
            font: 'normal normal medium 14px Montserrat',
            textTransform: 'none',
          }}
          onClick={clearData}
          text="Clear"
        />

        <PillButton
          className={classes.refine}
          style={{
            backgroundColor: '#FF4275',
            fontSize: '14px',
            marginLeft: '20px',
            marginTop: '20px',
            font: 'normal normal bold 14px Montserrat',
            textTransform: 'none',
          }}
          onClick={refineData}
          text="Refine"
        />
      </div>
    </div>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    color: '#A89ABF',
    overflow: 'auto',
    opacity: 1,
    height: '100%',
  },
  tabs: {
    // borderRight: `0.5px solid ${theme.palette.divider}`,
    // indicatorColor: 'white'
    paddingLeft: 8,
  },
  tab: {
    borderBottom: '1px solid rgb(41, 31, 85)',
    paddingLeft: 8,
    opacity: 1,
  },
  activeTab: {
    color: '#03F87E',
    backgroundColor: '#1C0B3E',
    borderBottom: '1px solid rgb(41, 31, 85)',
    paddingLeft: 8,
  },
  tabContainer: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
  },
  typo: {
    fontSize: 'clamp(13px, 1.2vw, 16px)',
    fontWeight: 500,
    lineHeight: 1.2,
  },
  active_tab_text: {
    fontSize: 'clamp(13px, 1.2vw, 16px)',
    color: '#03F87E',
    fontWeight: 500,
    lineHeight: 1.2,
  },
  tabContent: {
    // backgroundColor: ' #1C0B3E',
    width: '100%',
    padding: '6px 0px 10px 0px',
    overflow: 'auto',
    height: '100%',
  },
  refine: {
    color: 'white',
    borderRadius: '33px',
  },
  sideBar: {
    padding: '10px 0px 10px 5px',
    // backgroundColor: '#23104A',
    backgroundColor: '#130726',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,

    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */,
    },
  },
  tabsHeader: {
    padding: '0px',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  tab_icon: {
    alignSelf: 'center',
    display: 'flex',
  },
  tabNames: {
    textAlign: 'left',
    letterSpacing: '0px',
    color: '#A89ABF',
    textTransform: 'capitalize',
    opacity: 1,
  },
  refine_button_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      position: 'relative',
      marginBottom: 50,
    },
    sideBar: {
      padding: 0,
      paddingBottom: '6.5rem',
    },
    tabContent: {
      padding: '5px 5px 10px 5px',
    },
    tab_icon: {
      '& img': {
        width: 19,
        height: 16,
      },
    },
    mobileRefineButtonContainer: {
      backgroundImage:
        'linear-gradient(to bottom, rgb(19,7,38,0), rgba(19,7,38,1))',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      position: 'fixed',
      width: '100%',
      bottom: 0,
      paddingBottom: 30,
    },
    sidebarResults: {
      paddingBottom: '5.5rem',
    },
  },
}));
