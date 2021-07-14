import { DisLikeCard, MobileMovieCards, MovieCards } from './MovieCards';
import { Grid, Hidden } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  generatePermalink,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
  pushDataLocalStorage,
  sortProvidersByUserPreference,
} from '../utils/constants';
import React, { useContext, useEffect } from 'react';

import ErrorBoundary from '../services/logAnalytics';
import { IMAGES } from '../public/static/newImages';
import ImageComponent from './Images';
import { OnHoverCard } from './MovieCards';
import Router from 'next/router';
import { SimilarMobileMovieCards } from './SimilarMovieCards';
import { ViewportContext } from './ViewportProvider';
import { WebfoxContext } from '../services/webfox';
import { contextParamsForREAnalytics } from '../utils/constants';
import { getCardSize } from '../utils/helper';
import { getWebpUrl } from '../utils/helper';
// import { history } from '../configureStore';
import { makeStyles } from '@material-ui/core';

export function MoviesList(props) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const { referance, results } = props;

  const [select, setSelect] = React.useState('');
  const [card, setCard] = React.useState(false);
  const [close, setClose] = React.useState(false);
  const [listData, setListData] = React.useState<any>([]);
  const [leftArrowVisiblity, setLeftArrowVisiblity] = React.useState<any>(
    false
  );
  const [rightArrowVisiblity, setRightArrowVisiblity] = React.useState<any>(
    false
  );

  React.useEffect(() => {
    setListData(props.results);
  }, [props.results]);

  React.useEffect(() => {
    setTimeout(() => {
      if (referance && referance.current) {
        setRightArrowVisiblity(
          referance.current.scrollWidth > referance.current.clientWidth
        );
      }
    }, 500);
  }, []);

  const getImageUrl = (movie) => {
    return movie.img_url || movie.image_url
      ? movie.img_url || movie.image_url
      : movie.posters
      ? getWebpUrl(movie.posters[0], { width: 200, height: null })
      : 'https://images.ottplay.com/static/poster_default.png';
  };

  const handleClose = (details) => {
    setClose(!close);
    actionDispatch(actions.ADDED_TO_DISLIKE, details);
  };

  const handleArrowScroll = (direction) => {
    if (referance) {
      if (direction === 'right') {
        referance.current.scrollLeft =
          referance.current.scrollLeft + referance.current.clientWidth - 70;
      } else {
        referance.current.scrollLeft =
          referance.current.scrollLeft - referance.current.clientWidth + 70;
      }
    }
  };
  const navArrowhandler = () => {
    if (referance) {
      if (referance.current && referance.current.scrollLeft > 0) {
        setLeftArrowVisiblity(true);
      } else {
        setLeftArrowVisiblity(false);
      }

      if (
        referance.current &&
        referance.current.scrollWidth - referance.current.scrollLeft <=
          referance.current.clientWidth + 10
      ) {
        setRightArrowVisiblity(false);
      } else {
        setRightArrowVisiblity(true);
      }
    }
  };
  const renderArrow = (direction) => {
    return (
      <div
        className={[
          classes.arrowWrap,
          direction === 'left' ? classes.leftArrow : '',
        ].join(' ')}
        onClick={() => {
          handleArrowScroll(direction);
        }}
      >
        <ImageComponent
          src={IMAGES.right_arrow_active}
          alt="right_arrow_icon"
          // onClick={() => setDropdown(!dropdown)}
        />
      </div>
    );
  };

  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );
  const { languages, streamingServices } = webstore;

  let languagesArr: any = [];
  let providersNameArr: any = [];

  useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    providersNameArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
      ) || [],
      streamingServices.name || []
    );
  }, []);
  const handleCard = (obj, key, content_type, name, s_url, p_url) => {
    let url = '';
    if (p_url === null || p_url === undefined || p_url === '') {
      url = generatePermalink(content_type, s_url);
    } else {
      url = p_url;
    }
    const seoId = url;
    const query = {
      seoUrl: s_url?.split('/')[0],
    };
    document.cookie = `SSRURL=${s_url?.split('/')[0]}`;

    seoId && seoId[1] === 'movie' || seoId && seoId[1] === 'Movie'
      ? webfox.getMoviesDetailsList(query).then(({ data, error }) => {
          if (error) {
            actionDispatch(actions.FETCH_MOVIES_DETAILS_LIST_FAILURE, []);
          }
          actionDispatch(actions.FETCH_MOVIES_DETAILS_LIST_SUCCESS, data || []);
          if (data && data.movies) {
            const res = data.movies.filter((item) => {
              return query.seoUrl === item.seo_url;
            });
          }
        })
      : null;

    setCard(true);
    setSelect(key);
    const currentPath = location.pathname;
    const params = {
      event: 'title_click',
      details: {
        page_name: currentPath,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: props && props.type ? props.type : '',
        name: name !== undefined ? name : '',
        formatted_id:
          obj &&
          obj.primary_language &&
          obj.primary_language !== undefined &&
          obj.primary_language.name &&
          obj._id
            ? obj.primary_language.name + '_' + obj._id
            : '',
      },
      context: contextParamsForREAnalytics,
    };
    webfox.postREAnalytics(params).then(({ data, error }) => {});
    // let url1 = '';
    // if (content_type === 'movie' || content_type === 'short_film') {
    //   url1 = `/movie/${url}`;
    // } else if (content_type === 'show') {
    //   if (obj.format === 'web_series') {
    //     url1 = `/web-series/${url}`;
    //   } else if (obj.format === 'tv_shows') {
    //     url1 = `/tv-shows/${url}`;
    //   } else {
    //     url1 = `/show/${url}`;
    //   }
    // }
    Router.push({
      pathname: `/${url}`,
      //query: { key, content_type, name, url, source: props.sourcePage },
    });
  };

  const moreProvider = (provider) => {
    if (provider && provider.length > 2) {
      return ' . +' + (provider.length - 2).toString();
    }
    return null;
  };

  const deleteData = (details) => {
    setListData(
      listData.filter(function (obj, i) {
        return i !== details;
      })
    );
  };
  return (
    <ErrorBoundary>
      <div style={{ position: 'relative', width: '100%' }}>
        <Hidden only={['xs']}>
          {referance &&
          leftArrowVisiblity &&
          listData &&
          listData.length > 6 ? (
            renderArrow('left')
          ) : (
            <div />
          )}
        </Hidden>
        <div
          className={classes.root}
          ref={props.referance}
          onScroll={() => {
            navArrowhandler();
          }}
        >
          <Grid xs={12} container>
            <Grid
              item
              xs={12}
              // container
              direction="row"
              alignItems="center"
              style={{
                width: props.screen == 'see_all' ? '100vw' : '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Grid
                xs={12}
                item
                container
                spacing={2}
                className={[
                  classes.listBox,
                  props.screen == 'home' && classes.moblistBox,
                  props.screen == 'see_all' && classes.moblistGrid,
                  width > 600 && classes.container,
                ].join(' ')}
                style={{
                  gridTemplateColumns: getCardSize(listData, props.screen),
                }}
              >
                {/* <div className={classes.container}> */}
                {listData &&
                  listData.map((movie, i) => {
                    //let array: any = localStorage.getItem('watchlist added');
                    // const array: any = webstore.watchlistArr.watchlistArr;
                    // let array: any = [];
                    // if (
                    //   webstore.watchlistArr.watchlistArr !== null &&
                    //   webstore.watchlistArr.watchlistArr !== undefined &&
                    //   webstore.watchlistArr.watchlistArr.length > 0
                    // ) {
                    const array = webstore.watchlistArr.watchlistArr;
                    // } else {
                    //   if (movie.content_type === 'show') {
                    //     array =
                    //       JSON.parse(
                    //         localStorage.getItem(
                    //           LOCALSTORAGE_KEY_CONSTANTS.WISHLISTED_SHOWS
                    //         )
                    //       ) || [];
                    //   } else if (movie.content_type === 'movie') {
                    //     array =
                    //       JSON.parse(
                    //         localStorage.getItem(
                    //           LOCALSTORAGE_KEY_CONSTANTS.WISHLISTED_MOVIES
                    //         )
                    //       ) || [];
                    //   }
                    // }
                    // const array =
                    //   JSON.parse(
                    //     localStorage.getItem(
                    //       LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ
                    //     )
                    //   ) || [];
                    let isSelected;
                    if (array != null) {
                      isSelected = array.findIndex((item) => {
                        const value = movie._id
                          ? item._id === movie._id
                          : item.id === movie.id;
                        return value;
                      });
                    }
                    const likedArray: any = getLocalStorageData(
                      JSON.parse(
                        localStorage.getItem(
                          LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ
                        )
                      ) || [],
                      webstore.likeArr.liked
                    );
                    let isLiked;
                    if (likedArray != null) {
                      isLiked = likedArray.findIndex((item) => {
                        const value = movie._id
                          ? item._id === movie._id
                          : item.id === movie.id;
                        return value;
                      });
                    }
                    // const hiddenArray: any = webstore.hideMovie.hidden;
                    const hiddenArray: any = getLocalStorageData(
                      JSON.parse(
                        localStorage.getItem(
                          LOCALSTORAGE_KEY_CONSTANTS.HIDDEN_DATA_OBJ
                        )
                      ) || [],
                      webstore.hideMovie.hidden
                    );
                    let isHidden;
                    if (hiddenArray != null) {
                      // isHidden = hiddenArray.findIndex((item) =>
                      //   movie._id ? item._id === movie._id : item.id === movie.id
                      // );
                      isHidden = hiddenArray.findIndex((item) => {
                        const value = movie._id
                          ? item._id === movie._id
                          : item.id === movie.id;
                        return value;
                      });
                    }
                    // const dislikeArray: any = webstore.dislikedMovie.dislike;
                    let dislikeArray: any = [];
                    if (
                      webstore.dislikedMovie.dislike !== null &&
                      webstore.dislikedMovie.dislike !== undefined &&
                      webstore.dislikedMovie.dislike.length > 0
                    ) {
                      dislikeArray = webstore.dislikedMovie.dislike;
                    } else {
                      dislikeArray =
                        JSON.parse(
                          localStorage.getItem(
                            LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ
                          )
                        ) || [];
                    }
                    let isDisliked;
                    if (dislikeArray != null) {
                      // isDisliked = dislikeArray.findIndex((item) =>
                      //   movie._id ? item._id === movie._id : item.id === movie.id
                      // );
                      isDisliked = dislikeArray.findIndex((item) => {
                        const value = movie._id
                          ? item._id === movie._id
                          : item.id === movie.id;
                        return value;
                      });
                    }
                    return (
                      <React.Fragment>
                        {width < 600 ? (
                          <Grid
                            item
                            xs={
                              props.screen == 'home' ||
                              props.screen == 'see_all'
                                ? 6
                                : 12
                            }
                            sm={3}
                            md={2}
                            className={[
                              classes.cardBox,
                              props.screen == 'see_all' && classes.cardBoxGrid,
                            ].join(' ')}
                            style={{
                              marginLeft: props.screen == 'home' ? 0 : '',
                            }}
                          >
                            <React.Fragment>
                              {props.screen == 'home' ||
                              props.screen == 'see_all' ? (
                                <SimilarMobileMovieCards
                                  sourcePage={props.sourcePage}
                                  screen={props.tag}
                                  match={
                                    movie.match_score
                                      ? Math.trunc(movie.match_score)
                                      : null
                                  }
                                  close={true}
                                  key={movie.movie_id || movie.id}
                                  title={movie.name}
                                  type={
                                    movie.content_type
                                      ? movie.content_type
                                      : movie.AWARD &&
                                        movie.AWARD.replace(/ .*/, '')
                                  }
                                  details={movie}
                                  i={i}
                                  provider={
                                    (movie &&
                                      movie !== undefined &&
                                      movie.where_to_watch &&
                                      sortProvidersByUserPreference(
                                        movie.where_to_watch,
                                        providersNameArr
                                      ).length > 0 &&
                                      sortProvidersByUserPreference(
                                        movie.where_to_watch,
                                        providersNameArr
                                      ).map(
                                        (pro) =>
                                          pro.provider && pro.provider.name
                                      )) ||
                                    (movie &&
                                      movie !== undefined &&
                                      movie.providers &&
                                      sortProvidersByUserPreference(
                                        movie.providers,
                                        providersNameArr
                                      ).length > 0 &&
                                      sortProvidersByUserPreference(
                                        movie.providers,
                                        providersNameArr
                                      ).map((pro) =>
                                        pro.name ? pro.name : pro
                                      ))
                                  }
                                  disliked={
                                    <DisLikeCard
                                      id={movie.movie_id}
                                      details={movie}
                                      onClick={() => handleClose(movie)}
                                    />
                                  }
                                  onCardClick={() =>
                                    handleCard(
                                      movie,
                                      movie.movie_id
                                        ? movie.movie_id
                                        : movie.id,
                                      movie.content_type,
                                      movie.name,
                                      movie.seo_url,
                                      movie.permalink
                                    )
                                  }
                                  id={movie.movie_id}
                                  allData={props.allData}
                                  isSelected={isSelected !== -1}
                                  isLiked={isLiked !== -1}
                                  isHidden={isHidden !== -1}
                                  isDisliked={isDisliked !== -1}
                                  tag={props.tag}
                                  rating={movie.ottplay_rating}
                                  delete={() => deleteData(i)}
                                  image={getImageUrl(movie)}
                                  awards={props.awards}
                                />
                              ) : (
                                <MobileMovieCards
                                  sourcePage={props.sourcePage}
                                  screen={props.screen}
                                  match={Math.trunc(movie.match_score)}
                                  key={movie.movie_id || movie.id}
                                  title={movie.name}
                                  // type={movie.content_type.charAt(0).toUpperCase() +
                                  //   movie.content_type.slice(1)}
                                  i={i}
                                  details={movie}
                                  onCardClick={() =>
                                    handleCard(
                                      movie,
                                      movie.movie_id
                                        ? movie.movie_id
                                        : movie.id,
                                      movie.content_type,
                                      movie.name,
                                      movie.seo_url,
                                      movie.permalink
                                    )
                                  }
                                  isDisliked={isDisliked !== -1}
                                  provider={
                                    (movie &&
                                      movie !== undefined &&
                                      movie.where_to_watch &&
                                      sortProvidersByUserPreference(
                                        movie.where_to_watch,
                                        providersNameArr
                                      ).length > 0 &&
                                      sortProvidersByUserPreference(
                                        movie.where_to_watch,
                                        providersNameArr
                                      ).map(
                                        (pro) =>
                                          pro.provider && pro.provider.name
                                      )) ||
                                    (movie &&
                                      movie !== undefined &&
                                      movie.providers &&
                                      sortProvidersByUserPreference(
                                        movie.providers,
                                        providersNameArr
                                      ).length > 0 &&
                                      sortProvidersByUserPreference(
                                        movie.providers,
                                        providersNameArr
                                      ).map((pro) =>
                                        pro.name ? pro.name : pro
                                      ))
                                  }
                                  id={movie.movie_id || movie.id}
                                  allData={props.allData}
                                  isSelected={isSelected !== -1}
                                  isLiked={isLiked !== -1}
                                  isHidden={isHidden !== -1}
                                  tag={props.tag}
                                  delete={() => deleteData(i)}
                                  //close={close}
                                  disliked={
                                    <DisLikeCard
                                      id={movie.movie_id || movie.id}
                                      details={movie}
                                      onClick={() => handleClose(movie)}
                                    />
                                  }
                                  rating={movie.ottplay_rating}
                                  image={getImageUrl(movie)}
                                />
                              )}
                            </React.Fragment>
                          </Grid>
                        ) : (
                          <div>
                            <MovieCards
                              screen={props.tag}
                              match={Math.trunc(movie.match_score)}
                              key={movie.movie_id || movie.id}
                              title={movie.name}
                              type={
                                props.dontShowContentType
                                  ? props.dontShowContentType &&
                                    movie.content_type
                                    ? ''
                                    : movie.content_type
                                  : movie.content_type
                              }
                              i={i}
                              details={movie}
                              onCardClick={() =>
                                handleCard(
                                  movie,
                                  movie.movie_id ? movie.movie_id : movie.id,
                                  movie.content_type,
                                  movie.name,
                                  movie.seo_url,
                                  movie.permalink
                                )
                              }
                              isDisliked={isDisliked !== -1}
                              isHidden={isHidden !== -1}
                              provider={
                                (movie && props.dontShowProviders
                                  ? props.dontShowProviders
                                  : true &&
                                    movie !== undefined &&
                                    movie.where_to_watch &&
                                    sortProvidersByUserPreference(
                                      movie.where_to_watch,
                                      providersNameArr
                                    ).slice(0, 2).length > 0 &&
                                    sortProvidersByUserPreference(
                                      movie.where_to_watch,
                                      providersNameArr
                                    ).map(
                                      (pro) => pro.provider && pro.provider.name
                                    )) ||
                                (movie &&
                                  movie !== undefined &&
                                  movie.providers &&
                                  sortProvidersByUserPreference(
                                    movie.providers,
                                    providersNameArr
                                  ).length > 0 &&
                                  sortProvidersByUserPreference(
                                    movie.providers,
                                    providersNameArr
                                  ).map((pro) => (pro.name ? pro.name : pro)))
                              }
                              //close={close}
                              disliked={
                                <DisLikeCard
                                  id={movie.movie_id || movie.id}
                                  details={movie}
                                  onClick={() => handleClose(movie)}
                                />
                              }
                              children={(
                                setLikePopup,
                                setDisLikePopup,
                                setHover
                              ) => (
                                <OnHoverCard
                                  sourcePage={props.sourcePage}
                                  screen={props.screen}
                                  id={movie.movie_id}
                                  type={movie.content_type}
                                  details={movie}
                                  allData={props.allData}
                                  isDisliked={isDisliked !== -1}
                                  isSelected={isSelected !== -1}
                                  isLiked={isLiked !== -1}
                                  isHidden={isHidden !== -1}
                                  tag={props.tag}
                                  setLikePopup={setLikePopup}
                                  setHover={setHover}
                                  setDisLikePopup={setDisLikePopup}
                                  delete={() => deleteData(i)}
                                  onCardClick={() =>
                                    handleCard(
                                      movie,
                                      movie.movie_id
                                        ? movie.movie_id
                                        : movie.id,
                                      movie.content_type,
                                      movie.name,
                                      movie.seo_url,
                                      movie.permalink
                                    )
                                  }
                                />
                              )}
                              rating={movie.ottplay_rating}
                              image={getImageUrl(movie)}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                {/* </div> */}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Hidden only={['xs']}>
          {referance &&
          referance.current &&
          rightArrowVisiblity &&
          listData &&
          listData.length > 6 ? (
            renderArrow('right')
          ) : (
            <div />
          )}
        </Hidden>
      </div>
    </ErrorBoundary>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    padding: '0.5rem 0px',
    width: '100%',
  },
  cardWrapper: {
    marginTop: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '7px',
    justifyContent: 'flex-start',
  },
  trendingMovies: {
    fontSize: '30px',
    color: '#FFFFFF',
    margin: '8px 0 0 0',
  },
  addText: {
    fontSize: '18px',
    color: '#FFFFFF',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
  addButton: {
    width: '26px',
    height: '26px',
    cursor: 'pointer',
    margin: '0 7px 0 7px',
  },
  listBox: {
    margin: 0,
    // overflowX: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
  },
  arrowWrap: {
    cursor: 'pointer',
    minWidth: '46px',
    minHeight: '46px',
    borderRadius: '50%',
    display: 'flex',
    position: 'absolute',
    top: 'calc(50% - 32px)',
    right: '-23px',
    transform: 'translateY(-50%)',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#130726 0% 0% no-repeat padding-box',
    border: '1px solid #3A176A',
    zIndex: 3,
    '&:hover': {
      border: '1px solid #29F87E',
    },
  },
  leftArrow: {
    left: '-23px',
    right: '100%',
    zIndex: 3,
    transform: 'translateY(-50%) rotate(180deg)',
  },
  moblistBox: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  [theme.breakpoints.down('xs')]: {
    cardBox: {
      paddingRight: '0px !important',
      paddingLeft: '0px !important',
      marginRight: 18,
      marginLeft: 18,
    },
    cardBoxGrid: {
      marginRight: 0,
      marginLeft: 0,
    },
    moblistBox: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflow: 'auto',
      width: 'calc(100vw - 30px)',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        width: '0px',
        background: 'transparent',
      },
    },
    moblistGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'auto',
      width: 'calc(100vw - 48px)',
      marginLeft: '16px',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        width: '0px',
        background: 'transparent',
      },
    },
  },
}));
