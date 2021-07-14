import { Card, CardMedia, Grid, Theme, makeStyles } from '@material-ui/core';
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

import Modal from 'react-modal';
import PhotoGalleryModal from './PhotoGalleryModal';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';
import ImageComponent from '../Images';

const windowAny: any = typeof window !== "undefined" && window;
const _ht_clientid = cookie.load('_ht_clientid');
export default function PhotoGallery({ location }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any[]>([]);
  const [photoResult, setPhotoResult] = useState<any[]>([]);
  const [show, setShow] = useState('');
  const [modalOpen, setmodalOpen] = useState(false);
  const { webfox, webstore, actions, actionDispatch } = React.useContext(
    WebfoxContext
  );
  const { languages, streamingServices } = webstore;
  
  const handleCloseModal = () => {
    setmodalOpen(false);
  };

  const handlePhotoModal = () => {
    setmodalOpen(true);
  };

  //console.log('type', location.state.type, location.state.key)

  let languagesArr:any = [];
  let providersArr:any = [];
  let providersNameArr:any = [];
  useEffect(() => {
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
    providersNameArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
      ) || [],
      streamingServices.name || []
    );
    window.scrollTo(0, 0);
    if (location.state && location.state.type == 'movie') {
      firebaseAnalytics.logEvent('seeall', {
        screen_view:
          '/seeall/similar movies' +
          (location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.name
            ? '/' + location.state.resObj.name
            : '') +
          (location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.languages
            ? '/' + location.state.resObj.languages.toString()
            : '') +
          (location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.genres
            ? '/' + location.state.resObj.genres.toString()
            : '') +
          (location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj._id
            ? '/' + location.state.resObj._id
            : '') +
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
      windowAny.Moengage.track_event('seeall', {
        screen_view: '/seeall/similar movies',
        name:
          location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.name
            ? location.state.resObj.name
            : '',
        language:
          location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.languages
            ? location.state.resObj.languages.toString()
            : '',
        genres:
          location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.genres
            ? location.state.resObj.genres.toString()
            : '',
        id:
          location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj._id
            ? location.state.resObj._id
            : '',
        userType: getUserType(_ht_clientid ? true : false),
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      });
    } else {
      firebaseAnalytics.logEvent('seeall', {
        screen_view:
          '/seeall/similar shows' +
          (location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.name
            ? '/' + location.state.resObj.name
            : '') +
          (location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.languages
            ? '/' + location.state.resObj.languages.toString()
            : '') +
          (location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.genres
            ? '/' + location.state.resObj.genres.toString()
            : '') +
          (location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj._id
            ? '/' + location.state.resObj._id
            : '') +
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
      windowAny.Moengage.track_event('seeall', {
        screen_view: '/seeall/similar shows',
        name:
          location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.name
            ? location.state.resObj.name
            : '',
        language:
          location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.languages
            ? location.state.resObj.languages.toString()
            : '',
        genres:
          location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj.genres
            ? location.state.resObj.genres.toString()
            : '',
        id:
          location &&
          location.state &&
          location.state.resObj &&
          location.state.resObj._id
            ? location.state.resObj._id
            : '',
        userType: getUserType(_ht_clientid ? true : false),
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      });
    }
    const params = {
      id: location.state.key,
    };

    const data = location.state.data;
    if (data) {
      setPhotoResult(data);
      //console.log(data.photos);
      let group: any;
      for (let i = 0; i <= data.length; i += 3) {
        group = data.slice(i, i + 3);
        result.push(group);
      }
      setLoading(false);
      setResult(result);
    }
  }, []);

  console.log('result', result, location.state.data);

  const handleExpand = (f) => {
    setShow(f.id);
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item sm={1} lg={2}></Grid>
        <Grid
          container
          xs={12}
          sm={10}
          lg={8}
          className={classes.photoBox}
          spacing={3}
        >
          <Grid xs={12} className={classes.galleryTitleBox} item>
            <p className={classes.path}>
              {'Home'} <span>{'>>'}</span> {location.state.type}{' '}
              <span>{'>>'}</span> {location.state.name}
            </p>
          </Grid>
          <Grid xs={12} item className={classes.heading}>
            {location.state.name}
          </Grid>
          {loading && (
            <Grid xs={12} container item>
              <Grid xs={6} item></Grid>
              <Grid xs={2} item>
                <div style={{ margin: '10% 0' }}>
                  <ImageComponent src="https://images.ottplay.com/static/35.gif" alt="loader" width="30%" height="30%" />
                </div>
              </Grid>
              <Grid xs={5} item></Grid>
            </Grid>
          )}
          {result.map((data) => {
            return (
              <React.Fragment>
                <Grid
                  xs={3}
                  item
                  onMouseOver={(event) => handleExpand(event.target)}
                  onMouseLeave={() => setShow('')}
                >
                  {data && data[0] && (data[0].image_url || data[0].url) ? (
                    <Card
                      className={classes.cardRoot1}
                      onClick={handlePhotoModal}
                    >
                      <CardMedia
                        component="img"
                        style={{ position: 'relative' }}
                        image={
                          data && data[0] && (data[0].image_url || data[0].url)
                        }
                        id={data && data[0] && data[0].id}
                      />
                      {show === data[0].id ? (
                        <div
                          className={classes.expand}
                          style={{ marginLeft: '12vw' }}
                        >
                          <ImageComponent src="https://images.ottplay.com/static/expand.svg" alt="expand icon" />
                        </div>
                      ) : (
                        ''
                      )}
                    </Card>
                  ) : (
                    ''
                  )}
                </Grid>
                <Grid xs={3} container direction="column">
                  <Grid
                    xs
                    item
                    onMouseOver={(event) => handleExpand(event.target)}
                    onMouseLeave={() => setShow('')}
                  >
                    {data && data[1] && (data[1].image_url || data[1].url) ? (
                      <Card
                        className={classes.cardRoot2}
                        onClick={handlePhotoModal}
                      >
                        <CardMedia
                          component="img"
                          style={{ position: 'relative' }}
                          image={
                            data &&
                            data[1] &&
                            (data[1].image_url || data[1].url)
                          }
                          id={data && data[1] && data[1].id}
                        />
                        {show === (data && data[1] && data[1].id) ? (
                          <div className={classes.expand}>
                            <ImageComponent src="https://images.ottplay.com/static/expand.svg" alt="expand icon" />
                          </div>
                        ) : (
                          ''
                        )}
                      </Card>
                    ) : (
                      ''
                    )}
                  </Grid>
                  <Grid
                    xs
                    item
                    onMouseOver={(event) => handleExpand(event.target)}
                    onMouseLeave={() => setShow('')}
                  >
                    {data && data[2] && (data[2].image_url || data[2].url) ? (
                      <Card
                        className={classes.cardRoot3}
                        onClick={handlePhotoModal}
                      >
                        <CardMedia
                          component="img"
                          style={{ position: 'relative' }}
                          image={
                            data &&
                            data[2] &&
                            (data[2].image_url || data[2].url)
                          }
                          id={data && data[2] && data[2].id}
                        />
                        {show === (data && data[2] && data[2].id) ? (
                          <div className={classes.expand}>
                            <ImageComponent src="https://images.ottplay.com/static/expand.svg" alt="expand icon" />
                          </div>
                        ) : (
                          ''
                        )}
                      </Card>
                    ) : (
                      ''
                    )}
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <Modal
          isOpen={modalOpen}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.8)',
            },
            content: {
              position: 'fixed',
              top: '0%',
              left: '0%',
              right: '0%',
              bottom: '0%',
              border: '1px solid #000',
              background: 'rgba(0,0,0,0.8)',
              overflow: 'hidden',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '0px',
              zIndex: 999,
              margin: 'auto',
              width: '100%',
              height: '100%',
              display: 'table',
            },
          }}
          onAfterOpen={() => {
            document.body.style.overflow = 'hidden';
          }}
          onAfterClose={() => {
            document.body.style.overflow = 'auto';
          }}
        >
          <PhotoGalleryModal
            handleClose={handleCloseModal}
            photos={photoResult}
          />
        </Modal>
        <Grid item sm={1} lg={2}></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '10px 0 50px 0',
  },
  photoBox: {
    margin: 0,
    padding: '0px 25px 0px 15px',
  },
  galleryTitleBox: {
    padding: '0px 12px !important',
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '16px',
    float: 'right',
    paddingRight: '8px',
  },
  cardRoot1: {
    height: '405px',
    width: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  cardRoot2: {
    height: '200px',
    marginTop: '14px',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  cardRoot3: {
    marginTop: '12px',
    height: '190px',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  heading: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 'clamp(18px, 1.8vw, 30px)',
    marginRight: '5%',
    marginBottom: '0px',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
    padding: '0px 12px 0px 12px !important',
  },
  expand: {
    position: 'absolute',
    zIndex: 1,
    marginTop: '0.5vw',
    marginLeft: '13.2vw',
    cursor: 'pointer',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 'clamp(10px, 0.9vw, 14px)',
    margin: '20px 0px 4px 0px',
    textTransform: 'capitalize',
    '& span': {
      fontSize: 10,
      letterSpacing: -1,
      margin: '0px 4px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    path: {
      fontSize: 10,
      textTransform: 'uppercase',
      marginLeft: 16,
      marginTop: 16,
      '& span': {
        fontSize: 8,
      },
    },
    heading: {
      marginBottom: 5,
    },
  },
}));
