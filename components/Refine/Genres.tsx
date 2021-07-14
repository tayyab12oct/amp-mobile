import { GenresCard } from '../GenresCard';
import { PillButton } from '../PillButton';
import { RefineCard } from '../RefineCard';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import React, { useContext } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import Switch from 'react-switch';
import { WebfoxContext } from '../../services/webfox';
import ImageComponent from '../Images';

export function Genres(props) {
  const classes = useStyles();
  const [loadingData, setLoadingData] = React.useState(true);
  const [results, setResults] = React.useState<any[]>([]);
  // const [wasClear, setWasClear] = React.useState(false as any);
  const [select, setSelect] = React.useState(false as any);
  const [another, setAnother] = React.useState(false as any);
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);
  let gensArray = getLocalStorageData(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.GENRE_IDS)) ||
      [],
    webstore.refineGenres.selectedRefineGenres.map((item) => item.genre)
  );
  const [genArray, setGenArray] = React.useState(gensArray as any);
  React.useEffect(() => {
    setGenArray(
      getLocalStorageData(
        JSON.parse(
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.GENRE_IDS)
        ) || [],
        webstore.refineGenres.selectedRefineGenres.map((item) => item.genre)
      )
    );
  }, [webstore.refineGenres.selectedRefineGenres]);
  React.useEffect(() => {
    if (props.forPage && props.forPage === 'refine') {
      console.log('ss props: ', props);
      if (props.clear === true) {
        setSelect(true);
        setAnother(true);
        actionDispatch(actions.SET_REFINE_GENRE, {
          toggle: false,
          genre: 2,
        });
        // setGenArray([]);
      }
      if (props.selectAll === true) {
        setSelect(true);
        setAnother(false);
        results.map((item) => {
          actionDispatch(actions.SET_REFINE_GENRE, {
            toggle: props.selectAll,
            genre: item._id,
            name: item.name,
          });
        });
      }
    }
  }, [props.clear, props.selectAll, results]);
  React.useEffect(() => {
    if (props.forPage && props.forPage === 'refine') {
      console.log('selectedStreamingServices:', props.selectAll);
      if (
        props.selectAll === false &&
        props.clear === false &&
        select === true &&
        another === false
      ) {
        actionDispatch(actions.SET_REFINE_GENRE, {
          toggle: false,
          genre: 2,
        });
      }
    }
  }, [props.clear, props.selectAll, results, select]);
  React.useEffect(() => {
    console.log(
      'selectedGenres:',
      webstore.refine.forYou.selectedGenres.length
    );
    if (props.forPage && props.forPage === 'refine') {
      if (webstore.refine.forYou.selectedGenres.length !== 0) {
        setGenArray(webstore.refine.forYou.selectedGenres);
      } else {
        setGenArray([]);
      }
    }
  }, [webstore.refine.forYou.selectedGenres]);
  React.useEffect(() => {
    const params = {
      limit: 40,
    };

    webfox.getAllGenresList(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_GENRES_LIST_FAILURE, []);
      }
      console.log('response: ' + JSON.stringify(data));
      actionDispatch(actions.FETCH_GENRES_LIST_SUCCESS, data || []);
      if (data && data.genres) {
        setResults(
          data.genres.filter((item) => {
            return item.hasOwnProperty('icon_url');
          })
        );
        setLoadingData(false);
        console.log('genres', data.genres);
      }
    });
    setLoading(false);
    console.log(
      'webstore.refine.forYou.unSelectedAllGenres: ',
      webstore.refine.forYou.unSelectedAllGenres
    );
    if (
      props.forPage &&
      props.forPage === 'refine' &&
      props.clear === false &&
      props.selectAll === false &&
      webstore.refine.forYou.unSelectedAllGenres === false
    ) {
      console.log(
        'webstore.refine.forYou.selectedGenres.length: ',
        webstore.refine.forYou.selectedGenres.length
      );
      console.log('gensArray: ', gensArray);
      if (webstore.refine.forYou.selectedGenres.length !== 0) {
        gensArray = webstore.refine.forYou.selectedGenres;
      } else {
        if (gensArray.length > 0) {
          gensArray.map((item) => {
            actionDispatch(actions.SET_REFINE_GENRE, {
              genre: item,
            });
          });
        }
      }
    }
  }, []);

  const renderErrorMessage = () => {
    return (
      <div className={classes.errorMessage}>
        No Genres available for your choice.
      </div>
    );
  };

  const handleSwitch = (e) => {
    {
      results.map((item, index) => {
        actionDispatch(actions.SET_GENRES, {
          toggle: !webstore.genres.toggle,
          genre: item._id,
          name: item.name,
        });
      });
    }
  };

  const clearSelectedData = () => {
    actionDispatch(actions.SET_GENRES, {
      toggle: false,
    });
  };

  return (
    <React.Fragment>
      {loadingData ? (
        <Grid xs={12} container item>
          <Grid xs={6} item></Grid>
          <Grid xs={2} item>
            <div style={{ margin: '10% 0' }}>
              <ImageComponent src="https://images.ottplay.com/static/35.gif" alt="loader" width="30%" height="30%" />
            </div>
          </Grid>
          <Grid xs={5} item></Grid>
        </Grid>
      ) : results && results.length > 0 ? (
        <React.Fragment>
          {props && props.forPage !== 'refine' && (
            <Grid container xs={12} className={classes.header}>
              <Grid xs={6} item>
                <label htmlFor="refine-switch" className={classes.label}>
                  <Hidden only={['xs']}>
                    <span className={classes.textSpace}>Select All</span>
                    <Switch
                      checked={
                        webstore.genres.name &&
                        results.length > 0 &&
                        webstore.genres.name.length === results.length
                          ? true
                          : webstore.genres.toggle
                      }
                      onChange={handleSwitch}
                      onColor="#03f87e"
                      offColor="#100426"
                      offHandleColor="#494060"
                      onHandleColor="#BBB6C9"
                      handleDiameter={18}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={40}
                      className={classes.reactSwitch}
                      id="refine-switch"
                    />
                  </Hidden>
                  <Hidden only={['sm', 'md', 'lg', 'xl']}>
                    <span className={classes.textSpace}>All</span>
                    <Switch
                      checked={
                        webstore.genres.name &&
                        results.length > 0 &&
                        webstore.genres.name.length === results.length
                          ? true
                          : webstore.genres.toggle
                      }
                      onChange={handleSwitch}
                      onColor="#03f87e"
                      offColor="#100426"
                      offHandleColor="#494060"
                      onHandleColor="#BBB6C9"
                      handleDiameter={18}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={22}
                      width={40}
                      className={classes.reactSwitch}
                      id="refine-switch"
                    />
                  </Hidden>
                </label>
              </Grid>
              <Grid xs={6} item>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.clear}
                    onClick={clearSelectedData}
                    startIcon={<ImageComponent src="https://images.ottplay.com/static/clear.svg" alt="" />}
                  >
                    Clear
                  </Button>
                </div>
              </Grid>
            </Grid>
          )}
          <Grid xs={12} container>
            {props && props.forPage == 'refine' ? (
              results.map((item, index) => {
                const isSelected = genArray.includes(item._id);
                return (
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <RefineCard
                      item={item}
                      type={'Genres'}
                      isSelected={isSelected}
                      onSelect={() => {
                        console.log('props.forPage: ', props.forPage);
                        if (props && props.forPage === 'refine') {
                          actionDispatch(actions.SET_REFINE_GENRE, {
                            genre: item._id,
                            name: item.name,
                          });
                          if (props.clear || props.selectAll) {
                            setAnother(true);
                            props.setSelectAllClear('genre', false);
                          }
                        } else {
                          actionDispatch(actions.SET_GENRES, item._id);
                        }
                      }}
                    />
                  </Grid>
                );
              })
            ) : (
              <div className={classes.container}>
                {results.map((item, index) => {
                  const array = webstore.genres.name;
                  const isSelected = array.includes(item.name);
                  return (
                    <GenresCard
                      data={item}
                      isSelected={isSelected}
                      onSelect={() => {
                        actionDispatch(actions.SET_GENRES, {
                          genre: item._id,
                          name: item.name,
                        });
                      }}
                    />
                  );
                })}{' '}
              </div>
            )}

            {props && props.forPage !== 'refine' && (
              <div className={classes.btnWrap}>
                <PillButton
                  text={"Let's Go"}
                  endIcon={<ImageComponent src="https://images.ottplay.com/static/rightArrow.svg" alt="" />}
                  style={{
                    backgroundColor: '#FF4275',
                    border: '0.5px solid #FF4275',
                    fontSize: 'clamp(13px, 1.2vw, 18px)',
                    fontWeight: '600',
                    color: 'white',
                    padding: '8px 30px',
                    borderRadius: '28px',
                  }}
                  onClick={props.buttonClicked}
                />
              </div>
            )}
          </Grid>
        </React.Fragment>
      ) : (
        renderErrorMessage()
      )}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(136px, 1fr))',
    gap: '0.5rem',
    padding: '0.5rem',
    width: '100%',
    color: '#ffffff',
    height: '75vh',
    overflow: 'auto',
    marginTop: '2%',
  },
  btnWrap: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    paddingTop: '15px',
  },
  [theme.breakpoints.down('xs')]: {
    container: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
    },
  },
  errorMessage: {
    display: 'flex',
    width: '100%',
    padding: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 'clamp(12px, 1.4vw, 14px)',
    textAlign: 'center',
  },
  header: {
    padding: '1rem 1rem 0 1rem',
  },
  clear: {
    color: '#ffffff',
    fontSize: '16px',
    backgroundColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
    textTransform: 'none',
    float: 'right',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      '& $MuiButton-iconSizeSmall-': {
        width: 14,
        marginRight: 4,
        marginLeft: 0,
      },
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '3%',
    //float: 'right',
  },
  textSpace: {
    margin: '0 0.5rem 0 0',
  },
}));
