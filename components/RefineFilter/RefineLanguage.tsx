import { Grid, Theme, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';

import SelectClearFilter from './SelectClearFilter';
import { WebfoxContext } from '../../services/webfox';
import ImageComponent from '../Images';

export default function RefineLanguage(props) {
  const classes = useStyles();
  const [results, setResults] = React.useState<any[]>([]);
  const [selectFlag, setSelectFlag] = React.useState(false);
  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );
  let langsArray = webstore.refine.forYou.selectedLanguages;
  useEffect(() => {
    const params = {
      limit: 12,
      module_name: 'Languages',
      platform: 'web',
    };

    webfox.getAllLanguageList(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_LANGUAGE_LIST_FAILURE, []);
      }
      if (data && data.rank) {
        const arr = data.rank.filter(
          (e) =>
            e.language &&
            e.language['status'] &&
            e.language['status'] === 'published'
        );
        setResults(arr);
        actionDispatch(actions.FETCH_LANGUAGE_LIST_SUCCESS, arr || []);
      }
    });
    if (
      webstore.refine.forYou &&
      webstore.refine.forYou.selectedLanguages &&
      webstore.refine.forYou.selectedLanguages.length === 0
    ) {
      webstore.refine.forYou.selectedLanguages = webstore.languages.name;
    }
    langsArray = webstore.refine.forYou.selectedLanguages;
  }, []);

  useEffect(() => {
    if (
      results.length > 0 &&
      results.length === webstore.refine.forYou.selectedLanguages.length
    ) {
      setSelectFlag(true);
    } else {
      setSelectFlag(false);
    }
  }, [webstore.refine.forYou.selectedLanguages, results]);

  const languageSelected = (item) => {
    actionDispatch(actions.SET_REFINE_LANGUAGES, {
      name: item.language.name,
    });
    apiPostData();
  };

  const selectAllLang = () => {
    results.map((item) => {
      actionDispatch(actions.SET_REFINE_LANGUAGES, {
        toggle: !selectFlag,
        name: item.language.name,
      });
    });
    setSelectFlag(!selectFlag);
    apiPostData();
  };

  const clearAllLang = () => {
    webstore.refine.forYou.selectedLanguages.map((item) => {
      actionDispatch(actions.SET_REFINE_LANGUAGES, {
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
        clearData={() => clearAllLang()}
        selectData={() => selectAllLang()}
        selectFlag={selectFlag}
      />
      <div className={classes.filterWrap}>
        {results.map((item) => {
          const isSelected = langsArray.includes(item.language.name);
          return (
            <div
              className={classes.textWrap}
              onClick={() => languageSelected(item)}
            >
              <div
                className={
                  classes.header + ' ' + (isSelected ? classes.selected : '')
                }
              >
                {' '}
                {item.language.name}
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
