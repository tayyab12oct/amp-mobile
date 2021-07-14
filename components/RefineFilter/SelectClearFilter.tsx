import { Button, Grid, Theme, makeStyles } from '@material-ui/core';

import ImageComponent from '../Images';
import React from 'react';
import Switch from 'react-switch';

export default function SelectClearFilter(props) {
  const classes = useStyles();
  return (
    <div className={classes.textWrap}>
      <Grid xs={6} item>
        {/* <label htmlFor="refine-switch" className={classes.label}>
          <span className={classes.textSpace}>Select All</span>
          <Switch
            checked={props.selectFlag}
            onChange={props.selectData}
            onColor="#03f87e"
            offColor="#100426"
            offHandleColor="#494060"
            onHandleColor="#BBB6C9"
            handleDiameter={18}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={40}
            id="refine-switch"
          />
        </label> */}
      </Grid>
      <Grid xs={6} item>
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.clear}
            onClick={props.clearData}
            startIcon={
              <ImageComponent
                src="https://images.ottplay.com/static/clear_svg.svg"
                alt="Clear"
                width="10"
                height="12"
              />
            }
          >
            Clear
          </Button>
        </div>
      </Grid>
    </div>
  );
}
const useStyles = makeStyles((theme: Theme) => ({
  label: {
    display: 'flex',
    alignItems: 'center',
  },
  textWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  textSpace: {
    margin: '0 4px 0 0',
    whiteSpace: 'nowrap',
    color: '#A89ABF',
    fontSize: 'clamp(13px, 0.8vw, 15px)',
    fontWeight: 'normal',
  },
  clear: {
    fontFamily: `"Montserrat", "Arial", "sans-serif" `,
    color: '#A89ABF',
    fontSize: 'clamp(13px, 0.8vw, 15px)',
    backgroundColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
    textTransform: 'none',
    float: 'right',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    '& $MuiButton-iconSizeSmall-': {
      marginRight: 4,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      '& $MuiButton-iconSizeSmall-': {
        width: 14,
        marginRight: 4,
        marginLeft: 0,
      },
    },
  },
}));
