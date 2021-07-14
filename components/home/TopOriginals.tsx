import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import * as React from 'react';

import { Grid, Theme, makeStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  getLocalStorageData,
  sortProvidersByUserPreference,
} from '../../utils/constants';

import { FeaturedMoviesCard } from '../FeaturedMoviesCard';
import ImageComponent from '../Images';
import Slider from 'react-slick';
import { WebfoxContext } from '../../services/webfox';

export function TopOriginals(props) {
  const classes = useStyles();
  const { webstore } = React.useContext(WebfoxContext);
  const { streamingServices } = webstore;
  const [select, setSelect] = React.useState('');
  const [card, setCard] = React.useState(false);
  let providersNameArr: any = [];
  React.useEffect(() => {
    providersNameArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
      ) || [],
      streamingServices.name || []
    );
  }, []);
  const handleCard = (key) => {
    setCard(true);
    setSelect(key);
  };

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    // centerPadding: "60px",
    slidesToShow: 1,
    focusOnSelect: true,
    // eslint-disable-next-line react/display-name
    appendDots: (dots) => (
      <div
        style={{
          borderRadius: '10px',
          padding: '10px',
          marginBottom: '25px',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    // eslint-disable-next-line react/display-name
    customPaging: (i) => (
      <div style={{}}>
        <ImageComponent src="https://images.ottplay.com/static/homecarousel.svg" alt="dots" />
      </div>
    ),
  };

  const movieDetails = [
    {
      _id: '01',
      id: '01',
      match: '90% Match',
      image: 'https://images.ottplay.com/static/card1.png',
      title: 'Padmavati',
      type: 'Movie',
      provider: ['Netflix', 'Amazon'],
    },
    {
      id: '02',
      match: '90% Match',
      image: 'https://images.ottplay.com/static/demo.png',
      title: 'The Wonder Women',
      type: 'Movie',
      provider: ['Netflix', 'Amazon'],
    },
    {
      id: '03',
      match: '90% Match',
      image: 'https://images.ottplay.com/static/card4.png',
      title: 'The Witcher',
      type: 'Movie',
      provider: ['Netflix', 'Amazon'],
    },
    {
      id: '04',
      match: '90% Match',
      image: 'https://images.ottplay.com/static/card5.png',
      title: 'After Life',
      type: 'Movie',
      provider: ['Netflix', 'Amazon'],
    },
    {
      id: '05',
      match: '90% Match',
      image: 'https://images.ottplay.com/static/card6.png',
      title: 'The Dark Knight Rises',
      type: 'Movie',
      provider: ['Netflix', 'Amazon'],
    },
    {
      id: '06',
      match: '90% Match',
      image: 'https://images.ottplay.com/static/card5.png',
      title: 'Ready Or Not',
      type: 'Movie',
      provider: ['Netflix', 'Amazon'],
    },
  ];

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={2}></Grid>
        <Grid
          item
          xs={8}
          container
          direction="row"
          style={{ padding: '0 0 0 25px' }}
        >
          <Grid container xs={12}>
            <Grid xs={11} item>
              <div className={classes.text}>{props.data}</div>
            </Grid>
            <Grid xs={1} item>
              <div className={classes.read}>See All </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid xs={12} item>
          <Slider dots={true} arrows={false} {...settings}>
            {movieDetails.map((movie, i) => {
              const array =
                JSON.parse(
                  localStorage.getItem(
                    LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ
                  )
                ) || [];
              let selected;
              if (array != null) {
                selected = array.findIndex((item) => {
                  const value = movie._id
                    ? item._id === movie._id
                    : item.id === movie.id;
                  return value;
                });
              }
              return (
                <>
                  <Grid
                    xs={12}
                    item
                    className={classes.cardRoot}
                    style={{ margin: '20' }}
                  >
                    <Grid xs={3} item></Grid>
                    <Grid xs={6} item container>
                      <FeaturedMoviesCard
                        title={movie.title}
                        detail={movie}
                        selected={selected !== -1}
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
                        FeaturedMoviesCard="Home"
                      />
                    </Grid>
                    <Grid xs={3} item></Grid>
                  </Grid>
                </>
              );
            })}
          </Slider>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '2% 0',
  },
  text: {
    color: '#ffffff',
    fontSize: '24px',
    marginLeft: '-1%',
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
    fontFamily: `"Montserrat", "Arial", "sans-serif"`,
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
    margin: '0 0 0 -1.5%',
    justifyContent: 'space-between',
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '16px',
    float: 'right',
    //paddingRight: "2%",
  },
}));
