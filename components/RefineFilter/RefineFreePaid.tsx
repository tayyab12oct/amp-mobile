import { Grid, Theme, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';

import SelectClearFilter from './SelectClearFilter';
import { WebfoxContext } from '../../services/webfox';

import { freePaidList } from '../../utils/helper';
import ImageComponent from '../Images';

export function RefineFreePaid(props) {
  const [selectFlag, setSelectFlag] = React.useState(false);
  const classes = useStyles();
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);

  useEffect(() => {
    if (
      freePaidList.length > 0 &&
      freePaidList.length === webstore.refine.forYou.selectedFreePaid?.length
    ) {
      setSelectFlag(true);
    } else {
      setSelectFlag(false);
    }
  }, [webstore.refine.forYou.selectedFreePaid, freePaidList]);

  const freePaidSelected = (item) => {
    actionDispatch(actions.SET_REFINE_FREE_PAID, {
      name: item.label,
    });
    apiPostData();
  };

  const clearAllFreePaid = () => {
    webstore.refine.forYou.selectedFreePaid.map((item) => {
      actionDispatch(actions.SET_REFINE_FREE_PAID, {
        toggle: false,
      });
    });
    setSelectFlag(false);
    apiPostData();
  };

  const selectAllFreePaid = () => {
    freePaidList.map((item) => {
      actionDispatch(actions.SET_REFINE_FREE_PAID, {
        toggle: !selectFlag,
        name: item.label,
      });
    });
    setSelectFlag(!selectFlag);
    apiPostData();
  };

  const apiPostData = () => {
    actionDispatch(actions.REFINE_FOR_YOU_PAGE, {
      page: 'forYou',
    });
    props.setRefineState(true);
  };

  return (
    <div className={classes.root}>
      <SelectClearFilter
        clearData={() => clearAllFreePaid()}
        selectData={() => selectAllFreePaid()}
        selectFlag={selectFlag}
      />
      <div className={classes.filterWrap}>
        {freePaidList.map((item) => {
          const array = webstore.refine.forYou.selectedFreePaid;
          const isSelected = array?.includes(item.label);
          return (
            <div
              className={classes.textWrap}
              onClick={() => freePaidSelected(item)}
            >
              <div
                className={
                  classes.header + ' ' + (isSelected ? classes.selected : '')
                }
              >
                {' '}
                {item.label}
              </div>
              {isSelected ? (
                <div className={classes.activeImage}>
                  <ImageComponent src="https://images.ottplay.com/static/active.svg" alt="active icon" />
                </div>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    marginTop: '-1rem',
  },
  filterWrap: {
    marginTop: '0.5rem',
    maxHeight: '15rem',
    overflowY: 'auto',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      margin: '10px 20px',
      width: '3px',
      background: '#090411 0% 0% no-repeat padding-box',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px #090411',
      borderRadius: '10px',
      background: '#090411 0% 0% no-repeat padding-box',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#03F87E',
      borderRadius: '10px',
    },
  },
  textWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    borderBottom: '1px solid rgba(255, 255, 255, .05)',
  },
  header: {
    color: '#A89ABF',
    height: '2.5rem',
    padding: ' 0.4rem 0 0 0',
  },
  selected: {
    color: '#29F87E',
    fontWeight: 800,
  },
  activeImage: {
    marginRight: '1rem',
  },
}));
