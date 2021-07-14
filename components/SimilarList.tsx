import { DisLikeCard, SimilarMovieCards } from './SimilarMovieCards';
import { Grid, Theme } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  getLocalStorageData,
  sortProvidersByUserPreference,
} from '../utils/constants';
import { MovieCards, OnHoverCard } from './MovieCards';
import React, { useContext } from 'react';

import { WebfoxContext } from '../services/webfox';
// import { history } from '../configureStore';
import { makeStyles } from '@material-ui/styles';

export function SimilarList(props) {
  const classes = useStyles();

  const { webstore } = useContext(WebfoxContext);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [noResults, setNoResults] = React.useState(false);
  const [select, setSelect] = React.useState('');
  const [card, setCard] = React.useState(false);
  const [listData, setListData] = React.useState<any>([]);

  React.useEffect(() => {
    setListData(props.results);
  }, [props.results]);

  const handleCard = (key) => {
    setCard(true);
    setSelect(key);
    console.log('key is', key);
  };

  // let results = [] as any;
  // results = movieDetails.filter((movie) =>
  //   movie.title.toLowerCase().includes(searchTerm)
  // );

  // React.useEffect(() => {
  //   setSearchResults(results);
  //   if (results.length === 0) {
  //     setNoResults(true);
  //   }
  // }, [searchTerm]);
  const deleteData = (details) => {
    setListData(
      listData.filter(function (obj, i) {
        return i !== details;
      })
    );
  };
  const { streamingServices } = webstore;
  const providersNameArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
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
          <Grid xs={12} item container 
          // spacing={2} 
          className={classes.listBox}>
            {listData &&
              listData.map((movie, i) => {
                const array: any = webstore.watchlistArr.watchlistArr;
                let isSelected;
                if (array != null) {
                  isSelected = array.findIndex((item) =>
                    movie.ottplay_id
                      ? item.ottplay_id === movie.ottplay_id
                      : item.id === movie.id
                  );
                }
                const likedArray: any = webstore.likeArr.liked;
                let isLiked;
                if (likedArray != null) {
                  isLiked = likedArray.findIndex((item) =>
                    movie.ottplay_id
                      ? item.ottplay_id === movie.ottplay_id
                      : item.id === movie.id
                  );
                }
                const hiddenArray: any = webstore.hideMovie.hidden;
                let isHidden;
                if (hiddenArray != null) {
                  isHidden = hiddenArray.findIndex((item) =>
                    movie.ottplay_id
                      ? item.ottplay_id === movie.ottplay_id
                      : item.id === movie.id
                  );
                }
                const dislikeArray: any = webstore.dislikedMovie.dislike;
                let isDisliked;
                if (dislikeArray != null) {
                  isDisliked = dislikeArray.findIndex((item) =>
                    movie.ottplay_id
                      ? item.ottplay_id === movie.ottplay_id
                      : item.id === movie.id
                  );
                }
                return (
                  <Grid item xs={6} md={2}>
                    <MovieCards
                      screen={'see_all'}
                      match={Math.trunc(movie.match_score)}
                      key={movie._id}
                      title={movie.name}
                      type={'Movie'}
                      details={movie}
                      i={i}
                      onCardClick={() => {
                        const content_type =
                          movie.content_type === 'movie' ? 'movie' : 'show';
                        // handleCard(
                        //   history.push(`/${content_type}/${movie.seo_url}`)
                        // );
                      }}
                      close={true}
                      isDisliked={isDisliked !== -1}
                      provider={
                        movie &&
                        movie !== undefined &&
                        movie.where_to_watch &&
                        sortProvidersByUserPreference(
                          movie.where_to_watch,
                          providersNameArr
                        ).slice(0, 2).length > 0 &&
                        sortProvidersByUserPreference(
                          movie.where_to_watch,
                          providersNameArr
                        ).map((pro) => pro.provider && pro.provider.name)
                      }
                      children={(setLikePopup, setDisLikePopup, setHover) => (
                        <OnHoverCard
                          id={movie._id}
                          details={movie}
                          isSelected={isSelected !== -1}
                          isLiked={isLiked !== -1}
                          isDisliked={isDisliked !== -1}
                          isHidden={isHidden !== -1}
                          setLikePopup={setLikePopup}
                          setHover={setHover}
                          tag={props.tag}
                          setDisLikePopup={setDisLikePopup}
                          delete={() => deleteData(i)}
                          onCardClick={() => {
                            const content_type =
                              movie.content_type === 'movie' ? 'movie' : 'show';
                            // handleCard(
                            //   history.push(`/${content_type}/${movie.seo_url}`)
                            // );
                          }}
                        />
                      )}
                      rating={movie.ottplay_rating}
                      image={movie.img_url}
                    />
                  </Grid>
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
      padding: '0px 10px',
    },
  },
}));
