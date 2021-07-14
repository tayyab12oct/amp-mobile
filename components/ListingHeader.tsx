import { Buttons, DropdownButton } from './Buttons/Buttons';
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Hidden,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  HOME_SCREEN_SECTIONS,
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../utils/constants';
import { PillButton, RefinedItems } from './PillButton';
import {
  contentTypeList,
  freePaidList,
  qualityOptions,
  runtimeMinutesOptions,
} from '../utils/helper';

import Dropdown from 'react-bootstrap/Dropdown';
import { HalfScreen } from './Drawer/HalfScreen';
import ImageComponent from './Images';
import Modal from 'react-modal';
import { Opacity } from '@material-ui/icons';
import React from 'react';
import { RefineTab } from './Refine/RefineTab';
import SelectClearFilter from './RefineFilter/SelectClearFilter';
import { ViewportContext } from './ViewportProvider';
import { WebfoxContext } from '../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from './firebaseConfig';
import { withStyles } from '@material-ui/styles';

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');
export function ListingHeader(props) {
  const classes = useStyles();
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = React.useContext(WebfoxContext);
  const { width } = React.useContext(ViewportContext);
  const [refine, setRefine] = React.useState(false);
  const [refineCount, setRefineCount] = React.useState(0);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [halfSheetIsOpen, setHalfSheetIsOpen] = React.useState(false);
  const [selectFlag, setSelectFlag] = React.useState(false);
  const [sortId, setSortId] = React.useState(1);
  const { languages, streamingServices } = webstore;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [
      'English',
      'Hindi',
      'Tamil',
      'Telugu',
      'Kannada',
      'Bengali',
      'Marathi',
      'Gujarati',
      'Punjabi',
      'Malayalam',
    ],
    languages.name || []
  );
  const providersArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
    ) || [],
    streamingServices.selectedStreamingServices || []
  );
  const handleButtons = (value: string) => {
    const buttonIds: any = [];
    // if (props.button && props.button.includes(value)) {
    //   buttonIds = [];
    // } else {
    //   buttonIds = [];
    //   buttonIds.push(value);
    // }
    buttonIds.push(value);
    props.setButton(buttonIds);
    props.onSelect(buttonIds);
  };
  const handleSort = (value: any, id: any) => {
    const sortIds: any = [];
    setSortId(id);
    sortIds.push(value);
    props.setSort(value);
    //props.sortId(id)
    props.onSort(value);
  };

  const forYouOption = [
    { id: 1, value: 'relevance', option: 'Relevance' },
    { id: 2, value: 'rating', option: 'OTTplay rating' },
    { id: 3, value: 'release_date', option: 'Release date' },
    { id: 4, value: 'release_year_rating', option: 'Release year & rating' },
  ];

  const movieShowOption = [
    {
      id: 1,
      value: 'relevance',
      option: 'OTTplay rating & Release date',
    },
    { id: 2, value: 'rating', option: 'OTTplay rating' },
    { id: 3, value: 'release_date', option: 'Release date' },
  ];

  const items = props.from === 'foryou' ? forYouOption : movieShowOption;

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
  const handleRefineOnclick = () => {
    firebaseAnalytics.logEvent('refine_cta_click', {
      eventCategory: 'refine_cta_click',
      eventAction: window.location.pathname,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage &&
      windowAny.Moengage.track_event('refine_cta_click', {
        eventCategory: 'refine_cta_click',
        eventAction: window.location.pathname,
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      });
    setRefine(!refine);
    setModalIsOpen(true);
    props.setButton([]);
  };

  const renderSortByMobMenu = () => {
    return (
      <div className={classes.sortMenuWrap}>
        <div className={classes.sortHeaderWarp}>
          <div className={classes.sortTitle}>Sort By</div>
          <ImageComponent
            onClick={() => setHalfSheetIsOpen(false)}
            src="https://images.ottplay.com/static/close.svg"
          />
        </div>

        <div>
          {items.map((item, index) => {
            return (
              <div
                className={[
                  classes.sortOptionsDefault,
                  sortId === index + 1 ? classes.sortOptionSelected : '',
                ].join(' ')}
                onClick={() => {
                  handleSort(item.value, item.id);
                  setHalfSheetIsOpen(false);
                }}
              >
                <div>{item.option}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
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
          from={props.from}
          isOpen={modalIsOpen}
          setModal={setModalIsOpen}
          handleRefine={props.handleRefine()}
          setRefineState={props.setRefineState}
        />
      </Modal>
    );
  };

  const renderMobileSortTag = () => {
    return (
      <div className={classes.blurCard}>
        <div
          className={classes.sortTagWrap}
          onClick={() => setHalfSheetIsOpen(true)}
        >
          <div className={classes.sortTag}>
            <ImageComponent src="https://images.ottplay.com/static/sortIcon.svg" />
          </div>
        </div>
      </div>
    );
  };

  React.useEffect(() => {
    if (
      webstore.getProvider &&
      webstore.getProvider.data &&
      webstore.getProvider.data.length > 0 &&
      webstore.getProvider.data.length ===
        webstore.refine.forYou.selectedStreamingServices.length &&
      webstore.getLanguage &&
      webstore.getLanguage.data &&
      webstore.getLanguage.data.length ===
        webstore.refine.forYou.selectedLanguages.length &&
      webstore.genreList &&
      webstore.genreList.data &&
      webstore.genreList.data.length ===
        webstore.refine.forYou.selectedGenres.length &&
      contentTypeList.length ===
        webstore.refine.forYou.filter.selectedContentType.length &&
      freePaidList.length ===
        webstore.refine.forYou.filter.selectedFreePaid.length &&
      qualityOptions.length ===
        webstore.refine.forYou.filter.selectedQuality.length
    ) {
      setSelectFlag(true);
    } else {
      setSelectFlag(false);
    }
  }, [
    webstore.refine.forYou.filter.selectedLanguages,
    webstore.refine.forYou.filter.selectedStreamingServices,
    webstore.refine.forYou.filter.selectedGenres,
    webstore.refine.forYou.filter.selectedFreePaid,
    webstore.refine.forYou.filter.selectedQuality,
    webstore.refine.forYou.filter.selectedContentType,
    webstore.refine.forYou.filter.selectedRuntimeMin,
  ]);

  const selectAllFilter = () => {
    webstore.getLanguage.data.map((item) => {
      actionDispatch(actions.SET_REFINE_LANGUAGES, {
        toggle: !selectFlag,
        name: item.language.name,
      });
    });

    webstore.genreList.data.map((item) => {
      actionDispatch(actions.SET_REFINE_GENRE, {
        toggle: !selectFlag,
        genre: item._id,
        name: item.name,
      });
    });

    webstore.getProvider.data.map((item) => {
      actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
        toggle: !selectFlag,
        providers: item.provider._id,
        name: item.provider.name,
      });
    });

    contentTypeList.map((item) => {
      actionDispatch(actions.SET_REFINE_CONTENT_TYPE, {
        toggle: !selectFlag,
        name: item.value,
      });
    });

    freePaidList.map((item) => {
      actionDispatch(actions.SET_REFINE_FREE_PAID, {
        toggle: !selectFlag,
        name: item.label,
      });
    });

    qualityOptions.map((item) => {
      actionDispatch(actions.SET_REFINE_QUALITY, {
        toggle: !selectFlag,
        name: item.label,
      });
    });

    runtimeMinutesOptions.map((item) => {
      actionDispatch(actions.SET_REFINE_RUNTIME_MIN, {
        toggle: !selectFlag,
        name: item.label,
        name2: item.label2,
      });
    });
    setSelectFlag(!selectFlag);
    actionDispatch(actions.REFINE_FOR_YOU_PAGE, {
      page: 'forYou',
    });
  };

  const clearAllFilter = () => {
    webstore.refine.forYou.selectedLanguages.map((item) => {
      actionDispatch(actions.SET_REFINE_LANGUAGES, {
        toggle: false,
      });
    });
    webstore.refine.forYou.selectedGenres.map((item) => {
      actionDispatch(actions.SET_REFINE_GENRE, {
        toggle: false,
      });
    });
    webstore.refine.forYou.selectedStreamingServices.map((item) => {
      actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
        toggle: false,
      });
    });
    webstore.refine.forYou.selectedContentType.map((item) => {
      actionDispatch(actions.SET_REFINE_CONTENT_TYPE, {
        toggle: false,
      });
    });
    webstore.refine.forYou.selectedFreePaid.map((item) => {
      actionDispatch(actions.SET_REFINE_FREE_PAID, {
        toggle: false,
      });
    });
    webstore.refine.forYou.selectedQuality.map((item) => {
      actionDispatch(actions.SET_REFINE_QUALITY, {
        toggle: false,
      });
    });
    webstore.refine.forYou.selectedRuntimeMin.map((item) => {
      actionDispatch(actions.SET_REFINE_RUNTIME_MIN, {
        toggle: false,
      });
    });
    actionDispatch(actions.SET_REFINE_SOURCE, {
      toggle: false,
    });
    setSelectFlag(false);
    actionDispatch(actions.REFINE_FOR_YOU_PAGE, {
      page: 'forYou',
    });
    actionDispatch(actions.REFINE_NEWS_PAGE, {
      page: 'news',
    });
  };
  return (
    <div className={classes.root} id={'navBar'}>
      <Grid
        xs={12}
        lg={12}
        container
        className={classes.containerBar}
        // style={{
        //   backgroundColor: 'rgba(0, 0, 0, 0.3)',
        // }}
      >
        {/* <Grid
          xs={2}
          lg={2}
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: 20,
            height: '65px',
          }}
        ></Grid>
        <Grid
          xs={10}
          lg={10}
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
        
          <div className={classes.pipe}></div> */}
        <Grid
          xs={12}
          lg={12}
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <div className={classes.listingHeaderOuterBox}>
            {/* <div className={classes.headerText}>
              {props.count > 0 && (
                <React.Fragment>
                  <div>{props.count}</div>
                  {props.icon && <ImageComponent src={props.icon} alt="logo" />}
                  <div style={{ paddingLeft: '5px' }}>{props.headerText}</div>
                </React.Fragment>
              )}
            </div> */}
            <Hidden only={['xs']}>
              <Grid sm={3} item className={classes.headerText}>
                <div>Refine</div>
                <SelectClearFilter
                  clearData={() => clearAllFilter()}
                  selectData={() => selectAllFilter()}
                  selectFlag={selectFlag}
                />
              </Grid>
            </Hidden>
            <Grid sm={9} className={classes.pillsWrap}>
              <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <PillButton
                  startIcon={
                    <ImageComponent
                      // style={{ height: '13px', width: '13px' }}
                      src="https://images.ottplay.com/static/refineIcon.svg"
                    />
                  }
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
              </Hidden>
              <div className={classes.pillbuttonOuterBox}>
                {props &&
                  props.pillButtons &&
                  props.pillButtons.length > 0 &&
                  props.pillButtons.map((item, i) => {
                    return (
                      <div>
                        <PillButton
                          key={i}
                          value={item.value}
                          i={i}
                          onClick={() => handleButtons(item.value)}
                          style={{
                            backgroundColor:
                              props.button && props.button.includes(item.value)
                                ? '#0BD671'
                                : 'transparent',
                            color:
                              props.button && props.button.includes(item.value)
                                ? '#100721'
                                : '#B2A2CE',
                            border:
                              props.button && props.button.includes(item.value)
                                ? '1px solid #29F87E'
                                : width > 600
                                ? '1px solid transparent'
                                : '1px solid',
                            fontWeight: 600,
                          }}
                          text={item.name}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className={classes.refineOuterBox}>
                {/* <Hidden only={['xs']}> */}
                {props && props.results && props.sort !== false ? (
                  <Grid xs={12} sm={2} container>
                    {width > 600 &&
                    props.from != 'movie' &&
                    props.from != 'show' ? (
                      <div className={classes.subWrapperWatchlist}>
                        <StyledDropdownButton
                          text="sort By"
                          startIcon={
                            <ImageComponent
                              src="https://images.ottplay.com/static/sortIcon.svg"
                              alt="sort icon"
                            />
                          }
                        >
                          {items.map((item, i) => (
                            <Dropdown.Item
                              key={i}
                              i={i}
                              value={item.value}
                              className={
                                sortId === i + 1
                                  ? 'activeDropdownOption'
                                  : 'dropdownOption'
                              }
                              onClick={() => handleSort(item.value, item.id)}
                              eventKey={item.value}
                            >
                              {item.option}
                              {i !== items.length - 1 && (
                                <hr
                                  style={{
                                    borderBottom: '1px solid #695197',
                                    margin: 0,
                                    opacity: 0.3,
                                    marginTop: '10px',
                                  }}
                                />
                              )}
                            </Dropdown.Item>
                          ))}
                        </StyledDropdownButton>
                      </div>
                    ) : (
                      <div />
                      // renderMobileSortTag()
                      // <Buttons
                      //   text="sort By"
                      //   startIcon={<ImageComponent src={Sort} alt="sort icon" />}
                      //   onClick={() => setHalfSheetIsOpen(true)}
                      //   className={'dropdownButton'}
                      // ></Buttons>
                    )}
                  </Grid>
                ) : null}
                {/* </Hidden> */}
              </div>
            </Grid>
          </div>
        </Grid>
        <Hidden only={['sm', 'md', 'lg', 'xl']}>{renderMobileSortTag()}</Hidden>
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
            from={props.from}
            isOpen={modalIsOpen}
            setModal={setModalIsOpen}
            handleRefine={props.handleRefine()}
            setRefineState={props.setRefineState}
          />
        </Modal>
      )}
      <HalfScreen
        isOpen={halfSheetIsOpen}
        closeHandler={setHalfSheetIsOpen}
        menu={renderSortByMobMenu()}
      />
    </div>
  );
}
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
const StyledDropdownButton = withStyles((theme) => ({
  root: {
    sort: {
      color: '#03F87E',
      fontSize: '16px',
      outline: 'none',
      boxShadow: 'none',
      //   borderRadius: '24px',
      //   border: '1px solid #695197',
      textTransform: 'none',
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        width: 56,
      },
    },
  },
}))(DropdownButton);
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: '5px',
    fontFamily: `"Montserrat", "Arial", "sans-serif"`,
  },
  headerText: {
    fontFamily: `"Montserrat", "Arial", "sans-serif"`,
    gap: '5px',
    color: 'white',
    fontSize: 'clamp(13px, 1vw, 16px)',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 5px 15px 18px',
    borderRight: '1px solid rgb(255 255 255 / 10%)',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
  },
  listingHeaderOuterBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: '1 1 100%',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    // padding: 20,
    // height: '65px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      flexDirection: 'column',
      height: 'auto',
      width: '100%',
      marginRight: '32px',
    },
  },
  containerBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    // padding: 20,
    // height: '65px',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
      margin: '0px 0px 5px 16px',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  },
  pillbuttonOuterBox: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      gap: '12px',
    },
  },
  pillsWrap: {
    display: 'flex',
    width: '100%',
    padding: '10px 20px 10px 12px',
    justifyContent: 'space-between',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
    [theme.breakpoints.down('xs')]: {
      // overflowX: 'auto',
      width: '100%',
      gap: '12px',
      padding: '5px 20px 5px 0',
      // padding: '15px 20px 0px 12px',
    },
  },
  refineOuterBox: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      marginTop: 0,
      position: 'fixed',
      right: 0,
    },
  },
  topBar: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  verticalLine: {
    borderLeft: '2px solid #fff',
    height: '20px',
    opacity: 0.1,
    margin: '0px 10px',
  },
  pipe: {
    width: '1px',
    height: '65px',
    backgroundColor: '#D6C6F4',
    margin: '0px 10px',
    opacity: 0.1,
    '&:last-child': {
      display: 'none',
    },
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
  subWrapperWatchlist: {
    display: 'flex',
    // position: 'relative',
    alignItems: 'center',
    width: '100%',
    marginLeft: 5,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
      // marginTop: 10,
      // marginBottom: 2,
    },
  },
  sortMenuWrap: {
    minHeight: '300px',
    maxHeight: '60vh',
    height: 'fit-content',
    padding: '24px 24px 8px 24px',
    transition: 'all .4s ease',
    background: 'rgb(15, 8, 32)',
  },
  sortHeaderWarp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
  },
  sortTitle: {
    color: '#ffffff',
    font: 'normal normal 600 15px/19px Montserrat',
  },

  sortOptionsDefault: {
    borderTop: '1px solid #A89ABF50',
    color: '#A89ABF',
    display: 'flex',
    alignItems: 'center',
    minheight: '44px',
    letterSpacing: 0,
    padding: '16px 0px',
    textTransform: 'capitalize',
    font: 'normal normal normal 13px/16px Montserrat',
  },
  sortOptionSelected: {
    color: '#03F87E',
    font: 'normal normal 600 13px/16px Montserrat',
    Opacity: 1,
  },
  blurCard: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    width: '62px',
    height: '36px',
    // backdropFilter: 'blur(5px)',
    // backgroundColor: '#000000',
  },
  sortTagWrap: {
    height: '36px',
    width: '50px',
    backgroundColor: '#190547',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '5px',
  },
  sortTag: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    backgroundColor: '#120A27',
    borderRadius: '50%',
  },
}));
