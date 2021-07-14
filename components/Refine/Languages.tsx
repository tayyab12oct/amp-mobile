import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import React, { useContext, useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { PillButton } from '../PillButton';
import { RefineCard } from '../RefineCard';
import Switch from 'react-switch';
import { WebfoxContext } from '../../services/webfox';
import ImageComponent from '../Images';

export function Languages(props) {
  const [results, setResults] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const classes = useStyles();
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
  let langsArray = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    webstore.languages.selectedLanguages
  );
  const [langArray, setLangArray] = React.useState(langsArray as any);

  React.useEffect(() => {
    setLangArray(
      getLocalStorageData(
        JSON.parse(
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
        ) || [],
        webstore.languages.selectedLanguages
      )
    );
  }, [webstore.languages.selectedLanguages]);

  React.useEffect(() => {
    if (props.forPage && props.forPage === 'refine') {
      console.log('ss props: ', props);
      if (props.clear === true) {
        setSelect(true);
        setAnother(true);
        actionDispatch(actions.SET_REFINE_LANGUAGES, {
          toggle: false,
          name: 'sd',
        });
      }
      if (props.selectAll === true) {
        setSelect(true);
        setAnother(false);
        console.log(results);
        results.map((item) => {
          actionDispatch(actions.SET_REFINE_LANGUAGES, {
            toggle: props.selectAll,
            name: item.language.name,
          });
        });
      }
    }
  }, [props.clear, props.selectAll, results]);
  React.useEffect(() => {
    if (props.forPage && props.forPage === 'refine') {
      console.log('selectedLanguages:', props.selectAll);
      if (
        props.selectAll === false &&
        props.clear === false &&
        select === true &&
        another === false
      ) {
        actionDispatch(actions.SET_REFINE_LANGUAGES, {
          toggle: false,
          name: 'sd',
        });
      }
    }
  }, [props.clear, props.selectAll, results, select]);
  React.useEffect(() => {
    console.log(
      'selectedLanguages:',
      webstore.refine.forYou.selectedLanguages.length
    );
    if (props.forPage && props.forPage === 'refine') {
      if (webstore.refine.forYou.selectedLanguages.length !== 0) {
        setLangArray(webstore.refine.forYou.selectedLanguages);
      } else {
        setLangArray([]);
      }
    }
  }, [webstore.refine.forYou.selectedLanguages]);
  useEffect(() => {
    const params = {
      limit: 12,
      module_name: 'Languages',
      platform: 'web',
    };

    setLoading(true);
    webfox.getAllLanguageList(params).then(({ data, error }) => {
      console.log('Movies result. ', JSON.stringify(data));
      if (error) {
        actionDispatch(actions.FETCH_LANGUAGE_LIST_FAILURE, []);
      }
      console.log('response: ' + JSON.stringify(data));
      actionDispatch(actions.FETCH_LANGUAGE_LIST_SUCCESS, data || []);
      if (data && data.rank) {
        console.log('rank: ', data.rank);
        const arr = data.rank.filter(
          (e) =>
            e.language &&
            e.language['status'] &&
            e.language['status'] === 'published'
        );
        console.log('arr: ', arr);
        setResults(arr);
        setLoadingData(false);
      }
    });
    setLoading(false);
    console.log('langsArray: ', webstore.refine.forYou.unSelectedAllLanguages);
    if (
      props.forPage &&
      props.forPage === 'refine' &&
      props.clear === false &&
      props.selectAll === false &&
      webstore.refine.forYou.unSelectedAllLanguages === false
    ) {
      console.log(
        'webstore.refine.forYou.selectedLanguages.length: ',
        webstore.refine.forYou.selectedLanguages.length
      );
      console.log('langsArray: ', langsArray);
      if (webstore.refine.forYou.selectedLanguages.length !== 0) {
        langsArray = webstore.refine.forYou.selectedLanguages;
      } else {
        if (langsArray.length > 0) {
          langsArray.map((item, index) => {
            actionDispatch(actions.SET_REFINE_LANGUAGES, {
              name: item,
            });
          });
        }
      }
    }
  }, []);

  const handleSwitch = () => {
    {
      results.map((item, index) => {
        actionDispatch(actions.SET_LANGUAGES, {
          toggle: !webstore.languages.toggle,
          language: item.language._id,
          name: item.language.name,
        });
      });
    }
  };

  const clearSelectedData = () => {
    webstore.languages.name.map((item) => {
      actionDispatch(actions.SET_LANGUAGES, {
        name: item,
      });
    });
  };

  console.log('langArray', langArray);

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
              <Grid xs={12} item>
                <label htmlFor="refine-switch" className={classes.label}>
                  <Hidden only={['xs']}>
                    <span className={classes.textSpace}>Select All</span>
                    <Switch
                      checked={
                        webstore.languages.name.length === results.length &&
                        results.length > 0
                          ? true
                          : webstore.languages.toggle
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
                        webstore.languages.name.length === results.length &&
                        results.length > 0
                          ? true
                          : webstore.languages.toggle
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
              {/* <Grid xs={6} item>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.clear}
                    onClick={clearSelectedData}
                    startIcon={<Clear />}
                  >
                    Clear
                  </Button>
                </div>
              </Grid> */}
            </Grid>
          )}
          <div className={classes.langSettingWrap}>
            <Grid
              // xs={12}
              container
              spacing={2}
              className={classes.refineCardBox}
            >
              {results.map((item, index) => {
                const isSelected = langArray.includes(item.language.name);
                return (
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <RefineCard
                      item={item}
                      type={'Languages'}
                      isSelected={isSelected}
                      onSelect={() => {
                        console.log('props.forPage: ', props.forPage);
                        if (props && props.forPage === 'refine') {
                          actionDispatch(actions.SET_REFINE_LANGUAGES, {
                            name: item.language.name,
                          });
                          if (props.clear || props.selectAll) {
                            setAnother(true);
                            props.setSelectAllClear('language', false);
                          }
                        } else {
                          actionDispatch(actions.SET_LANGUAGES, {
                            language: item.language._id,
                            name: item.language.name,
                          });
                        }
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
            {props && props.forPage !== 'refine' && (
              <PillButton
                text={"Let's Go"}
                endIcon={<ImageComponent src="https://images.ottplay.com/static/rightArrow.svg" alt="" />}
                style={{
                  backgroundColor: langArray.length > 0 ? '#FF4275' : '#35147A',
                  border:
                    langArray.length > 0
                      ? '0.5px solid #FF4275'
                      : '0.5px solid #35147A',
                  fontSize: 'clamp(13px, 1.2vw, 18px)',
                  fontWeight: '600',
                  color: 'white',
                  padding: '8px 30px',
                  borderRadius: '28px',
                  pointerEvents: langArray.length > 0 ? 'auto' : 'none',
                  opacity: langArray.length > 0 ? 1 : '0.3',
                  marginTop: '2vh',
                }}
                onClick={props.buttonClicked}
              />
            )}
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
    margin: '0%',
    display: 'flex',
    maxHeight: '79vh',
    overflowY: 'auto',
  },
  header: {
    padding: '1rem 1rem 0 1rem',
  },
  langSettingWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    marginTop: '1%',
    float: 'right',
  },
  textSpace: {
    margin: '0 0.5rem 0 0',
  },
}));
