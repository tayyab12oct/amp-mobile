import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  LOCALSTORAGE_KEY_CONSTANTS,
  getLocalStorageData,
  sortProvidersByUserPreference,
} from '../../utils/constants';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useContext, useEffect } from 'react';

import { FeatureCard } from './FeatureCard';
import { Grid } from '@material-ui/core';
import { IMAGES } from '../../public/static/newImages';
import ImageComponent from '../Images';
import React from 'react';
import { ViewportContext } from '../ViewportProvider';
//import { Spinner } from '../Spinner';
//import Slider from 'react-slick';
import { WebfoxContext } from '../../services/webfox';
import dynamic from 'next/dynamic';

// const Slider = dynamic(import('react-slick'), {
//   ssr: false,
//   loading: () => <p>Loading...</p>
// });

// const FeatureCard: any = dynamic(
//   import('./FeatureCard').then(
//     (module) => {
//       const { FeatureCard } = module;
//       return FeatureCard;
//     },
//   ),
//   { ssr: false }
// );

export function FeaturedWidget({ ...props }) {
  const [isServer, setServerState] = React.useState(true);
  const Slider = dynamic(import('react-slick'), {
    ssr: false,
    loading: () => (
      <div className={classes.spinnerRoot}>
        <img
          src="/static/newImages/new_spinner_mini.svg"
          alt="Loading gif"
          className={classes.spinner}
        />
      </div>
    ),
  });
  useEffect(() => void setServerState(false), []);

  const { webstore } = useContext(WebfoxContext);
  const { streamingServices } = webstore;
  const { width } = React.useContext(ViewportContext);
  const { result } = props;
  const classes = useStyles();
  const providersNameArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
  );

  function CustomNavArrow(props) {
    const { onClick, direction } = props;
    return (
      <div
        className={[
          classes.arrowWrap,
          direction === 'left' ? classes.leftArrow : '',
        ].join(' ')}
        onClick={onClick}
      >
        <ImageComponent
          src={IMAGES.right_arrow_active}
          alt="right_arrow_icon"
        />
      </div>
    );
  }

  const sliderSettings = {
    slidesToShow: 1,
    infinite: true,
    prevArrow: <CustomNavArrow direction="left" />,
    nextArrow: <CustomNavArrow direction="right" />,
    centerPadding: '80px',
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1990,
        settings: {
          slidesToShow: 5,
          centerMode: true,
          centerPadding: '8%',
        },
      },
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          centerMode: true,
          centerPadding: '5%',
        },
      },
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          arrows: false,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '60px',
          arrows: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
          arrows: false,
        },
      },
    ],
  };

  const getResultArray = () => {
    if (width < 600) {
      return result;
    } else return result.concat(result);
  };

  return (
    <Grid xs={12} container style={{ position: 'relative' }}>
      {width > 600 && (
        <Grid sm={1} lg={1} item>
          <div className={classes.effects}></div>
        </Grid>
      )}

      <Grid
        xs={12}
        sm={10}
        lg={10}
        item
        className={[classes.carouselBox, 'CarouselMultiPage'].join(' ')}
        id="home"
      >
        <Slider {...sliderSettings} key={isServer ? 'server' : 'client'}>
          {result &&
            result.length > 0 &&
            getResultArray().map((movie, index) => {
              const array =
                JSON.parse(
                  typeof window !== 'undefined' &&
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
                  <FeatureCard
                    movie={movie}
                    provider={
                      movie &&
                      movie !== undefined &&
                      movie.where_to_watch &&
                      sortProvidersByUserPreference(
                        movie.where_to_watch,
                        providersNameArr
                      ).length > 0 &&
                      sortProvidersByUserPreference(
                        movie.where_to_watch,
                        providersNameArr
                      )
                    }
                    sourcePage={props.sourcePage}
                  />
                </>
              );
            })}
        </Slider>
      </Grid>

      {width > 600 && (
        <Grid sm={1} lg={1} item>
          <div className={classes.effects1}></div>
        </Grid>
      )}
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  carouselBox: {
    marginBottom: '24px',
    marginTop: '8px',
    width: '100px',
  },
  spinnerRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50vh',
  },
  spinner: {
    width: '8vw',
    minWidth: '24px',
    maxWidth: '40px',
  },
  effects: {
    left: '0px',
    width: '25%',
    // height: '384px',
    bottom: '24px',
    background:
      'transparent linear-gradient(270deg, #1B0D3400 0%, #1B0D34E2 53%, #1B0D34 100%) 0% 0% no-repeat padding-box',
    opacity: 1,
    position: 'absolute',
    zIndex: 2,
    top: '0px',
  },
  effects1: {
    width: '25%',
    // height: '384px',
    bottom: '24px',
    background:
      'transparent linear-gradient(90deg, #1B0D3400 0%, #1B0D34E2 53%, #1B0D34 100%) 0% 0% no-repeat padding-box',
    opacity: 1,
    top: '0px',
    position: 'absolute',
    zIndex: 0,
    right: '0px',
    float: 'right',
  },

  arrowWrap: {
    cursor: 'pointer',
    minWidth: '60px',
    minHeight: '60px',
    borderRadius: '50%',
    display: 'flex',
    position: 'absolute',
    right: '-30px',
    top: '50%',
    transform: 'translate(0, -50%)',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#130726',
    border: '1px solid #342050',
    zIndex: 3,
    '&:hover': {
      border: '1px solid #29F87E',
    },
  },
  leftArrow: {
    left: '-30px',
    right: '100%',
    transform: 'translate(0, -50%) rotate(180deg)',
  },

  [theme.breakpoints.down('xs')]: {
    carouselBox: {
      marginBottom: '1rem',
    },
    arrowWrap: {
      minWidth: '40px',
      minHeight: '40px',
      right: '20px',
    },
    leftArrow: {
      left: '20px',
      right: '100%',
    },
    effects: {
      bottom: '0px',
    },
    effects1: {
      bottom: '0px',
    },
  },
}));
