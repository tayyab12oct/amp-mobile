import {
  LOCALSTORAGE_KEY_CONSTANTS,
  TOKEN,
  _HT_CLIENTID,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../utils/constants';
import React, { useContext, useEffect } from 'react';

// import ForYou from '../pages/ForYou';
// import Link from 'next/link';
// import Onboarding from '../pages/onboard';
import { Spinner } from './Spinner';
import { WebfoxContext } from '../services/webfox';
import cookie from 'react-cookies';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';

export function Redirect({ to, as }) {
  const router = useRouter();
  useEffect(() => {
    router.push(to, as);
  }, [to, as]);

  return null;
}

export default function Routes() {
  const classes = useStyles();

  const { webfox, webstore, actionDispatch, actions } = useContext(
    WebfoxContext
  );
  const [loadingData, setLoadingData] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const saveCookies = () => {
    if (process.env.NODE_ENV === 'development') {
      cookie.save('token', TOKEN, { path: '/' });
      cookie.save('_ht_clientid', _HT_CLIENTID, { path: '/' });
    }
  };

  useEffect(() => {
    saveCookies();
    if (window.location.pathname != '/foryou') {
      localStorage.setItem('fromForYou', 'false');
    }
    //console.log('driver');
    const token = cookie.load('token');
    const _ht_clientid = cookie.load('_ht_clientid');
    if (token && _ht_clientid) {
      const params = {
        user: {
          token: cookie.load('token'),
          client_id: cookie.load('_ht_clientid'),
          device_id: device_UUID,
        },
      };
      webfox.getProfileData(params).then(({ data, error }) => {
        if (data) {
          localStorage.setItem('userName', data.data.data.name);
          setSuccess(data.data.success);
        }
      });
    } else {
      setLoadingData(false);
    }
  }, []);

  React.useEffect(() => {
    if (success) {
      webfox
        .getProfileSelectedData(cookie.load('_ht_clientid'))
        .then(({ data, error }) => {
          if (data && data.data && data.data[0].language_pref.length > 0) {
            webstore.languages.name = [];
            webstore.languages.selectedLanguages = [];
            webstore.streamingServices.selectedStreamingServices = [];
            webstore.streamingServices.name = [];
            webstore.genres.selectedGenres = [];
            webstore.genres.name = [];
            webstore.cast.selectedCast = [];
            webstore.cast.name = [];
            webstore.crew.selectedCrew = [];
            webstore.crew.name = [];
            data.data[0].language_pref.map((item) => {
              actionDispatch(actions.SET_LANGUAGES, {
                language: item._id,
                name: item.language,
              });
            });
            data.data[0].provider_pref.map((item) => {
              actionDispatch(actions.SET_STREAMING_SERVICES, {
                providers: item._id,
                name: item.provider,
              });
            });
            data.data[0].genre_pref.map((item) => {
              actionDispatch(actions.SET_GENRES, {
                genre: item._id,
                name: item.name,
              });
            });
            data.data[0].cast_pref.map((item) => {
              actionDispatch(actions.SET_CAST, {
                cast: item._id,
                name: item.name,
              });
            });
            data.data[0].crew_pref.map((item) => {
              actionDispatch(actions.SET_CREW, {
                cast: item._id,
                name: item.name,
              });
            });
            localStorage.setItem(
              LOCALSTORAGE_KEY_CONSTANTS.ONBOARDING_DONE,
              '20'
            );
          } else if (
            localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.ONBOARDING_DONE)
          ) {
            const params = {
              data: {
                language_pref:
                  webstore.languages.selectedLanguages.length > 0
                    ? webstore.languages.selectedLanguages.toString()
                    : '',
                genre_pref:
                  webstore.genres.selectedGenres.length > 0
                    ? webstore.genres.selectedGenres.toString()
                    : '',
                provider_pref:
                  webstore.streamingServices.selectedStreamingServices.length >
                  0
                    ? webstore.streamingServices.selectedStreamingServices.toString()
                    : '',
                cast_pref:
                  webstore.cast.selectedCast.length > 0
                    ? webstore.cast.selectedCast.toString()
                    : '',
                crew_pref:
                  webstore.crew.selectedCrew.length > 0
                    ? webstore.crew.selectedCrew.toString()
                    : '',
                movie: {
                  movie_likes:
                    webstore.likedMovieCard.liked.length > 0
                      ? webstore.likedMovieCard.liked.toString()
                      : '',
                  movie_dislikes:
                    webstore.likedMovieCard.disliked.length > 0
                      ? webstore.likedMovieCard.disliked.toString()
                      : '',
                },
                show: {
                  show_likes: '',
                  show_dislikes: '',
                },
              },
            };

            webfox.updateProfileSelectedData(params).then(({ data, error }) => {
              if (data) {
                // console.log('Updated');
              }
            });
          }
          setLoadingData(false);
        });
    }
  }, [success]);

  return (
    // <div
    <div></div>
  );
}

const useStyles = makeStyles({
  content: {
    width: '100%',
    height: 'calc(100% - 56px)',
    marginTop: '0px !important',
    '@media (max-width: 425px)': {
      // padding: "10px",
    },
  },
  root: {
    //display: "flex",0
    flexGrow: 1,
    minHeight: '50vh',
  },
  footer: {
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    backgroundColor: '#D6DBED',
    color: '#8A91AD',
    textAlign: 'right',
    padding: '4px 40px',
  },
});
