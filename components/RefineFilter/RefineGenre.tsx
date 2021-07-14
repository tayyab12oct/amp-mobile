import { Grid, Theme, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';

import SelectClearFilter from './SelectClearFilter';
import { WebfoxContext } from '../../services/webfox';
import ImageComponent from '../Images';

export default function RefineGenre(props) {
  const classes = useStyles();
  const [results, setResults] = React.useState<any[]>([]);
  const [selectFlag, setSelectFlag] = React.useState(false);
  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );
  const genreArray = webstore.refine.forYou.selectedGenres;

  useEffect(() => {
    const params = {
      limit: 40,
    };

    webfox.getAllGenresList(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_GENRES_LIST_FAILURE, []);
      }

      if (data && data.genres) {
        setResults(
          data.genres.filter((item) => {
            return item.hasOwnProperty('icon_url');
          })
        );
        actionDispatch(
          actions.FETCH_GENRES_LIST_SUCCESS,
          data.genres.filter((item) => {
            return item.hasOwnProperty('icon_url');
          }) || []
        );
      }
    });
  }, []);

  useEffect(() => {
    if (
      results.length > 0 &&
      results.length === webstore.refine.forYou.selectedGenres.length
    ) {
      setSelectFlag(true);
    } else {
      setSelectFlag(false);
    }
  }, [webstore.refine.forYou.selectedGenres, results]);

  const genreSelected = (item) => {
    actionDispatch(actions.SET_REFINE_GENRE, {
      genre: item._id,
      name: item.name,
    });
    apiPostData();
  };

  const selectAllGenre = () => {
    results.map((item) => {
      actionDispatch(actions.SET_REFINE_GENRE, {
        toggle: !selectFlag,
        genre: item._id,
        name: item.name,
      });
    });
    setSelectFlag(!selectFlag);
    apiPostData();
  };

  const clearAllGenre = () => {
    webstore.refine.forYou.selectedGenres.map((item) => {
      actionDispatch(actions.SET_REFINE_GENRE, {
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
        clearData={() => clearAllGenre()}
        selectData={() => selectAllGenre()}
        selectFlag={selectFlag}
      />
      <div className={classes.filterWrap}>
        {results.map((item) => {
          const isSelected = genreArray.includes(item._id);
          return (
            <div
              className={classes.textWrap}
              onClick={() => genreSelected(item)}
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
