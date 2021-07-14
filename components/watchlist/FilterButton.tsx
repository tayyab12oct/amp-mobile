import * as React from 'react';

import { Grid, makeStyles, withStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import {
  Online,
  PillButton,
  RefinedItems,
} from '../PillButton';

import ImageComponent from '../Images';
import Modal from 'react-modal';
import { RefineTab } from '../Refine/RefineTab';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';
import { useContext } from 'react';

const windowAny: any = typeof window !== "undefined" && window;
export function FilterButton(props) {
  const classes = useStyles();
  const _ht_clientid = cookie.load('_ht_clientid');
  const { width } = React.useContext(ViewportContext);
  const [refine, setRefine] = React.useState(false);
  const [refineCount, setRefineCount] = React.useState(0);

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    setLoading,
  } = React.useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== "undefined" && localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  const providersArr: any = getLocalStorageData(
    JSON.parse(typeof window !== "undefined" && localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)) ||
      [],
    streamingServices.selectedStreamingServices || []
  );
  const allGenres = [
    // { id: 11, value: 'Free', name: 'Free' },
    // { id: 2, value: 'MyProviders', name: 'My Providers' },
    { id: 1, value: 'provider', name: 'My Providers' },
    { id: 2, value: 'Free', name: 'Free' },
    { id: 3, value: 'movie', name: 'Movies' },
    { id: 4, value: 'show', name: 'Shows' },
    // { id: 5, value: 'Crime', name: 'Crime' },
    // { id: 6, value: 'Animation', name: 'Animation' },
    // { id: 7, value: 'Adventure', name: 'Adventure' },
  ];
  React.useEffect(() => {
    updateRefineBadgeCount();
    setRefine(true);
  }, [
    webstore.refine.forYou.filter.selectedLanguages,
    webstore.refine.forYou.filter.selectedStreamingServices,
    webstore.refine.forYou.filter.selectedGenres,
  ]);
  const handleButtons = (value: string) => {
    firebaseAnalytics.logEvent('quickfilterPill', {
      eventCategory: 'quickfilter_pill',
      eventAction: 'select',
      eventLabel: 'filter_name',
      eventValue: value,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage && windowAny.Moengage.track_event('quickfilterPill', {
      eventCategory: 'quickfilter_pill',
      eventAction: 'select',
      eventLabel: 'filter_name',
      eventValue: value,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    let buttonIds;
    if (props.button && props.button.includes(value)) {
      buttonIds = [];
    } else {
      buttonIds = [];
      buttonIds.push(value);
    }
    props.setButton(buttonIds);
    props.onSelect(buttonIds);
  };

  const handleRefineOnclick = () => {
    setRefine(!refine);
    setModalIsOpen(true);
    props.setButton([]);
  };

  const renderMobileModal = () => {
    return (
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onAfterOpen={() => {
          document.body.style.overflow = 'hidden';
        }}
        onAfterClose={() => {
          document.body.style.overflow = 'auto';
        }}
      >
        <RefineTab
          isOpen={modalIsOpen}
          setModal={setModalIsOpen}
          handleRefine={props.handleRefine()}
        />
      </Modal>
    );
  };
  const updateRefineBadgeCount = () => {
    let count = 0;
    if (
      webstore &&
      webstore.refine &&
      webstore.refine.forYou &&
      webstore.refine.forYou.filter &&
      (webstore.refine.forYou.filter.selectedLanguages.length > 0 ||
        webstore.refine.forYou.filter.selectedStreamingServices.length > 0 ||
        webstore.refine.forYou.filter.selectedGenres.length > 0)
    ) {
      count +=
        webstore.refine.forYou.filter.selectedStreamingServices.length > 0
          ? 1
          : 0;
      count +=
        webstore.refine.forYou.filter.selectedLanguages.length > 0 ? 1 : 0;
      count += webstore.refine.forYou.filter.selectedGenres.length > 0 ? 1 : 0;
    }
    setRefineCount(count);
  };
  return (
    <div className={classes.root}>
      <Grid xs={12} container>
        <Grid
          item
          xs={12}
          container
          direction="row"
          alignItems="center"
          className={classes.pillButton}
          wrap="nowrap"
        >
          <PillButton
            startIcon={<ImageComponent alt="refine icon" src="https://images.ottplay.com/static/refineIcon.svg" />}
            onClick={() => handleRefineOnclick()}
            endIcon={
              <RefinedItems
                count={refineCount}
                className={
                  refine === true && refineCount > 0
                    ? classes.filterCount
                    : classes.noFilter
                }
              />
            }
            style={refinePillBtn}
            text="Refine"
          />
          {allGenres.map((genre, i) => {
            return (
              <div>
                <PillButton
                  key={i}
                  value={genre.value}
                  i={i}
                  startIcon={
                    <Online
                      className={
                        props.button && props.button.includes(genre.value)
                          ? classes.online
                          : classes.offline
                      }
                    />
                  }
                  onClick={() => handleButtons(genre.value)}
                  style={{
                    color: `${
                      props.button && props.button.includes(genre.value)
                        ? '#0BD671'
                        : '#fff'
                    }`,
                  }}
                  text={genre.name}
                />
              </div>
            );
          })}
        </Grid>
      </Grid>
      {width < 600 ? (
        renderMobileModal()
      ) : (
        <Modal
          isOpen={modalIsOpen}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.8)',
            },
            content: {
              position: 'fixed',
              top: '0%',
              left: '50%',
              right: '0%',
              bottom: '0%',
              background: '#23104a',
              overflow: 'hidden',
              WebkitOverflowScrolling: 'touch',
              outline: 'none',
              zIndex: '999',
              border: 'none',
              padding: 0,
            },
          }}
          onAfterOpen={() => {
            document.body.style.overflow = 'hidden';
          }}
          onAfterClose={() => {
            document.body.style.overflow = 'auto';
          }}
        >
          <RefineTab
            isOpen={modalIsOpen}
            setModal={setModalIsOpen}
            handleRefine={props.handleRefine()}
          />
        </Modal>
      )}
    </div>
  );
}

const refinePillBtn = {
  backgroundColor: '#03F87E',
  border: '1px solid #03F87E',
  color: '#100721',
  fontWeight: '600',
  marginLeft: '0px',
  minWidth: 'auto',
  '@media (max-width: 600px)': {
    fontSize: 11,
    fontWeight: 500,
    '& img': {
      width: 12,
      height: 11,
    },
  },
};

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    overflow: 'hidden',
    background: 'rgba(0,0,0,0.8)',
  },
  content: {
    position: 'fixed',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    background: '#23104a',
    overflow: 'hidden',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    zIndex: '999',
    border: 'none',
    padding: 0,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    //width: '100%',
  },
  pillButton: {
    marginTop: '12px',
    overflowX: 'auto',
    display: 'flex',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },

  // genres:{
  //   '&::-webkit-scrollbar': {
  //     width: 0,
  //     },
  // },

  online: {
    height: '5px',
    width: '5px',
    backgroundColor: '#03F87E',
    borderRadius: '50%',
  },
  offline: {
    height: '5px',
    width: '5px',
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    opacity: '0.2',
  },
  filterCount: {
    height: '25px',
    width: '25px',
    backgroundColor: '#FF4376',
    borderRadius: '50%',
    color: ' #ffffff',
    fontSize: 'clamp(8px, 1vw, 14px)!important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFilter: {
    display: 'none',
  },
  [theme.breakpoints.down('xs')]: {
    modal: {
      '& content': {
        left: '0%',
      },
    },
    pillButton: {
      marginLeft: 16,
      marginTop: 6,
      marginBottom: 6,
    },
    filterCount: {
      height: 14,
      width: 14,
    },
  },
}));
