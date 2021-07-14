import * as React from 'react';

import { Grid } from '@material-ui/core';
import { PillButton } from '../PillButton';
import { Theme } from '@material-ui/core/styles';
import { WebfoxContext } from '../../services/webfox';
import { makeStyles } from '@material-ui/styles';

export function GenreButtons(props) {
  const classes = useStyles();

  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = React.useContext(WebfoxContext);

  const allData =
    props.from === 'news'
      ? [
          { id: 1, value: 'all', name: 'All' },
          { id: 2, value: 'DM', name: 'Desi Martini' },
          { id: 3, value: 'LM', name: ' Live Mint' },
          { id: 4, value: 'HT', name: 'Hindustan Times' },
          { id: 5, value: 'FC', name: 'Film Companion' },
        ]
      : [
          { id: 1, value: 'common', name: 'All' },
          { id: 11, value: 'movie', name: 'Movies' },
          { id: 2, value: 'show', name: 'Shows' },
          { id: 3, value: 'actor', name: 'Actor' },
          // { id: 4, value: 'Short films', name: 'Short films' },
          // { id: 5, value: 'Documentaries', name: 'Documentaries' },
          // { id: 7, value: 'Genres', name: 'Genres' },
        ];

  // { id: 1, value: 'all', name: 'Latest News' },
  // { id: 2, value: 'trending', name: 'Trending' },
  // { id: 3, value: 'topnews', name: 'Top News' },
  // { id: 4, value: 'mostread', name: 'Most Read' },
  // { id: 3, value: 'newrelease', name: 'New Releases' },
  // { id: 4, value: 'review', name: 'Reviews' },
  // DM – Desi Martini, FC – Film Companion, HT – Hindustan Times, LM – Live Mint

  const handleButtons = (value: any) => {
    const buttonIds: any = [];
    buttonIds.push(value);
    props.setButton(value);
    props.onSelect(value);
  };

  return (
    <div className={classes.root}>
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ padding: '0 0.8% 4px 0' }}
        className={classes.pillButton}
        wrap="nowrap"
      >
        {/* <PillButton
            onClick={() => console.log("All")}
            style={{
              backgroundColor: "#03F87E",
              color: "#190547",
              fontWeight: "600",
              padding: '3px 50px',
            }}
            text="All"
          /> */}
        {allData.map((genre, i) => {
          return (
            <PillButton
              key={i}
              value={genre.value}
              i={i}
              className={
                props.button.includes(genre.value)
                  ? classes.online
                  : classes.offline
              }
              onClick={() => handleButtons(genre.value)}
              //onClick={props.handleButtons}
              style={{
                color: `${
                  props.button.includes(genre.value) ? '#03F87E' : '#fff'
                }`,
                backgroundColor: `${
                  props.button.includes(genre.value) ? '#130726' : 'transparent'
                }`,
                fontWeight: `${props.button.includes(genre.value) ? 600 : 400}`,
              }}
              text={genre.name}
            />
          );
        })}
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    //width: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  pillButton: {
    marginTop: '10px',
    marginBottom: '5px',
    overflowX: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  online: {
    whiteSpace: 'nowrap',
    border: '1px solid #130726',
    padding: '2px 15px',
    margin: '0 5px',
    borderRadius: '50px',
    fontSize: 'clamp(14px, 1vw, 22px)',
    fontWeight: 600,
    textTransform: 'capitalize',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#190547',
    },
  },
  offline: {
    whiteSpace: 'nowrap',
    border: '1px solid rgb(255 255 255 / 20%)',
    padding: '2px 15px',
    margin: '0 5px',
    borderRadius: '50px',
    fontSize: 'clamp(14px, 1vw, 22px)',
    fontWeight: 200,
    textTransform: 'capitalize',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#190547',
    },
  },
  filterCount: {
    height: '25px',
    width: '25px',
    backgroundColor: '#FF4376',
    borderRadius: '50%',
    color: ' #ffffff',
    fontSize: '14px !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFilter: {
    visibility: 'hidden',
  },
  [theme.breakpoints.down('xs')]: {
    online: {
      padding: '4px 22px',
      minWidth: 'fit-content',
    },
    offline: {
      padding: '4px 22px',
      minWidth: 'fit-content',
    },
    pillButton: {
      marginLeft: 10,
    },
  },
}));
