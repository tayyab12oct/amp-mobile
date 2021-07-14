import { Grid, Link, Typography } from '@material-ui/core';

import { PillButton } from '../../../components/PillButton';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageComponent from '../../../components/Images';

export default function ConnectTV() {
  const [enterCode, setenterCode] = React.useState(false);
  const handleSignIn = () => {
    setenterCode(true);
    // setsignUpPage(true);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}> Connect Your TV </div>
      <ImageComponent className={classes.img} src="https://images.ottplay.com/static/connectTVImg.png" alt="connect tv img" />

      {!enterCode ? (
        <React.Fragment>
          <div className={classes.subHeader}> To Connect Your TV </div>
          <div className={classes.text}>
            {' '}
            Please login to your account first{' '}
          </div>
          <PillButton
            text={'Sign In'}
            endIcon={<ImageComponent src="https://images.ottplay.com/static/rightArrow.svg" alt="" />}
            className={classes.createButton}
            onClick={handleSignIn}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={classes.subHeader}> Enter The Code </div>
          <div className={classes.text}>
            {' '}
            You Should See A Code On Your Tv. Please Enter It Here!{' '}
          </div>

          <div className={classes.signInIcons}>
            <Grid
              container
              spacing={0}
              xs={12}
              md={12}
              sm={12}
              lg={12}
              xl={12}
              className={classes.codeInput}
            >
              <Grid xs={3} item md={1} sm={1} lg={3} xl={3}>
                <div className={classes.innerInput}>
                  <input
                    type="text"
                    className={classes.subscribeInput}
                    placeholder={'C'}
                  />
                </div>
              </Grid>
              <Grid
                xs={3}
                item
                md={1}
                sm={1}
                lg={3}
                xl={3}
                className={classes.codeInput}
              >
                <div className={classes.innerInput}>
                  <input
                    type="text"
                    className={classes.subscribeInput}
                    placeholder={'O'}
                  />
                </div>
              </Grid>
              <Grid xs={3} item md={1} sm={1} lg={3} xl={3}>
                <div className={classes.innerInput}>
                  <input
                    type="text"
                    className={classes.subscribeInput}
                    placeholder={'D'}
                  />
                </div>
              </Grid>
              <Grid xs={3} item md={1} sm={1} lg={3} xl={3}>
                <div className={classes.innerInput}>
                  <input
                    type="text"
                    className={classes.subscribeInput}
                    placeholder={'E'}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          <PillButton
            text={'Proceed'}
            endIcon={<ImageComponent src="https://images.ottplay.com/static/rightArrow.svg" alt="" />}
            className={classes.createButton}
            onClick={handleSignIn}
          />
        </React.Fragment>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    textAlign: 'center',
    padding: '150px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInput: {},
  header: {
    fontSize: '20px',
    marginBottom: '50px',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginBottom: '20px;',
  },
  img: {
    // width: "130px",
    marginBottom: '50px',
  },
  text: {
    // padding: '0 100px',
  },
  createButton: {
    color: '#ffffff',
    marginTop: '20px',
    //margin: "80px 0 0 0",
    padding: ' 8px 15px 8px 15px',
    fontSize: '17px',
    borderRadius: '50px',
    textTransform: 'none',
    fontWeight: 'bold',
    backgroundColor: '#ff4275',
    minWidth: '300px',
  },
  innerInput: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    position: 'relative',
    width: '100%',
  },
  mail: {
    position: 'absolute',
    top: '9px',
    left: '14px',
  },
  subscribeInput: {
    padding: '5px',
    backgroundColor: 'black',
    // borderRadius: "31px",
    outline: 'none',
    // border: "none",
    opacity: 0.45,
    border: '0.6px solid grey',
    width: '50%',
    fontSize: '34px',
    textAlign: 'center',
    color: 'white',
    '@media (max-width: 425px)': {
      padding: '12px 40px',
    },
    '@media (max-width: 768px)': {
      padding: '12px 50px',
    },
  },
  signInIcons: {
    minWidth: '70%',
    marginLeft: '67px',
  },
});
