import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import React from 'react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import ImageComponent from '../Images';

interface ValueLabelComponentProps {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

const YellowCustomTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    width: '67px',
    height: '36px',
    borderRadius: '20px',
    backgroundColor: 'black',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  popperArrow: {
    border: 'white',
  },
  arrow: {
    color: 'black',
    '&::before': {
      border: '1px solid #FBBF14',
      backgroundColor: 'black',
      boxSizing: 'border-box',
    },
  },
  toolTipBox: {},
  tooltipArrow: {
    border: '1px solid #FBBF14',
  },
  toolTipTitle: {
    font: 'normal normal medium Montserrat',
    color: '#FBBF14',
    fontSize: '14px',
  },
  toolTipImg: {
    width: '17px',
    height: '16px',
  },
  [theme.breakpoints.down('xs')]: {
    tooltip: {
      width: 33,
      height: 18,
    },
    toolTipTitle: {
      font: 'normal normal medium Montserrat',
      color: '#FBBF14',
      fontSize: 9,
      marginRight: 4,
    },
    toolTipImg: {
      width: '4px !important',
      height: 4,
    },
    toolTipBox: {
      '& img': {
        width: '9px !important',
        height: '9px !important',
      },
    },
  },
}))(Tooltip);

function YellowValueLabelComponent(props: ValueLabelComponentProps) {
  const { children, open, value } = props;
  const classes = useStyles();

  return (
    <YellowCustomTooltip
      title={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'end',
            letterSpacing: '0px',
          }}
          className={classes.toolTipBox}
        >
          <div className={classes.toolTipTitle}>{value}</div>
          <ImageComponent
            src="https://images.ottplay.com/static/yellow_star.svg"
            alt="star icon"
            className={classes.toolTipImg}
          />
        </div>
      }
      placement="top"
      arrow
      open
    >
      {children}
    </YellowCustomTooltip>
  );
}

const GreenCustomTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    width: '67px',
    height: '36px',
    borderRadius: '20px',
    backgroundColor: 'black',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  popperArrow: {
    border: 'white',
  },
  arrow: {
    color: 'black',
    '&::before': {
      border: '1px solid #0BD671',
      backgroundColor: 'black',
      boxSizing: 'border-box',
    },
  },
  toolTipBox: {},
  tooltipArrow: {
    border: '1px solid #0BD671',
  },
  toolTipTitle: {
    font: 'normal normal medium Montserrat',
    color: '#FBBF14',
    fontSize: '14px',
  },
  toolTipImg: {
    width: '17px',
    height: '16px',
  },
  [theme.breakpoints.down('xs')]: {
    tooltip: {
      width: 33,
      height: 18,
    },
    toolTipTitle: {
      font: 'normal normal medium Montserrat',
      color: '#FBBF14',
      fontSize: 9,
      marginRight: 4,
    },
    toolTipImg: {
      width: '4px !important',
      height: 4,
    },
    toolTipBox: {
      '& img': {
        width: '9px !important',
        height: '9px !important',
      },
    },
  },
}))(Tooltip);

function GreenValueLabelComponent(props: ValueLabelComponentProps) {
  const { children, open, value } = props;
  const classes = useStyles();

  return (
    <GreenCustomTooltip
      title={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'end',
            letterSpacing: '0px',
          }}
          className={classes.toolTipBox}
        >
          <div className={classes.toolTipTitle}>{value}</div>
          <ImageComponent
            src="https://images.ottplay.com/static/green_star.svg"
            alt="green start"
            className={classes.toolTipImg}
          />
        </div>
      }
      placement="top"
      arrow
      open
    >
      {children}
    </GreenCustomTooltip>
  );
}

export function Rating() {
  const classes = useStyles();
  const [imbdRating, setImbdRating] = React.useState<number[]>([3, 6]);
  const [criticsRating, setCriticsRating] = React.useState<number[]>([2, 8]);

  const handleSliderChange = (id: string, newValue: number | number[]) => {
    switch (id) {
      case 'imbd_rating':
        setImbdRating(newValue as number[]);
        break;
      case 'critics_rating':
        setCriticsRating(newValue as number[]);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Grid xs={12} md={10} lg={10} item container className={classes.root}>
        <Grid xs={12} item className={classes.individualRateContainer}>
          <div className={classes.alignHeader}>
            <ImageComponent src="https://images.ottplay.com/static/reel_logo.png" alt="imbd_icon" />
            <span>IMBD</span>
          </div>
          <div>
            <PrettoSlider
              valueLabelDisplay="auto"
              ValueLabelComponent={YellowValueLabelComponent}
              aria-labelledby="imbd_rating"
              value={imbdRating}
              onChange={(id, value) => handleSliderChange('imbd_rating', value)}
              min={1}
              max={10}
              style={{
                color: '#FBBF14',
                border: 'none',
              }}
            />
            <div className={classes.sliderRange}>
              <span>0</span>
              <span>10</span>
            </div>
          </div>
        </Grid>
        <Grid xs={12} item className={classes.individualRateContainer}>
          <div className={classes.alignHeader}>
            <ImageComponent src="https://images.ottplay.com/static/critics_score_icon.svg" alt="critics_score_icon" />
            <span>Critics Score</span>
          </div>
          <div>
            <PrettoSlider
              valueLabelDisplay="auto"
              ValueLabelComponent={GreenValueLabelComponent}
              aria-labelledby="critics_rating"
              value={criticsRating}
              onChange={(id, value) =>
                handleSliderChange('critics_rating', value)
              }
              min={1}
              max={10}
              style={{
                color: '#0BD671',
                border: 'none',
              }}
            />
            <div className={classes.sliderRange}>
              <span>0</span>
              <span>10</span>
            </div>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const PrettoSlider = withStyles((theme: Theme) => ({
  root: {
    color: '#52af77',
    height: '8px',
    margin: '70px 0px 0px 0px',
    width: '100%',
  },
  thumb: {
    height: 19,
    width: 19,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
    fontSize: '18px',
  },
  track: {
    height: 8,
    borderRadius: 10,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      padding: 0,
      height: 5,
    },
    rail: {
      height: 5,
    },
    track: {
      height: 5,
    },
    thumb: {
      height: 12,
      width: 12,
      marginTop: -4,
      marginLeft: -10,
    },
    valueLabel: {
      fontSize: 8,
    },
  },
}))(Slider);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: 'white',
    margin: '0 auto',
  },
  individualRateContainer: {
    borderBottom: '1px solid black',
    padding: '10px 0px',
  },
  alignHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& span': {
      font: 'normal normal bold 16px Montserrat',
      padding: '5px',
    },
  },
  sliderRange: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  [theme.breakpoints.down('xs')]: {
    individualRateContainer: {
      borderBottom: '1px solid black',
      padding: '15px 0px',
    },
    alignHeader: {
      '& img': {
        width: 28,
        height: 16,
        marginRight: 5,
      },
      '& span': {
        font: 'normal normal bold 11px Montserrat',
        padding: '0px',
      },
    },
    sliderRange: {
      marginBottom: 10,
      '& span': {
        fontSize: 9,
      },
    },
  },
}));
