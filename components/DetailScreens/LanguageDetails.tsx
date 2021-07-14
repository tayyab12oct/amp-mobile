import * as React from 'react';

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

import CommonDetails from './CommonDetails';
import { Grid } from '@material-ui/core';
import { ProviderWidget } from '../ProviderWidget';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';
// import { history } from '../../configureStore';
import { makeStyles } from '@material-ui/core/styles';

const windowAny: any = typeof window !== "undefined" && window;
const _ht_clientid = cookie.load('_ht_clientid');
export default function LanguageDetails({ props, location }) {
  const classes = useStyles();
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = React.useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;
  
  let languagesArr: any = [];
  let providersArr: any = [];
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
    firebaseAnalytics.logEvent('languageDetails', {
      screen_view:
        '/languageDetails' +
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
    windowAny.Moengage && windowAny.Moengage.track_event('languageDetails', {
      screen_view: '/languageDetails',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
  });
  const { data, isSelected, onSelect, forPage } = location.state;
  const [selectedProvider, setSelectedProvider] = React.useState<any>([]);
  const { width } = React.useContext(ViewportContext);
  console.log('location.state.data.name: ', location.state.data);
  return (
    <div className={classes.root}>
      <Grid xs={12} container>
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} className={classes.containerBox} item>
          <Grid xs={12} item>
            <p className={classes.path}>
              {location.state.fromPage} <span>{'>> '}</span>
              {' Language '}
              <span>{'>> '}</span>
              {location.state.data.name}
            </p>
          </Grid>
          {/* <DetailsCard
            name={location.state.data.name}
            logo={location.state.data.icon_text}
            data={location.state.data}
            forPage={forPage}
          /> */}
        </Grid>

        <Grid sm={1} lg={2} item></Grid>
        <ProviderWidget
          screen="Languages"
          setSelectedProvider={setSelectedProvider}
        />
      </Grid>
      <Grid xs={12} container className={classes.container2}>
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} className={classes.containerBox} item>
          <CommonDetails
            headerText={location.state.data.name + ' Contents'}
            icon={location.state.data.icon_text}
          />
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",0
    flexGrow: 1,
    minHeight: '78vh',
    backgroundSize: 'contain',
    // backgroundColor: '#14062D',
    backgroundColor: 'transparent',
  },
  containerBox: {
    padding: '0 10px',
  },
  loading: {
    // height: '64rem',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */,
    },
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: '14px',
    '& span': {
      fontSize: 10,
      letterSpacing: -1,
      margin: '0px 4px',
    },
  },
  countDetailsWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '128px',
  },
  countWrap: {
    textAlign: 'left',
    color: '#D6C6F4',
    width: '100%',
  },
  countWrapNewLine: {
    textAlign: 'center',
  },
  container2: {
    marginTop: '30px',
  },
}));
