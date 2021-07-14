import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';

import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import ImageComponent from '../Images';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ViewportContext } from '../ViewportProvider';

export default function HeaderCard(props) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);

  return (
    <Card className={classes.root}>
      <Grid xs={5} sm={3} item className={classes.imgBox}>
        <ImageComponent
          src={props.image}
          className={classes.cover}
          // style={{
          //   maxHeight: width > 1300 ? '240px' : '210px',
          //   height: width > 1300 ? '240px' : '210px',
          // }}
          alt="ottplay"
        />
      </Grid>
      <Grid xs={7} sm={9} item>
        <div className={classes.details}>
          <CardContent className={classes.cardContent}>
            <Typography component="h5" variant="h5" className={classes.heading}>
              {props.name || 'The Money Heist'}
            </Typography>
            <div className={classes.subtitleBackground}>
              <Typography className={classes.subtitleBackgroundText}>
                {props.year.length > 1
                  ? props.year[0] +
                    '-' +
                    props.year[props.year.length - 1] +
                    '. '
                  : props.year[0] + '. '}
                {props.seasons > 1
                  ? props.seasons + ' Seasons'
                  : props.seasons + ' Season'}
                . {props.episodes} Episodes
              </Typography>
            </div>
            {props.certifications && props.certifications.length > 0 ? (
              <Typography className={classes.subtitleText}>
                {props.certifications}
              </Typography>
            ) : null}
            <Grid item xs={12}>
              <ImageComponent className={classes.borderImg} src="https://images.ottplay.com/static/Rectangle 3137.svg" alt="line" />
            </Grid>
            {props.genres && props.genres.length > 0 ? (
              <Typography className={classes.subtitle}>
                <span style={{ fontWeight: 'normal' }}> {props.genres}</span>
              </Typography>
            ) : null}
            {props.providers && props.providers.length > 0 ? (
              <Typography className={classes.subtitle}>
                On .
                <span style={{ fontWeight: 'normal' }}>
                  {' '}
                  {props.providers.join(' . ')}
                </span>
              </Typography>
            ) : null}
          </CardContent>
        </div>
      </Grid>
    </Card>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      background: 'transparent',
      boxShadow: 'none',
      paddingRight: 12,
      paddingBottom: 5,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    cardContent: {
      flex: '1 0 auto',
      paddingTop: 0,
    },
    imgBox: {
      padding: '4px 8px 0px 8px',
    },
    cover: {
      width: '100%',
      height: '100%',
      borderRadius: 6,
    },
    borderImg: {
      padding: 0,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    heading: {
      textAlign: 'left',
      fontSize: 'clamp(18px, 2vw, 38px)',
      letterSpacing: '0',
      fontWeight: 'bold',
      color: '#FFFFFF',
      textTransform: 'capitalize',
      opacity: '1',
      lineHeight: '40px',
    },
    subtitleBackground: {
      background: '#331A5D 0% 0% no-repeat padding-box',
      opacity: 0.5,
      padding: '4px 10px',
      borderRadius: '2px',
      marginTop: '5px',
      width: 'fit-content',
    },
    subtitleBackgroundText: {
      textAlign: 'left',
      fontSize: 'clamp(12px, 1.1vw, 16px)',
      letterSpacing: '0',
      color: '#D6C6F4',
      fontWeight: 500,
    },
    subtitle: {
      textAlign: 'left',
      fontSize: 'clamp(12px, 1.1vw, 16px)',
      letterSpacing: '0',
      color: '#D6C6F4',
      opacity: '0.7',
      marginTop: 4,
      fontWeight: 700,
    },
    subtitleText: {
      textAlign: 'left',
      fontSize: 'clamp(10px, 1.1vw, 14px)',
      letterSpacing: '0',
      color: '#D6C6F4',
      opacity: '0.7',
      marginTop: '15px',
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    [theme.breakpoints.down('xs')]: {
      root: {
        paddingRight: 0,
        marginRight: 15,
        marginLeft: 15,
      },
      cover: {
        width: '100%',
      },
      imgBox: {
        padding: '0px',
      },
      heading: {
        lineHeight: '24px',
      },
      subtitleBackground: {
        marginTop: 8,
      },
      subtitle: {
        marginTop: 4,
      },
      subtitleText: {
        marginTop: 8,
      },
      cardContent: {
        padding: 0,
        paddingLeft: 16,
        paddingBottom: '10px !important',
      },
    },
  })
);
