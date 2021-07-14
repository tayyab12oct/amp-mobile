import { Theme, makeStyles } from '@material-ui/core/styles';
import { IMAGE_BASE_URL } from '../utils/constants';
import React from 'react';
import ImageComponent from './Images';

export function CastAndCrewCard({ ...props }) {
  const classes = useStyles();
  const [loaded, setLoaded] = React.useState(false);
  const { data, isSelected, onSelect, type } = props;
  return (
    <div className={classes.cardWrap} onClick={onSelect}>
      <div className={classes.content}>
        <div className={classes.center}>
          <div className={classes.actorImgWrap}>
            <ImageComponent
              className={classes.actorImg}
              src={
                !loaded
                  ? `/static/newImages/new_spinner_mini.svg`
                  : type == 'crew'
                  ? data.crew.headshot
                  : data.cast.headshot
              }
              alt={'actor/filmmaker_image'}
              onLoad={() => setLoaded(true)}
            />
          </div>
          <div
            className={[classes.name, isSelected && classes.nameLiked].join(
              ' '
            )}
          >
            {type == 'crew' ? data.crew.name : data.cast.name}
          </div>
          {isSelected && (
            <div className={classes.likedContentWrap}>
              <div className={classes.heartWrap}>
                <ImageComponent
                  alt={'heart_image'}
                  className={classes.heart}
                  src={`${IMAGE_BASE_URL}/interestHeart.svg`}
                />
              </div>
            </div>
          )}
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
    paddingBottom: '126.77%', // to maintain aspect ratio
    cursor: 'pointer',
    backgroundColor: '#1E0B40',
    borderRadius: '8px',
    '&:focus, &:hover, &:active': {
      opacity: 0.8,
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
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '8px',
    border: '1px solid #3d2f58',
  },
  name: {
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    zIndex: 2,
    fontWeight: 500,
    // height: '25%',
    margin: '0px 7px 5px 7px',
    overflow: 'hidden',
    lineHeight: '16px',
    fontSize: '13px',
  },
  nameLiked: {
    color: '#29F87E',
    fontWeight: 500,
  },
  actorImgWrap: {
    width: '100%',
    height: '75%',
    padding: '7px 14px 6px 14px',
  },
  actorImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  likedContentWrap: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(20, 9, 47,0.7)',
    height: '100%',
    width: '100%',
    borderRadius: '8px',
  },
  heartWrap: {
    display: 'flex',
    height: '75%',
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
  },
}));
