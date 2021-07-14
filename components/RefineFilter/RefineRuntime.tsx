import { Grid, Theme, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';

import { RefineCard } from '../RefineCard';
import SelectClearFilter from './SelectClearFilter';
import { WebfoxContext } from '../../services/webfox';

import { runtimeMinutesOptions } from '../../utils/helper';
import ImageComponent from '../Images';

export function RefineRunTime(props) {
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
      runtimeMinutesOptions.length > 0 &&
      runtimeMinutesOptions.length ===
        webstore.refine.forYou.selectedRuntimeMin?.length
    ) {
      setSelectFlag(true);
    } else {
      setSelectFlag(false);
    }
  }, [webstore.refine.forYou.selectedRuntimeMin, runtimeMinutesOptions]);

  const runtimeSelected = (item) => {
    actionDispatch(actions.SET_REFINE_RUNTIME_MIN, {
      name: item.label,
      name2: item.label2,
    });
    apiPostData();
  };

  const clearAllRuntime = () => {
    webstore.refine.forYou.selectedRuntimeMin.map((item) => {
      actionDispatch(actions.SET_REFINE_RUNTIME_MIN, {
        toggle: false,
      });
    });
    setSelectFlag(false);
    apiPostData();
  };

  const selectAllRuntime = () => {
    runtimeMinutesOptions.map((item) => {
      actionDispatch(actions.SET_REFINE_RUNTIME_MIN, {
        toggle: !selectFlag,
        name: item.label,
        name2: item.label2,
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
        clearData={() => clearAllRuntime()}
        selectData={() => selectAllRuntime()}
        hideSelectClear={true}
        selectFlag={selectFlag}
      />
      <div className={classes.filterWrap}>
        {runtimeMinutesOptions.map((item) => {
          const array = webstore.refine.forYou.selectedRuntimeMin;
          const isSelected = array?.includes(item.label);
          return (
            <div
              className={classes.textWrap}
              onClick={() => runtimeSelected(item)}
            >
              <div
                className={
                  classes.header + ' ' + (isSelected ? classes.selected : '')
                }
              >
                {' '}
                {item.name}
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
