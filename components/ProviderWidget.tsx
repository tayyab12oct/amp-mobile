import { Grid, Theme, makeStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  SCREEN_NAME,
  VARIABLE,
  getLocalStorageData,
} from '../utils/constants';

import AddStreamingModal from './AddStreamingModal';
import { IMAGES } from '../public/static/newImages';
import ImageComponent from './Images';
import Modal from 'react-modal';
import React from 'react';
import Router from 'next/router';
import { Spinner } from './Spinner';
import { WebfoxContext } from '../services/webfox';
import { abbreviateNumber } from '../utils/helper';
import { ViewportContext } from './ViewportProvider';
import NextImageComponent from './nextimage';

export function ProviderWidget(props) {
  const classes = useStyles();
  const { webfox, webstore, actionDispatch, actions } = React.useContext(
    WebfoxContext
  );
  const { screen, title, data } = props;
  let arr;
  const [selectedProvider, setSelectedProvider] = React.useState<any>([]);
  const [result, setResult] = React.useState<any>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  // const [flag, setFlag] = React.useState(false);
  const [showModal, setshowModal] = React.useState(false);
  const [isLeftEnd, leftEnd] = React.useState(true);
  const [isRightEnd, rightEnd] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const containerRef = React.useRef<any>();

  const { width } = React.useContext(ViewportContext);
  const forPage = 'provider';
  const getParams = () => {
    const params = {
      limit: 45,
      module_name: 'Providers',
      platform: 'web',
    };
    return params;
  };

  const redirectMethod = (data, total) => {
    const filter = {
      dataType: forPage,
      name: data.name,
    };
    actionDispatch(actions.SET_MOVIE_NAV_FILTER, filter);
    {
      props.screen === 'Discover'
        ? Router.push({
            pathname: './movies',
          })
        : props.screen === 'ForYou'
        ? ''
        : providerClicked(total);
    }
  };
  // history.push({
  //   pathname: './provider_details',
  //   state: { forPage, data, fromPage: props.fromPage },
  // })

  // onClick={() => {
  //   props.screen === 'Discover'
  //     ? history.push({
  //         pathname: './movies',
  //         state: { forPage, data },
  //       })
  //     : providerClicked(total);
  // }}

  let providersArr: any = [];
  React.useEffect(() => {
    providersArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],

      webstore.streamingServices.selectedStreamingServices || []
    );

    setLoadingData(true);
    setLoaded(false);
    if (data) {
      const filteredArr = data.filter(
        (e) =>
          e.provider &&
          e.provider['status'] &&
          e.provider['status'] === 'published'
      );
      setResult(filteredArr);
    } else if (
      webstore &&
      webstore.getProvider &&
      webstore.getProvider.data &&
      webstore.getProvider.data.length > 0
    ) {
      setResult(webstore.getProvider.data);
    } else {
      webfox
        .getSectionData(getParams())
        .then((response) => {
          if (screen === SCREEN_NAME.FOR_YOU) {
            arr = response.data.rank.filter((e) =>
              providersArr.includes(e.provider._id)
            );
          } else {
            arr = response.data.rank.filter(
              (e) => e.provider['status'] === 'published'
            );
          }
          arr = arr.map((e) => ({ ...e, isSelected: true }));
          setResult(arr);
          actionDispatch(actions.FETCH_PROVIDER_LIST_SUCCESS, arr || []);
        })
        .catch(() => {
          actionDispatch(actions.FETCH_PROVIDER_LIST_FAILURE, []);
        });
    }
    setLoadingData(false);
  }, []);

  const renderTitle = () => {
    return (
      <Grid xs={12} item className={classes.titleWarp}>
        {/* <div className={classes.title}>
          {result && result.length > 0 && getProviderCount()} Streaming
          Services
        </div> */}
        <div className={classes.title}>
          {title ? title : '30+ Streaming Services'}
        </div>
        <div
          className={classes.read}
          // onClick={() => history.push('./all-provider')}
          onClick={() =>
            Router.push({
              pathname: './all-provider',
              query: {
                source: props && props.sourcePage ? props.sourcePage : '',
              },
            })
          }
        >
          {loadingData ? (
            ''
          ) : (
            <React.Fragment> {VARIABLE.SEE_All} </React.Fragment>
          )}
        </div>
      </Grid>
    );
  };

  const renderProviderCard = (data, total) => {
    return (
      <div
        className={classes.cardContainer}
        onClick={() => redirectMethod(data, total)}
      >
        <div
          className={classes.imageWrap}
          // className={
          //   classes.imageWrap + ' ' + (total.isSelected ? '' : classes.hidden)
          // }
        >
          <NextImageComponent
          wrapperClassName = {classes.imageWrap}
            className={classes.providerIcon}
            src={
              loaded ? data.icon_url : '/static/newImages/new_spinner_mini.svg'
            }
            alt="provider icon"
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className={classes.totalCount}>
          {abbreviateNumber(data.total_all)}
        </div>
      </div>
    );
  };

  const renderArrow = (direction) => {
    return (
      <div
        className={[
          classes.arrowWrap,
          direction === 'left' ? classes.leftArrow : '',
        ].join(' ')}
        onClick={() => {
          handleScroll(direction);
        }}
      >
        <ImageComponent
          src={IMAGES.right_arrow_active}
          alt="right_arrow_icon"
        />
      </div>
    );
  };

  const handleScroll = (direction) => {
    if (direction === 'right') {
      containerRef.current.scrollLeft =
        containerRef.current.scrollLeft + containerRef.current.clientWidth - 70;
    } else {
      containerRef.current.scrollLeft =
        containerRef.current.scrollLeft - containerRef.current.clientWidth + 70;
    }
  };

  const handleArrowVisiblility = (ele) => {
    if (containerRef.current.scrollLeft > 10) {
      leftEnd(false);
    } else {
      leftEnd(true);
    }

    if (
      containerRef.current.scrollLeft >=
      containerRef.current.scrollWidth - containerRef.current.offsetWidth - 10
    ) {
      rightEnd(true);
    } else {
      rightEnd(false);
    }
  };

  const getProviderCount = () => {
    const array = result.filter((prov) => {
      return prov.provider.total_all > 0;
    });
    if (array.length % 5 === 0) {
      return array.length + '+';
    } else {
      const countToDisplay = array.length - (array.length % 5);
      return countToDisplay + '+';
    }
  };

  const handleOpenModal = (event) => {
    setshowModal(true);
  };

  const handleCloseModal = (event) => {
    setshowModal(false);
  };

  const addProvider = () => {
    return (
      <div onClick={handleOpenModal}>
        <ImageComponent
          className={classes.addImage}
          src={IMAGES.add_p}
          alt="ottplay"
        />
        <div className={classes.totalCount} style={{ color: '#29F87E' }}>
          Add
        </div>
      </div>
    );
  };

  // React.useEffect(() => {
  //   result.map((item) => {
  //     if (selectedProvider.includes(item)) {
  //       item.isSelected = true;
  //     } else {
  //       item.isSelected = false;
  //     }
  //   });
  //   setResult(result);
  //   setFlag(true);
  //   if (props.screen != 'Discover' && props.screen != 'ForYou') {
  //     props.setSelectedProvider(selectedProvider);
  //   }
  // }, [selectedProvider]);

  // React.useEffect(() => {
  //   setResult(result);
  // }, [flag]);

  const providerClicked = (value) => {
    // setFlag(false);
    const index = selectedProvider.findIndex(
      (item) => item.provider._id === value.provider._id
    );
    if (index !== -1) {
      setSelectedProvider(
        selectedProvider.filter((e, i) => {
          return index != i;
        })
      );
    } else {
      setSelectedProvider(selectedProvider.concat(value));
    }
  };

  const getArrowClass = () => {
    if (screen !== SCREEN_NAME.FOR_YOU) {
      if ((isLeftEnd && isRightEnd) || width < 600) {
        return classes.containerWithoutArrow;
      } else if (isLeftEnd) {
        return classes.containerWithOnlyRightArrow;
      } else if (isRightEnd) {
        return classes.containerWithOnlyLeftArrow;
      } else {
        return classes.containerWithArrow;
      }
    } else return ' ';
  };

  return (
    <div className={classes.root}>
      {result.length > 0 && (
        <Grid xs={12} container>
          <Grid
            xs={12}
            sm={12}
            lg={12}
            className={classes.providerIconBox}
            item
          >
            {screen === SCREEN_NAME.FOR_YOU ? '' : renderTitle()}
            {loadingData ? (
              <Spinner styles={{ minHeight: '20vh' }} />
            ) : (
              <div>
                <Grid
                  xs={12}
                  item
                  style={{ position: 'relative', display: 'inline-grid' }}
                >
                  {screen !== SCREEN_NAME.FOR_YOU &&
                    !isLeftEnd &&
                    width > 600 &&
                    renderArrow('left')}

                  <div
                    className={[classes.container, getArrowClass()].join(' ')}
                    ref={containerRef}
                    onScroll={(e) => {
                      handleArrowVisiblility(e);
                    }}
                  >
                    {result
                      .filter((prov) => {
                        return prov.provider.total_all_published > 0;
                      })
                      .map((item, index) => {
                        return renderProviderCard(item.provider, item);
                      })}
                    {screen === SCREEN_NAME.FOR_YOU ? addProvider() : ''}
                    <div className={classes.space}>{'   '} </div>
                  </div>

                  {screen !== SCREEN_NAME.FOR_YOU &&
                    !isRightEnd &&
                    width > 600 &&
                    renderArrow('right')}
                </Grid>
              </div>
            )}
          </Grid>
          {/*<Grid sm={1} lg={2} item></Grid>*/}
        </Grid>
      )}
      <Modal
        isOpen={showModal}
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
            top: '10%',
            left: '25%',
            right: '25%',
            bottom: '15%',
            border: '1px solid #100627',
            backgroundColor: '#130726',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0px',
            outline: 'none',
            padding: '0px',
            zIndex: '999',
          },
        }}
        onAfterOpen={() => {
          document.body.style.overflow = 'hidden';
        }}
        onAfterClose={() => {
          document.body.style.overflow = 'auto';
        }}
      >
        <AddStreamingModal handleClose={handleCloseModal} />
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    margin: '0',
  },
  titleWarp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#ffffff',
    // padding: '0 0 0 0.4rem',
  },
  title: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: 'clamp(18px, 1.6vw, 24px)',
  },
  container: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    padding: '0.5rem 0px 0.5rem 0px',
    width: '100%',
    height: '130px',
    color: '#ffffff',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
  },
  containerWithArrow: {
    width: 'calc(100% - 74px)',
    paddingLeft: '28px',
    marginLeft: '40px',
    transition: 'all .4s ease',
  },
  containerWithoutArrow: {
    width: '100%',
  },
  containerWithOnlyLeftArrow: {
    paddingLeft: '28px',
    marginLeft: '40px',
  },
  containerWithOnlyRightArrow: {
    width: 'calc(100% - 40px)',
  },
  cardContainer: {
    cursor: 'pointer',
    minWidth: '60px',
    marginRight: '10px',
    '&:hover': {
      '& $totalCount': {
        color: '#29F87E',
        fontWeight: 600,
        opacity: 1,
      },
      '& $providerIcon': {
        width: '86px',
        height: '86px',
        border: '1px solid rgb(255 255 255 / 50%)',
        zIndex: 2,
      },
    },
  },
  imageWrap: {
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '4px',
    color: '#FFFFFF',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  hidden: {
    opacity: 0.2,
  },
  providerIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: "fill",
    transition: "all .2s ease"
  },
  totalCount: {
    width: '100%',
    marginTop: '0.5rem',
    textAlign: 'center',
    fontSize: 'clamp(12px, 1vw, 14px)',
    letterSpacing: '0px',
    color: '#D6C6F4',
    fontWeight: 600,
    opacity: 0.5,
  },
  providerIconBox: {
    // paddingRight: '1%',
  },
  read: {
    color: '#D6C6F4',
    opacity: 1,
    fontSize: 'clamp(10px, 1vw, 16px)',
    float: 'right',
    cursor: 'pointer',
    // marginRight: 14,
    '&:hover': {
      color: '#29F87E',
    },
  },
  arrowWrap: {
    cursor: 'pointer',
    minWidth: '60px',
    minHeight: '60px',
    borderRadius: '50%',
    display: 'flex',
    position: 'absolute',
    right: 0,
    top: 15,
    justifyContent: 'center',
    alignItems: 'center',
    background: '#130726 0% 0% no-repeat padding-box',
    border: '1px solid #3A176A',
    zIndex: 3,
    '&:hover': {
      border: '1px solid #29F87E',
    },
  },
  leftArrow: {
    left: 0,
    right: '100%',
    transform: 'rotate(180deg)',
  },
  space: {
    display: 'block',
    minWidth: '24px',
    height: '100%',
  },
  addImage: {
    width: '3.5rem',
    border: '2px #29F87E solid',
    borderRadius: '50%',
    padding: '0.8rem',
    cursor: 'pointer',
  },
  [theme.breakpoints.down('xs')]: {
    providerIconBox: {
      padding: '0px 16px',
    },
    titleWarp: {
      padding: 0,
      marginTop: 15,
    },
  },
}));
