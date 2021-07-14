import { Grid, Hidden, makeStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import { NavBar, TopHeader } from '../../components';
import React, { useContext, useEffect, useState } from 'react';

import Helmet from 'react-helmet';
import ProfileDetail from '../../components/profile/ProfileDetail';
import SEO from '../../components/Seo';
import { Spinner } from '../../components/Spinner';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');
export default function Profile() {
  const classes = useStyles();

  const { webfox, webstore } = useContext(WebfoxContext);
  const [userData, setUserData] = useState();
  const [loadingData, setLoadingData] = useState(true);

  let languagesArr: any = [];
  let providersArr: any = [];
  useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      webstore.languages.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],
      webstore.streamingServices.selectedStreamingServices || []
    );
    const params = {
      user: {
        token: cookie.load('token'),
        client_id: cookie.load('_ht_clientid'),
        device_id: device_UUID,
      },
    };

    webfox.getProfileData(params).then(({ data, error }) => {
      if (data) {
        setUserData(data.data);
        setLoadingData(false);
      }
    });

    firebaseAnalytics.logEvent('profile', {
      screen_view:
        '/profile' +
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
      windowAny.Moengage.track_event('profile', {
        screen_view: '/profile',
        userType: getUserType(_ht_clientid ? true : false),
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      });
  }, []);

  return (
    <div>
      <div>
        <SEO
          Title="Profile page"
          Description="Profile page"
          siteNavigationJSON="{JSON.stringify(siteNavigationJSON)}"
          breadcrumbSchemaJSON="{JSON.stringify(breadcrumbSchemaJSON)}"
        />
        <SEO>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
        <Grid xs={12}>
          <Grid xs={12} container item>
            <Grid sm={1} lg={2} item></Grid>
            <Grid xs={12} sm={10} lg={8} item>
              <p className={classes.path}>
                {'Home'} <span>{'>>'}</span> {'My Profile'}
              </p>
              {loadingData ? (
                <Spinner styles={{ minHeight: '70vh' }} />
              ) : (
                <ProfileDetail userData={userData} />
              )}
            </Grid>
            <Grid sm={1} lg={2} item></Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '10px',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 'clamp(10px, 0.9vw, 14px)',
    margin: '20px 0px 10px 0px',
  },
  text: {
    margin: '40x 0 25px 0',
    fontSize: '24px',
    color: '#ffffff',
  },
  [theme.breakpoints.down('xs')]: {
    path: {
      textTransform: 'uppercase',
      marginLeft: 16,
      marginRight: 16,
      marginTop: 16,
      marginBottom: 10,
      '& span': {
        fontSize: 8,
      },
    },
  },
}));
