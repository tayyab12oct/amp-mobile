import React, { useContext } from 'react';
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import { RefineCard } from '../RefineCard';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { WebfoxContext } from '../../services/webfox';

const PriceOptions = [
  {
    id: 1,
    primary_title: 'Upto 50',
  },
  {
    id: 2,
    primary_title: 'Upto 100',
  },
  {
    id: 3,
    primary_title: 'Upto 150',
  },
  {
    id: 4,
    primary_title: 'Upto 200',
  },
  {
    id: 5,
    primary_title: 'Upto 250',
  },
  {
    id: 6,
    primary_title: 'More than 250',
  },
];

interface ValueLabelComponentProps {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

const CustomTooltip = withStyles((theme: Theme) => ({
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
  tooltipArrow: {
    border: '1px solid #0BD671',
  },
  [theme.breakpoints.down('xs')]: {
    tooltip: {
      width: 46,
      height: 26,
    },
  },
}))(Tooltip);

function ValueLabelComponent(props: ValueLabelComponentProps) {
  const { children, open, value } = props;

  return (
    <CustomTooltip
      title={
        <div
          style={{
            font: 'normal normal medium Montserrat',
            color: '#0BD671',
            fontSize: '14px',
          }}
        >
          {value}
        </div>
      }
      placement="top"
      arrow
      open
    >
      {children}
    </CustomTooltip>
  );
}

export function Price(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([200, 1000]);
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Grid xs={12} item container className={classes.root}>
      <Grid xs={12} item>
        <PrettoSlider
          valueLabelDisplay="on"
          ValueLabelComponent={ValueLabelComponent}
          aria-labelledby="range-slider"
          value={value}
          onChange={handleChange}
          min={0}
          max={1500}
        />
        <div className={classes.sliderRange}>
          <span>0</span> <span>1500</span>
        </div>
      </Grid>

      <Grid 
      // xs={12} 
      item className={classes.cardBox} container 
      spacing={2}
      >
        {PriceOptions.map((item, index) => {
          return (
            <Grid xs={12} md={6} className={classes.cardInnerBox} item>
              <RefineCard
                item={item}
                onSelect={() => actionDispatch(actions.SET_PRICE, item.id)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

const PrettoSlider = withStyles((theme: Theme) => ({
  root: {
    color: '#52af77',
    height: '8px',
    margin: '50px 0px 0px 0px',
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
    color: '#0BD671',
  },
  rail: {
    height: 8,
    borderRadius: 4,
    color: '#000000',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      height: 5,
    },
    tooltip: {
      width: 46,
      height: 26,
    },
    thumb: {
      height: 12,
      width: 12,
      marginTop: -4,
      marginLeft: -10,
    },
    track: {
      height: 5,
    },
    rail: {
      height: 5,
    },
  },
}))(Slider);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: 'white',
    margin: '0 auto',
  },
  sliderRange: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px',
    color: '#8B7FA0',
    marginTop: '-10px',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      padding: '0 8px',
    },
    sliderRange: {
      '& span': {
        fontSize: 11,
      },
    },
    cardBox: {
      margin: 0,
    },
    cardInnerBox: {
      padding: '0px !important',
    },
  },
}));
