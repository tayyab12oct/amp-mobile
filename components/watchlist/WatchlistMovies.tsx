import {
  DisLikeCard,
  OnHoverCard,
  SimilarMovieCards,
} from '../SimilarMovieCards';
import { Grid, Theme } from '@material-ui/core';
import {
  HOME_SCREEN_SECTIONS,
  LOCALSTORAGE_KEY_CONSTANTS,
  getLocalStorageData,
  sortProvidersByUserPreference,
} from '../../utils/constants';
import React, { useContext } from 'react';

import { WebfoxContext } from '../../services/webfox';
import { makeStyles } from '@material-ui/styles';

import Router from 'next/router';

export function WatchlistMovies(props) {
  const classes = useStyles();

  const { webstore } = useContext(WebfoxContext);
const { movieDetails } = props;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [noResults, setNoResults] = React.useState(false);
  const [select, setSelect] = React.useState('');
  const [card, setCard] = React.useState(false);

  const handleCard = (key) => {
    setCard(true);
    setSelect(key);
    console.log('key is', key);
  };

  let results = [] as any;
  results = movieDetails.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  React.useEffect(() => {
    setSearchResults(results);
    if (results.length === 0) {
      setNoResults(true);
    }
  }, [searchTerm]);
  const providersNameArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    webstore.streamingServices.name || []
  );
  return (
    <div className={classes.root}>
      <Grid container xs={12} item>
        <Grid
          item
          xs={12}
          // container
          direction="row"
          alignItems="center"
        >
          <Grid 
          // xs={12} 
          item container 
          spacing={2} 
          className={classes.listBox}>
            {movieDetails.length === 0 ? (
              <div> No results found </div>
            ) : (
              movieDetails.map((movie, i) => {
                // const array: any = localStorage.getItem('watchlist selected');
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
                  isSelected = JSON.parse(array).includes(movie.id);
                }
                // const likedArray: any = webstore.likeArr.liked;
                const likedArray: any = getLocalStorageData(
                  JSON.parse(
                    localStorage.getItem(
                      LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS
                    )
                  ) || [],
                  webstore.likeArr.liked
                );
                let isLiked;
                if (likedArray != null) {
                  isLiked = likedArray.findIndex(
                    (item) => item.movie_id === movie.id
                  );
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
                        LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_IDS
                      )
                    ) || [];
                }
                let isDisliked;
                if (dislikeArray != null) {
                  isDisliked = dislikeArray.findIndex(
                    (item) => item.movie_id === movie.id
                  );
                }
                return (
                  <Grid item xs={6} md={3} lg={2}>
                    <SimilarMovieCards
                      match={movie.match}
                      key={movie.id}
                      title={movie.title}
                      type={'Movie'}
                      details={movie.id}
                      i={i}
                      onCardClick={() =>
                        handleCard(() => {
                          // history.push(`/movie/${movie.title}/${movie.id}`)
                          Router.push({
                            pathname: `/movie/${movie.title}/${movie.id}`,
                            query: {
                              key: movie.id,
                              type: 'movie',
                              name: movie.title,
                              url: movie.seo_url,
                              source: 'Watchlist',
                            },
                          });
                        })
                      }
                      close={true}
                      isDisliked={isDisliked !== -1}
                      provider={
                        movie &&
                        movie !== undefined &&
                        movie.provider &&
                        sortProvidersByUserPreference(
                          movie.provider,
                          providersNameArr
                        ).length > 0 &&
                        sortProvidersByUserPreference(
                          movie.provider,
                          providersNameArr
                        )
                      }
                      children={
                        <OnHoverCard
                          id={movie.id}
                          details={movie}
                          isSelected={isSelected}
                          isLiked={isLiked !== -1}
                          isDisliked={isDisliked !== -1}
                        />
                      }
                      rating={'4.9'}
                      image={movie.image}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
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
  listBox: {
    margin: 0,
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
  [theme.breakpoints.down('xs')]: {
    listBox: {
      width: '100%',
      padding: '0px 16px',
    },
  },
}));
