import * as React from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';

import EpisodeCard from '../../EpisodeList/episodeCard';
import { ViewportContext } from '../../ViewportProvider';
import { getCardSize } from '../../../utils/helper';

export default function Episodes(props) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);

  return (
    <div className={classes.root}>
      <Grid
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          container
          direction="row"
          className={classes.episodeBox}
        >
          <Grid container xs={12} className={classes.episodeInnerBox}>
            <Grid xs={9} item className={classes.textBox}>
              <Typography className={classes.text}>Episodes</Typography>
              <div className={classes.notIE} style={{ marginRight: '5%' }}>
                <span className={classes.fancyArrow}></span>
                <select
                  className={classes.selection}
                  onChange={props.handleDropdown}
                >
                  {props.seasons &&
                    props.seasons
                      .sort((a, b) => a.season_number - b.season_number)
                      .map((n) => (
                        <option
                          className={classes.selection}
                          value={n.season_number}
                        >
                          Season {n.season_number}
                        </option>
                      ))}
                  {/* <option
                    className={classes.selectionContent}
                  >
                    Season 1
                  </option> */}
                </select>
              </div>
            </Grid>
            {props.episodes.length > 6 ? (
              <Grid xs={3} item className={classes.rightBox}>
                <Typography className={classes.details} onClick={props.onClick}>
                  See All{' '}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
          <Grid
            container
            // xs={12}
            spacing={2}
            direction="row"
            //justify="space-between"
            alignItems="flex-start"
            // className={classes.episodeCardBox}
            className={classes.gridContainer}
            style={{
              gridTemplateColumns:
                width > 600
                  ? getCardSize(props.episodes, 'widget')
                  : 'repeat(6, minmax(128px, 1fr))',
            }}
          >
            {props.episodes &&
              props.episodes.slice(0, 6).map((list) => {
                return (
                  <EpisodeCard
                    season={list.season_number}
                    img_url={list.poster_url || "https://images.ottplay.com/static/default-image.jpg"}
                    episode={list.episode_number}
                    description={list.name}
                    date={list.air_date}
                  />
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
    flexGrow: 1,
    margin: '20px 0 20px 0',
  },
  episodeBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textBox: {
    display: 'flex',
    justifyContent: 'left',
    marginBottom: 12,
  },
  rightBox: {
    display: 'flex',
    justifyContent: 'right',
  },
  text: {
    fontSize: 'clamp(16px, 1.6vw, 24px)',
    color: '#ffffff',
    fontWeight: 500,
    marginRight: 20,
  },
  details: {
    letterSpacing: '0',
    color: '#D6C6F4',
    opacity: '0.8',
    margin: '10px',
    textAlign: 'right',
    marginRight: 16,
    width: '100%',
    cursor: 'pointer',
    fontSize: 'clamp(10px, 1.1vw, 16px)',
  },
  episodeInnerBox: {
    marginBottom: '0px',
  },
  media: {
    height: 140,
  },
  name: {
    width: '100%',
    height: '27px',
    textAlign: 'left',
    fontSize: '22px',
    fontWeight: 'bold',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    margin: '10px',
  },
  cardRoot: {
    flexGrow: 1,
    margin: '10px 0 20px 0',
    color: '#ffffff',
    backgroundColor: '#1B0D34',
  },
  dropDown: {
    height: '35px',
    width: '100%',
    color: '#D6C6F4',
    backgroundColor: '#1B0D34',
    borderRadius: '20px',
    fontSize: '25px',
    paddingLeft: '10px',
    borderColor: 'transparent',
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '16px',
    float: 'right',
    paddingRight: '8px',
  },
  selection: {
    width: 150,
    height: 38,
    outline: 'none',
    background: '#190547',
    color: '#D6C6F4',
    border: '1px solid #695197',
    borderRadius: '30px',
    padding: '3% 12%',
    fontSize: 'clamp(16px, 1.2vw, 20px)',
    appearance: 'none',
    marginTop: '-2%',
  },
  selectionContent: {
    outline: 'none',
    border: '1px solid #D6C6F433 !important',
    marginTop: '1%',
    borderRadius: '25px',
  },
  notIE: {
    position: 'relative',
    display: 'inline-block',
  },
  select: {
    display: 'inline-block',
    height: '30px',
    width: '150px',
    outline: 'none',
    color: '#74646E',
    border: '1px solid #C8BFC4',
    borderRadius: '4px',
    boxShadow: 'inset 1px 1px 2px #DDD8DC',
    background: '#FFF',
    appearance: 'none',
    WebkitAppearance: 'none',
    // webkit-appearance: 'none',
    // -moz-appearance: 'none',
    padding: '2px 30px 2px 2px',
    '&:-ms-expand': {
      display: 'none !important',
    },
  },
  fancyArrow: {
    width: '14px',
    height: '24px',
    position: 'absolute',
    display: 'inline-block',
    top: '10%',
    right: '3px',
    background: `url("static/images/dropDown.svg") right / 100% no-repeat`,
    pointerEvents: 'none',
    marginRight: '8%',
  },
  episodeCardBox: {},
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    padding: '0.5rem 0px',
    width: '100%',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
  },
  [theme.breakpoints.down('xs')]: {
    selection: {
      width: 103,
      height: 30,
      fontSize: 12,
    },
    episodeBox: {
      padding: 0,
    },
    details: {
      fontSize: 10,
    },
    episodeInnerBox: {
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
    },
    fancyArrow: {
      top: 9,
      right: 5,
      width: 11,
      height: 6,
    },
    episodeCardBox: {
      margin: 0,
      flexWrap: 'nowrap',
      overflow: 'scroll',
    },
    episodeCardInnerBox: {
      padding: '0px !important',
      marginRight: 10,
    },
  },
}));
