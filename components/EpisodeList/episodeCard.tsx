import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';
import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { ViewportContext } from '../ViewportProvider';
import { makeStyles } from '@material-ui/core/styles';

export default function EpisodeCard(props) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);

  const imageSize = (event) => {
    if (event.clientHeight > event.clientWidth) {
      console.log('Portriat');
    } else {
      console.log('Landscape');
    }
    console.log('data', event.clientHeight, event.clientWidth);
  };

  return (
    <Card className={classes.cardRoot}>
      <CardActionArea>
        <div className={classes.cardWrap}>
          <div className={classes.cardMainContent}>
            <CardMedia
              component="img"
              alt="episode list"
              image={props.img_url || "https://images.ottplay.com/static/episodeimg1.png"}
              title="Contemplative Reptile"
              className={[classes.media, classes.center].join(' ')}
              onLoad={(e) => imageSize(e.target)}
            />
          </div>
        </div>
        <CardContent className={classes.cardContentBox}>
          <Typography className={classes.episodeRelease}>
            {`S${props.season} . E${props.episode} ${
              props.date !== null ? props.date : ''
            }` || 'Episode aired'}
          </Typography>
          <Typography className={classes.episodes}>
            {props.description || 'Episode description'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  cardRoot: {
    maxWidth: '290px',
    background: 'transparent',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      opacity: 1,
    },
  },
  media: {
    borderRadius: 6,
    border: '1px solid #3d2f58',
  },
  cardWrap: {
    display: 'block',
    content: '',
    position: 'relative',
    paddingBottom: '150%', // to maintain aspect ratio 2:3
    cursor: 'pointer',
    backgroundColor: '#1E0B40',
    borderRadius: '8px',
  },
  cardMainContent: {
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
    borderRadius: '6px',
  },
  cardContentBox: {
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: 5,
    paddingBottom: 2,
  },
  episodeRelease: {
    textAlign: 'left',
    letterSpacing: '0px',
    color: '#D6C6F4',
    fontSize: 'clamp(10px, 1vw, 18px)',
    opacity: '0.7',
    fontWeight: 500,
  },
  episodes: {
    textAlign: 'left',
    fontSize: 'clamp(14px, 1.2vw, 20px)',
    fontWeight: 600,
    letterSpacing: '0px',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    lineHeight: 'clamp(16px, 1.5vw, 20px)',
    opacity: 1,
  },
  description: {
    textAlign: 'left',
    fontSize: '16px',
    letterSpacing: '0px',
    color: '#D6C6F4',
    opacity: 0.5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
  },
  [theme.breakpoints.down('xs')]: {
    episodeRelease: {
      marginBottom: 3,
    },
    episodes: {
      marginBottom: 3,
    },
    description: {
      fontSize: 12,
    },
  },
}));
