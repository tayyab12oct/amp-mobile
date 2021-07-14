import * as React from 'react';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useContext, useEffect } from 'react';

import ImageComponent from './Images';
import Modal from 'react-modal';
import NextImageComponent from './nextimage';
import Router from 'next/router';
import { Theme } from '@material-ui/core/styles';
import Tippy from '@tippy.js/react';
import { ViewportContext } from './ViewportProvider';
import WatchNowModal from './WatchNowModal';
import { WebfoxContext } from '../services/webfox';
import { makeStyles } from '@material-ui/styles';

export function FeaturedMoviesCard(props) {
  const { actions, actionDispatch } = useContext(WebfoxContext);
  // const tickButton = { tick, plus };
  const [hoverAdd, setHoverAdd] = React.useState(false);
  const [tickImage, setTickImage] = React.useState(false);

  const handleAddToWatchlist = (detail) => {
    actionDispatch(actions.FETCH_ARRAY_OF_WATCHLIST, detail);
  };

  const [modalOpen, setmodalOpen] = React.useState(false);

  const handleCloseModal = () => {
    setmodalOpen(false);
  };

  const handleSingleProvider = (card) => {
    
    window.open(card.movie_url ? card.movie_url : card.show_url);
  };

  const handlefeaturedClick = (obj, key, content_type, name, url) => {
    localStorage.setItem("SSRURL",url);
    document.cookie = `SSRURL=${url}`

    Router.push({
      pathname:
        content_type.toLowerCase() === 'movie'
          ? `/movie/${url}`
          : `/show/${url}`,
      query: { key, content_type, name, url, source: props.sourcePage },
    });
  };

  console.log('Home props', props.critics_score);

  const Details = () => {
    return (
      <span className={classes.featuredMoviesCardDetails}>
        {props.match ? (
          <span className={classes.match}>
            <span>70% MATCH </span>
            <span>
              <Tippy
                placement={'top-end'}
                className={classes.tooltip}
                content={<span>Because you watched Joker</span>}
              >
                <ImageComponent className={classes.info} src="https://images.ottplay.com/static/help_hover.svg" alt="info_icon" />
              </Tippy>
            </span>
          </span>
        ) : null}
        {props.ottplay_rating ? (
          // <span className={classes.rating}>
          //   {props.ottplay_rating.toFixed(1) || 0}{' '}
          //   <NextImageComponent
          //     src={imdb}
          //     style={{ width: '18px', marginLeft: '5px' }}
          //     alt="ottplay_icon"
          //   />{' '}
          // </span>
          <span className={classes.imdbTag}>
            <b>{props.ottplay_rating.toFixed(1) || 0}</b>
            <NextImageComponent src="https://images.ottplay.com/static/reel_logo.png" width="18px" 
            height= "18px"
            maxWidth="18px" className={classes.imdbImage} alt="" />
            <b className={classes.imdbText}>OTTplay Rating</b>
          </span>
        ) : (
          <span style={{ height: 19 }}></span>
        )}
        {/* {props.critics_score ? (
          <span className={classes.match}> {props.critics_score} </span>
        ) : null}
        {props.critics_score ? (
          <span className={classes.critics}> Critics Score </span>
        ) : null} */}
      </span>
    );
  };

  const FeaturedCardContent = ({ isMobile }) => {
    console.log('home props', props);
    const { movie } = props;
    return (
      <div>
        {/* <div className={classes.feature}>Featured</div> */}
        <div className={classes.titleTick}>
          <div className={classes.channelName}>{props.title}</div>
          {/* <div
            className={classes.iconBox}
            onClick={(event) => {
              handleAddToWatchlist(props.detail);
              event.stopPropagation();
            }}
            onMouseOver={() => setHoverAdd(true)}
            onMouseLeave={() => setHoverAdd(false)}
          >
            <NextImageComponent
              src={
                props.selected
                  ? tickButton.plus
                  : hoverAdd
                  ? HoverAdd
                  : tickButton.tick
              }
              alt="tick-icon"
            />
          </div> */}
        </div>
        <div>
          <NextImageComponent 
          className={classes.line}
          src="https://images.ottplay.com/static/line1.svg" alt="line_img" />
        </div>
        <div className={classes.channelDesc}>
          <div className={classes.providersContentTypeWarp}>
            <div>
              <div className={classes.certificate}>
                <b>{props.movie ? props.movie.content_type : ''}</b>{' '}
                {props.genres &&
                  props.genres.slice(0, 2).map((item) => {
                    return ' . ' + item.name;
                  })}
              </div>
              <div className={classes.providers}>
                {props.provider && props.provider.length > 0 ? (
                  <React.Fragment>
                    <b>On</b>
                    {props.provider.map((item) => {
                      return item && item.provider && item.provider.name
                        ? ' . ' + item.provider.name
                        : '';
                    })}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </div>
            </div>
            {/* {isMobile && (
              <div className={classes.dotsIconWarp}>
                <NextImageComponent className={classes.dotsIcon} src={dotsIcon} />
              </div>
            )} */}
          </div>

          <Details />
          {props.where_to_watch &&
          props.where_to_watch.length > 0 &&
          !isMobile ? (
            <div className={classes.playButtonBox}>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    props.where_to_watch &&
                    props.where_to_watch.length == 1
                  ) {
                    handleSingleProvider(props.where_to_watch[0]);
                  } else {
                    setmodalOpen(true);
                  }
                }}
                // onClick={props.where_to_watch[0].show_url}
                className={classes.playButton}
              >
                <ImageComponent src="/static/mobile_images/play_icon_mobile.svg" alt="video play icon" />
                Watch Now
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const FeaturedCardMobile = ({ onCardClick }) => {
    return (
      <Card className={classes.rootMob} onClick={() => onCardClick()}>
        <CardMedia className={classes.coverMob} image={props.poster} />
        <div className={classes.detailsMob}>
          {' '}
          <FeaturedCardContent isMobile={true} />
        </div>
      </Card>
    );
  };

  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const { movie } = props;
  return (
    <React.Fragment>
      {width > 600 ? (
        <Card
          className={classes.root}
          onClick={() =>
            handlefeaturedClick(
              movie,
              movie.movie_id || movie._id,
              movie.content_type.toLowerCase(),
              movie.name,
              movie.seo_url || movie.movie.seo_url
            )
          }
        >
          <CardMedia
            className={classes.cover}
            image={props.poster}
            title="Live from space album cover"
          >
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <FeaturedCardContent isMobile={false} />
              </CardContent>
            </div>
          </CardMedia>
        </Card>
      ) : (
        <FeaturedCardMobile
          onCardClick={() =>
            handlefeaturedClick(
              movie,
              movie.movie_id || movie._id,
              movie.content_type.toLowerCase(),
              movie.name,
              movie.seo_url || movie.movie.seo_url
            )
          }
        />
      )}
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
          content: {
            position: 'fixed',
            border: '1px solid #2A1D3F',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            borderRadius: width > 600 ? 4 : 0,
            outline: 'none',
            padding: '0px',
            zIndex: '999',
            margin: 'auto',
            width: '604px',
            height: '600px',
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
          // handleWatchNow={console.log('handleWatchNow')}
          whereToWatch={props.provider}
        />
      </Modal>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    // width: 'calc(50vw - 32px)', //maintaing 16:9 ratio
    width: '234px',
    height: '367px',
    // height: 'calc(28vw - 18px)',
    margin: '0px 8px',
    borderRadius: '6px',
    backgroundColor: '#170732',
    border: '1px solid #3d2f58',
    cursor: 'pointer',
    position: 'relative',
  },
  details: {
    // display: 'flex',
    // flexDirection: 'column',
    // width: '60%',
    // height: '50%',
    // alignItems: 'center',
    zIndex: 2,
    width: '234px',
    height: '180px',
    background:
      'transparent linear-gradient(180deg, #1B0D3400 0%, #1B0D34E2 20%, #1B0D34 100%) 0% 0% no-repeat padding-box',
    borderRadius: '0px 0px 6px 6px',
    opacity: 1,
    position: 'absolute',
    bottom: '0px',
  },
  line:{
    padding: '10px 0', width: '100%'
  },
  content: {
    // flex: '1 0 auto',
    // display: 'flex',
    alignItems: 'center',
    // width: '100%',
    width: '225px',
    height: '162px',
    // padding: '16px 16px 16px 30px',
  },
  cover: {
    width: '100%',
    height: '85%',
  },
  feature: {
    color: '#03F87E',
    opacity: 1,
    fontSize: 'clamp(12px, 0.9vw, 14px)',
    textAlign: 'center',
    cursor: 'pointer',
  },
  titleTick: {
    // display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -4,
  },
  iconBox: {
    '& img': {
      width: 'clamp(30px, 2vw, 50px) !important',
      height: 'clamp(30px, 2vw, 50px)',
    },
  },
  channelName: {
    textAlign: 'center',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    fontSize: 'clamp(16px, 1vw, 24px)',
    lineHeight: '22px',
    // marginBottom: '5px',
    // marginTop: '5px',
    fontWeight: 800,
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
  imdbImage: {
    width: "18px",
    marginLeft: '5px',
  },
  certificate: {
    // fontWeight: 'bold',
    fontSize: 'clamp(8px, 1vw, 12px)',
    // marginBottom: '4px',
    textTransform: 'capitalize',
    alignItems: 'center',
    textAlign: 'center',
    color: '#D6C6F4',
  },
  providers: {
    // fontWeight: 'bold',
    fontSize: 'clamp(8px, 1vw, 12px)',
    alignItems: 'center',
    textAlign: 'center',
    color: '#D6C6F4',
  },
  providersContentTypeWarp: {
    // display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 42,
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#000000',
    color: '#D6C6F4',
    borderRadius: '6px',
    padding: '4px',
    marginRight: '8px',
    fontSize: 'clamp(12px, 1vw, 16px)',
  },
  match: {
    color: '#03F87E',
    display: 'flex',
    alignItems: 'center',
    // fontWeight: 'bold',
    // paddingRight: '8px',
    fontSize: 'clamp(8px, 1vw, 12px)',
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
  playButtonBox: {
    justifyContent: 'center',
    marginTop: '2%',
    margin: '0px !important',
    display: 'flex',
    alignItems: 'center',
  },
  playButton: {
    width: 123,
    height: 32,
    background: '#04E075',
    color: '#100721',
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 15,
    marginTop: '6px',
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
    fontSize: 'clamp(12px, 1vw, 16px)',
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
  [theme.breakpoints.down('xs')]: {
    playButtonBox: {
      justifyContent: 'flex-start',
      marginTop: '8%',
      display: 'flex',
      alignItems: 'center',
    },
    certificate: {
      color: '#D6C6F4',
    },
    providers: {
      color: '#D6C6F4',
    },
    critics: {
      color: '#D6C6F4',
    },
  },

  rootMob: {
    display: 'flex',
    width: 'calc(86vw - 16px)',
    height: 'calc(120vw - 60px)',
    margin: '0px 8px',
    position: 'relative',
    border: '1px solid #170732',
    borderRadius: '12px',
    backgroundColor: 'rgba(20, 9, 47, 1)',
  },
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
    // position: 'absolute',
    backgroundColor: 'rgb(0, 0, 0)',
    // bottom: '5%',
    // left: '6%',
    color: '#fff',
    padding: '4px 5px',
    zIndex: 2,
    fontSize: '8px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'right',
    fontFamily: `"Montserrat", "Arial", "sans-serif"`,
    position:'relative',
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
}));
