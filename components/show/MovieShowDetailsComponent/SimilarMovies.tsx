import * as React from 'react';

import { Grid, Theme, makeStyles } from '@material-ui/core';
import {
  HOME_SCREEN_SECTIONS,
  LOCALSTORAGE_KEY_CONSTANTS,
  VARIABLE,
  getLocalStorageData,
} from '../../../utils/constants';


import { MoviesList } from '../../MoviesList';
import { WebfoxContext } from '../../../services/webfox';
// import { history } from '../../../configureStore';

import Router from 'next/router';

interface routeState {
  title: string,
  data: {}
}

export default function SimilarMovies(props) {
  // const { data, title, fullResults } = props;
  const classes = useStyles();
  const [select, setSelect] = React.useState('');
  const [card, setCard] = React.useState(false);
  const fullData = props.fullResults.data;
  const [results, setResults] = React.useState(props.data);
  const [fullResults, setFullResults] = React.useState({
    ...props.fullResults,
    fullData,
  });
  console.log('props.fullResults: ', props.fullResults);
  const handleCard = (key) => {
    setCard(true);
    setSelect(key);
    console.log('key is', key);
  };
  const handleFetchMore = () => {
    console.log('handleFetchMore: ', handleFetchMore);
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
  const { webstore } = React.useContext(WebfoxContext);
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        {/* <Grid item xs={1} sm={1} md={1} lg={1}></Grid> */}
        <Grid
          item
          xs={12}
          container
          direction="row"
          // style={{ padding: '0 0 0 25px' }}
        >
          <Grid container xs={12}>
            <Grid xs={10} sm={10} md={10} lg={10} item>
              <div className={classes.text}>{setWidgetsTitle(props.title)}</div>
            </Grid>
            <Grid xs={2} item className={classes.seeAll}>
              {fullResults &&
                fullResults.fullData &&
                (props.title == HOME_SCREEN_SECTIONS.EDITORS_CHOICE
                  ? fullResults.fullData.length - 6 > 6
                  : fullResults.fullData.length > 6) && (
                  <div
                    className={classes.read}
                    onClick={() => {
                      // history.push('./see_all/' + props.title)
                      Router.push({
                        pathname:
                          '/see_all/' +
                          setWidgetsTitle(props.title)
                            .toLowerCase()
                            .replaceAll(' ', '-'),
                        query:  {
                          title: setWidgetsTitle(props.title),
                          data: fullResults,
                          section: props.section,
                          // handleFetchMore: handleFetchMore,
                        },
                      });
                    }}
                  >
                    See All{' '}
                  </div>
                )}
            </Grid>
          </Grid>
          <Grid xs={12} item container>
            <MoviesList
              source={'Similar Movies'}
              results={results}
              tag={'similar'}
              referance={props.referance}
              screen={props.screen}
              dontShowProviders={
                results.length > 0 &&
                (props.title === HOME_SCREEN_SECTIONS.PICKS_FROM_NETFLIX ||
                  props.title === HOME_SCREEN_SECTIONS.HOT_ON_HOTSTAR ||
                  props.title === HOME_SCREEN_SECTIONS.PRIME_VIDEO_PATAKAS ||
                  props.title === HOME_SCREEN_SECTIONS.SONY_LIV ||
                  props.title === HOME_SCREEN_SECTIONS.ZINGER_ZEE5)
              }
              dontShowContentType={
                results.length > 0 &&
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
    // height: '100%',
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
    // height: '240px',
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
    // margin: '0 0 0 -1.5%',
    // justifyContent: 'space-between'
  },
  read: {
    color: '#D6C6F4',
    opacity: 1,
    fontSize: 'clamp(10px, 1vw, 16px)',
    float: 'right',
    cursor: 'pointer',
    //paddingRight: "2%",
  },
  [theme.breakpoints.down('xs')]: {
    text: {
      fontWeight: 500,
    },
  },
}));
