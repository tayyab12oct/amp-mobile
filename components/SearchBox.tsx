import ImageComponent from './Images';
import React from 'react';
import { makeStyles } from '@material-ui/core';

export function SearchBox(props) {
  const classes = useStyles();

  return (
    <div className={classes.searchWrap}>
      {(
        <span className={classes.leftSearch} onClick={props.search}>
          <ImageComponent
            src={props.leftSearch}
            className={classes.searchIcon}
            alt=""
            width="0"
            height="0"
          />
        </span>
      ) || null}
      <input
        type="text"
        className={props.className}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onClick={props.onClick}
        value={props.value}
      />
      {(
        <span className={classes.closeSearch} onClick={props.onClickAway}>
          <ImageComponent
            src={props.rightSearch}
            className={classes.searchIconHome}
            alt="Search"
            width="12"
            height="12"
          />
        </span>
      ) || null}
      <span className={classes.closeSearch} onClick={props.onClickAway}>
        <ImageComponent
          src={props.closeIcon}
          className={classes.closeIcon}
          alt=""
          width="0"
          height="0"
        />
      </span>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  closeSearch: {
    position: 'absolute',
    cursor: 'pointer',
    right: '18px',
  },
  leftSearch: {
    cursor: 'pointer',
    position: 'absolute',
    left: '0px',
    marginLeft: '10px',
  },
  searchIcon: {
    width: 'clamp(18px, 1.5vw, 25px)',
  },
  searchIconHome: {
    width: 'clamp(10px, 1.5vw, 12px)',
  },
  closeIcon: {
    width: 'clamp(18px, 1.5vw, 25px)',
  },
}));
