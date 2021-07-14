import * as React from 'react';

import { Button, Grid, Hidden } from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';

import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from '../Buttons/Buttons';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import WatchListSearch from '../../pages/watchlist/WatchListSearch';
import { WebfoxContext } from '../../services/webfox';
import ImageComponent from '../Images';

export function WatchListHeader(props) {
  const classes = useStyles();

  const { webstore } = React.useContext(WebfoxContext);
  console.log('count', webstore.watchlistArr);

  const sortCheck = typeof window !== 'undefined' && window.location.pathname;

  const items = [
    { id: '1', value: 'relavence', option: 'Relevance' },
    // { id: '1', value: 'recentlyAdded', option: 'Recently Added' },
    // { id: '2', value: 'popularity', option: 'Popularity' },
    { id: '2', value: 'imdbScore', option: 'OTTplay rating' },
    // { id: '3', value: 'criticScore', option: 'Critics Score' },
    { id: '4', value: 'releaseYear', option: 'Release date' },
  ];

  const itemsCheck = [
    // { id: '1', value: 'recentlyAdded', option: 'Recently Added' },
    // { id: '2', value: 'popularity', option: 'Popularity' },
    { id: '2', value: 'imdbScore', option: 'OTTplay rating' },
    // { id: '3', value: 'criticScore', option: 'Critics Score' },
    { id: '4', value: 'releaseYear', option: 'Release date' },
    { id: '5', value: 'relavence', option: 'OTTplay rating & Release date' },
  ];
  //const [sort, setSort] = React.useState(false);
  //const [sortby, setSortby] = React.useState('');

  const handleSort = (value: any) => {
    const sortIds: any = [];
    sortIds.push(value);
    props.setSort(value);
    //props.sortId(id)
    props.onSelect(value);
  };

  return (
    <div className={classes.root}>
      {props.watchList ? (
        <Grid container xs={12}>
          <Grid xs={12} item className={classes.header_container_watch}>
            <Grid xs={12} sm={2} item container style={{ marginRight: '30px' }}>
              <Typography className={classes.heading}>{props.data}</Typography>
            </Grid>
            <Grid xs={12} sm={8} item container>
              {/* <div className={classes.searchWrapper}>
                <WatchListSearch
                  placeholder="Search Watchlist"
                  onChange={props.onSearch}
                  onClick={props.onClick}
                  value={props.searchValue}
                  onClose={props.onClose}
                  onClickAway={props.onClickAway}
                  open={props.open}
                />
              </div> */}
            </Grid>
            {props && props.results && props.results.length > 0 ? (
              <Grid xs={12} sm={2} container>
                <div className={classes.subWrapperWatchlist}>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={
                      props.disabled ? classes.disabledClear : classes.clear
                    }
                    onClick={() => props.clear()}
                    startIcon={<Clear />}
                  >
                    Clear
                  </Button> */}
                  {/* <StyledDropdownButton
                    text="sort"
                    startIcon={<ImageComponent alt="sort icon" src={Sort} />}
                  >
                    {items.map((item, i) => (
                      <Dropdown.Item
                        key={i}
                        i={i}
                        value={item.value}
                        className={
                          props.sort.includes(item.value)
                            ? 'activeDropdownOption'
                            : 'dropdownOption'
                        }
                        onClick={() => handleSort(item.value)}
                        eventKey={item.value}
                      >
                        {item.option}
                        <hr
                          style={{
                            borderBottom: '1px solid #695197',
                            margin: 0,
                            opacity: 0.3,
                            marginTop: '10px',
                          }}
                        />
                      </Dropdown.Item>
                    ))}
                  </StyledDropdownButton> */}
                </div>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      ) : (
        <Grid container xs={12}>
          <Grid xs={12} item className={classes.header_container}>
            <Grid xs={12} sm={6} item container>
              <Typography className={classes.heading}>{props.data}</Typography>
            </Grid>
            <Hidden only={['xs']}>
              <Grid sm={1} item container></Grid>
              <Grid xs={6} sm={5} container>
                <div className={classes.subWrapper}>
                  {props && props.results && props.results.length > 0 ? (
                    <React.Fragment>
                      {/* <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={
                          props.disabled ? classes.disabledClear : classes.clear
                        }
                        onClick={() => props.clear()}
                        startIcon={<Clear />}
                      >
                        Clear
                      </Button> */}
                      {sortCheck === '/movies' || sortCheck === '/shows' ? (
                        <StyledDropdownButton
                          text="sort"
                          startIcon={<ImageComponent alt="sort icon" src="https://images.ottplay.com/static/sortIcon.svg" />}
                        >
                          {itemsCheck.map((item, i) => (
                            <Dropdown.Item
                              key={i}
                              i={i}
                              value={item.value}
                              className={
                                props.sort.includes(item.value)
                                  ? 'activeDropdownOption'
                                  : 'dropdownOption'
                              }
                              onClick={() => handleSort(item.value)}
                              eventKey={item.value}
                            >
                              {item.option}
                              <hr
                                style={{
                                  borderBottom: '1px solid #695197',
                                  margin: 0,
                                  opacity: 0.3,
                                  marginTop: '10px',
                                }}
                              />
                            </Dropdown.Item>
                          ))}
                        </StyledDropdownButton>
                      ) : (
                        <StyledDropdownButton
                          text="sort"
                          startIcon={<ImageComponent alt="sort icon" src="https://images.ottplay.com/static/sortIcon.svg" />}
                        >
                          {items.map((item, i) => (
                            <Dropdown.Item
                              key={i}
                              i={i}
                              value={item.value}
                              className={
                                props.sort.includes(item.value)
                                  ? 'activeDropdownOption'
                                  : 'dropdownOption'
                              }
                              onClick={() => handleSort(item.value)}
                              eventKey={item.value}
                            >
                              {item.option}
                              <hr
                                style={{
                                  borderBottom: '1px solid #695197',
                                  margin: 0,
                                  opacity: 0.3,
                                  marginTop: '10px',
                                }}
                              />
                            </Dropdown.Item>
                          ))}
                        </StyledDropdownButton>
                      )}
                    </React.Fragment>
                  ) : null}
                </div>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

const StyledDropdownButton = withStyles((theme) => ({
  root: {
    sort: {
      color: '#03F87E',
      fontSize: '16px',
      outline: 'none',
      boxShadow: 'none',
      textTransform: 'none',
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        width: 56,
      },
    },
  },
}))(DropdownButton);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    topWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px 330px',
      '@media (max-width: 1440px) and (min-width:px)': {
        padding: '0px 215px',
      },
    },
    subWrapperWatchlist: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 2,
      },
    },
    subWrapper: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
    },
    clear: {
      color: '#03F87E',
      fontSize: '16px',
      backgroundColor: 'transparent',
      outline: 'none',
      boxShadow: 'none',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
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
    disabledClear: {
      color: '#A89ABF',
      fontSize: '16px',
      backgroundColor: 'transparent',
      outline: 'none',
      boxShadow: 'none',
      textTransform: 'none',
      marginLeft: '8px',
      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
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
    heading: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 'clamp(18px, 1.8vw, 30px)',
      marginRight: '5%',
      marginBottom: '0px',
      display: 'flex',
      alignItems: 'center',
      textTransform: 'capitalize',
      [theme.breakpoints.down('xs')]: {
        marginBottom: 5,
      },
    },
    searchWrapper: {
      display: 'flex',
      //marginLeft: '-15%',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginTop: 0,
      },
    },
    header_container: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        margin: '0 16px',
        width: '100%',
      },
    },
    header_container_watch: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        margin: '0 16px',
        width: '100%',
        display: 'block',
      },
    },
  })
);
