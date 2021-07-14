import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import React from 'react';
import { SearchBox } from '../../components/SearchBox';
import { ViewportContext } from '../../components/ViewportProvider';
import { makeStyles } from '@material-ui/core';

export default function WatchListSearch(props) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);

  const renderMobileSearch = () => {
    return (
      <ClickAwayListener onClickAway={props.onClickAway}>
        <div className={classes.search}>
          {props.open === true ? (
            <SearchBox
              className={classes.mobileSearchInput}
              onClick={props.onClick}
              closeIcon="https://images.ottplay.com/static/close.svg"
              onClose={props.onClose}
              onChange={props.onChange}
              value={props.value}
              onClickAway={props.onClickAway}
            />
          ) : (
            <SearchBox
              className={classes.mobileSearchInput}
              onChange={props.onChange}
              placeholder={props.placeholder}
              onClick={props.onClick}
              value={props.value}
              rightSearch="https://images.ottplay.com/static/searchIcon.svg"
              onClickAway={props.onClickAway}
            />
          )}
        </div>
      </ClickAwayListener>
    );
  };

  return (
    <React.Fragment>
      {width < 600 ? (
        renderMobileSearch()
      ) : (
        <ClickAwayListener onClickAway={props.onClickAway}>
          <div
            className={classes.search}
            style={{ width: props.onClick?.expandInput ? '100%' : '' }}
          >
            {props.open === true ? (
              <SearchBox
                className={classes.expandSearchInput}
                onClick={props.onClick}
                closeIcon="https://images.ottplay.com/static/close.svg"
                onClose={props.onClose}
                onChange={props.onChange}
                value={props.value}
                leftSearch="https://images.ottplay.com/static/searchIcon.svg"
                onClickAway={props.onClickAway}
              />
            ) : (
              <SearchBox
                className={classes.searchInput}
                onChange={props.onChange}
                placeholder={props.placeholder}
                onClick={props.onClick}
                value={props.value}
                leftSearch="https://images.ottplay.com/static/searchIcon.svg"
                onClickAway={props.onClickAway}
              />
            )}
          </div>
        </ClickAwayListener>
      )}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  search: {
    marginRight: '3%',
    width: '100%',
  },
  searchInput: {
    padding: '10px 125px 10px 40px',
    outline: 'none',
    border: 'none',
    height: 45,
    color: '#d6c6f4',
    fontSize: '14px',
    borderBottom: '1px solid rgb(59 51 72)',
    webkitTransition: 'padding 0.6s ease-in-out',
    transition: 'padding 0.6s ease-in-out',
    backgroundPosition: '10px 10px',
    backgroundColor: '#000000',
    opacity: '0.4',
    borderRadius: 10,
  },
  expandSearchInput: {
    backgroundColor: '#000000',
    opacity: '0.4',
    borderRadius: 10,
    background: '#000000 0% 0% no-repeat padding-box',
    webkitTransition: 'padding 0.6s ease-in-out',
    transition: 'padding 0.6s ease-in-out',
    padding: '10px 250px 10px 50px',
    outline: 'none',
    '&:placeholder': {
      fontSize: '14px',
      color: '#fffff',
    },
    width: '100%',
    border: 'none',
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 100,
    borderBottom: '2px solid #000000',
  },
  [theme.breakpoints.down('xs')]: {
    search: {
      width: '100%',
      marginRight: 0,
    },
    mobileSearchInput: {
      borderRadius: '10px !important',
      backgroundColor: 'rgb(0 0 0 / 18%)',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 8,
      outline: 'none',
      border: 'none',
      color: '#ffffff',
      fontSize: '12px',
      borderBottom: '1px solid rgb(64,64,64)',
      webkitTransition: 'padding 0.6s ease-in-out',
      transition: 'padding 0.6s ease-in-out',
      backgroundPosition: '10px 10px',
      width: '100%',
      '& span': {
        fontSize: 10,
      },
    },
  },
}));
