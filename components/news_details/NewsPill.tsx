import { Theme, makeStyles } from '@material-ui/core';

import React from 'react';

export default function NewsPill({ ...props }) {
  const { title, customClass } = props;
  const classes = useStyles();

  return <div className={[classes.pill, customClass].join(' ')}>{title}</div>;
}

const useStyles = makeStyles((theme: Theme) => ({
  pill: {
    width: 'fit-content',
    backgroundColor: '#331A5D',
    color: '#FFFFFF',
    padding: '12px 20px',
    borderRadius: '40px',
    fontSize: 'clamp(12px, 1vw, 16px)',
    height: 'fit-content',
  },
}));
