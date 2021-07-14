import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';

import React from 'react';
import { Spinner } from './Spinner';
import { VARIABLE } from '../utils/constants';
import { WebfoxContext } from '../services/webfox';
// import { history } from '../configureStore';

import Router from 'next/router';

function LanguageWidget(props) {
  const classes = useStyles();
  const { webfox, actionDispatch, actions } = React.useContext(WebfoxContext);
  const [result, setResult] = React.useState<any>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const forPage = 'languages';
  const getParams = () => {
    const params = {
      limit: 12,
      module_name: 'Languages',
      platform: 'web',
    };
    return params;
  };
  React.useEffect(() => {
    webfox
      .getSectionData(getParams())
      .then((response) => {
        const arr = response.data.rank.filter(
          (e) =>
            e.language &&
            e.language['status'] &&
            e.language['status'] === 'published'
        );
        setResult(arr);
        actionDispatch(
          actions.FETCH_LANGUAGE_LIST_SUCCESS,
          response.data.rank || []
        );
        setLoadingData(false);
      })
      .catch(() => {
        actionDispatch(actions.FETCH_LANGUAGE_LIST_FAILURE, []);
      });
  }, []);

  const renderlangCard = (data) => {
    return (
      <div
        className={classes.cardRoot}
        onClick={() =>
          Router.push({
            pathname: './movies',
            query: { forPage, data },
          })
        }
        // onClick={() =>
        //   history.push({
        //     pathname: './language_details',
        //     state: {
        //       forPage,
        //       data,
        //       fromPage: 'Discover',
        //     },
        //   })
        // }
      >
        <div className={classes.cardWrap}>
          <div className={classes.mainCardContainer}>
            <div className={classes.center}>
              <div className={classes.langIconWrap}>{data.icon_text}</div>
              <Typography className={classes.name}>{data.name}</Typography>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container 
      // spacing={2}
      >
        <Grid xs={12} item className={classes.widgetBox}>
          <Grid xs={12} container direction="column">
            <Grid container xs>
              <Grid xs item className={classes.text}>
                {VARIABLE.LANGUAGE_WIDGET}
              </Grid>
              <Grid xs={1} item>
                <div style={{ marginLeft: '-30px' }}>
                  <div
                    className={classes.read}
                    onClick={() =>
                      Router.push({
                        pathname: './all-language',
                        query: {
                          fromPage: 'Discover',
                        },
                      })
                    }
                  >
                    {loadingData ? '' : <React.Fragment> {VARIABLE.SEE_All} </React.Fragment>}
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container xs>
              <div className={classes.container}>
                {loadingData ? (
                  <Spinner styles={{ minHeight: '20vh' }} />
                ) : (
                  result.map((lang, i) => {
                    return renderlangCard(lang.language);
                  })
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    margin: '15px 1% 0 1%',
  },
  cardRoot: {
    minWidth: '114px',
  },
  widgetBox: {
    padding: '12px 0px 12px 0px !important',
  },
  cardWrap: {
    display: 'block',
    content: '',
    position: 'relative',
    paddingBottom: '100%', //for aspect ration of 1:1
    cursor: 'pointer',
  },
  mainCardContainer: {
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
    borderRadius: '50%',
    border: '1px solid #261648',
    background: '#1C0A39',
    transition: 'all .2s ease',
    '&:hover': {
      border: '1px solid #4A3FB3',
      '& $name': {
        color: '#29F87E',
      },
      '& $langIconWrap': {
        background: '#29F87E',
        color: '#000000',
      },
      background:
        ' transparent radial-gradient(closest-side at 50% 50%, #4E44BE 0%, #1B0D3A 100%)',
    },
  },
  container: {
    display: 'flex',
    gap: '12px',
    padding: '1rem 0px 0.5rem 0px',
    width: '100%',
    overflow: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
  },
  langIconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2.6rem',
    height: '2.6rem',
    borderRadius: '50%',
    background: '#000000',
    color: '#FFFFFF',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  name: {
    width: '100%',
    marginTop: '0.2rem',
    textAlign: 'center',
    fontSize: 'clamp(12px, 1vw, 14px)',
    letterSpacing: '0px',
    color: '#FFFFFF',
  },
  text: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: 'clamp(18px, 1.6vw, 24px)',
    // marginLeft: '1%',
  },
  read: {
    color: '#D6C6F4',
    opacity: 1,
    fontSize: 'clamp(10px, 1vw, 16px)',
    float: 'right',
    cursor: 'pointer',
    // marginRight: 12,
    '&:hover': {
      color: '#29F87E',
    },
  },
  [theme.breakpoints.down('xs')]: {
    cardRoot: {
      minWidth: '90px',
      marginRight: 8,
    },
    name: {
      fontSize: '11px',
    },
    widgetBox: {
      padding: '12px 8px 12px 8px !important',
    },
  },
}));

export default LanguageWidget;
