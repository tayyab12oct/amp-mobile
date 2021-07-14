import { Theme, makeStyles } from '@material-ui/core/styles';

import { IMAGES } from '../public/static/newImages';
import ImageComponent from './Images';
import React from 'react';
import { genres } from '../public/static/images/genres';

export function GenresCard({ ...props }) {
  const classes = useStyles();
  const { data, isSelected, onSelect } = props;
  const [loaded, setLoaded] = React.useState(false);
  const setGenresImage = (title) => {
    switch (title) {
      case 'Action':
        return genres.action;
      case 'Adventure':
        return genres.adventure;
      case 'Animation':
        return genres.animation;
      case 'Comedy':
        return genres.comedy;
      case 'Crime':
        return genres.crime;
      case 'Documentary':
        return genres.documentary;
      case 'Drama':
        return genres.drama;
      case 'Family':
        return genres.family;
      case 'Fantasy':
        return genres.fantasy;
      case 'History':
        return genres.history;
      case 'Horror':
        return genres.horror;
      case 'Music':
        return genres.music;
      case 'Mystery':
        return genres.mystery;
      case 'Romance':
        return genres.romance;
      case 'Science Fiction':
        return genres.science_fiction;
      case 'Thriller':
        return genres.thriller;
      case 'TV Movies':
        return genres.tv_movies;
      case 'War':
        return genres.war;
      case 'Western':
        return genres.western;
      default:
        return genres.comedy;
    }
  };
  return (
    <div className={classes.cardWrap} onClick={onSelect}>
      <div className={classes.content}>
        <div
          className={classes.center}
          style={{
            backgroundImage: `url(${data.icon_url})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div
            className={[
              classes.contentWrap,
              isSelected && classes.likedContentWrap,
            ].join(' ')}
          >
            {isSelected && (
              <div className={classes.heartWrap}>
                <ImageComponent
                  alt="heart_icon"
                  className={classes.heart}
                  src={
                    loaded
                      ? 'https://images.ottplay.com/static/interestHeart.svg'
                      : '/static/newImages/new_spinner_mini.svg'
                  }
                  onLoad={() => setLoaded(true)}
                />
              </div>
            )}
            <div className={classes.name}>{data.name}</div>
            <div className={classes.bgGradient} />
          </div>
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
    paddingBottom: '72.48%', //for aspect ration of 16:9
    cursor: 'pointer',
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
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '8px',
    border: '1px solid #3d2f58',
  },
  contentWrap: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: '13px',
  },
  name: {
    zIndex: 2,
    height: '25%',
    fontWeight: 500,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  likedContentWrap: {
    color: '#29F87E',
    backgroundColor: 'rgba(20, 9, 47,0.7)',
    height: '100%',
    borderRadius: '6px',
    fontWeight: 600,
  },
  heartWrap: {
    display: 'flex',
    height: '50%',
  },
  heart: {
    width: '24px',
  },
  bgGradient: {
    zIndex: 1,
    minHeight: '61%',
    minWidth: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundImage: `url(${IMAGES.normal_botton_shadow})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));
