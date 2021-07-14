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
} from '../../utils/constants';
import React, { useContext } from 'react';

import { MoviesList } from '../MoviesList';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import { makeStyles } from '@material-ui/styles';

export default function ProfileMovies(props) {
  const classes = useStyles();
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);
  const { languages, likedMovieCard, streamingServices } = webstore;
  let tag;
  let movieDetails;
  if (props.data === 'liked') {
    movieDetails = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ)
      ) || [],
      likedMovieCard.liked || []
    ).reverse();
    tag = 'liked';
  } else {
    movieDetails = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.HIDDEN_DATA_OBJ)
      ) || [],
      webstore.hideMovie.hidden
    ).reverse();
    tag = 'hidden';
  }

  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [noResults, setNoResults] = React.useState(false);
  const [select, setSelect] = React.useState('');
  const [card, setCard] = React.useState(false);
  const [close, setClose] = React.useState(false);

  const handleCard = (key) => {
    setCard(true);
    setSelect(key);
    console.log('key is', key);
  };

  const { width } = React.useContext(ViewportContext);

  let results = [] as any;
  results = movieDetails.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm)
  );

  React.useEffect(() => {
    setSearchResults(results);
    if (results.length === 0) {
      setNoResults(true);
    }
  }, [searchTerm]);

  const handleClose = (details) => {
    setClose(!close);
  };

  return (
    <div className={classes.root}>
      <Grid container xs={12} item>
        <Grid item xs={12} container direction="row" alignItems="center">
          <Grid xs={12} item container spacing={2} className={classes.listBox}>
            {movieDetails.length > 0 ? (
              <MoviesList results={movieDetails} tag={tag} source={'Profile'} />
            ) : (
              ''
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
    root: {
      minHeight: '58vh',
    },
    listBox: {
      width: '100%',
    },
  },
}));
