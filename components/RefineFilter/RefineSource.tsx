import { Grid, Theme, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';

import ImageComponent from '../Images';
import SelectClearFilter from './SelectClearFilter';
import { WebfoxContext } from '../../services/webfox';

export default function RefineSource(props) {
  const source = [
    {
      source: {
        name: 'All',
      },
    },
    {
      source: {
        name: 'OTTplay',
      },
    },
    {
      source: {
        name: 'Hindustan Times',
      },
    },
    {
      source: {
        name: 'Live Mint',
      },
    },
    {
      source: {
        name: 'Desi Martini',
      },
    },
    {
      source: {
        name: 'Film Companion',
      },
    },
  ];
  useEffect(() => {
    if (sourceArray === '') {
      actionDispatch(actions.SET_REFINE_SOURCE, {
        name: 'All',
      });
      apiPostData();
    }
  }, []);
  const classes = useStyles();
  const [results, setResults] = React.useState<any[]>(source);
  const [selectFlag, setSelectFlag] = React.useState(false);
  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );

  const sourceArray = webstore.refine.news?.selectedSource;
  const sourceSelected = (item) => {
    actionDispatch(actions.SET_REFINE_SOURCE, {
      name: item.source.name,
    });
    apiPostData();
  };

  const clearAllLang = () => {
    actionDispatch(actions.SET_REFINE_SOURCE, {
      toggle: false,
    });
    setSelectFlag(false);
    apiPostData();
  };

  const apiPostData = () => {
    actionDispatch(actions.REFINE_NEWS_PAGE, {
      page: 'news',
    });
    props.setRefineState(true);
  };
  return (
    <div className={classes.root}>
      <div className={classes.filterWrap}>
        {results.map((item) => {
          const isSelected =
            sourceArray?.replace(/\s/g, '').toLowerCase() ===
            item.source.name.replace(/\s/g, '').toLowerCase();
          return (
            <div
              className={classes.textWrap}
              onClick={() => sourceSelected(item)}
            >
              <div
                className={
                  classes.header + ' ' + (isSelected ? classes.selected : '')
                }
              >
                {' '}
                {item.source.name}
              </div>
              {isSelected ? (
                <div className={classes.activeImage}>
                  <ImageComponent
                    src="https://images.ottplay.com/static/active.svg"
                    alt="active icon"
                  />
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
    maxHeight: '16rem',
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
