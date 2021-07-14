import { AD_CODES, SLURRP_URL, VARIABLE } from '../../../utils/constants';
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Hidden,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';

import GoogleAdOttPlay from '../../GoogleAds';
import ImageComponent from '../../Images';
import React from 'react';
import { Spinner } from '../../Spinner';
import { WebfoxContext } from '../../../services/webfox';
import { useRouter } from 'next/router';

export function GenreWidget(props) {
  const router = useRouter();
  const { data, title } = props;
  const classes = useStyles();
  const { webfox, actionDispatch, webstore, actions } = React.useContext(
    WebfoxContext
  );
  const [result, setResult] = React.useState<any>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [loadingData, setLoadingData] = React.useState(true);
  const forPage = 'genre';
  React.useEffect(() => {
    const params = {
      limit: 45,
    };
    setLoaded(false);
    if (data) {
      setResult(data);
    } else if (
      webstore &&
      webstore.genreList &&
      webstore.genreList.data &&
      webstore.genreList.data.length > 0
    ) {
      setResult(webstore.genreList.data);
    } else {
      webfox
        .getAllGenresList(params)
        .then((response) => {
          setResult(
            response.data.genres.filter((item) => {
               item.hasOwnProperty('icon_url');
            })
          );
          actionDispatch(
            actions.FETCH_GENRES_LIST_SUCCESS,
            response.data.genres.filter((item) => {
               item.hasOwnProperty('icon_url');
            }) || []
          );
        })
        .catch(() => {
          actionDispatch(actions.FETCH_GENRES_LIST_FAILURE, []);
        });
    }
    setLoadingData(false);
  }, []);

  const handleClick = (data) => {
    const filter = {
      dataType: forPage,
      name: data.name,
    };
    actionDispatch(actions.SET_MOVIE_NAV_FILTER, filter);
    router.push({
      pathname: './movies',
    });
  };

if(data && data[0]?.genres)
  return (
    <div className={classes.root}>
      {data.length > 0 && (
        <Grid container>
          {/* <Grid item sm={1} lg={2}></Grid> */}
          <Grid item xs={12} container direction="row">
            <Grid xs={12} container>
              <div className={classes.genreBox}>
                <Grid xs={12} container direction="column">
                  <Grid container xs className={classes.titleBox}>
                    <Grid xs item className={classes.text}>
                      {title ? title : VARIABLE.GENRE_WIDGET}
                    </Grid>
                    <Grid xs={1} item>
                      <div style={{ marginLeft: '-30px' }}>
                        <div
                          className={classes.read}
                          onClick={() =>
                            router.push({
                              pathname: './all-genre',
                              query: {
                                source:
                                  props && props.fromPage ? props.fromPage : '',
                              },
                            })
                          }
                        >
                          {loadingData ? '' : <>{VARIABLE.SEE_All}</>}
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container xs>
                    <Grid
                      container
                      spacing={1}
                      className={classes.widgetIconBox}
                    >
                      {loadingData ? (
                        <Spinner styles={{ width: 50, height: 50 }} />
                      ) : (
                        data[0].genres.map((item, i) => {
                          return (
                            <>
                            
                              <Grid item xs={6} sm={3} lg={2}>
                                <Card
                                  className={classes.cardRoot}
                                  onClick={() => handleClick(item)}
                                >
                                  <CardActionArea>
                                    <CardMedia
                                      component="img"
                                      className={classes.media}
                                      image={item.icon_url}
                                      onLoad={() => setLoaded(true)}
                                    />

                                    {/* <div className={classes.spinnerBox}>
                                      <Spinner
                                        styles={{
                                          width: '60px',
                                          height: '60px',
                                        }}
                                      />
                                    </div> */}
                                  </CardActionArea>
                                  <Typography className={classes.name}>
                                    {item.name}
                                  </Typography>
                                </Card>
                              </Grid>
                            </>
                          );
                        })
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              {loadingData ? (
                ''
              ) : (
                <Hidden only={['xs']}>
                  <div className={classes.adBox}>
                    <GoogleAdOttPlay adInfo={AD_CODES.item1} />
                    {/* <ImageComponent
                      alt="ad"
                      src="/static/newImages/ads.webp"
                      className={classes.ad}
                      onClick={() => window.open(SLURRP_URL)}
                    /> */}
                  </div>
                </Hidden>
              )}
            </Grid>
          </Grid>
          {/* <Grid item sm={1} lg={2}></Grid> */}
        </Grid>
      )}
    </div>
  ); else return null
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    marginTop: '15px',
  },
  widgetIconBox: {
    margin: '0px',
    // padding: '0px 8px',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
      display: 'none',
    },
  },
  spinnerBox: {
    width: 156,
    height: 156,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRoot: {
    margin: '10px 0',
    color: '#ffffff',
    backgroundColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      '& $name': {
        color: '#29F87E',
      },
      '& $media': {
        opacity: 0.7,
      },
    },
  },
  genreBox: {
    width: 'calc(100% - 320px)',
  },
  adBox: {
    width: 320,
    height: 250,
    padding: '10px 0px 10px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ad: {
    width: '100%',
    height: 'auto',
  },
  media: {
    width: 156,
    height: '100%',
    borderRadius: '6px',
    boxShadow: '0px 3px 6px #00000029',
    backgroundImage: `url("/static/newImages/new_spinner_mini.svg")`,
    backgroundPosition: 'center',
    backgroundSize: '60px',
    backgroundRepeat: 'no-repeat',
  },
  name: {
    width: '100%',
    height: '27px',
    marginTop: '0.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 'clamp(14px, 1.2vw, 16px)',
    letterSpacing: '0px',
    color: '#FFFFFF',
  },
  text: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: 'clamp(18px, 1.6vw, 24px)',
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  read: {
    color: '#D6C6F4',
    opacity: 1,
    fontSize: 'clamp(10px, 1vw, 16px)',
    float: 'right',
    cursor: 'pointer',
    marginRight: 2,
    '&:hover': {
      color: '#29F87E',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      marginTop: '0px',
    },
    text: {
      marginLeft: '0px',
    },
    read: {
      marginRight: '0px',
    },
    media: {
      width: '127px',
    },
    widgetIconBox: {
      padding: '0px',
      maxHeight: 150,
    },
    genreBox: {
      width: '100%',
    },
    adBox: {
      padding: '10px 10px 10px 10px',
      justifyContent: 'center',
    },
  },
}));
