import { Grid, Theme, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';

import SelectClearFilter from './SelectClearFilter';
import { WebfoxContext } from '../../services/webfox';

import { contentTypeList } from '../../utils/helper';
import ImageComponent from '../Images';

export function RefineContentType(props) {
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
      contentTypeList.length > 0 &&
      contentTypeList.length ===
        webstore.refine.forYou.selectedContentType.length
    ) {
      setSelectFlag(true);
    } else {
      setSelectFlag(false);
    }
  }, [webstore.refine.forYou.selectedContentType, contentTypeList]);

  const contentSelected = (item) => {
    actionDispatch(actions.SET_REFINE_CONTENT_TYPE, {
      name: item.value,
    });
    apiPostData();
  };

  const clearAllContent = () => {
    webstore.refine.forYou.selectedContentType.map((item) => {
      actionDispatch(actions.SET_REFINE_CONTENT_TYPE, {
        toggle: false,
      });
    });
    setSelectFlag(false);
    apiPostData();
  };

  const selectAllContent = () => {
    contentTypeList.map((item) => {
      actionDispatch(actions.SET_REFINE_CONTENT_TYPE, {
        toggle: !selectFlag,
        name: item.value,
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
        clearData={() => clearAllContent()}
        selectData={() => selectAllContent()}
        selectFlag={selectFlag}
        hideSelectClear={true}
      />
      <div className={classes.filterWrap}>
        {contentTypeList.map((item) => {
          const array = webstore.refine.forYou.selectedContentType;
          const isSelected = array.includes(item.value);
          return (
            <div
              className={classes.textWrap}
              onClick={() => contentSelected(item)}
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
