import * as React from 'react';

import { Button, Card, CardContent, CardMedia } from '@material-ui/core';

import ImageComponent from '../Images';
import Modal from 'react-modal';
import NextImageComponent from '../nextimage';
import Router from 'next/router';
import { Theme } from '@material-ui/core/styles';
import Tippy from '@tippy.js/react';
import { ViewportContext } from '../ViewportProvider';
import WatchNowModal from '../WatchNowModal';
import { WebfoxContext } from '../../services/webfox';
import { getWebpUrl } from '../../utils/helper';
import { makeStyles } from '@material-ui/styles';
import { useContext } from 'react';

export function FeatureCard({ ...props }) {
  const { actions, actionDispatch, webstore } = useContext(WebfoxContext);
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const { movie, provider } = props;

  const [modalOpen, setmodalOpen] = React.useState(false);

  const handleCloseModal = () => {
    setmodalOpen(false);
  };

  const handleSingleProvider = (card) => {
    window.open(card.movie_url ? card.movie_url : card.show_url);
  };

  const handlefeaturedClick = (obj, key, content_type, name, url) => {
    localStorage.setItem('SSRURL', url);
    document.cookie = `SSRURL=${url}`;

    // props.allMoviesList &&
    Router.push({
      pathname:
        content_type?.toLowerCase() === 'movie'
          ? `/movie/${url}`
          : `/show/${url}`,
      //query: { key, content_type, name, url, source: props.sourcePage },
    });
  };

  const RatingDetails = () => {
    return (
      <span className={classes.featuredMoviesCardDetails}>
        {movie.match ? (
          <span className={classes.match}>
            <span>70% MATCH </span>
            <span>
              <Tippy
                placement={'top-end'}
                className={classes.tooltip}
                content={<span>Because you watched Joker</span>}
              >
                <ImageComponent
                  className={classes.info}
                  src="https://images.ottplay.com/static/help_hover.svg"
                  alt="info_icon"
                />
              </Tippy>
            </span>
          </span>
        ) : null}
        {movie.ottplay_rating ? (
          <span className={classes.imdbTag}>
            <b>{movie.ottplay_rating.toFixed(1) || 0}</b>
            <NextImageComponent
          src="https://images.ottplay.com/static/reel_logo.png"
              wrapperClassName={classes.imdbImage}
              maxWidth= '18px'
              width= '18px'
              height= '18px'
              alt=""
            /> 
            <b className={classes.imdbText}>OTTplay Rating</b>
          </span>
        ) : (
          <span style={{ height: 19 }}></span>
        )}
        {/* {movie.critics_score ? (
          <span className={classes.match}> {movie.critics_score} </span>
        ) : null}
        {movie.critics_score ? (
          <span className={classes.critics}> Critics Score </span>
        ) : null} */}
      </span>
    );
  };

  const FeaturedCardContent = () => {
    return (
      <div>
        <div className={classes.titleTick}>
          <div className={classes.channelName}>{movie.name}</div>
        </div>
        <div>
          <NextImageComponent
            className={classes.line}
            src="https://images.ottplay.com/static/line1.svg"
            alt="line_img"
          />
        </div>
        <div className={classes.channelDesc}>
          <div className={classes.providersContentTypeWarp}>
            <div>
              <div className={classes.certificate}>
                <b>{movie ? movie.content_type : ''}</b>{' '}
                {movie.genres &&
                  movie.genres.slice(0, 2).map((item) => {
                    return ' . ' + item.name;
                  })}
              </div>
              {/* Hiding providers name  */}
              {/* <div className={classes.providers}>
                {provider && provider.length > 0 ? (
                  <>
                    <b>On</b>
                    {provider.slice(0, 2).map((item) => {
                      return item && item.provider && item.provider.name
                        ? ' . ' + item.provider.name
                        : '';
                    })}
                    <span>{moreProvider(provider)}</span>
                  </>
                ) : (
                  ''
                )}
              </div> */}
            </div>
          </div>

          <RatingDetails />
        </div>
      </div>
    );
  };

  const renderWatchNowBtn = () => {
    return (
      movie.where_to_watch && (
        <div className={classes.playButtonBox}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              if (movie.where_to_watch && movie.where_to_watch.length == 1) {
                handleSingleProvider(movie.where_to_watch[0]);
              } else {
                setmodalOpen(true);
              }
            }}
            className={[
              classes.playButton,
              movie.where_to_watch.length < 1 && classes.disableButton,
            ].join(' ')}
          >
            <ImageComponent
              src="/static/mobile_images/play_icon_mobile.svg"
              alt="video play icon"
            />
            Watch Now
          </Button>
        </div>
      )
    );
  };

  return (
    <React.Fragment>
      <div className={classes.cardContainer}>
        <div className={classes.mainCardContainer}>
          <Card
            className={classes.root}
            onClick={() =>
              handlefeaturedClick(
                movie,
                (movie.movie_id || movie._id),
                movie.content_type?.toLowerCase(),
                movie.name,
                movie.seo_url
              )
            }
          >
            <div className={classes.coverImageWrap}>
              <CardMedia
                className={classes.cover}
                image={
                  movie && movie.posters && movie.posters[0]
                    ? getWebpUrl(movie.posters[0], {
                        width: '200',
                        height: null,
                      })
                    : 'static/images/poster_default.png'
                }
                title="Live from space album cover"
              >
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <FeaturedCardContent />
                  </CardContent>
                </div>
              </CardMedia>
            </div>

            {renderWatchNowBtn()}
          </Card>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.8)',
          },
          line:{
            padding: '10px 0', width: '100%', possition: 'relative'
          },
          content: {
            position: 'fixed',
            border: '1px solid #2A1D3F',
            overflow: 'hidden',
            background: 'rgb(19, 7, 38)',
            WebkitOverflowScrolling: 'touch',
            borderRadius: width > 600 ? 4 : 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            outline: 'none',
            padding: '0px',
            zIndex: '999',
            margin: 'auto',
            width: width < 600 ? '100%' : '604px',
            height: width < 600 ? '70vh' : '600px',
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
        <WatchNowModal
          handleClose={handleCloseModal}
          whereToWatch={provider}
          title={movie.name}
          rating={movie.ottplay_rating}
          genres={movie.genres && movie.genres.slice(0, 2).map((n) => n.name)}
          content_type={movie.content_type}
        />
      </Modal>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    display: 'block',
    content: '',
    position: 'relative',
    paddingBottom: 'calc(150% - 12px)', //for aspect ration of 2:3::100:150,
    cursor: 'pointer',
  },
  mainCardContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  root: {
    // display: 'flex',
    width: 'calc(100% - 8px)',
    height: '100%',
    margin: '0px 4px',
    borderRadius: '10px',
    backgroundImage: 'linear-gradient(to bottom, #1C0A3C36, #16092E)',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    boxShadow: 'none',
  },
  coverImageWrap: {
    width: '100%',
    height: '86%',
    padding: '8px',
    position: 'relative',
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: '6px',
  },
  details: {
    zIndex: 2,
    left: 0,
    right: 0,
    width: '100%',
    backgroundImage:
      'linear-gradient(to bottom, #1B0D3400, #1B0D34E2, #1B0D34)',
    // backgroundImage:
    //   'linear-gradient(180deg, #1B0D3400 0%, #1B0D34E2 20%, #1B0D34 100%)',
    // background:
    //   'transparent linear-gradient(180deg, #1B0D3400 0%, #1B0D34E2 20%, #1B0D34 100%) 0% 0% no-repeat padding-box',
    // borderRadius: '0px 0px 6px 6px',
    opacity: 1,
    position: 'absolute',
    bottom: '7px',
  },

  content: {
    alignItems: 'center',
    width: '100%',
    padding: '57px 14px 14px 14px',
    '&:last-child': {
      paddingBottom: '2px',
    },
  },
  titleTick: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -4,
  },
  channelName: {
    textAlign: 'center',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    fontSize: 'clamp(16px, 1vw, 24px)',
    lineHeight: '22px',
    fontWeight: 800,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
  },
  channelDesc: {
    textAlign: 'center',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    width: '100%',
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    marginTop: -4,
  },
  providersContentTypeWarp: {
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 24,
  },
  playButtonBox: {
    justifyContent: 'center',
    margin: '0px !important',
    display: 'flex',
    height: '14%',
  },
  playButton: {
    fontFamily: `"Montserrat", "Arial", "sans-serif" `,
    width: 123,
    height: 32,
    background: '#04E075',
    color: '#100721',
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 15,
    textTransform: 'capitalize',
    '&:hover': {
      background: '#04E075',
    },
    '&:focus': {
      background: '#04E075',
    },
    '& img': {
      width: '13px !important',
      height: 14,
      marginRight: 4,
      marginLeft: 4,
    },
  },
  disableButton: {
    background: 'grey',
    pointerEvents: 'none',
  },
  feature: {
    color: '#03F87E',
    opacity: 1,
    fontSize: 'clamp(12px, 0.9vw, 14px)',
    textAlign: 'center',
    cursor: 'pointer',
  },
  iconBox: {
    '& img': {
      width: 'clamp(30px, 2vw, 50px) !important',
      height: 'clamp(30px, 2vw, 50px)',
    },
  },
  imdbImage: {
    marginLeft: '5px',
  },
  certificate: {
    // fontSize: 'clamp(8px, 1vw, 12px)',
    fontSize: '12px',
    textTransform: 'capitalize',
    alignItems: 'center',
    textAlign: 'center',
    color: '#D6C6F4',
  },
  providers: {
    // fontSize: 'clamp(8px, 1vw, 12px)',
    fontSize: '12px',
    alignItems: 'center',
    textAlign: 'center',
    color: '#D6C6F4',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#000000',
    color: '#D6C6F4',
    borderRadius: '6px',
    padding: '4px',
    marginRight: '8px',
    fontSize: 'clamp(14px, 1vw, 16px)',
  },
  match: {
    color: '#03F87E',
    display: 'flex',
    alignItems: 'center',
    // fontSize: 'clamp(8px, 1vw, 12px)',
    fontSize: '12px',
  },
  text: {
    color: '#D6C6F4',
    marginBottom: '15px',
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '18px',
    fontFamily: 'Montserrat',
    float: 'right',
    paddingRight: '8px',
  },
  movieName: {
    color: '#ffffff',
    fontWeight: 900,
    fontSize: '35px',
  },
  featuredMoviesCardDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'clamp(12px, 2vw, 14px)',
    // paddingTop: '6px',
  },
  critics: {
    letterSpacing: '0px',
    color: '#FFFFFF',
    fontSize: 'clamp(14px, 1vw, 16px)',
    opacity: 1,
  },
  release: {
    backgroundColor: '#342c45',
    color: '#D6C6F4',
    fontSize: '16px',
    background: '#331A5D 0% 0% no-repeat padding-box',
    borderRadius: '4px',
    marginLeft: '10px',
    opacity: 0.7,
  },
  desc: {
    color: '#ffffff',
    height: '60px',
    overflow: 'hidden',
    marginLeft: '4px',
  },
  info: {
    width: '10px !important',
    height: 'auto',
    verticalAlign: 'middle !important',
    marginLeft: '5px',
  },
  tooltip: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#FFFFFF',
    backgroundColor: '#170732',
    border: '1px solid #03F87E',
    height: '42px',
    padding: '7px',
  },
  dotsIcon: {
    width: '70% !important',
    height: 'auto',
    objectFit: 'scale-down',
  },
  dotsIconWarp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '25px',
    width: 'clamp(25px, 3vw, 36px)',
    minHeight: '25px',
    border: '0.5px solid #D6C6F480',
    borderRadius: '50%',
    cursor: 'pointor',
  },
  [theme.breakpoints.down('xs')]: {},
  coverMob: {
    width: '100%',
  },
  detailsMob: {
    width: '100%',
    position: 'absolute',
    minHeight: '40%',
    padding: '20px 10px 10px 10px',
    bottom: 0,
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
    backgroundImage:
      'linear-gradient(transparent,rgba(20, 9, 47,0.8),rgba(20, 9, 47, 1),rgba(20, 9, 49), rgba(20, 9, 47))',
  },
  imdbTag: {
    backgroundColor: 'rgb(0, 0, 0)',
    color: '#fff',
    padding: '4px 5px',
    zIndex: 2,
    fontSize: '8px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'right',
    fontFamily: `"Montserrat", "Arial", "sans-serif"`,
  },
  imdbText: {
    color: '#FD4376',
    marginLeft: 5,
  },
  titleWarp: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#ffffff',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      // height: '300px',
    },
    imdbTag: {
      alignItems: 'center',
    },
    imdbImage: {
      height: 15,
    },
  },
}));
