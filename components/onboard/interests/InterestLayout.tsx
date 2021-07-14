import {
  Grid,
  LinearProgress,
  Theme,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  getLocalStorageData,
  sortProvidersByUserPreference,
} from '../../../utils/constants';
import React, { useContext, useEffect, useMemo } from 'react';
import { animated, useSpring } from 'react-spring';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ImageComponent from '../../Images';
import { PillButton } from '../../PillButton';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { ViewportContext } from '../../ViewportProvider';
import { WebfoxContext } from '../../../services/webfox';
import { useDrag } from 'react-use-gesture';

const THRESHOLD_PX = 3;

function AnimatedSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  vertical = true,
  horizontal = true,
  children,
}) {
  const [{ x, y, scale }, set] = useSpring(() => ({ x: 0, y: 0, scale: 0 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [x, y], cancel }) => {
    // we don't want both horizontal & vertical gestures
    y = vertical ? y : 0;
    x = horizontal ? x : 0;

    // Did you move far enough to trigger a swipe gesture?
    const didMoveFarEnough =
      Math.abs(x) > THRESHOLD_PX || Math.abs(y) > THRESHOLD_PX;
    // pair with 'down' otherwise, you'll fire 2 requests
    if (didMoveFarEnough && down) {
      cancel();
      if (x <= 0 && y >= 0) {
        console.log('swipe left');
        onSwipeLeft();
      } else if (x >= 0 && y <= 0) {
        console.log('swipe right');
        onSwipeRight();
      } else if (y <= 0 && x <= 0) {
        console.log('swipe up');
        onSwipeUp();
      }
    }

    set({
      x: down ? x : 0,
      y: down ? y : 0,
      scale: down ? 1.2 : 1,
      immediate: down,
    });
  });

  // Bind it to a component
  return (
    <animated.div
      {...bind()}
      // style={{ x, y, scale, width: '100%' }}
    >
      {children}
    </animated.div>
  );
}

AnimatedSwipeNavigation.propTypes = {
  children: PropTypes.object.isRequired,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  // funcs
  onSwipeLeft: PropTypes.func.isRequired,
  onSwipeRight: PropTypes.func.isRequired,
};

AnimatedSwipeNavigation.defaultProps = {
  horizontal: true,
  vertical: true,
};

const StyledLinearProgress = withStyles({
  root: {
    margin: '0 10px',
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: '#130726',
  },
  barColorPrimary: {
    backgroundColor: '#FF4376',
  },
})(LinearProgress);

const GRID_VIEW = 'grid';
const LAYOUT_VIEW = 'layout';

export default function InterestLayout({
  setViewStyle,
  selectedCards,
  setSelectedCards,
  results,
  setResults,
  removeCard,
  skipCard,
  viewStyle,
  heart,
  pink,
  setPink,
  black,
  setBlack,
  likedArray,
}) {
  const classes = useStyles();
  const { webstore } = useContext(WebfoxContext);

  console.log(
    'selectedCards.length',
    selectedCards.length,
    webstore.likedMovieCard.liked,
    removeCard
  );

  return (
    <div className={classes.root}>
      <Grid xs={12} container item>
        <Grid sm={1} lg={2} item></Grid>
        <Grid
          item
          xs={12}
          sm={10}
          lg={8}
          container
          direction="row"
          // justify="space-between"
          alignItems="center"
          // style={{ padding: '0 0.75%' }}
        >
          <InterestLayoutBody
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            results={results}
            setResults={setResults}
            removeCard={removeCard}
            skipCard={skipCard}
            setViewStyle={setViewStyle}
            viewStyle={viewStyle}
            heart={heart}
            pink={pink}
            setPink={setPink}
            black={black}
            setBlack={setBlack}
            likedArray={likedArray}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const InterestLayoutBody = ({
  setViewStyle,
  selectedCards,
  setSelectedCards,
  results,
  setResults,
  removeCard,
  skipCard,
  viewStyle,
  heart,
  pink,
  setPink,
  black,
  setBlack,
  likedArray,
}) => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [hoverAdd, setHoverAdd] = React.useState(false);
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);

  React.useEffect(() => {
    const timer = setInterval(() => {
      /*setProgress((oldProgress) => {
        if (oldProgress === 90) {
          clearInterval(timer);
        }
        const diff = oldProgress + 10;
        return diff;
      });*/
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleProceed = () => {
    if (webstore.likedMovieCard.liked.length >= 5) {
      Router.push('/onboard/genres');
    }
  };

  const pushLikedMovie = (res: any, id: string, name: any, lang: string) => {
    const params = {
      movieId: id,
    };

    return webfox.postAllLikesMovie(params).then(({ data, error }) => {
      console.log('Post ', JSON.stringify(data));
      if (error) {
        actionDispatch(actions.POST_LIKED_MOVIE_FAILURE, []);
      }
      actionDispatch(actions.POST_LIKED_MOVIE_SUCCESS, data || []);
      actionDispatch(actions.LIKED_MOVIE_CARD, {
        data_obj: res,
        liked: id,
        select: 'like',
        likedName: name,
        language: lang,
      });
      console.log('Liked', name);
    });
  };

  const handleCardSelection = (
    res: any,
    id: string,
    name: any,
    lang: string
  ) => {
    const tempCards = [...likedArray];
    // const tempCards = [...selectedCards];
    const temp = [...results];

    if (tempCards.length > 0) {
      if (tempCards.includes(id)) {
        tempCards.splice(tempCards.indexOf(id), 1);
        temp.push(temp.splice(0, 1)[0]);
        if (black.length <= 5 && tempCards.length < 5) {
          setBlack([...black, 1]);
          pink.pop();
        }
        actionDispatch(actions.LIKED_MOVIE_CARD, {
          data_obj: res,
          liked: id,
          select: 'like',
          likedName: name,
          language: lang,
        });
      } else {
        tempCards.push(id);
        temp.push(temp.splice(0, 1)[0]);
        if (pink.length < 5) {
          setPink([...pink, 1]);
          black.pop();
        }
        pushLikedMovie(res, id, name, lang);
      }
    } else {
      tempCards.push(id);
      temp.push(temp.splice(0, 1)[0]);
      if (pink.length < 5) {
        setPink([...pink, 1]);
        black.pop();
      }
      pushLikedMovie(res, id, name, lang);
    }
    setResults(temp);
    setSelectedCards(tempCards);
  };

  const { width } = React.useContext(ViewportContext);
  const { height } = React.useContext(ViewportContext);
  const handlePrev = () => {
    Router.push('/onboard/language');
    if (typeof window !== undefined) {
      webstore.likedMovieCard.liked = [];
      webstore.likedMovieCard.liked_obj = [];
      webstore.likedMovieCard.likedLang_MovieIDArr = [];
      webstore.likedMovieCard.disliked = [];
      webstore.likedMovieCard.disliked_obj = [];
      webstore.likedMovieCard.unlikedLang_MovieIDArr = [];
      const oldItems1 = [];
      localStorage.setItem(
        LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS,
        JSON.stringify(oldItems1)
      );
      localStorage.setItem(
        LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ,
        JSON.stringify(oldItems1)
      );
      localStorage.setItem(
        LOCALSTORAGE_KEY_CONSTANTS.LANG_LIKED_DATA_IDS,
        JSON.stringify(oldItems1)
      );
      localStorage.setItem(
        LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_IDS,
        JSON.stringify(oldItems1)
      );
      localStorage.setItem(
        LOCALSTORAGE_KEY_CONSTANTS.LANG_UNLIKED_DATA_IDS,
        JSON.stringify(oldItems1)
      );
      localStorage.setItem(
        LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ,
        JSON.stringify(oldItems1)
      );
    }
  };
  const handleClose = () => {
    Router.push('/onboard/genres');
  };
  console.log(
    'selectedCards.length',
    selectedCards.length,
    webstore.likedMovieCard.liked
  );

  const renderMobileLayoutInterest = () => {
    return (
      <Grid xs={12} className={classes.layoutBox}>
        <Grid item xs={12}>
          <Grid item xs={12} style={{ display: 'flex', marginTop: 5 }}>
            <Grid item xs={3}>
              <div className={classes.iconClass} style={{ float: 'left' }}>
                <div className={classes.back}>
                  <ImageComponent
                    src="https://images.ottplay.com/static/left_arrow.svg"
                    alt="back-icon"
                    // onClick={handlePrev}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'center' }}>
              <ImageComponent
                src="https://images.ottplay.com/static/new_logo.svg"
                alt="ottplay icon"
                className={classes.ottLogo}
              />
            </Grid>
            <Grid item xs={3}>
              <div className={classes.iconClass} style={{ float: 'right' }}>
                <div
                  className={classes.close}
                  style={{
                    visibility:
                      webstore.likedMovieCard.liked.length > 4
                        ? 'visible'
                        : 'hidden',
                  }}
                >
                  <ImageComponent
                    src="https://images.ottplay.com/static/close_unselected.svg"
                    alt="close-icon"
                    // onClick={handleClose}
                  />
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ marginTop: '35px' }}>
            <Typography className={classes.interestHeader}>
              Select Your Type
            </Typography>
          </Grid>
          <Grid item className={classes.heartWrap}>
            {heart()}
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.swipeContainer}>
          <Grid item xs={2} className={classes.iconClassBox}>
            {/* <div className={classes.iconClass}>
              <div className={classes.swipeLeft}>
                <ImageComponent src={swipeLeft} alt="" onClick={handlePrev} />
              </div>
            </div> */}
          </Grid>

          <Grid item xs={8} className={classes.cardRoot}>
            <Box className={classes.swipeBox}>
              {results.length > 0 && (
                <div className={classes.interestContainer}>
                  <div className={classes.mask_one}>
                    <ImageComponent
                      src="https://images.ottplay.com/static/mask_1.svg"
                      alt="mask1"
                    />
                  </div>
                  <div className={classes.mask_two}>
                    <ImageComponent
                      src="https://images.ottplay.com/static/mask_1.svg"
                      alt="mask2"
                    />
                  </div>

                  <LikeCard
                    card={results[0]}
                    handleDislike={removeCard}
                    handleLike={handleCardSelection}
                    moviesList={results}
                    pink={pink}
                    setPink={setPink}
                    black={black}
                    setBlack={setBlack}
                    likedArray={likedArray}
                  />
                </div>
              )}
            </Box>
          </Grid>

          <Grid item xs={2} className={classes.iconClassBox}>
            {/* <div className={classes.iconClass}>
              <div className={classes.swipeRight}>
                <ImageComponent src={swipeRight} alt="" onClick={handlePrev} />
              </div>
            </div> */}
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ marginTop: '11.6rem' }}>
          <Grid
            item
            xs={12}
            style={{ textAlign: 'center', paddingBottom: '30px' }}
          >
            {webstore.likedMovieCard.liked.length > 4 ? (
              <PillButton
                style={{
                  backgroundColor:
                    webstore.likedMovieCard.liked.length > 4
                      ? '#FF4275'
                      : '#35147A',
                  border:
                    webstore.likedMovieCard.liked.length > 4
                      ? '1px solid #FF4376'
                      : '1px solid #35147A',
                  opacity: webstore.likedMovieCard.liked.length > 4 ? 1 : '0.3',
                }}
                className={classes.proceedButton}
                text="Proceed"
                onClick={handleProceed}
                endIcon={
                  <ImageComponent
                    src="https://images.ottplay.com/static/rightArrow.svg"
                    alt=""
                  />
                }
              />
            ) : (
              <Typography className={classes.swipeDesc}>
                Select 5 or more movies/shows to proceed
              </Typography>
            )}
          </Grid>

          {/* <Grid
            item
            xs={12}
            style={{
              justifyContent: 'center',
              display: 'flex',
              textAlign: 'center',
            }}
          >
            <Typography className={classes.swipeDesc}>
              Swipe right or tap heart if you like the <br /> movie/show. Swipe
              left or tap X if you <br />
              don’t like it. Swipe up or tap next to skip
            </Typography>
          </Grid> */}
        </Grid>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      {width < 600 ? (
        renderMobileLayoutInterest()
      ) : (
        <Grid
          container
          xs={12}
          style={{
            minHeight: 'calc(100vh - 140px)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Grid
            xs={9}
            sm={10}
            md={9}
            container
            direction="row"
            // spacing={2}
            style={{ justifyContent: 'space-around' }}
          >
            <Grid xs={5} sm={6} item className={classes.outerContainer}>
              <Grid item xs={12} style={{ marginTop: '10px' }}>
                <Typography className={classes.interestHeader}>
                  Swipe Your Type
                </Typography>
              </Grid>
              <Grid item className={classes.heartWrapLayout}>
                {heart()}
              </Grid>
              <div
                style={{
                  margin: '6% auto',
                }}
              >
                <PillButton
                  style={{
                    backgroundColor:
                      selectedCards.length >= 5 ? '#FF4275' : '#35147A',
                    margin: '0',
                    border: '0.5px solid #35147A',
                    font: 'normal normal normal 20px Montserrat',
                    fontWeight: '600',
                    textTransform: 'none',
                    color: 'white',
                    height: '55px',
                    borderRadius: '28px',
                    opacity: selectedCards.length >= 5 ? 1 : '0.3',
                  }}
                  text="Show Recommendations"
                  onClick={handleProceed}
                  endIcon={
                    <ImageComponent
                      src="https://images.ottplay.com/static/rightArrow.svg"
                      alt=""
                    />
                  }
                />
              </div>

              <Grid item xs={12} style={{ marginTop: '20px' }}>
                <div className={classes.subHeader}>
                  <div className={classes.lang}>
                    <p>Click</p>
                    <ImageComponent
                      src="https://images.ottplay.com/static/likeIcon.svg"
                      alt="like"
                      className={classes.realTimeImages}
                    />
                    <p>if you like the movie / show.</p>
                  </div>

                  <div className={classes.infoMessage}>
                    <div className={classes.lang}>
                      <p>Click</p>
                      <ImageComponent
                        src="static/images/close_red.svg"
                        alt="close"
                        className={classes.realTimeImages}
                      />
                      <p>if you don't like it.</p>
                    </div>
                    <div className={classes.lang}>
                      <p>Click</p>
                      <ImageComponent
                        className={classes.realTimeImages}
                        src="https://images.ottplay.com/static/skip_white.svg"
                        alt="skip"
                      />
                      <p>to skip</p>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid
                xs={12}
                className={classes.lang}
                style={{ marginTop: '11%', cursor: 'pointer' }}
              >
                <ImageComponent
                  src="https://images.ottplay.com/static/slide_left_arrow.svg"
                  alt="left_indicator"
                  // style={{ width: '13px', height: '10px' }}
                />
                <span
                  className={classes.select_language}
                  onClick={() => {
                    Router.push('/onboard/language');
                  }}
                >
                  Go back to select your Languages
                </span>
              </Grid>
            </Grid>
            <Grid
              item
              xs={5}
              className={classes.cardRoot}
              style={{ paddingTop: '50px' }}
            >
              <Box width="100%" height="100%">
                {results.length > 0 && (
                  <div className={classes.interestContainer}>
                    <div
                      className={classes.mask_one}
                      style={{ top: width < 600 ? 0 : -30 }}
                    >
                      <ImageComponent
                        src="https://images.ottplay.com/static/mask_1.svg"
                        alt="mask1"
                      />
                    </div>
                    <div
                      className={classes.mask_two}
                      style={{ top: width < 600 ? 15 : -15 }}
                    >
                      <ImageComponent
                        src="https://images.ottplay.com/static/mask_1.svg"
                        alt="mask2"
                      />
                    </div>

                    <LikeCard
                      card={results[0]}
                      handleDislike={removeCard}
                      handleLike={handleCardSelection}
                      moviesList={results}
                      pink={pink}
                      setPink={setPink}
                      black={black}
                      setBlack={setBlack}
                      likedArray={likedArray}
                    />
                  </div>
                )}
              </Box>
            </Grid>
          </Grid>
          <RightColumn
            setViewStyle={setViewStyle}
            viewStyle={viewStyle}
            hoverAdd={hoverAdd}
            setHoverAdd={setHoverAdd}
          />
        </Grid>
      )}
    </div>
  );
};

const RightColumn = ({ setViewStyle, viewStyle, hoverAdd, setHoverAdd }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid xs={2} item className={classes.rightColumn}>
        <Grid
          xs={3}
          item
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '24px',
            maxHeight: '24px',
            marginRight: 16,
          }}
          onClick={() => setViewStyle(GRID_VIEW)}
        >
          <ImageComponent
            src={
              viewStyle === GRID_VIEW
                ? 'https://images.ottplay.com/static/application_selected.svg'
                : 'https://images.ottplay.com/static/application.svg'
            }
            alt="application_icon"
            // style={{ width: '100%', height: '100%' }}
          />
        </Grid>
        <Grid
          xs={3}
          item
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '24px',
            maxHeight: '24px',
            marginRight: 16,
          }}
          onClick={() => setViewStyle(LAYOUT_VIEW)}
        >
          <ImageComponent
            src={
              viewStyle === LAYOUT_VIEW
                ? 'https://images.ottplay.com/static/layout.svg'
                : 'https://images.ottplay.com/static/layout_unselected.svg'
            }
            alt="layout_icon"
            width="100%"
            height="100%"
            // style={{ width: '100%', height: '100%' }}
          />
        </Grid>
        <Grid
          xs={3}
          item
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '24px',
            maxHeight: '24px',
          }}
          onClick={() => setViewStyle(LAYOUT_VIEW)}
          onMouseOver={() => setHoverAdd(true)}
          onMouseLeave={() => setHoverAdd(false)}
        >
          <ImageComponent
            src={
              hoverAdd
                ? 'https://images.ottplay.com/static/close.svg'
                : 'https://images.ottplay.com/static/close_unselected.svg'
            }
            alt="ottplay"
            width="100%"
            height="100%"
            // style={{ width: '100%', height: '100%' }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const LikeCard = ({
  card,
  handleDislike,
  handleLike,
  moviesList,
  pink,
  setPink,
  black,
  setBlack,
  likedArray,
}) => {
  const classes = useStyles();

  const { width } = React.useContext(ViewportContext);
  const [likeHighlight, setLikeHighlight] = React.useState(false);
  const [skipHighlight, setSkipHighlight] = React.useState(false);
  const [dislikeHighlight, setDislikeHighlight] = React.useState(false);
  const [newMovieList, setNewMovielist] = React.useState(moviesList);

  const tempCards = [...likedArray];

  const handleUnFav = (res: any, id: string, name: string, lang: string) => {
    setDislikeHighlight(true);
    const timer = setTimeout(() => {
      setDislikeHighlight(false);
    }, 1000);
    handleDislike(res, id, name, lang);
    return () => {
      clearTimeout(timer);
    };
  };

  const handleSkip = (res: any, id: string, name: string, lang: string) => {
    setSkipHighlight(true);
    const timer = setTimeout(() => {
      setSkipHighlight(false);
    }, 1000);
    handleDislike(res, id, name, lang);
    return () => {
      clearTimeout(timer);
    };
  };

  const handleFav = (res: any, id: string, name: string, lang: string) => {
    console.log('card id1', id);
    const cardId = id + 'ott';
    console.log('card id2', cardId);
    let timer;
    if (cardId === id) {
      setLikeHighlight(false);
    } else {
      setLikeHighlight(true);
      timer = setTimeout(() => {
        setLikeHighlight(false);
      }, 1000);
    }
    //  ? setLikeHighlight(true) : setLikeHighlight(true);
    handleLike(res, id, name, lang);
    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    console.log('Use effect called');
    setNewMovielist(moviesList);
  }, [moviesList]);
  console.log('How many times layout rendered');
  return (
    <React.Fragment>
      <Grid xs={12} container className={classes.main_card}>
        {width < 600 ? (
          newMovieList
            .slice(0, 1)
            .map((item, index) => {
              console.log('Movie Items', item);
              return (
                <AnimatedSwipeNavigation
                  onSwipeRight={() =>
                    handleLike(
                      item,
                      item._id,
                      item.name,
                      item.primary_language.name
                    )
                  }
                  onSwipeLeft={() =>
                    handleDislike(
                      item,
                      item._id,
                      item.name,
                      item.primary_language.name
                    )
                  }
                  onSwipeUp={() =>
                    handleDislike(
                      item,
                      item._id,
                      item.name,
                      item.primary_language.name
                    )
                  }
                >
                  <LikeDislikeCard card={item} />
                </AnimatedSwipeNavigation>
              );
            })
            .reverse()
        ) : (
          <LikeDislikeCardStackView card={card} />
        )}
        <Grid
          container
          xs={12}
          className={classes.like_buttons}
          // spacing={2}
        >
          <Grid
            xs={4}
            item
            className={classes.single_button}
            onClick={() =>
              handleUnFav(card, card._id, card.name, card.primary_language.name)
            }
          >
            <ImageComponent
              src={
                dislikeHighlight
                  ? 'https://images.ottplay.com/static/dislikeddetail.svg'
                  : 'https://images.ottplay.com/static/Close_round.svg'
              }
              alt="close"
              width={width > 1400 ? 70 : 60}
              // style={{ width: width > 1400 ? 70 : 60, cursor: 'pointer' }}
            />
            <div className={classes.singleButtonText}>Dislike</div>
          </Grid>
          <Grid
            xs={4}
            item
            className={classes.single_button}
            onClick={() =>
              handleSkip(card, card._id, card.name, card.primary_language.name)
            }
          >
            <ImageComponent
              src="https://images.ottplay.com/static/skip_round.svg"
              alt="skip"
              width={width > 1400 ? 70 : 60}
              // style={{ width: width > 1400 ? 70 : 60, cursor: 'pointer' }}
            />
            <div className={classes.singleButtonText}>Skip</div>
          </Grid>
          <Grid
            xs={4}
            item
            className={classes.single_button}
            onClick={() =>
              handleFav(card, card._id, card.name, card.primary_language.name)
            }
          >
            <ImageComponent
              src={
                tempCards.includes(card._id)
                  ? 'https://images.ottplay.com/static/like_green.svg'
                  : 'https://images.ottplay.com/static/like_round.svg'
              }
              alt="like"
              width={width > 1400 ? 70 : 60}
              // style={{ width: width > 1400 ? 70 : 60, cursor: 'pointer' }}
            />
            <div className={classes.singleButtonText}>Like</div>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const LikeDislikeCard = ({ card }) => {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const [loaded, setLoaded] = React.useState(false);

  return (
    <React.Fragment>
      <Card className={classes.interestCardBox}>
        <Grid xs={12} container className={classes.interestCard}>
          <CardMedia
            className={classes.mediaCard}
            // style={{
            //   maxHeight: width > 1300 ? '240px' : '210px',
            //   height: width > 1300 ? '240px' : '210px',
            // }}
            component="img"
            alt="card Image"
            image={
              loaded
                ? card.posters[0] ||
                  'https://images.ottplay.com/static/default-image.jpg'
                : 'https://images.ottplay.com/static/default-image.jpg'
            }
            onLoad={() => setLoaded(true)}
          />
        </Grid>
        <CardContent className={classes.cardContent}>
          <ImageComponent
            src="https://images.ottplay.com/static/mask_3.svg"
            alt="mask3"
            width="100%"
            style={{ width: '100%', position: 'absolute', top: '-68%' }}
          />
          <div
            style={{
              width: '100%',
              position: 'absolute',
              top: 0,
              height: '100%',
              padding: '10px',
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              component="div"
              className={classes.title}
            >
              {card.name}
            </Typography>

            <Grid xs={12} item className={classes.blueSeparator}>
              <ImageComponent
                src="/static/mobile_images/blue_line.svg"
                alt="seperator"
                // style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} item>
              <div
                className={classes.lowerContainer}
                style={{ marginTop: '1%' }}
              >
                <span>
                  <b>{`${card.content_type}`}</b>
                  {/* <span style={{ margin: '3px' }}>.</span> */}
                </span>
                {card.genres &&
                  card.genres.length > 0 &&
                  card.genres.slice(0, 3).map((name, index: number) => {
                    return (
                      <span key={index}>
                        <span style={{ margin: '3px' }}>.</span>
                        {`${name.name}`}
                      </span>
                    );
                  })}
              </div>
              <div className={classes.lowerContainer}>
                <span>
                  <b>{`On`}</b>
                  {/* <span style={{ margin: '3px' }}>.</span> */}
                </span>
                {card.where_to_watch &&
                  card.where_to_watch.length > 0 &&
                  card.where_to_watch.slice(0, 2).map((name, index: number) => {
                    return (
                      <span key={index}>
                        <span style={{ margin: '3px' }}>.</span>
                        {`${name.provider.name}`}
                      </span>
                    );
                  })}
              </div>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const LikeDislikeCardStackView = ({ card }) => {
  const classes = useStyles();
  const { webstore } = useContext(WebfoxContext);
  const [loaded, setLoaded] = React.useState(false);
  const { streamingServices } = webstore;
  const providersNameArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
  );
  return (
    <React.Fragment>
      <Card className={classes.interestCardBox}>
        <Grid xs={12} container className={classes.interestCard}>
          <CardMedia
            className={classes.mediaCard}
            style={{ minHeight: '420px' }}
            component="img"
            alt="card Image"
            image={
              loaded
                ? card.posters[0] ||
                  'https://images.ottplay.com/static/default-image.jpg'
                : 'https://images.ottplay.com/static/default-image.jpg'
            }
            onLoad={() => setLoaded(true)}
          />
          <ImageComponent
            src="https://images.ottplay.com/static/mask_3.svg"
            alt="mask3"
            style={{ position: 'absolute', bottom: 0 }}
          />
          <div
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 0,
              padding: '10px',
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              component="div"
              className={classes.title}
            >
              {card.name}
            </Typography>

            <Grid xs={12} item className={classes.blueSeparator}>
              <ImageComponent
                src="/static/mobile_images/blue_line.svg"
                alt="seperator"
                // style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} item>
              <div
                className={classes.lowerContainer}
                style={{ marginTop: '1%' }}
              >
                <span>
                  <b>{`${card.content_type}`}</b>
                </span>
                {card.genres &&
                  card.genres.length > 0 &&
                  card.genres.slice(0, 3).map((name, index: number) => {
                    return (
                      <span key={index}>
                        <span style={{ margin: '3px' }}>.</span>
                        {`${name.name}`}
                      </span>
                    );
                  })}
              </div>
              <div className={classes.lowerContainer}>
                <span>
                  <b>{`On`}</b>
                </span>
                {card.where_to_watch &&
                  card.where_to_watch.length > 0 &&
                  sortProvidersByUserPreference(
                    card.where_to_watch,
                    providersNameArr
                  ).slice(0, 2).length > 0 &&
                  sortProvidersByUserPreference(
                    card.where_to_watch,
                    providersNameArr
                  )
                    .slice(0, 2)
                    .map((name, index: number) => {
                      return (
                        <span key={index}>
                          <span style={{ margin: '3px' }}>.</span>
                          {`${name.provider.name}`}
                        </span>
                      );
                    })}
              </div>
            </Grid>
          </div>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // display: 'flex',
    flexGrow: 1,
    // minHeight: '75vh',
    // paddingTop: '60px',
  },
  interestHeader: {
    fontSize: '40px',
    color: 'white',
    textAlign: 'center',
    height: '70%',
    fontWeight: 600,
    marginTop: 40,
    [theme.breakpoints.down('md')]: {
      fontSize: '30px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
    },
  },
  heartWrap: {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      width: '18px',
      height: 'auto',
      margin: '6px 5px 0px 5px',
    },
  },
  heartWrapLayout: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
    '& img': {
      width: '31px',
      height: 'auto',
      margin: '6px 5px 0px 5px',
    },
  },
  timer_text: {
    fontSize: '16px',
    color: 'white',
    fontWeight: 500,
    marginTop: '4%',
    textAlign: 'center',
  },
  cardRoot: {
    color: '#ffffff',
    display: 'flex',
    flexWrap: 'wrap',
    // height: '100%',
    // margin: '0 0 0 -1.5%',
    justifyContent: 'space-between',
    position: 'relative',
    // marginTop: '-20px',
    maxWidth: '350px',
  },
  iconClassBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  interestFooter: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    font: 'normal normal normal 16px Montserrat',
    margin: '3% 0 0 0',
  },
  lang: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    fontWeight: 500,
  },
  select_language: {
    padding: '2px',
    color: '#A89ABF',
  },
  subHeader: {
    color: '#D6C6F4',
    font: 'normal normal bold 14px Montserrat',
    lineHeight: '0',

    [theme.breakpoints.down('sm')]: {
      font: 'normal normal bold 12px Montserrat',
      lineHeight: '0',
    },
  },
  realTimeImages: {
    margin: '0px 6px',
    height: '14px',
  },
  buttonContainer: {
    height: '100px',
  },
  innerContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#160731',
    justifyContent: 'space-between',
    padding: '5px',
    borderRadius: '6px',
  },
  interestCardBox: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: '#160731',
    borderRadius: '20px',
  },
  interestCard: {
    backgroundColor: '#160731',
    borderRadius: '6px',
    position: 'relative',
    // height: '70%',
  },
  mediaCard: {
    position: 'relative',
    borderRadius: '6px',
    // height: '290px',
    // width: '100%',
  },
  cardContent: {
    padding: '10px 0px 0px',
    height: '30%',
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    letterSpacing: '0px',
    color: ' #FFFFFF',
    padding: '0 5%',
    textTransform: 'capitalize',
    opacity: 1,
    lineHeight: '28px',
    fontFamily: 'Montserrat',
    fontSize: 'clamp(20px, 2vw, 30px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 600,
    marginTop: '10px',
  },
  cardButton: {
    // width: '30%',
    height: '100%',
    padding: 0,
    '& img': {
      // width: '30%',
      height: '14px',
    },
  },
  movie_t: {
    fontSize: 14,
    color: 'white',
    marginRight: 10,
  },
  movie_s: {
    fontSize: 14,
    color: 'white',
    marginRight: 10,
  },
  interestContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  mask_one: {
    position: 'absolute',
    top: 0,
    width: '80%',
    '& img': {
      width: '100%',
    },
  },
  mask_two: {
    position: 'absolute',
    top: '15px',
    width: '90%',
    '& img': {
      width: '100%',
    },
  },
  main_card: {
    // position: 'absolute',
    // top: '30px',
    borderRadius: '20px',
    // height: 'calc(100% - 30px)'
    // maxHeight: '510px',
    // minHeight: '420px',
    height: '100%',
    width: 'auto',
  },
  swipe: {
    position: 'absolute',
  },
  like_buttons: {
    height: '100px',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    padding: '5px',
    borderRadius: '6px',
    marginTop: '5px',
    margin: 0,
  },
  single_button: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  singleButtonText: {
    color: '#9080AD',
    fontSize: '14px',
    marginTop: '6px',
  },
  lowerContainer: {
    textAlign: 'center',
    opacity: '0.6',
    color: '#D6C6F4',
    font: 'normal normal normal 14px Montserrat',
    overflow: 'hidden',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  ottLogo: {
    width: 254,
    height: 60,
    [theme.breakpoints.down('md')]: {
      width: '65%',
    },
  },
  outerContainer: {
    // height: '70%',
    //display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rightColumn: {
    textAlign: 'right',
    marginTop: '16px',
    height: '30px',
    paddingRight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  infoMessage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  likeDislikeCard: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: '#160731',
    borderRadius: '20px',
  },
  blueSeparator: {
    marginTop: '5px',
    marginBottom: '2px',
    '& img': {
      width: '100%',
    },
  },
  proceedButton: {
    color: '#FFFFFF',
    whiteSpace: 'nowrap',
    padding: '3px 20px',
    margin: '0 5px',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: 800,
    textTransform: 'none',
    height: '55px',
    width: '40%',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      display: 'flex',
      flexGrow: 1,
      paddingTop: '0px',
      minHeight: '100vh',
    },
    outerContainer: {
      height: '100%',
    },
    layoutBox: {
      justifyContent: 'center',
    },
    ottLogo: {
      width: 139,
      height: 33,
      marginTop: 15,
    },
    interestHeader: {
      fontSize: 14,
    },
    interestCardBox: {
      borderRadius: 8,
    },
    timer_text: {
      fontSize: 9,
      fontWeight: 300,
      marginTop: '2%',
    },
    iconClass: {
      display: 'flex',
      color: '#ffffff',
      alignItems: 'center',
    },
    back: {
      marginLeft: 15,
      marginTop: 20,
      '& img': {
        width: 14,
        height: 14,
      },
    },
    close: {
      width: 14,
      marginRight: 15,
      marginTop: 20,
      '& img': {
        width: 14,
      },
    },
    swipeLeft: {
      '& img': {
        width: 16,
        height: 28,
      },
    },
    swipeRight: {
      '& img': {
        width: 16,
        height: 28,
      },
    },
    cardRoot: {
      marginTop: 0,
      justifyContent: 'center',
    },
    swipeBox: {
      width: 195,
      height: 300,
    },
    main_card: {
      // minHeight: 300,
      borderRadius: 8,
      maxWidth: '230px',
      minWidth: '230px',
      position: 'absolute',
      top: 20,
    },
    likeDislikeCard: {
      height: '100%',
      borderRadius: 8,
    },
    title: {
      fontSize: 15,
      marginTop: 0,
      lineHeight: '14px',
    },
    lowerContainer: {
      fontSize: 9,
      marginTop: 2,
    },
    mediaCard: {
      borderRadius: 0,
      height: '300px',
    },
    swipeContainer: {
      marginTop: 30,
      display: 'flex',
      alignItems: 'center',
    },
    blueSeparator: {
      marginTop: '-5px',
      marginBottom: 0,
    },
    single_button: {
      '& img': {
        maxWidth: 44,
        maxHeight: 44,
      },
    },
    singleButtonText: {
      fontSize: 12,
    },
    like_buttons: {
      padding: 0,
      marginTop: 12,
    },
    swipeDesc: {
      fontSize: 14,
      color: '#ffffff',
      marginTop: '10%',
      marginBottom: 16,
    },
    interestCard: {
      height: '75%',
    },
    cardContent: {
      height: '25%',
    },
    mask_two: {
      top: '10px',
      width: '100%',
    },
    proceedButton: {
      width: 'fit-content',
      height: 40,
      fontSize: 13,
      fontWeight: 500,
    },
  },
}));
