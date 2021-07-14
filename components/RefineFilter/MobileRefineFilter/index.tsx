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

import SelectClearFilter from '../SelectClearFilter';
import Switch from 'react-switch';
import VerticalTabs from '../../Tab';
import { WebfoxContext } from '../../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../firebaseConfig';
import ImageComponent from '../../Images';

const _ht_clientid = cookie.load('_ht_clientid');
interface RefineTabProps {
  isOpen: Boolean;
  setModal: Function;
  handleRefine: any;
  setRefineState: any;
}

const windowAny: any = window;
export function MobileRefineFilter(props: RefineTabProps) {
  const classes = useStyles();
  const [toggle, setToggle] = useState({ 0: false, 1: false, 2: false } as any);
  const [selectedIndex, setSelectedIndex] = React.useState('' as any);
  const [selectFlag, setSelectFlag] = React.useState(false);
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
    });
  }, [
    webstore.refine.forYou.selectedAllLanguages,
    webstore.refine.forYou.selectedAllGenres,
    webstore.refine.forYou.selectedAllStreams,
  ]);
  const handleChange = (active) => {
    setTab(active);
    // setToggle({
    //   active: toggle.active,
    // });
  };

  React.useEffect(() => {
    if (
      webstore.getProvider &&
      webstore.getProvider.data &&
      webstore.getProvider.data.length > 0 &&
      webstore.getProvider.data.length ===
        webstore.refine.forYou.selectedStreamingServices.length &&
      webstore.getLanguage &&
      webstore.getLanguage.data &&
      webstore.getLanguage.data.length ===
        webstore.refine.forYou.selectedLanguages.length &&
      webstore.genreList &&
      webstore.genreList.data &&
      webstore.genreList.data.length ===
        webstore.refine.forYou.selectedGenres.length
    ) {
      setSelectFlag(true);
    } else {
      setSelectFlag(false);
    }
  }, [
    webstore.refine.forYou.filter.selectedLanguages,
    webstore.refine.forYou.filter.selectedStreamingServices,
    webstore.refine.forYou.filter.selectedGenres,
  ]);

  const selectAllFilter = () => {
    webstore.getLanguage.data.map((item) => {
      actionDispatch(actions.SET_REFINE_LANGUAGES, {
        toggle: !selectFlag,
        name: item.language.name,
      });
    });

    webstore.genreList.data.map((item) => {
      actionDispatch(actions.SET_REFINE_GENRE, {
        toggle: !selectFlag,
        genre: item._id,
        name: item.name,
      });
    });

    webstore.getProvider.data.map((item) => {
      actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
        toggle: !selectFlag,
        providers: item.provider._id,
        name: item.provider.name,
      });
    });
    setSelectFlag(!selectFlag);
    actionDispatch(actions.REFINE_FOR_YOU_PAGE, {
      page: 'forYou',
    });
  };

  const clearAllFilter = () => {
    webstore.refine.forYou.selectedLanguages.map((item) => {
      actionDispatch(actions.SET_REFINE_LANGUAGES, {
        toggle: false,
      });
    });
    webstore.refine.forYou.selectedGenres.map((item) => {
      actionDispatch(actions.SET_REFINE_GENRE, {
        toggle: false,
      });
    });
    webstore.refine.forYou.selectedStreamingServices.map((item) => {
      actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
        toggle: false,
      });
    });
    setSelectFlag(false);
    actionDispatch(actions.REFINE_FOR_YOU_PAGE, {
      page: 'forYou',
    });
  };

  return (
    <Grid xs={12} item container className={classes.root}>
      <Grid xs={12} item container className={classes.circularWrapper}>
        <Grid xs={12} className={classes.title} item>
          <div>Refine</div>
          <SelectClearFilter
            clearData={() => clearAllFilter()}
            selectData={() => selectAllFilter()}
            selectFlag={selectFlag}
          />
          <div className={classes.close} onClick={() => props.setModal(false)}>
            <ImageComponent src="https://images.ottplay.com/static/close.svg" alt="close icon" />
          </div>
        </Grid>
      </Grid>
      <Grid xs={12} item className={classes.verticalTab}>
        <VerticalTabs
          toggle={toggle[tab]}
          tab={tab}
          setToggle={(tab, val) => {
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
    backgroundColor: '#130726',
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
    gap: '16px',
    display: 'flex',
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
