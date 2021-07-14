import React, { useContext } from 'react';
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import { RefineCard } from '../RefineCard';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { WebfoxContext } from '../../services/webfox';

// eslint-disable-next-line no-sparse-arrays
const ReleaseYearOptions = [
  {
    id: 1,
    primary_title: '2020',
  },
  {
    id: 2,
    primary_title: '2019',
  },
  {
    id: 3,
    primary_title: '2018',
  },
  {
    id: 4,
    primary_title: '2017',
  },
  {
    id: 5,
    primary_title: '2016',
  },
  {
    id: 6,
    primary_title: '2015',
  },
  ,
  {
    id: 7,
    primary_title: '2014',
  },
  {
    id: 8,
    primary_title: '2013',
  },
  {
    id: 9,
    primary_title: '2012',
  },
  {
    id: 10,
    primary_title: '2011',
  },
  {
    id: 11,
    primary_title: '2010',
  },
  {
    id: 12,
    primary_title: '2009',
  },
  {
    id: 13,
    primary_title: '2008',
  },
  {
    id: 14,
    primary_title: '2007',
  },
  {
    id: 15,
    primary_title: '2006',
  },
  {
    id: 16,
    primary_title: '2005',
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

export function ReleaseYear(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([1900, 2000]);
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
    <React.Fragment>
      <Grid xs={12} item container className={classes.root}>
        <Grid xs={12} item>
          <PrettoSlider
            ValueLabelComponent={ValueLabelComponent}
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
            value={value}
            onChange={handleChange}
            min={1870}
            max={2020}
          />
          <div className={classes.sliderRange}>
            <span>Y 1870</span> <span>Y 2020</span>
          </div>
        </Grid>

        <Grid 
        // xs={12} 
        item className={classes.cardBox} container 
        spacing={2}
        >
          {ReleaseYearOptions.map((item, index) => {
            return (
              <Grid xs={12} md={6} className={classes.cardInnerBox} item>
                <RefineCard
                  item={item}
                  onSelect={() =>
                    actionDispatch(actions.SET_RELAESE_YEAR, item)
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </React.Fragment>
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
