import {
  LOCALSTORAGE_KEY_CONSTANTS,
  getLocalStorageData,
} from '../utils/constants';

import { Grid } from '@material-ui/core';
import { PillButton } from './PillButton';
import React from 'react';
import { RefineCard } from './RefineCard';

import { Spinner } from './Spinner';
import Switch from 'react-switch';
import { Theme } from '@material-ui/core/styles';
import { WebfoxContext } from '../services/webfox';
import { makeStyles } from '@material-ui/core/styles';
import { IMAGE_BASE_URL } from '../utils/constants';
import ImageComponent from './Images';

export default function AddStreamingModal(props) {
  const [loadingData, setLoadingData] = React.useState(true);
  const [results, setResults] = React.useState<any[]>([]);
  const [temp, setTemp] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const { webfox, webstore, actionDispatch, actions } = React.useContext(
    WebfoxContext
  );
  const classes = useStyles();

  const handleClose = () => {
    props.handleClose(false);
  };

  React.useEffect(() => {
    const params = {
      limit: 45,
      module_name: 'Providers',
      platform: 'web',
    };
    webfox.getAllProviderList(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_PROVIDER_LIST_FAILURE, []);
      }
      actionDispatch(actions.FETCH_PROVIDER_LIST_SUCCESS, data || []);
      if (data && data.rank) {
        console.log('rank: ', data.rank);
        const arr = data.rank.filter(
          (e) => e.provider['status'] === 'published'
        );
        console.log('arr: ', arr);
        setResults(arr);
        setTemp(arr);
        setLoadingData(false);
        console.log('rank', data.rank);
      }
    });
  }, []);
  React.useEffect(() => {
    const filter = temp.filter(
      (title) =>
        title.provider.name.toString().toLowerCase().includes(searchTerm) ||
        title.provider.name.toString().toUpperCase().includes(searchTerm) ||
        title.provider.name.includes(searchTerm)
    );
    setResults(filter);
  }, [searchTerm]);

  const handleSwitch = (e) => {
    {
      results.map((item, index) => {
        const array = webstore.languages.selectedLanguages;
        const all = webstore.getLanguage.data.languages;
        actionDispatch(actions.SET_STREAMING_SERVICES, {
          toggle: !webstore.streamingServices.toggle,
          providers: item.provider._id,
          name: item.provider.name,
        });
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} xs={12} className={classes.header}>
        <Grid xs={6} item>
          <div className={classes.movieName}>Streaming Services</div>
        </Grid>
        <Grid xs={6} item className={classes.closeGrid}>
          <div className={classes.closeContainer}>
            <ImageComponent 
              src={`${IMAGE_BASE_URL}/images/close.png`}
              className="cursor-pointer"
              alt="close icon"
              // onClick={handleClose}
            />
          </div>
        </Grid>
        <Grid xs={12} item>
          <div className={classes.message}>
            {' '}
            Choose your Streaming Providers. We will give preference to the
            content from the services of your choice but will show you the
            relevant content from other services as well.
          </div>
        </Grid>
        <Grid xs={12} item>
          <div className={classes.searchWrap}>
            <input
              type="text"
              className={classes.searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search provider"
            />
            <span className={classes.closeSearch}>
              <ImageComponent
                src={`${IMAGE_BASE_URL}/images/searchIcon.svg`}
                alt="search icon"
                className={classes.searchIcon}
              />
            </span>
          </div>
        </Grid>
        <Grid
          container
          style={{ margin: '2% 0 0 0', display: 'flex' }}
          justify="space-between"
        >
          <div className={classes.selectAll}>
            <span className={classes.selectSpan}>{'Select All'}</span>
            <Switch
              checked={
                webstore.streamingServices.selectedStreamingServices.length ===
                  results.length &&
                results.length > 0 &&
                searchTerm.length === 0
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
          </div>
          <div className={classes.selectSpan} style={{ fontWeight: 'bold' }}>
            {webstore.streamingServices.selectedStreamingServices.length}/
            {temp.length}
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          className={classes.streamContainer}
        >
          {loadingData ? (
            <Spinner />
          ) : (
            <React.Fragment>
              {results.map((item, index) => {
                const array: any = getLocalStorageData(
                  JSON.parse(
                    localStorage.getItem(
                      LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS
                    )
                  ) || [],
                  webstore.streamingServices.selectedStreamingServices || []
                );
                const isSelected = array.includes(item.provider._id);
                return (
                  <Grid
                    xs={6}
                    sm={4}
                    className={classes.refinePillBox}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    item
                  >
                    <RefineCard
                      item={item}
                      type={'Provider'}
                      isSelected={isSelected}
                      onSelect={() => {
                        actionDispatch(actions.SET_STREAMING_SERVICES, {
                          providers: item.provider._id,
                          name: item.provider.name,
                        });
                      }}
                    />
                  </Grid>
                );
              })}{' '}
            </React.Fragment>
          )}
        </Grid>
        <div className={classes.done}>
          <PillButton
            text={'Done'}
            style={{
              backgroundColor: '#FF4275',
              border: '0.5px solid #FF4275',
              fontSize: 'clamp(13px, 1.2vw, 18px)',
              fontWeight: '600',
              color: 'white',
              padding: '8px 30px',
              borderRadius: '28px',
              pointerEvents: 'auto',
              marginTop: '2vh',
            }}
            onClick={() => window.location.reload(false)}
          />
        </div>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    padding: '20px 20px',
  },
  streamContainer: {
    // margin: '5% 0 0 0',
    height: '40vh',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      margin: '10px 20px',
      width: '4px',
      background: '#090411 0% 0% no-repeat padding-box',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 4px #090411',
      borderRadius: '13px',
      //width: '10px',
      background: '#090411 0% 0% no-repeat padding-box',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#03F87E',
      borderRadius: '10px',
    },
  },
  closeGrid: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  selectSpan: {
    fontSize: 'clamp(8px, 1vw, 15px)',
    color: '#A89ABF',
    padding: '5px 15px 5px 5px',
  },
  reactSwitch: {
    border: '2px solid #554473',
    borderRadius: '23px !important',
    '& react-switch-handle': {
      top: 2,
      left: -2,
    },
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'right',
    '& img': {
      width: 'clamp(18px, 1.4vw, 25px)',
      height: 'clamp(18px, 1.4vw, 25px)',
    },
  },
  header: {
    justifyContent: 'space-between',
  },
  text: {
    fontSize: '22px',
    color: '#ffffff',
    paddingLeft: '20px',
  },
  refinePillBox: {
    padding: '0px !important',
  },
  movieName: {
    color: '#ffffff',
    fontWeight: 500,
    fontSize: 'clamp(18px, 1vw, 35px)',
    textAlign: 'left',
    letterSpacing: '0px',
    opacity: 1,
  },
  message: {
    color: '#74678B',
    fontWeight: 500,
    fontSize: 'clamp(14px, 0.5vw, 20px)',
    textAlign: 'left',
    letterSpacing: '0px',
    opacity: 1,
    marginTop: '2%',
  },
  done: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '0.5rem',
  },
  selectAll: {
    display: 'flex',
    alignItems: 'center',
  },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  searchInput: {
    width: '100%',
    color: '#d6c6f4',
    fontSize: '14px',
    height: 35,
    padding: '0 0 0 1rem',
    outline: 'none',
    borderBottom: '1px solid rgb(59 51 72)',
    backgroundColor: '#000000',
    opacity: '0.4',
    borderRadius: '25px',
    margin: '1rem 0 0 0',
  },
  closeSearch: {
    position: 'absolute',
    right: '2.7rem',
    top: '1.5rem',
  },
  searchIcon: {
    width: 'clamp(18px, 0.8vw, 25px)',
  },
}));
