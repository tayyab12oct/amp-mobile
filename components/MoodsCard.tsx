import { CardContent, Typography } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export function MoodsCards(props) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root} onClick={props.onClick}>
        <CardActionArea disableRipple>
          <CardMedia
            className={classes.mediaCard}
            component="img"
            alt="card Image"
            image={props.image}
            title="card Image"
          />
        </CardActionArea>
        <CardActions className={classes.platforms}>
          <span className={classes.movie}>
            {`${props.type}`}
            {props.provider ? <span style={{ marginLeft: 2 }}>.</span> : null}
            <span className={classes.platformsDesc}>
              {`${props.provider}`}
              {props.provider ? <span>.</span> : null}
            </span>
          </span>
        </CardActions>
      </Card>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    outline: 'none',
    boxShadow: 'none',
    margin: '20px 0px 0',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      opacity: 1,
    },
  },
  content: {
    padding: '10px 0px 0px',
  },
  match: {
    letterSpacing: '0.84px',
    fontSize: '12px',
    color: '#03F87E',
    textTransform: 'uppercase',
    opacity: 1,
  },
  platforms: {
    textAlign: 'left',
    opacity: '0.6',
    fontSize: '14px',
    letterSpacing: '0px',
    color: '#D6C6F4',
    padding: '0px',
    marginTop: '8px',
  },
  platformsDesc: {
    textAlign: 'left',
    opacity: '0.8',
    fontSize: 'clamp(10px, 1vw, 14px)',
    letterSpacing: '0px',
    color: '#D6C6F4',
    padding: '0px',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    fontWeight: 400,
    paddingLeft: 2,
  },
  mediaCard: {
    position: 'relative',
    borderRadius: '15% 14% 18% 20%',
    height: '214px',
    width: '100%',
  },
  movie: {
    textAlign: 'left',
    marginLeft: '2.5%',
    fontSize: '22px',
    letterSpacing: '0px',
    color: '#FFFFFF',
    padding: '0px',
  },
});
