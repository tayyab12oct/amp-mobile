import { Theme, makeStyles } from '@material-ui/core/styles';

import { IMAGES } from '../public/static/newImages';
import ImageComponent from './Images';
import React from 'react';
import Router from 'next/router';
// import { history } from '../configureStore';
import { ViewportContext } from './ViewportProvider';
import { WebfoxContext } from '../services/webfox';
import { abbreviateNumber } from '../utils/helper';
import { langBg } from '../public/static/newImages/languageBg';

export function RefineDetailCard({ ...props }) {
  const { actionDispatch, actions } = React.useContext(WebfoxContext);
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const { data, isSelected, onSelect, forPage } = props;
  const renderMoviewShowCount = (item) => {
    const deatils = [
      {
        key: 'Movies',
        count: item.total_movies_published,
        isVisible: true,
        showPipe: true,
      },
      {
        key: 'Shows',
        count: item.total_shows_published,
        isVisible: true,
        showPipe: forPage === 'language' && width > 600,
      },
      // {
      //   key: 'Documentary',
      //   count: item.total_documentaries,
      //   isVisible: forPage === 'language' && width > 600,
      //   showPipe: false,
      // },
    ];

    const renderCount = (item) => {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
            const filter = {
              dataType: forPage,
              name: data.name,
            };
            actionDispatch(actions.SET_MOVIE_NAV_FILTER, filter);
            Router.push({
              pathname: item.key === 'Movies' ? '/movies' : '/shows',
            });
          }}
          className={[
            classes.countWrap,
            forPage === 'language' && width < 600 && classes.countWrapNewLine,
          ].join(' ')}
        >
          <div
            className={classes.count}
            // onClick={(e) => {
            //   e.stopPropagation();
            //   history.push({
            //     pathname: item.key === 'Movies' ? './movies' : './shows',
            //     state: { forPage, data },
            //   });
            // }}
          >
            {abbreviateNumber(item.count)}
          </div>
          <div className={classes.keys}>{item.key}</div>
        </div>
      );
    };
    return (
      <React.Fragment>
        <div className={classes.countDetailsWrap}>
          {deatils.map((item, index) => {
            return (
              item.isVisible &&
              item.count > 0 && (
                <React.Fragment>
                  {renderCount(item)}
                  {item.showPipe && <div className={classes.pipe}></div>}
                </React.Fragment>
              )
            );
          })}
        </div>
        {deatils
          .filter((item) => {
            return (
              width < 600 &&
              forPage === 'language' &&
              item.key.toLocaleLowerCase() == 'documentary' &&
              item.count > 0
            );
          })
          .map((item: any, index) => {
            return renderCount(item);
          })}
      </React.Fragment>
    );
  };

  const setCardHeight = () => {
    // to maintain aspect ratio
    switch (forPage) {
      case 'language':
        if (width < 600) {
          return '90%';
        } else return '72.4%';
      default:
        return '113.09%';
    }
  };

  const renderLanguageCard = () => {
    return (
      <div
        className={classes.langCardWarp}
        // onClick={() =>
        //   history.push({
        //     pathname: './language_details',
        //     state: {
        //       forPage,
        //       data,
        //       fromPage: props.fromPage,
        //     },
        //   })
        // }
      >
        <div className={classes.langIconWrap}>{data.icon_text}</div>
        <div className={[classes.name, classes.langName].join(' ')}>
          {data.name}
        </div>
      </div>
    );
  };

  const redirectMethod = (data) => {
    Router.push({
      pathname: './provider_details',
      query: { forPage, data, fromPage: 'Discover' },
    });
  };

  const renderProviderCard = () => {
    return (
      <ImageComponent
        className={classes.providerImage}
        alt="streaming_service_logo"
        src={data.icon_url}
        // onClick={() => redirectMethod(data)}
      />
    );
  };

  const renderCardBody = () => {
    switch (forPage) {
      case 'provider':
        return renderProviderCard();
      case 'language':
        return renderLanguageCard();
      case 'genre':
        return (
          data.icon_url && (
            <ImageComponent
              // onClick={() =>
              //   history.push({
              //     pathname: './genre_details',
              //     state: {
              //       forPage,
              //       data,
              //       fromPage: props.fromPage,
              //     },
              //   })
              // }
              alt="genre_logo"
              className={classes.image}
              src={data.icon_url}
            />
          )
        );
    }
  };

  const getLangBgImage = (language) => {
    switch (language) {
      case 'Bengali':
        return langBg.bengali;
      case 'English':
        return langBg.english;
      case 'Gujarati':
        return langBg.gujarati;
      case 'Hindi':
        return langBg.hindi;
      case 'Kannada':
        return langBg.kannada;
      case 'Malayalam':
        return langBg.malayalam;
      case 'Marathi':
        return langBg.marathi;
      case 'Punjabi':
        return langBg.punjabi;
      case 'Tamil':
        return langBg.tamil;
      case 'Telugu':
        return langBg.telugu;
      default:
        return '';
    }
  };

  return (
    <div
      className={classes.cardWrap}
      onClick={() => {
        const filter = {
          dataType: forPage,
          name: data.name,
        };
        actionDispatch(actions.SET_MOVIE_NAV_FILTER, filter);
        Router.push({
          pathname: 'movies',
        });
      }}
      style={{ paddingBottom: setCardHeight() }}
    >
      <div className={classes.content}>
        <div className={classes.center}>
          <div
            className={classes.bodyImgWrap}
            style={{
              height: forPage === 'language' && width < 600 ? '60%' : '',
              backgroundImage:
                forPage === 'language'
                  ? `url(${getLangBgImage(data.name)})`
                  : '',
            }}
          >
            {renderCardBody()}
          </div>
          {forPage !== 'language' ? (
            <div className={classes.name}>{data.name}</div>
          ) : null}
          {renderMoviewShowCount(data)}
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  cardWrap: {
    display: 'block',
    content: '',
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: 'rgb(30 11 64 / 70%)',
    borderRadius: '8px',
    '&:focus, &:hover, &:active': {
      backgroundColor: '#130726',
      backgroundImage: `url(${IMAGES.inside_bg_listing})`,
      backgroundPosition: 'bottom',
      backgroundRepeat: 'no-repeat',
      '& $name': {
        color: '#29F87E',
      },
      '& $keys': {
        opacity: 1,
      },
      '& $count': {
        color: '#29F87E',
      },
      '& $langName': {
        color: 'white',
      },
    },
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  center: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '8px',
  },
  name: {
    color: 'white',
    fontWeight: 600,
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    zIndex: 2,
    padding: '0px 7px 5px 7px',
    overflow: 'hidden',
    lineHeight: '16px',
    fontSize: 'clamp(12px, 1.2vw, 16px)',
  },
  langName: {
    color: 'white',
  },
  langIconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: '#29F87E',
    marginBottom: '8px',
    color: '#000000',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  langCardWarp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '14%',
  },
  bodyImgWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '94%',
    height: '60%',
    margin: '3.3% 0 10px 0',
    backgroundColor: 'rgb(34 12 80 / 30%)',
    borderRadius: '6px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  providerImage: {
    width: '40%',
    height: 'auto',
  },
  countDetailsWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  countWrap: {
    textAlign: 'center',
    color: '#D6C6F4',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      '& $keys': {
        opacity: 0.7,
      },
      '& $count': {
        opacity: 0.7,
      },
    },
  },
  countWrapNewLine: {
    textAlign: 'center',
  },
  keys: {
    fontSize: 'clamp(10px, 0.8vw, 12px)',
    opacity: 0.5,
  },
  count: {
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    fontWeight: 600,
    '&:hover': {
      color: '#29F87E',
      // textDecoration: 'underline',
    },
  },
  pipe: {
    width: '1px',
    height: '30px',
    backgroundColor: '#D6C6F4',
    margin: '0px 10px',
    opacity: 0.1,
    '&:last-child': {
      display: 'none',
    },
  },
}));
