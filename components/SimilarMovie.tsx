import * as React from 'react';

import { DisLikeCard, MobileMovieCards, MovieCards } from './MovieCards';
import { Grid, Hidden, Theme, makeStyles } from '@material-ui/core';
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

import { OnHoverCard } from './MovieCards';
import Router from 'next/router';
import { SimilarMobileMovieCards } from './SimilarMovieCards';
import { ViewportContext } from './ViewportProvider';
import { WebfoxContext } from '../services/webfox';
import { contextParamsForREAnalytics } from '../utils/constants';
import { getCardSize } from '../utils/helper';

export function SimilarMovie(props) {
  const classes = useStyles();
  const { webfox, webstore, actions, actionDispatch } = React.useContext(
    WebfoxContext
  );
  const { width } = React.useContext(ViewportContext);
  const [select, setSelect] = React.useState('');
  const [card, setCard] = React.useState(false);
  const [close, setClose] = React.useState(false);
  const [listData, setListData] = React.useState(props.results);

  const { languages, streamingServices } = webstore;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  const providersNameArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
  );
  const handleCard = (obj, key, content_type, name, s_url, p_url) => {
    let url = '';
    if (p_url === null || p_url === undefined || p_url === '') {
      url = generatePermalink(content_type, s_url);
    } else {
      url = p_url;
    }
    setCard(true);
    setSelect(key);
    const currentPath = location.pathname;
    console.log('currentPath: ', currentPath);
    const params = {
      event: 'title_click',
      details: {
        page_name: window.location.pathname,
        preferred_providers: getPreferredProviders(providersNameArr),
        preferred_languages: getPreferredLanguages(languagesArr),
        content_type: props && props.type ? props.type : '',
        name: obj && obj.name !== undefined ? obj.name : '',
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
    // history.push({
    //   pathname:
    //     content_type.toLowerCase() === 'movie'
    //       ? `/movie/${url}`
    //       : `/show/${url}`,
    //   state: { key, content_type, name, url },
    // });
    // let url1 = '';
    // if (content_type === 'movie' || content_type === 'short_film') {
    //   url1 = `/movie/${url}`;
    // } else if (content_type === 'show') {
    //   console.log('obj.format: ', obj.format);
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
    console.log('key is', key, content_type);
  };

  const handleClose = (details) => {
    setClose(!close);
    actionDispatch(actions.ADDED_TO_DISLIKE, details);
  };

  const deleteData = (details) => {
    setListData(
      listData.filter(function (obj, i) {
        return i !== details;
      })
    );
  };

  const handleSimilarMovies = (type, name, key) => {
    console.log('type', type);
    Router.push({
      pathname: `/similar/${type}`,
      //query: { type, name, key },
    });
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid
          item
          xs={12}
          container
          direction="row"
          className={classes.rootBox}
        >
          <Grid container xs={12} className={classes.textBox}>
            <Grid xs={10} item>
              <div className={classes.text}>{props.data}</div>
            </Grid>
            {props.data.includes('Movies & TV Shows') ? (
              ''
            ) : (
              // <Hidden only={['xs']}>
              <Grid xs={2} item>
                <div className={classes.read} onClick={props.handleSimilar}>
                  See All{' '}
                </div>
              </Grid>
              // </Hidden>
            )}
          </Grid>
          <Grid
            xs={12}
            item
            container
            // spacing={2}
            className={[classes.cardBox, width > 600 && classes.container].join(
              ' '
            )}
            style={{
              gridTemplateColumns: getCardSize(listData, props.screen),
            }}
          >
            {listData &&
              listData.map((movie, i) => {
                const list: any = [];
                console.log('moviesss', movie);
                list.push(movie.movie);

                const array = getLocalStorageData(
                  JSON.parse(
                    localStorage.getItem(
                      LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ
                    )
                  ) || [],
                  webstore.watchlistArr.watchlistArr
                );
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
                    console.log('movie.movie_id', value);
                    return value;
                  });
                  console.log('isHidden', isHidden);
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
                    console.log('movie.movie_id', value);
                    return value;
                  });
                }
                {
                  console.log('movie====: ', movie);
                }
                return width < 600 ? (
                  <Grid item xs={6} sm={2} className={classes.cardRoot}>
                    <SimilarMobileMovieCards
                      screen={props.screen}
                      match={
                        movie.match_score ? Math.trunc(movie.match_score) : null
                      }
                      close={true}
                      title={
                        movie.name
                          ? movie.name
                          : movie.CATEGORY && movie.CATEGORY.split('-')
                          ? movie.CATEGORY.split('-')
                          : movie.movie.name
                          ? movie.movie.name
                          : movie.show.name
                          ? movie.show.name
                          : null
                      }
                      type={
                        movie.content_type
                          ? movie.content_type
                          : movie.AWARD.replace(/ .*/, '')
                      }
                      details={movie}
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
                          ).map((pro) => pro.provider && pro.provider.name)) ||
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
                          movie.movie_id || movie._id,
                          movie.content_type.toLowerCase(),
                          movie.name,
                          movie.content_type === 'show'
                            ? movie.show
                              ? movie.show.seo_url
                              : movie.movie
                              ? movie.movie.seo_url
                              : movie.seo_url
                            : movie.seo_url || movie.movie.seo_url,
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
                      delete={() => deleteData(i)}
                      rating={movie.ottplay_rating}
                      image={movie.img_url || "https://images.ottplay.com/static/poster_default.png"}
                      awards={props.awards}
                      key={movie.movie_id}
                    />
                  </Grid>
                ) : (
                  <div>
                    <MovieCards
                      screen={props.screen}
                      match={Math.trunc(movie.match_score)}
                      key={movie.movie_id}
                      title={
                        movie.name
                          ? movie.name
                          : movie.CATEGORY && movie.CATEGORY.split('-')
                          ? movie.CATEGORY.split('-')
                          : movie.movie.name
                          ? movie.movie.name
                          : movie.show.name
                          ? movie.show.name
                          : null
                      }
                      type={movie.content_type}
                      i={i}
                      details={movie}
                      onCardClick={() =>
                        handleCard(
                          movie,
                          movie.movie_id || movie.id,
                          movie.content_type,
                          movie.name,
                          movie.content_type === 'show'
                            ? movie.show
                              ? movie.show.seo_url
                              : movie.movie
                              ? movie.movie.seo_url
                              : movie.seo_url
                            : movie.seo_url || movie.movie.seo_url,
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
                          ).map((pro) => pro.provider && pro.provider.name)) ||
                        (movie &&
                          movie !== undefined &&
                          movie.movie !== undefined &&
                          movie.movie.where_to_watch &&
                          sortProvidersByUserPreference(
                            movie.movie.where_to_watch,
                            providersNameArr
                          ).slice(0, 2).length > 0 &&
                          sortProvidersByUserPreference(
                            movie.movie.where_to_watch,
                            providersNameArr
                          ).map((pro) => pro.provider && pro.provider.name)) ||
                        (movie &&
                          movie !== undefined &&
                          movie.show !== undefined &&
                          movie.show.where_to_watch &&
                          sortProvidersByUserPreference(
                            movie.show.where_to_watch,
                            providersNameArr
                          ).slice(0, 2).length > 0 &&
                          sortProvidersByUserPreference(
                            movie.show.where_to_watch,
                            providersNameArr
                          ).map((pro) => pro.provider && pro.provider.name))
                      }
                      //close={close}
                      disliked={
                        <DisLikeCard
                          id={movie.movie_id || movie.id}
                          details={movie}
                          onClick={() => handleClose(movie)}
                        />
                      }
                      children={(setLikePopup, setDisLikePopup, setHover) => (
                        <OnHoverCard
                          screen={props.screen}
                          id={movie.movie_id}
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
                              movie.movie_id ? movie.movie_id : movie.id,
                              movie.content_type,
                              movie.name,
                              movie.seo_url || movie.movie?.seo_url,
                              movie.permalink
                            )
                          }
                        />
                      )}
                      rating={movie.ottplay_rating}
                      image={movie.img_url || "https://images.ottplay.com/static/poster_default.png"}
                    />
                  </div>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '20px 0 20px 0',
  },
  // rootBox: {
  //   padding: '0 0 0 10px',
  // },
  textBox: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 'clamp(16px, 1.6vw, 24px)',
    fontWeight: 600,
    // marginLeft: '-1%'
  },
  paper: {
    padding: theme.spacing(2),
    height: '400px',
    width: '100%',
    margin: '25px 0 5px 0',
  },
  match: {
    color: '#03F87E',
    fontWeight: 'bold',
    marginTop: '10px',
    fontSize: '12px',
  },
  name: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize: '22px',
    fontWeight: 'bold',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
  },
  details: {
    width: '169px',
    height: '16px',
    letterSpacing: '0',
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '16px',
  },
  media: {
    height: '240px',
    diaplay: 'flex',
    position: 'relative',
    width: '200px',
    borderRadius: '10px',
  },
  imdbTag: {
    position: 'absolute',
    backgroundColor: 'rgb(0, 0, 0)',
    top: '205px',
    left: '8px',
    color: '#fff',
    padding: '4px 5px',
    zIndex: 1,
    fontSize: '9px',
    borderRadius: '4px',
  },
  rating: {
    position: 'absolute',
    backgroundColor: '#000000',
    color: '#D6C6F4',
    fontSize: '15px',
    marginTop: '-50px',
    marginLeft: '10px',
    height: '30px',
    width: '65px',
  },
  cardRoot: {
    color: '#ffffff',
    display: 'flex',
    flexWrap: 'wrap',
    // margin: '0 0 0 -1.5%',
    // justifyContent: "space-between",
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.8',
    fontSize: 'clamp(10px, 1.1vw, 16px)',
    float: 'right',
    cursor: 'pointer',
    // marginRight: 16,
    //paddingRight: "2%",
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    padding: '0.5rem 0px 0.5rem 10px',
    width: '100%',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
  },
  [theme.breakpoints.down('xs')]: {
    rootBox: {
      padding: 0,
    },
    text: {
      marginBottom: 17,
    },
    read: {
      color: '#FFFFFF',
      fontWeight: 600,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 15,
    },
    cardBox: {
      margin: 0,
      flexWrap: 'nowrap',
      overflow: 'scroll',
    },
    cardRoot: {
      padding: '0px !important',
      marginRight: 15,
    },
  },
}));
