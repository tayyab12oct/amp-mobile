import { Theme, makeStyles } from '@material-ui/core';

import { NewsPill } from '../news/NewsPill';
import React from 'react';

export function NewsKeywords({ ...props }) {
  const { keywords } = props;
  const classes = useStyles();
  return (
    <div>
      <div className={classes.hr} />
      <div className={classes.keywordsWrap}>
        <div className={classes.tagLable}> Tags:</div>

        {keywords &&
          keywords.length > 0 &&
          keywords.map((keyword, index) => {
            return <NewsPill title={keyword} customClass={classes.tagPills} />;
          })}
      </div>
      <div className={classes.hr} style={{ marginTop: '8px' }} />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  hr: {
    margin: '20px 0px',
    borderBottom: '1px solid #D6C6F470',
    opacity: 0.5,
  },
  keywordsWrap: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tagLable: {
    color: '#999999',
    fontSize: 'clamp(12px, 1vw, 14px)',
    marginBottom: '12px',
  },
  tagPills: {
    border: '1px solid #D6C6F470',
    fontSize: 'clamp(10px, 1vw, 12px)',
    marginLeft: '16px',
    color: '#D6C6F4',
    opacity: 0.6,
    padding: '6px 20px',
    marginBottom: '12px',
  },
}));
