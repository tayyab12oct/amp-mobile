import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Hidden,
  Typography,
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
import React, { useContext } from 'react';

import ImageComponent from '../Images';
import Switch from 'react-switch';
import Trailers from '../MovieTrailer';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';

const windowAny: any = typeof window !== "undefined" && window;
const _ht_clientid = cookie.load('_ht_clientid');
export default function TrailerScreen({ location }) {
  const classes = useStyles();

  const seoId = window.location.pathname.split('/');
  const seoKey =
    seoId[1] === 'movie'
      ? window.location.pathname.slice(7)
      : window.location.pathname.slice(8);

  const { width } = React.useContext(ViewportContext);
  const [toggle, setToggle] = React.useState(false);
  const [number, setNumber] = React.useState(0);
  const [titleCount, setTitleCount] = React.useState(0);
  const [trailers, setTrailers] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);

  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;
  
  let languagesArr:any = [];
  let providersArr:any = [];
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
    window.scrollTo(0, 0);
    const params = {
      limit: 12,
    };

    webfox.getAllTrailers(params).then(({ data, error }) => {
      console.log('Movies result. ', JSON.stringify(data));
      if (error) {
        actionDispatch(actions.FETCH_TRAILER_MOVIES_FAILURE, []);
      }
      console.log('response: ' + JSON.stringify(data));
      actionDispatch(actions.FETCH_TRAILER_MOVIES_SUCCESS, data || []);
      if (data && data.trailers) {
        // setTrailers(data.trailers);
        setLoadingData(false);
        console.log(data.trailers, 'trailers');
        firebaseAnalytics.logEvent('trailer', {
          screen_view:
            '/trailer' +
            (data &&
            data.trailers &&
            data.trailers[0] &&
            data.trailers[0].movie_title
              ? '/' + data.trailers[0].movie_title
              : '') +
            (data && data.trailers && data.trailers[0] && data.trailers[0].id
              ? '/' + data.trailers[0].id
              : ''),
        });
        windowAny.Moengage.track_event('trailer', {
          screen_view: '/trailer',
          name:
            data &&
            data.trailers &&
            data.trailers[0] &&
            data.trailers[0].movie_title
              ? data.trailers[0].movie_title
              : '',
          id:
            data && data.trailers && data.trailers[0] && data.trailers[0].id
              ? data.trailers[0].id
              : '',
        });
      }
    });
    setTrailers(location);
    setLoadingData(false);
  }, []);

  const [selectedVideo, setSelectedVideo] = React.useState({
    title: '',
    video_url: '',
    ott_platform: '',
    //trailer_title: '',
    order: '',
  });

  const updateTitle = () => {
    if (toggle === true && titleCount < trailers.length - 1) {
      setTitleCount(titleCount + 1);
    }
  };
  console.log('trailer', location);

  return (
    <div className={classes.root1}>
      <Grid container>
        <Hidden only={['xs']}>
          <Grid xs={12}>
            <Typography className={classes.playing}>Now Playing</Typography>
          </Grid>
        </Hidden>

        <Grid 
        // xs={12} 
        container 
        spacing={2} 
        className={classes.trailerHeadBox}>
          <Grid xs={12} sm={9} className={classes.trailerHeadInnerBox} item>
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
              <Typography className={classes.trailerTitle}>
                {selectedVideo.video_url && !toggle
                  ? `${selectedVideo.title}`
                  : !loadingData && `${trailers[titleCount].title}`}
              </Typography>
            </Hidden>
            <Card className={classes.video}>
              {' '}
              <Trailers
                height={width < 600 ? '193px' : '490px'}
                url={
                  toggle && selectedVideo
                    ? trailers.slice(number).map((video) => {
                        return video.video_url;
                      })
                    : selectedVideo.video_url ||
                      (!loadingData && trailers[titleCount].video_url)
                }
                data={true}
                updateTitle={updateTitle}
              />
              <CardContent className={classes.title}>
                <span>
                  <Typography noWrap style={{ width: '30.5rem' }}>
                    {selectedVideo.video_url && !toggle
                      ? `${selectedVideo.title}`
                      : !loadingData && `${trailers[titleCount].title}`}
                  </Typography>
                </span>

                <span className={classes.share}>
                  <Hidden only={['xs']}>
                    <span>Share</span>&nbsp;&nbsp;&nbsp;
                    <ImageComponent
                      src="https://images.ottplay.com/static/share1.svg"
                      alt="share icon"
                      className={classes.shareIcon}
                    />
                    <ImageComponent
                      src="https://images.ottplay.com/static/share2.svg"
                      alt="share icon"
                      className={classes.shareIcon}
                    />
                    <ImageComponent
                      src="https://images.ottplay.com/static/share3.svg"
                      alt="share icon"
                      className={classes.shareIcon}
                    />
                    <ImageComponent
                      src="https://images.ottplay.com/static/share4.svg"
                      alt="share icon"
                      className={classes.shareIcon}
                    />
                    <ImageComponent
                      src="https://images.ottplay.com/static/share5.svg"
                      alt="share icon"
                      className={classes.shareIcon}
                    />
                  </Hidden>
                  <Hidden only={['sm', 'md', 'lg', 'xl']}>
                    <ImageComponent
                      src="https://images.ottplay.com/static/share6.svg"
                      alt="share icon"
                      className={classes.shareIcon}
                    />
                  </Hidden>
                </span>
              </CardContent>
              {/* <CardContent className={classes.ott}>
                <span>
                  {selectedVideo.video_url && !toggle
                    ? `${selectedVideo.ott_platform}`
                    : !loadingData && `${trailers[titleCount].ott_platform}`}
                </span>
              </CardContent> */}
            </Card>
          </Grid>
          {/* ad codes
          <Hidden only={['xs']}>
            <Grid xs={3} item>
              <Card className={classes.adsPostion}>
                <ImageComponent src={ads} alt="" width="100%" />
              </Card>
            </Grid>
          </Hidden> */}
        </Grid>

        <div className={classes.hrLine}>
          <hr />
        </div>

        <Grid 
        // xs={12} 
        container 
        spacing={2} 
        className={classes.root2}>
          <Grid xs={12} container className={classes.nextBox}>
            <Grid xs={9} item>
              <Typography className={classes.next}>Up Next</Typography>
            </Grid>
            <Grid xs={3} className={classes.autoplayBox} item>
              <label
                htmlFor="refine-switch"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <span className={classes.refineText}>AutoPlay</span>
                <Hidden only={['xs']}>
                  <Switch
                    checked={toggle}
                    onChange={() => {
                      setToggle(!toggle);
                    }}
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
                </Hidden>
                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                  <Switch
                    checked={toggle}
                    onChange={() => {
                      setToggle(!toggle);
                    }}
                    onColor="#03f87e"
                    offColor="#100426"
                    offHandleColor="#494060"
                    onHandleColor="#BBB6C9"
                    handleDiameter={22}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={26}
                    width={48}
                    className={classes.reactSwitch}
                    id="refine-switch"
                  />
                </Hidden>
              </label>
            </Grid>
          </Grid>
          {trailers.map((video, i) => {
            return (
              <Grid
                xs={12}
                sm={3}
                className={classes.videoListBox}
                item
                key={i}
              >
                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                  <div className={classes.videoOverlay}></div>
                </Hidden>
                <Card
                  className={classes.video}
                  onClick={() => {
                    setSelectedVideo({
                      ...selectedVideo,
                      video_url: video.video_url,
                      order: video.order,
                      title: video.title,
                      ott_platform: video.ott_platform,
                    });
                    setNumber(i);
                    setTitleCount(i);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className={classes.mediaBox}>
                    <CardMedia
                      component="img"
                      className={classes.media}
                      image={video.thumbnail_url || "https://images.ottplay.com/static/poster_default.png"}
                    />
                    <span className={classes.playButton}>
                      <ImageComponent
                        src={width > 600 ? "https://images.ottplay.com/static/playButton.svg" : "https://images.ottplay.com/static/play-button-dark.svg"}
                        alt="play button"
                      />
                    </span>
                  </div>
                  <CardContent className={classes.cardContentBox}>
                    <Typography noWrap className={classes.name}>
                      {' '}
                      {video.title}
                    </Typography>
                    <Hidden only={['xs']}>
                      <Typography className={classes.details}>
                        {' '}
                        {video.ott_platform}
                      </Typography>
                    </Hidden>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root1: {
    flexGrow: 1,
    margin: '3px 0px 0px 0px',
  },
  root2: {
    margin: 0,
  },
  refineText: {
    fontSize: '1.07vw',
    color: '#A89ABF',
    padding: '5px',
  },
  video: {
    overflow: 'hidden',
    width: '100%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    cursor: 'pointer',
    borderRadius: 0,
  },
  autoplayBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  media: {
    maxHeight: 190,
    borderRadius: '8px',
    width: '100%',
  },
  next: {
    fontSize: '1.57vw',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  trailerHeadBox: {
    paddingTop: 0,
  },
  cardContentBox: {
    padding: '15px 0px 5px 0px !important',
  },
  hrLine: {
    width: '100%',
    opacity: '0.2',
  },
  reactSwitch: {
    border: '2px solid #554473',
    borderRadius: '23px !important',
  },
  title: {
    fontSize: '1.15vw',
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: '0%',
    marginTop: '2.6%',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  share: {
    float: 'right',
    cursor: 'pointer',
    fontSize: '0.68vw',
    color: '#A89ABF',
    display: 'flex',
    alignItems: 'center',
    // marginTop: '-35px',
  },
  playButton: {
    position: 'absolute',
    color: '#fff',
    padding: '4px 5px',
    zIndex: 1,
    borderRadius: '4px',
    bottom: 0,
    left: 4,
  },
  nextBox: {
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 4,
  },
  mediaBox: {
    position: 'relative',
  },
  name: {
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '1.05vw',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    overflow: 'hidden',
    marginBottom: 2,
  },
  details: {
    letterSpacing: '0',
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '1.05vw',
  },
  shareIcon: {
    margin: '0 10px 0 0',
  },
  ott: {
    fontSize: '1.05vw',
    color: '#D6C6F4',
    opacity: '0.7',
    padding: '0%',
  },
  adsPostion: {
    backgroundColor: 'transparent',
    marginLeft: '3%',
    boxShadow: 'none',
    borderRadius: 0,
  },
  playing: {
    fontSize: '1.88vw',
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  [theme.breakpoints.down('xs')]: {
    root1: {
      margin: 0,
    },
    root2: {
      padding: '0px !important',
      marginBottom: 8,
      margin: 0,
    },
    trailerHeadBox: {
      margin: 0,
    },
    videoOverlay: {
      position: 'absolute',
      height: '100%',
      background: '#140727',
      top: -1,
      width: '100%',
      zIndex: 2,
      opacity: '0.8',
    },
    cardContentBox: {
      padding: '15px 15px 5px 12px !important',
    },
    trailerTitle: {
      fontSize: 16,
      marginBottom: 13,
      color: '#FFFFFF',
      fontWeight: 600,
      padding: '0px 20px',
    },
    trailerHeadInnerBox: {
      padding: '0px !important',
    },
    media: {
      borderRadius: 0,
    },
    title: {
      fontSize: 13,
      display: 'inline-flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 0,
      padding: '0px 15px 0px 10px',
    },
    ott: {
      fontSize: 11,
      marginTop: 5,
      padding: '0px 15px 0px 10px',
      paddingBottom: '5px !important',
    },
    videoListBox: {
      padding: '0px 0px 12px 0px !important',
      position: 'relative',
    },
    nextBox: {
      marginBottom: 14,
      marginTop: 10,
      padding: '0px 15px 0px 12px',
    },
    share: {
      marginBottom: '-10%',
      '& img': {
        width: 30,
        height: 30,
        marginRight: 0,
      },
    },
    next: {
      fontSize: 12,
      fontWeight: 400,
    },
    name: {
      fontSize: 13,
      fontWeight: 400,
    },
    refineText: {
      fontSize: 12,
    },
    playButton: {
      left: '45%',
      bottom: '35%',
      padding: 0,
      zIndex: 9,
      '& img': {
        width: 42,
        height: 42,
      },
    },
  },
}));
