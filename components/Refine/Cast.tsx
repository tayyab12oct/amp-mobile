import {
  LOCALSTORAGE_KEY_CONSTANTS,
  getLocalStorageData,
} from '../../utils/constants';
import React, { useContext } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import { CastAndCrewCard } from '../CastAndCrewCard';
import { Grid } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import ImageComponent from '../Images';
import { PillButton } from '../PillButton';
import Switch from 'react-switch';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';

export function Cast(props) {
  const [loadingData, setLoadingData] = React.useState(true);
  const [results, setResults] = React.useState<any[]>([]);
  const { width } = React.useContext(ViewportContext);
  const classes = useStyles();

  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);
  const { languages } = webstore;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );

  React.useEffect(() => {
    const params = {
      language: languagesArr.length > 0 ? languagesArr.toString() : '',
      limit: 40,
      module_name: 'Onboarding',
      platform: 'web',
      section: 'Cast',
    };
    webfox.getCastOnboardingList(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_CAST_LIST_FAILURE, []);
      }
      actionDispatch(actions.FETCH_CAST_LIST_SUCCESS, data || []);
      if (data && data.rank) {
        console.log('rank: ', data.rank);
        const arr = data.rank.filter(
          (e) => e.cast['status'] === 'published' && e.cast.headshot
        );
        console.log('arr: ', arr);
        setResults(arr);
        setLoadingData(false);
      }
    });
    setLoading(false);
  }, []);

  const getCardSize = () => {
    if (width < 600) {
      if (results && results.length < 2) {
        return 'repeat(auto-fit, 120px)';
      } else {
        return 'repeat(auto-fit, minmax(96px, 1fr))';
      }
    } else {
      if (results && results.length < 4) {
        return 'repeat(auto-fit, 120px)';
      } else {
        return 'repeat(auto-fit, minmax(120px, 1fr))';
      }
    }
  };
  const renderErrorMessage = () => {
    return (
      <div className={classes.errorMessage}>
        No Cast available for your choice.
      </div>
    );
  };

  const handleSwitch = (e) => {
    {
      results.map((item, index) => {
        actionDispatch(actions.SET_CAST, {
          toggle: !webstore.cast.toggle,
          cast: item.cast._id,
          name: item.cast.name,
        });
      });
    }
  };

  const clearSelectedData = () => {
    webstore.cast.name.map((item) => {
      actionDispatch(actions.SET_CAST, {
        name: item,
      });
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
        // <div className={classes.container}>

        // </div>
        <React.Fragment>
          <Grid container xs={12} className={classes.header}>
            <Grid xs={6} item>
              <label htmlFor="refine-switch" className={classes.label}>
                <Hidden only={['xs']}>
                  <span className={classes.textSpace}>Select All</span>
                  <Switch
                    checked={
                      webstore.cast.name &&
                      results.length > 0 &&
                      webstore.cast.name.length === results.length
                        ? true
                        : webstore.cast.toggle
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
                      webstore.cast.name &&
                      results.length > 0 &&
                      webstore.cast.name.length === results.length
                        ? true
                        : webstore.cast.toggle
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
          <div className={classes.wrapper}>
            <Grid 
            // xs={12} 
            container 
            spacing={2}
            >
              <div
                className={classes.container}
                style={{
                  gridTemplateColumns: getCardSize(),
                }}
              >
                {results.map((item, index) => {
                  const array = webstore.cast.name;
                  const isSelected = array.includes(item.cast.name);
                  return (
                    <CastAndCrewCard
                      data={item}
                      isSelected={isSelected}
                      onSelect={() => {
                        actionDispatch(actions.SET_CAST, {
                          cast: item.cast._id,
                          name: item.cast.name,
                        });
                      }}
                    />
                  );
                })}{' '}
              </div>
              <div className={classes.buttonWrap}>
                <PillButton
                  text={"Let's Go"}
                  endIcon={<ImageComponent src="https://images.ottplay.com/static/rightArrow.svg" alt="" />}
                  style={{
                    backgroundColor: '#FF4275',
                    // webstore.cast.name.length > 0 ? '#FF4275' : '#35147A',
                    border: '0.5px solid #FF4275',
                    // webstore.cast.name.length > 0
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
                    // webstore.cast.name.length > 0 ? 'auto' : 'none',
                    opacity: 1,
                    //webstore.cast.name.length > 0 ? 1 : '0.3',
                  }}
                  onClick={props.buttonClicked}
                />{' '}
              </div>
            </Grid>
          </div>
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
    padding: '0.5rem',
    width: '100%',
    color: '#ffffff',
    height: 'fit-content',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: '75vh',
    overflowY: 'auto',
    marginTop: '2%',
  },
  buttonWrap: {
    position: 'fixed',
    bottom: 0,
    zIndex: 2,
    backgroundColor: 'rgba(27, 12, 79, 0.5)',
    backdropFilter: 'blur(50px)',
    width: '100%',
    height: '4rem',
  },
  [theme.breakpoints.down('xs')]: {
    container: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))',
      gap: '6px',
      padding: '6px',
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
