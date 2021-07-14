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
import { PillButton } from '../PillButton';
import { RefineCard } from '../RefineCard';
import Switch from 'react-switch';
import { WebfoxContext } from '../../services/webfox';
import ImageComponent from '../Images';

export function StreamingService(props) {
  const [loadingData, setLoadingData] = React.useState(true);
  const [results, setResults] = React.useState<any[]>([]);
  const [select, setSelect] = React.useState(false as any);
  const [another, setAnother] = React.useState(false as any);
  const classes = useStyles();

  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);
  let provsArray = getLocalStorageData(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)) ||
      [],
    webstore.streamingServices.selectedStreamingServices
  );
  const [provArray, setProvArray] = React.useState(provsArray as any);
  React.useEffect(() => {
    setProvArray(
      getLocalStorageData(
        JSON.parse(
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
        ) || [],
        webstore.streamingServices.selectedStreamingServices
      )
    );
  }, [webstore.streamingServices.selectedStreamingServices]);
  React.useEffect(() => {
    if (props.forPage && props.forPage === 'refine') {
      console.log('ss props: ', props);
      if (props.clear === true) {
        setAnother(true);
        setSelect(true);
        actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
          toggle: false,
          providers: 2,
          name: 'sd',
        });
        // setProvArray([]);
      }
      if (props.selectAll === true) {
        setSelect(true);
        setAnother(false);
        results.map((item) => {
          actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
            toggle: props.selectAll,
            providers: item.provider._id,
            name: item.provider.name,
          });
        });
      }
    }
  }, [props.clear, props.selectAll, results]);
  React.useEffect(() => {
    if (props.forPage && props.forPage === 'refine') {
      if (
        props.selectAll === false &&
        props.clear === false &&
        select === true &&
        another === false
      ) {
        // setProvArray([]);
        actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
          toggle: false,
          providers: 2,
          name: 'sd',
        });
      }
    }
  }, [props.clear, props.selectAll, results, select]);
  React.useEffect(() => {
    console.log(
      'selectedStreamingServices:',
      webstore.refine.forYou.selectedStreamingServices.length
    );
    if (props.forPage && props.forPage === 'refine') {
      if (webstore.refine.forYou.selectedStreamingServices.length !== 0) {
        setProvArray(webstore.refine.forYou.selectedStreamingServices);
      } else {
        setProvArray([]);
      }
    }
  }, [webstore.refine.forYou.selectedStreamingServices]);
  React.useEffect(() => {
    const params = {
      limit: 50,
      module_name: 'Providers',
      platform: 'web',
    };

    webfox.getAllProviderList(params).then(({ data, error }) => {
      console.log('Provider result. ', JSON.stringify(data));
      if (error) {
        actionDispatch(actions.FETCH_PROVIDER_LIST_FAILURE, []);
      }
      console.log('response: ' + JSON.stringify(data));
      actionDispatch(actions.FETCH_PROVIDER_LIST_SUCCESS, data || []);
      if (data && data.rank) {
        console.log('rank: ', data.rank);
        const arr = data.rank.filter(
          (e) =>
            e.provider &&
            e.provider['status'] &&
            e.provider['status'] === 'published'
        );
        console.log('arr: ', arr);
        setResults(arr);
        setLoadingData(false);
        console.log('rank', data.rank);
      }
    });
    setLoading(false);
    if (
      props.forPage &&
      props.forPage === 'refine' &&
      props.clear === false &&
      props.selectAll === false &&
      webstore.refine.forYou.unSelectedAllStreams === false
    ) {
      console.log(
        'webstore.refine.forYou.selectedStreamingServices.length: ',
        webstore.refine.forYou.selectedStreamingServices.length
      );
      if (webstore.refine.forYou.selectedStreamingServices.length !== 0) {
        provsArray = webstore.refine.forYou.selectedStreamingServices;
      } else {
        if (provsArray.length > 0) {
          provsArray.map((item, index) => {
            actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
              providers: item,
              name: getLocalStorageData(
                JSON.parse(
                  localStorage.getItem(
                    LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES
                  )
                ) || [],
                webstore.streamingServices.name
              )[index],
            });
          });
        }
      }
    }
  }, []);

  const handleSwitch = () => {
    {
      results.map((item, index) => {
        actionDispatch(actions.SET_STREAMING_SERVICES, {
          toggle: !webstore.streamingServices.toggle,
          providers: item.provider._id,
          name: item.provider.name,
        });
      });
    }
  };

  const clearSelectedData = () => {
    webstore.streamingServices.selectedStreamingServices.map((item) => {
      actionDispatch(actions.SET_STREAMING_SERVICES, {
        providers: item,
      });
    });
  };

  console.log('provArray: ', provArray);
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
      ) : (
        <React.Fragment>
          {props && props.forPage !== 'refine' && (
            <Grid container xs={12} className={classes.header}>
              <Grid xs={6} item>
                <label htmlFor="refine-switch" className={classes.label}>
                  <Hidden only={['xs']}>
                    <span className={classes.textSpace}>Select All</span>
                    <Switch
                      checked={
                        webstore.streamingServices.selectedStreamingServices
                          .length === results.length && results.length > 0
                          ? true
                          : webstore.streamingServices.toggle
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
                        webstore.streamingServices.selectedStreamingServices
                          .length === results.length && results.length > 0
                          ? true
                          : webstore.streamingServices.toggle
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
          <div className={classes.refineCardBox}>
            <Grid 
            // xs={12} 
            container 
            spacing={2}
            >
              {results.map((item, index) => {
                const isSelected = provArray.includes(item.provider._id);
                return (
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <RefineCard
                      item={item}
                      isSelected={isSelected}
                      type={'Provider'}
                      onSelect={() => {
                        if (props && props.forPage === 'refine') {
                          console.log(
                            'props.clear: ',
                            props.clear + '==' + props.selectAll
                          );
                          actionDispatch(
                            actions.SET_REFINE_STREAMING_SERVICES,
                            {
                              providers: item.provider._id,
                              name: item.provider.name,
                            }
                          );
                          if (props.clear || props.selectAll) {
                            setAnother(true);
                            props.setSelectAllClear('provider', false);
                          }
                        } else {
                          actionDispatch(actions.SET_STREAMING_SERVICES, {
                            providers: item.provider._id,
                            name: item.provider.name,
                          });
                        }
                      }}
                    />
                  </Grid>
                );
              })}
              <React.Fragment>
                {props && props.forPage !== 'refine' && (
                  <div
                    style={{
                      position: 'fixed',
                      bottom: 0,
                      backgroundColor: 'rgba(27, 12, 79, 0.5)',
                      backdropFilter: 'blur(50px)',
                      width: '100%',
                      height: '4rem',
                    }}
                  >
                    <PillButton
                      text={"Let's Go"}
                      endIcon={<ImageComponent src="https://images.ottplay.com/static/rightArrow.svg" alt="" />}
                      style={{
                        backgroundColor: '#FF4275',
                        // webstore.streamingServices.selectedStreamingServices
                        //   .length > 0
                        //   ? '#FF4275'
                        //   : '#35147A',
                        border: '0.5px solid #FF4275',
                        // webstore.streamingServices.selectedStreamingServices
                        //   .length > 0
                        //   ? '0.5px solid #FF4275'
                        //   : '0.5px solid #35147A',
                        fontSize: 'clamp(13px, 1.2vw, 18px)',
                        fontWeight: '600',
                        color: 'white',
                        padding: '8px 30px',
                        borderRadius: '28px',
                        marginTop: '0.5rem',
                        left: '11.5%',
                        pointerEvents: 'auto',
                        // webstore.streamingServices.selectedStreamingServices
                        //   .length > 0
                        //   ? 'auto'
                        //   : 'none',
                        opacity: 1,
                        // webstore.streamingServices.selectedStreamingServices
                        //   .length > 0
                        //   ? 1
                        //   : '0.3',
                      }}
                      onClick={props.buttonClicked}
                    />{' '}
                  </div>
                )}
              </React.Fragment>
            </Grid>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
const useStyles = makeStyles((theme: Theme) => ({
  reactSwitch: {
    border: '1px solid #554473',
  },
  refineCardBox: {
    margin: '2% 0% 0% 0%',
    display: 'flex',
    justifyContent: 'center',
    maxHeight: '75vh',
    overflowY: 'scroll',
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
