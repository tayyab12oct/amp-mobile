import { Grid, Hidden, Theme, Typography, makeStyles } from '@material-ui/core';
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

import Box from '@material-ui/core/Box';
import ImageComponent from '../../../components/Images';
import InterestCard from '../../../components/onboard/interests/InterestCard';
import InterestLayout from '../../../components/onboard/interests/InterestLayout';
import { NavBar } from '../../../components';
import { PillButton } from '../../../components/PillButton';
import Router from 'next/router';
import SEO from '../../../components/Seo';
import { Spinner } from '../../../components/Spinner';
import { TopHeader } from '../../../components/TopHeader';
import { ViewportContext } from '../../../components/ViewportProvider';
import { WebfoxContext } from '../../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../../components/firebaseConfig';
import { getCardSize } from '../../../utils/helper';

const windowAny: any = typeof window !== 'undefined' && window;
const GRID_VIEW = 'grid';
const LAYOUT_VIEW = 'layout';

const Loader = () => {
  return <Spinner styles={{ minHeight: '64vh', paddingBottom: '70px' }} />;
};

export default function Interests({ testingprops }) {
  const classes = useStyles();
  const _ht_clientid = cookie.load('_ht_clientid');
  const [selectedCards, setSelectedCards] = React.useState<any[]>([]);
  const [results, setResults] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const { width } = React.useContext(ViewportContext);
  const [viewStyle, setViewStyle] = React.useState(GRID_VIEW);
  const [page, setPage] = React.useState(1);
  const [hoverAdd, setHoverAdd] = React.useState(false);

  const [black, setBlack] = React.useState<any>([1, 2, 3, 4, 5]);
  const [bottomReached, isbottomReached] = React.useState(false);
  const [topReached, isTopReached] = React.useState(true);
  const [isStickyheart, setHeartPosition] = React.useState(false);

  const { webfox, webstore, actions, actionDispatch, setLoading } = useContext(
    WebfoxContext
  );
  const { languages, streamingServices } = webstore;
  let languagesArr: any = [];
  let providersArr: any = [];
  let likedArray: any = [];
  let likedObj: any = [];
  const [pink, setPink] = React.useState<any>([...likedArray]);
  // pushLikedMovie(res, id, name);

  useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],
      streamingServices.selectedStreamingServices || []
    );
    likedArray = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS)
      ) || [],
      webstore.likedMovieCard.liked
    );
    likedObj =
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ)
      ) || [];

    //console.log('likedArray: ', likedArray);
    //console.log('results: ', results);
    if (results.length > 0 && likedArray.length > 0) {
      const filteredSelectedCards = selectedCards.filter(function (item, pos) {
        return selectedCards.indexOf(item) == pos;
      });
      const tempCards = [...filteredSelectedCards];
      const filteredArray = tempCards.filter(function (item, pos) {
        return tempCards.indexOf(item) == pos;
      });
      setSelectedCards(filteredArray);
    }
  }, [results]);
  // const isSelected = array.includes(movie._id);
  // setSelectedCards(tempCards);
  // }, [webstore.likedMovieCard.liked]);
  const getParams = () => {
    const params = {
      limit: 30,
      module_name: 'Onboarding',
      platform: 'web',
      section: 'Movies & Shows',
      page: page,
      language: languagesArr.length > 0 ? languagesArr.toString() : '',
    };
    return params;
  };
  React.useEffect(() => {
    firebaseAnalytics.logEvent('screen_view', {
      page_title:
        '/preferencesmoviesnshows' +
        (width > 600 ? '/gridview' : '/cardview') +
        '/onboarding',
    });
    windowAny.Moengage &&
      windowAny.Moengage.track_event('screen_view', {
        page_title:
          '/preferencesmoviesnshows' +
          (width > 600 ? '/gridview' : '/cardview') +
          '/onboarding',
      });
    const params = {
      page: page,
      limit: 30,
      language: Array.from(new Set(webstore.languages.name)).join(','),
    };
    webfox
      .getSectionData(getParams())
      .then((resp) => {
        const response = { ...resp.data };
        let result: any = [];
        if (response.rank && response.rank.length > 0) {
          const sortedData = response.rank
            .filter((item) => {
              if (item.show != null || item.movie != null) return true;
              else return false;
            })
            .sort((a, b) => a.order - b.order);
          result = sortedData.map((item) => item.show || item.movie);
        }
        const payload = {
          onboardMovies: result,
          lastPage: response.lastPage,
          nextPage: response.nextPage,
        };
        if (response && response.rank) {
          if (width < 600) {
            result = result.filter((item) => {
              const index = likedObj.findIndex((data) => data._id === item._id);
              if (index === -1) {
                return true;
              } else return false;
            });
          }
          setResults(() => {
            return results.concat(result);
          });

          setLoadingData(false);
        }
        actionDispatch(actions.FETCH_ONBOARDING_MOVIES_SUCCESS, payload);
      })
      .catch(() => {
        actionDispatch(actions.FETCH_ONBOARDING_MOVIES_FAILURE, []);
      });
    setLoading(false);
  }, [page]);

  useEffect(() => {
    const unlisten = () => {
      // window.scrollTo(0, 0);
      window.removeEventListener('scroll', handleScroll, false);
    };

    window.addEventListener('scroll', handleScroll, false);
    return () => {
      unlisten();
    };
  }, [typeof window !== 'undefined' && window.location.pathname]);

  React.useEffect(() => {
    if (likedArray.length >= 5) {
      setPink([1, 2, 3, 4, 5]);
    }
    const numberOfEmptyHearts =
      likedArray.length > 5 ? 0 : 5 - likedArray.length;
    setBlack(black.slice(0, numberOfEmptyHearts));
  }, []);

  const handleScroll = () => {
    const wrappedElement = document.getElementById('onbording-wrapper');
    if (wrappedElement) {
      isbottomReached(
        wrappedElement.getBoundingClientRect().bottom <= window.innerHeight + 80
      );
      isTopReached(wrappedElement.getBoundingClientRect().top == 0);
      if (wrappedElement.getBoundingClientRect().top < -160) {
        setHeartPosition(true);
      } else {
        setHeartPosition(false);
      }
    }
  };

  const heart = () => {
    return (
      <React.Fragment>
        {pink.map((v, index) => {
          return (
            <React.Fragment>
              {index < 5 && (
                <ImageComponent
                  alt="pink heart"
                  src="https://images.ottplay.com/static/pinkh.svg"
                />
              )}
              {'  '}
            </React.Fragment>
          );
        })}
        {black.map((v) => {
          return (
            <React.Fragment>
              <ImageComponent
                src="https://images.ottplay.com/static/blackh.svg"
                alt="black heart"
              />
              {'  '}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };

  const redirectToProvider = (value) => {
    value = value.filter((item) => {
      const index = likedObj.findIndex((data) => data._id === item._id);
      if (index === -1) {
        return true;
      } else return false;
    });
    if (value.length < 1) {
      Router.push('/onboard/providers');
    }
  };

  const handleHeartSelection = (id) => {
    const tempCards = webstore.likedMovieCard.liked;
    if (tempCards.length <= 5) {
      if (tempCards.includes(id)) {
        if (black.length <= 5) {
          setBlack([...black, 1]);
          pink.pop();
        }
      }
    }
  };

  const skipCard = (res: any, id: string, name: any, lang: string) => {
    const filteredCards = results.filter((item) => item['_id'] !== id);
    handleHeartSelection(id);
    const params = {
      movieId: id,
    };
    actionDispatch(actions.LIKED_MOVIE_CARD, {
      data_obj: res,
      disliked: id,
      select: 'dislike',
      dislikedName: name,
      language: lang,
    });
    setResults(filteredCards);
    if (filteredCards.length < 30) {
      setPage(page + 1);
    }
    firebaseAnalytics.logEvent('movie_skip', {
      eventCategory: 'movie_skip',
      eventAction: 'onboarding',
      eventValue: results.length - filteredCards.length,
    });
    windowAny.Moengage.track_event('movie_skip', {
      eventCategory: 'movie_skip',
      eventAction: 'onboarding',
      eventValue: results.length - filteredCards.length,
    });
    redirectToProvider(filteredCards);
  };

  const handleCardSelection = (
    res: any,
    id: string,
    name: any,
    lang: string
  ) => {
    const tempCards = [...likedArray];
    if (tempCards.length > 0) {
      if (tempCards.includes(id)) {
        tempCards.splice(tempCards.indexOf(id), 1);
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
        if (pink.length < 5) {
          setPink([...pink, 1]);
          black.pop();
        }
        pushLikedMovie(res, id, name, lang);
      }
    } else {
      tempCards.push(id);
      if (pink.length < 5) {
        setPink([...pink, 1]);
        black.pop();
      }
      pushLikedMovie(res, id, name, lang);
    }

    setSelectedCards(tempCards);
    firebaseAnalytics.logEvent('likedMovie', {
      eventCategory: 'onboarding_fav_movies_shows',
      eventAction: 'show_recommendations ',
      eventValue: pink.length,
    });
    windowAny.Moengage &&
      windowAny.Moengage.track_event('likedMovie', {
        eventCategory: 'onboarding_fav_movies_shows',
        eventAction: 'show_recommendations ',
        eventValue: pink.length,
      });
  };

  const pushLikedMovie = (res: any, id: string, name: any, lang: string) => {
    const params = {
      movieId: id,
    };

    return webfox.postAllLikesMovie(params).then(({ data, error }) => {
      //console.log('Post ', JSON.stringify(data));
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
      //console.log('Liked', name);
    });
  };

  const removeCard = (res: any, id: string, name: any, lang: string) => {
    //console.log('removeCard: ', res);
    const filteredCards = results.filter((item) => item['_id'] !== id);
    const params = {
      movieId: id,
    };
    handleHeartSelection(id);

    webfox.postAllDislikedMovie(params).then(({ data, error }) => {
      //console.log('Post ', JSON.stringify(data));
      actionDispatch(actions.LIKED_MOVIE_CARD, {
        data_obj: res,
        disliked: id,
        select: 'dislike',
        dislikedName: name,
        language: lang,
      });
    });
    setResults(filteredCards);
    if (filteredCards.length < 30) {
      setPage(page + 1);
    }
    firebaseAnalytics.logEvent('skipedMovie', {
      eventCategory: 'onboarding_fav_movies_shows',
      eventAction: 'skip_recommendations_x',
      eventValue: results.length - filteredCards.length,
    });
    windowAny.Moengage.track_event('skipedMovie', {
      eventCategory: 'onboarding_fav_movies_shows',
      eventAction: 'skip_recommendations_x',
      eventValue: results.length - filteredCards.length,
    });
    redirectToProvider(filteredCards);
  };

  const pushDislikeMovie = (id: string, name: any) => {
    const params = {
      movieId: id,
    };

    return webfox.postAllDislikedMovie(params).then(({ data, error }) => {
      //console.log('Post ', JSON.stringify(data));
      // actionDispatch(actions.LIKED_MOVIE_CARD, {
      //   liked: id,
      //   select: "like",
      //   likedName: name
      // });
      //console.log('Liked', data);
    });
  };

  return (
    <div>
      <SEO>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </SEO>
      {width < 600 ? (
        <InterestLayout
          viewStyle={viewStyle}
          setViewStyle={setViewStyle}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          results={results}
          setResults={setResults}
          removeCard={removeCard}
          skipCard={skipCard}
          heart={heart}
          pink={pink}
          setPink={setPink}
          black={black}
          setBlack={setBlack}
          likedArray={likedArray}
        />
      ) : viewStyle === GRID_VIEW ? (
        <div className={classes.root}>
          <Grid
            xs={12}
            item
            container
            className={[
              classes.stickyheartExtraDiv,
              isStickyheart && classes.showStickyheartExtraDiv,
            ].join(' ')}
          >
            <Grid xs={1} lg={2} item></Grid>
            <Grid item xs={10} lg={8} className={classes.stickyHeartHeader}>
              Tap Your Type
              <br />
              {heart()}
            </Grid>
            <Grid xs={1} lg={2} item></Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justify="center"
            style={{ padding: '0 0.75%', position: 'relative' }}
          >
            <Grid xs={1} lg={2} item></Grid>
            <Grid item xs={10} lg={8}>
              <InterestHeader
                viewStyle={viewStyle}
                setViewStyle={setViewStyle}
                selectedCards={selectedCards}
                hoverAdd={hoverAdd}
                setHoverAdd={setHoverAdd}
                heart={heart}
                isStickyheart={isStickyheart}
              />
              {loadingData ? (
                <Loader />
              ) : (
                <React.Fragment>
                  <InterestBody
                    selectedCards={selectedCards}
                    setSelectedCards={setSelectedCards}
                    results={results}
                    setResults={setResults}
                    removeCard={removeCard}
                    skipCard={skipCard}
                    handleCardSelection={handleCardSelection}
                  />
                </React.Fragment>
              )}
            </Grid>
            <Grid xs={1} lg={2} item></Grid>
          </Grid>
          <RecommendationButton bottomReached={bottomReached} />
        </div>
      ) : loadingData ? (
        <Loader />
      ) : (
        <InterestLayout
          setViewStyle={setViewStyle}
          viewStyle={viewStyle}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          results={results}
          setResults={setResults}
          removeCard={removeCard}
          skipCard={skipCard}
          heart={heart}
          pink={pink}
          setPink={setPink}
          black={black}
          setBlack={setBlack}
          likedArray={likedArray}
        />
      )}
    </div>
  );
}

const HeaderLogo = () => {
  const classes = useStyles();
  return (
    <Box className={classes.logo}>
      <ImageComponent
        src="https://images.ottplay.com/static/new_logo.svg"
        alt="logo"
      />
    </Box>
  );
};

const InterestHeaderItem = ({
  setViewStyle,
  selectedCards,
  viewStyle,
  hoverAdd,
  setHoverAdd,
  heart,
  isStickyheart,
}) => {
  const { width } = React.useContext(ViewportContext);
  const classes = useStyles();
  const { webstore } = useContext(WebfoxContext);
  const tools = [
    // {
    //   src: viewStyle === GRID_VIEW ? application_selected : application,
    //   alt: 'application_icon',
    //   click: () => setViewStyle(GRID_VIEW),
    //   className: classes.toolsWrapper,
    // },
    // {
    //   src: viewStyle === LAYOUT_VIEW ? layout_selected : layout,
    //   alt: 'layout_icon',
    //   click: () => setViewStyle(LAYOUT_VIEW),
    //   className: classes.toolsWrapper,
    // },
    {
      src: hoverAdd
        ? 'https://images.ottplay.com/static/close.svg'
        : 'https://images.ottplay.com/static/close_unselected.svg',
      alt: 'close_icon',
      click: () => {
        return webstore.likedMovieCard.liked.length >= 5
          ? Router.push('/onboard/providers')
          : '';
      },
      className: classes.toolsWrapper,
      styles: {
        opacity: webstore.likedMovieCard.liked.length >= 5 ? 1 : '0.3',
        cursor: 'pointer',
      },
      events: {
        onMouseOver: () => setHoverAdd(true),
        onMouseLeave: () => setHoverAdd(false),
      },
    },
  ];
  return (
    <div className={classes.interestHeaderWrapper} id="interestHeaderWrapper">
      <div
        className={[classes.interestHeader, classes.interestHeaderLeft].join(
          ' '
        )}
      >
        <div>
          Tap Your Type
          <br />
          {heart()}
        </div>
        <div
          className={classes.subHeader}
          style={{ lineHeight: width > 1300 ? '22px' : '18px' }}
        >
          <div className={classes.lang}>
            Click
            <ImageComponent
              src="https://images.ottplay.com/static/likeIcon.svg"
              alt="like"
              className={classes.realTimeImages}
            />
            if you like the movie / show.
          </div>
          <div className={classes.lang}>
            Click
            <ImageComponent
              src="https://images.ottplay.com/static/close_red.svg"
              alt="close"
              className={classes.realTimeImages}
            />
            if you don't like it. Click
            <ImageComponent
              className={classes.realTimeImages}
              src="https://images.ottplay.com/static/skip_white.svg"
              alt="skip"
            />{' '}
            to skip
          </div>
        </div>
      </div>
      <div className={classes.interestHeaderTools}>
        {tools.map((item, index) => {
          return (
            <div
              className={item.className}
              onClick={() => item.click()}
              onMouseOver={() => {
                item.events && item.events.onMouseOver();
              }}
              onMouseLeave={() => {
                item.events && item.events.onMouseLeave();
              }}
            >
              <ImageComponent
                src={item.src}
                alt={item.alt}
                // style={{ ...item.styles, width: '100%', height: '100%' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const InterestHeader = ({
  setViewStyle,
  selectedCards,
  viewStyle,
  hoverAdd,
  setHoverAdd,
  heart,
  isStickyheart,
}) => {
  const classes = useStyles();
  const { webstore } = useContext(WebfoxContext);

  return (
    <React.Fragment>
      {/* <HeaderLogo /> */}
      <InterestHeaderItem
        viewStyle={viewStyle}
        setViewStyle={setViewStyle}
        selectedCards={selectedCards}
        hoverAdd={hoverAdd}
        setHoverAdd={setHoverAdd}
        heart={heart}
        isStickyheart={isStickyheart}
      />
    </React.Fragment>
  );
};

const InterestBody = ({
  selectedCards,
  setSelectedCards,
  results,
  setResults,
  removeCard,
  skipCard,
  handleCardSelection,
}) => {
  const classes = useStyles();
  const { webstore } = useContext(WebfoxContext);
  const { height } = React.useContext(ViewportContext);

  return (
    <Grid
      xs={12}
      container
      className={[classes.interestBodyBox, classes.gridContainer].join(' ')}
      // spacing={2}
      style={{
        gridTemplateColumns: getCardSize(results),
      }}
    >
      {results.slice(0, 30).map((movie, i) => {
        const array = getLocalStorageData(
          JSON.parse(
            typeof window !== 'undefined' &&
              localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS)
          ) || [],
          webstore.likedMovieCard.liked
        );
        const isSelected = array.includes(movie._id);
        return (
          <React.Fragment>
            {/* <Grid item xs={6} sm={2} className={classes.cardRoot}> */}
            <Box width="100%" height="100%">
              <InterestCard
                data={movie}
                key={i}
                handleClose={removeCard}
                handleSkip={skipCard}
                // selectedCards={selectedCards}
                handleSelection={handleCardSelection}
                isSelected={isSelected}
              />
            </Box>
            {/* </Grid> */}
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

const RecommendationButton = ({ bottomReached }) => {
  const classes = useStyles();
  const { webstore } = useContext(WebfoxContext);

  const likedArray = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS)
    ) || [],
    webstore.likedMovieCard.liked
  );
  const getOnBoardingFooterheight = () => {
    //console.log('bottomReached-->', bottomReached);
    if (bottomReached) {
      const footerHeightEle = document.getElementById('onBoardingFooter');
      if (footerHeightEle) {
        return footerHeightEle.clientHeight + 'px';
      }
    }
    return '0px';
  };

  const handleProceed = () => {
    if (likedArray.length >= 5) {
      Router.push('/onboard/genres');
    }
  };
  return (
    <Grid
      xs={12}
      container
      className={[
        classes.interestFooter,
        !bottomReached && classes.highLightedButtonWrap,
      ].join(' ')}
      style={{
        bottom: getOnBoardingFooterheight(),
      }}
    >
      <Grid xs={1} lg={2} item></Grid>
      <Grid xs={10} lg={8} container>
        <Grid xs={2} className={classes.lang}>
          <ImageComponent
            src="https://images.ottplay.com/static/chevron-pink-left.svg"
            alt="left_indicator"
            // style={{ width: '13px', height: '10px' }}
          />
          <span
            className={classes.select_language}
            onClick={() => {
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
            }}
          >
            Go back
          </span>
        </Grid>

        <Grid xs={8} className={classes.recommendationsBtnWrapper}>
          {likedArray.length >= 5 ? (
            <PillButton
              style={{
                backgroundColor: '#FF4275',
                margin: 0,
                border: '0.5px solid #FF4275',
                fontSize: 'clamp(13px, 1.5vw, 18px)',
                fontWeight: 600,
                textTransform: 'none',
                color: 'white',
                padding: '2px 24px',
                borderRadius: '28px',
                opacity: likedArray.length >= 5 ? 1 : '0.3',
              }}
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
            <Typography className={classes.typo}>
              Select 5 or more movies/shows to proceed
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid xs={1} lg={2} item></Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    padding: '25px 0px',
    minHeight: '85vh',
  },
  interestHeader: {
    fontSize: 'clamp(15px, 1.8vw, 30px)',
    color: 'white',
    fontWeight: 600,
    fontFamily: 'Montserrat',
  },
  interestHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 'clamp(16px, 1.8vw, 31px)',
    },
  },
  typo: {
    color: '#ff4275',
    // color: '#BBB6D1',
    fontWeight: 500,
    letterSpacing: '0',
    fontSize: 'clamp(12px, 1.4vw, 24px)',
  },
  stickyheartExtraDiv: {
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backgroundColor: 'rgba(27, 12, 79, 0.5)',
    backdropFilter: 'blur(50px)',
    fontSize: '32px',
    color: 'white',
    fontWeight: 550,
    fontFamily: 'Montserrat',
    width: '100%',
    position: 'fixed',
    top: 0,
    height: 0,
    overflow: 'hidden',
    transition: 'all 0.5s',
  },
  showStickyheartExtraDiv: {
    height: '45px',
    display: 'flex',
    zIndex: 2,
    fontSize: 'clamp(15px, 1.8vw, 30px)',
  },
  stickyheart: {
    position: 'fixed',
    top: 0,
    zIndex: 2,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    padding: '0.5rem 0px',
    width: '100%',
  },
  interestBodyBox: {
    // height: 750,
    // overflow: 'auto',
    margin: 0,
    paddingBottom: '75px',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */,
    },
  },
  headingBox: {
    display: 'flex',
    alignItems: 'center',
  },
  cardRoot: {
    color: '#ffffff',
    display: 'flex',
    flexWrap: 'wrap',
    // height: '100%',
    // margin: '0 0 0 -1.5%',
    justifyContent: 'space-between',
    // backgroundColor: 'red'
  },
  interestHeaderBox: {
    position: 'relative',
  },
  stickyHeartHeader: {
    display: 'inline-flex',
    padding: '5px 0px',
    '& img': {
      marginLeft: 8,
      width: 'clamp(14px, 1.8vw, 24px)',
    },
  },
  interestHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    height: 'fit-content',
    minHeight: '84px',
  },
  interestHeaderTools: {
    display: 'flex',
  },
  toolsWrapper: {
    maxWidth: '24px',
    maxHeight: '24px',
    marginRight: 15,
  },
  logo: {
    position: 'absolute',
    justifyContent: 'center',
    display: 'flex',
    top: -90,
    '& img': {
      width: 254,
      height: 60,
    },
  },
  interestFooter: {
    width: '100%',
    padding: '10px 0px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 'clamp(11px, 1vw, 16px)',
    margin: '3% 0 0 0',
    height: 'fit-content',
    position: 'fixed',
    bottom: 0,
    transition: 'bottom 0.5s',
  },
  highLightedButtonWrap: {
    backgroundColor: 'rgba(27, 12, 79, 0.5)',
    backdropFilter: 'blur(50px)',
  },
  recommendationsBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    // padding: '10px 0px',
    // width: '66.67%',
  },
  lang: {
    fontSize: 'clamp(12px, 1vw, 18px)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 500,
  },
  select_language: {
    padding: '2px',
    color: '#ff4275',
    fontSize: 'clamp(12px, 1.4vw, 24px)',
    // color: '#2ee4b7',
    // color: '#2acb65',
    // color: '#A89ABF',
  },
  subHeader: {
    color: '#D6C6F4',
    fontSize: 'clamp(10px, 1vw, 14px)',
    marginLeft: 30,
  },
  realTimeImages: {
    margin: '0px 6px',
    height: '14px',
  },
}));
