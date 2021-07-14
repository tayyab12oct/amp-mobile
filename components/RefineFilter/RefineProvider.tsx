import { Grid, Theme, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';

import SelectClearFilter from './SelectClearFilter';
import { WebfoxContext } from '../../services/webfox';
import ImageComponent from '../Images';

export default function RefineProvider(props) {
  const classes = useStyles();
  const [results, setResults] = React.useState<any[]>([]);
  const [selectFlag, setSelectFlag] = React.useState(false);
  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );
  const providerArray = webstore.refine.forYou.selectedStreamingServices;

  useEffect(() => {
    const params = {
      limit: 50,
      module_name: 'Providers',
      platform: 'web',
    };

    webfox.getAllProviderList(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_PROVIDER_LIST_FAILURE, []);
      }
      actionDispatch(actions.FETCH_PROVIDER_LIST_SUCCESS, data || []);
      if (data && data.rank) {
        const arr = data.rank.filter(
          (e) => e.provider['status'] === 'published'
        );
        setResults(arr);
        actionDispatch(actions.FETCH_PROVIDER_LIST_SUCCESS, arr || []);
      }
    });
  }, []);

  useEffect(() => {
    if (
      results.length > 0 &&
      results.length === webstore.refine.forYou.selectedStreamingServices.length
    ) {
      setSelectFlag(true);
    } else {
      setSelectFlag(false);
    }
  }, [webstore.refine.forYou.selectedStreamingServices, results]);

  const providerSelected = (item) => {
    actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
      providers: item.provider._id,
      name: item.provider.name,
    });
    apiPostData();
  };

  const selectAllProvider = () => {
    results.map((item) => {
      actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
        toggle: !selectFlag,
        providers: item.provider._id,
        name: item.provider.name,
      });
    });
    setSelectFlag(!selectFlag);
    apiPostData();
  };

  const clearAllProvider = () => {
    webstore.refine.forYou.selectedStreamingServices.map((item) => {
      actionDispatch(actions.SET_REFINE_STREAMING_SERVICES, {
        toggle: false,
      });
    });
    setSelectFlag(false);
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
        clearData={() => clearAllProvider()}
        selectData={() => selectAllProvider()}
        selectFlag={selectFlag}
      />
      <div className={classes.filterWrap}>
        {results.map((item, index) => {
          const isSelected = providerArray.includes(item.provider._id);
          return (
            <div
              className={classes.textWrap}
              onClick={() => providerSelected(item)}
            >
              <div
                className={
                  classes.header + ' ' + (isSelected ? classes.selected : '')
                }
              >
                <ImageComponent
                  src={item.provider.logo_url}
                  alt="prov-icon"
                  width="24px"
                  height="24px"
                />{' '}
                <span>{item.provider.name}</span>
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
    width: '100%',
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
    display: 'flex',
    gap: '10px',
  },
  selected: {
    color: '#29F87E',
    fontWeight: 800,
  },
  activeImage: {
    marginRight: '1rem',
  },
}));
