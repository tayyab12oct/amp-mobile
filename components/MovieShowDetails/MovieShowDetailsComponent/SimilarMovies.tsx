import * as React from 'react';

import { Grid, Theme, makeStyles } from '@material-ui/core';
import { HOME_SCREEN_SECTIONS, VARIABLE } from '../../../utils/constants';

import { MoviesList } from '../../MoviesList';
import { useRouter } from 'next/router';

export function SimilarMovies(props) {
  // const { data, title, fullResults } = props;
  const { data } = props
  const router = useRouter();
  const classes = useStyles();
  const [select, setSelect] = React.useState('');
  const [card, setCard] = React.useState(false);
  const [results, setResults] = React.useState(data);
  const handleCard = (key) => {
    setCard(true);
    setSelect(key);
  };
  const handleFetchMore = () => {
    props.handleFetchMore();
  };

  const setWidgetsTitle = (screen) => {
    switch (screen) {
      case HOME_SCREEN_SECTIONS.EDITORS_CHOICE:
        return "Editor's choice";
      case HOME_SCREEN_SECTIONS.PICKS_FROM_NETFLIX:
        return 'Picks from Netflix';
      case HOME_SCREEN_SECTIONS.SONY_LIV:
        return VARIABLE.SONY_LIV_TITLE;
      case HOME_SCREEN_SECTIONS.ZINGER_ZEE5:
        return VARIABLE.ZINGER_ZEE5_TITLE;
      default:
        return screen;
    }
  };
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} container direction="row">
          <Grid container xs={12}>
            <Grid xs={10} sm={10} md={10} lg={10} item>
              <div className={classes.text}>{setWidgetsTitle(props.title)}</div>
            </Grid>
            <Grid xs={2} item className={classes.seeAll}>
              {props.seeAll && props.fullResults?.length > 6 ? (
                <div
                  className={classes.read}
                  onClick={() => {
                    router.push({
                      pathname: '/see-all',
                      query: {
                        title: setWidgetsTitle(props.title),
                        section: props.section,
                      },
                    });
                  }}
                >
                  See All{' '}
                </div>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
          <Grid xs={12} item container>
            <MoviesList
              source={'Similar Movies'}
              results={[...results]}
              tag={'similar'}
              screen={props.screen}
              referance={props.referance}
              dontShowProviders={
                [...results].length > 0 &&
                (props.title === HOME_SCREEN_SECTIONS.PICKS_FROM_NETFLIX ||
                  props.title === HOME_SCREEN_SECTIONS.HOT_ON_HOTSTAR ||
                  props.title === HOME_SCREEN_SECTIONS.PRIME_VIDEO_PATAKAS ||
                  props.title === HOME_SCREEN_SECTIONS.SONY_LIV ||
                  props.title === HOME_SCREEN_SECTIONS.ZINGER_ZEE5)
              }
              dontShowContentType={
                [...results].length > 0 &&
                props.title === HOME_SCREEN_SECTIONS.TOP_DOCUMENTARIES
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '15px 0 0 0',
  },
  text: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: 'clamp(18px, 1.6vw, 24px)',
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
  seeAll: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  },
  read: {
    color: '#D6C6F4',
    opacity: 1,
    fontSize: 'clamp(10px, 1vw, 16px)',
    float: 'right',
    cursor: 'pointer',
    '&:hover': {
      color: '#29F87E',
    },
  },
  [theme.breakpoints.down('xs')]: {
    text: {
      // fontWeight: 500,
    },
  },
}));
