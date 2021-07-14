import * as React from 'react';

import { Box, Grid } from '@material-ui/core';

import ImageComponent from './Images';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import { ViewportContext } from './ViewportProvider';
import { abbreviateNumber } from '../utils/helper';
// import { history } from '../configureStore';
import { makeStyles } from '@material-ui/core/styles';

export default function DetailsCard(props) {
  const classes = useStyles();
  const { data, isSelected, onSelect, forPage } = props;
  const { width } = React.useContext(ViewportContext);
  console.log('location.state.data.name: ', props.name);
  const renderMoviewShowCount = (item) => {
    const deatils = [
      {
        key: 'Movies',
        count: item.total_movies_published,
        isVisible: true,
        showPipe: true,
      },
      {
        key: 'Shows',
        count: item.total_shows_published,
        isVisible: true,
        showPipe: true,
      },
      // {
      //   key: 'Documentary',
      //   count: item.total_documentaries,
      //   isVisible: forPage === 'languages' && width > 600,
      //   showPipe: false,
      // },
    ];

    const renderCount = (item) => {
      return (
        <div
          className={[
            classes.countWrap,
            forPage === 'languages' && width < 600 && classes.countWrapNewLine,
          ].join(' ')}
        >
          <div
            className={classes.count}
            onClick={() =>
              Router.push({
                pathname: item.key === 'Movies' ? './movies' : './shows',
                query: { forPage, data },
              })
            }
          >
            {abbreviateNumber(item.count)}
          </div>
          <div className={classes.keys}>{item.key}</div>
        </div>
      );
    };
    return (
      <React.Fragment>
        <div className={classes.countDetailsWrap}>
          {deatils.map((item, index) => {
            return (
              item.isVisible &&
              item.count > 0 && (
                <React.Fragment>
                  {renderCount(item)}
                  {item.showPipe && <div className={classes.pipe}></div>}
                </React.Fragment>
              )
            );
          })}
        </div>
        {deatils
          .filter((item) => {
            return (
              width < 600 &&
              forPage === 'languages' &&
              item.key.toLocaleLowerCase() == 'documentary' &&
              item.count > 0
            );
          })
          .map((item: any, index) => {
            return renderCount(item);
          })}
      </React.Fragment>
    );
  };
  return (
    <div className={classes.root}>
      <Grid xs={12} item direction="row" style={{ display: 'flex' }}>
        <div className={classes.div1}>
          <div style={{ marginBottom: '20px' }}>
            {forPage === 'languages' ? (
              <Box
                className={classes.icon_box}
                style={{
                  backgroundColor: isSelected ? '#03F87E ' : '#010203',
                  color: isSelected ? '#000000' : '#03F87E',
                }}
              >
                <Typography
                  className={classes.icon}
                  style={{
                    color: isSelected ? '#000000' : '#A89ABF',
                  }}
                >
                  {props.logo}
                </Typography>
              </Box>
            ) : (
              <ImageComponent
                // style={{ height: '80px', width: '100px' }}
                src={props.logo}
                alt="logo"
              />
            )}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <div className={classes.name}>{props.name}</div>
          </div>
          <div>{renderMoviewShowCount(data)}</div>
        </div>
        <div className={classes.div2}>
          <div className={classes.pipe2}></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={classes.paragraph_1}>
              {props.name}
              {
                ' movies, tv shows, web series December 2020 in India watch online free'
              }
            </div>
            <div className={classes.paragraph_2}>
              {
                'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ‘lorem ipsum’ will uncover many web sites .'
              }
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",0
    flexGrow: 1,
    minHeight: 'auto',
    backgroundSize: 'contain',
    // backgroundColor: '#14062D',
    backgroundColor: 'transparent',
  },
  containerBox: {
    padding: '0 20px',
  },
  div1: {
    display: 'flex',
    flexDirection: 'column',
    // flex: '1 1 30%',
  },
  div2: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 70%',
  },
  loading: {
    // height: '64rem',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */,
    },
  },
  name: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: '14px',
    '& span': {
      fontSize: 10,
      letterSpacing: -1,
      margin: '0px 4px',
    },
  },
  countDetailsWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '128px',
  },
  countWrap: {
    textAlign: 'left',
    color: '#D6C6F4',
    width: '100%',
  },
  countWrapNewLine: {
    textAlign: 'center',
  },
  count: {
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    fontWeight: 600,
    '&:hover': {
      color: '#29F87E',
      // textDecoration: 'underline',
    },
  },
  icon_box: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
  },
  pipe: {
    width: '1px',
    height: '30px',
    backgroundColor: '#D6C6F4',
    margin: '0px 10px',
    opacity: 0.1,
    '&:last-child': {
      display: 'none',
    },
  },
  pipe2: {
    width: '1px',
    backgroundColor: '#D6C6F4',
    opacity: 0.1,
    height: '100% !important',
    margin: '0px 50px 0 20px !important',
    '&:last-child': {
      display: 'none',
    },
  },

  paragraph_1: {
    fontSize: '30px',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'justify',
    marginBottom: '20px',
  },
  paragraph_2: {
    color: 'white',
    opacity: '0.8',
    fontSize: '15px',
    textAlign: 'justify',
  },
  [theme.breakpoints.down('xs')]: {
    path: {
      fontSize: 10,
      textTransform: 'uppercase',
      marginLeft: 16,
      marginTop: 16,
      '& span': {
        fontSize: 8,
      },
    },
    containerBox: {
      padding: '0',
    },
  },
}));
