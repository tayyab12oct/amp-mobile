import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { PillButton, RefinedItems } from './PillButton';

import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from './Buttons/Buttons';
import { IMAGE_BASE_URL } from '../utils/constants';
import ImageComponent from './Images';
import Modal from 'react-modal';
import React from 'react';
import { RefineTab } from './Refine/RefineTab';
import Switch from 'react-switch';
import { ViewportContext } from './ViewportProvider';
import { withStyles } from '@material-ui/styles';

export function DetailsHeader(props) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const [refine, setRefine] = React.useState(false);
  const [refineCount, setRefineCount] = React.useState(0);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const handleButtons = (value: string) => {
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
  const handleSort = (value: any) => {
    const sortIds: any = [];
    sortIds.push(value);
    props.setSort(value);
    //props.sortId(id)
    props.onSort(value);
  };
  const items = [
    { id: '2', value: 'imdbScore', option: 'OTTplay rating' },
    { id: '4', value: 'releaseYear', option: 'Release date' },
  ];
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
  return (
    <div className={classes.root} id={'navBar'}>
      <Grid
        xs={12}
        lg={12}
        container
        className={classes.containerBar}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: '1 1 100%',
              padding: 20,
              height: '65px',
            }}
          >
            <div className={classes.leftSection}>
              <div className={classes.headerCount}>
                {props.count > 0 && (
                  <React.Fragment>
                    {/* <div>{props.count}</div>
                  {props.icon && <ImageComponent src={props.icon} />} */}
                    <div style={{ paddingLeft: '5px' }}>Refine</div>
                  </React.Fragment>
                )}
              </div>
              <div>
                {/* <Grid xs={5} item> */}
                <label className={classes.selectAll} htmlFor="refine-switch">
                  <span className={classes.selectSpan}>{'Select All'}</span>
                  <Switch
                    // checked={
                    //   webstore.languages.name.length === results.length &&
                    //   results.length > 0
                    //     ? true
                    //     : webstore.languages.toggle
                    // }
                    // onChange={handleSwitch}
                    onChange={() => null}
                    checked={false}
                    onColor="#03f87e"
                    offColor="#100426"
                    offHandleColor="#494060"
                    onHandleColor="#BBB6C9"
                    handleDiameter={width > 600 ? 20 : 18}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={width > 600 ? 20 : 22}
                    width={width > 600 ? 45 : 40}
                    className={classes.reactSwitch}
                    id="refine-switch"
                  />
                </label>
                {/* </Grid>{' '} */}
              </div>
              <div className={classes.headerLabel}>
                {props.count > 0 && (
                  <React.Fragment>
                    {/* <div>{props.count}</div> */}
                    <ImageComponent
                      src={`${IMAGE_BASE_URL}/images/clear_svg.svg`}
                      alt="clear"
                      width="10"
                      height="12"
                    />
                    <div style={{ paddingLeft: '5px' }}>Clear</div>
                  </React.Fragment>
                )}
              </div>
              <div className={classes.pipe}></div>

              <div className={classes.headerText}>
                {props.count > 0 && (
                  <React.Fragment>
                    <div style={{ fontWeight: 'bold' }}>{props.count}</div>
                    {props.icon && (
                      <div className={classes.langIconWrap}>{props.icon}</div>
                    )}
                    <div style={{ paddingLeft: '5px' }}>{props.headerText}</div>
                  </React.Fragment>
                )}
              </div>
            </div>

            <div className={classes.rightSection}>
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
                          backgroundColor: `${
                            props.button && props.button.includes(item.value)
                              ? '#0BD671'
                              : 'transparent'
                          }`,
                          color: `${
                            props.button && props.button.includes(item.value)
                              ? '#100721 !important'
                              : '#A89ABF'
                          }`,
                        }}
                        text={item.name}
                      />
                    </div>
                  );
                })}
              {props ? (
                <Grid xs={12} sm={2} container>
                  <div className={classes.subWrapperWatchlist}>
                    <StyledDropdownButton
                      text="sort By"
                      startIcon={
                        <ImageComponent
                          src={`${IMAGE_BASE_URL}/images/sortIcon.svg`}
                          alt="sort"
                        />
                      }
                    >
                      {items.map((item, i) => (
                        <Dropdown.Item
                          key={i}
                          i={i}
                          value={item.value}
                          className={
                            props.sort.includes(item.value)
                              ? 'activeDropdownOption'
                              : 'dropdownOption'
                          }
                          onClick={() => handleSort(item.value)}
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
                </Grid>
              ) : null}
            </div>
          </div>
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
  },
  headerText: {
    color: 'white',
    fontSize: '16px',
    // fontWeight: 'bold',
    display: 'flex',
    marginLeft: '10px',
    fontFamily: 'Montserrat',
  },
  rightSection: {
    position: 'absolute',
    right: '18%',
    display: 'flex',
    alignItems: 'center',
  },
  leftSection: {
    position: 'absolute',
    left: '18%',
    display: 'flex',
    alignItems: 'center',
  },
  headerCount: {
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'flex',
  },
  headerLabel: {
    color: '#A89ABF',
    fontSize: '12px',
    // fontWeight: 'bold',
    display: 'flex',
  },
  containerBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    // padding: 20,
    // height: '65px',
    alignItems: 'center',
    // justifyContent: 'space-between',
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
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 2,
    },
  },
  details: {
    marginLeft: 10,
  },
  reactSwitch: {
    border: '1px solid #554473',
  },
  selectSpan: {
    padding: '5px 5px 5px 5px',
    color: '#A89ABF',
    fontSize: '12px',
  },
  selectAll: {
    marginTop: '-8%',
    marginRight: 10,
    marginLeft: '10px',
  },
  langIconWrap: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '30px',
    // height: '30px',
    // borderRadius: '50%',
    // background: '#29F87E',
    // marginBottom: '8px',
    // color: '#000000',
    // fontSize: '16px',
    // fontWeight: 'bold',
    color: '#000000',
    width: '30px',
    height: '30px',
    display: 'flex',
    fontSize: '1rem',
    background: '#29F87E',
    alignItems: 'center',
    fontWeight: 'bold',
    borderRadius: '50%',
    justifyContent: 'center',
  },
}));
