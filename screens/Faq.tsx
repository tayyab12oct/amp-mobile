import * as React from 'react';

import { Footer, NavBar, TopHeader } from '../components';
import { Grid, Hidden } from '@material-ui/core';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ImageComponent from '../components/Images';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const faqs = [
  {
    question: 'What is OTTplay?',
    answer:
      'OTTplay is a comprehensive and reliable guide to movies and shows aimed at helping people find things to watch across an increasingly fragmented streaming landscape. It will act as a search engine for streaming content across OTT channels. No need to open streaming apps one by one, search for titles, watch trailers etc. Besides listing thousands of movies and TV shows, it will offer a number of smart filters (genre, price, ratings, and release year) to make browsing smoother and faster. It will let users know if a title is paid or free along with the service where users can watch/rent/buy/subscribe.',
  },
  {
    question: 'Is OTTplay a streaming service?',
    answer:
      'No, OTTplay is not a streaming service. We redirect you to the platform where the content you wish to watch is available.',
  },
  {
    question: 'How can I improve my recommendations?',
    answer:
      'Rate more titles and add more titles to your watchlist to improve the system recommendations.',
  },
  {
    question:
      'I searched for a movie/show on OTTplay but no results were shown, why?',
    answer:
      'We try to keep our database updated at all times but a few movies & shows get missed out . Please let us know what we are missing, and we will fix it asap. Write to us at feedback@ottplay.com',
  },
  {
    question:
      'Do people have to subscribe to be able to see data from sources? Is this different for different channels?',
    answer:
      'No subscription (paid) on OTTplay as of now. Registration is also not mandatory for browsing movies/shows or for searching or getting recommendations. It will be required only if the user wants to sync his/her watchlist across devices or likes a particular title. Registration will help with personalization across devices/browsers.',
  },
  {
    question:
      "A particular movie/show is available on Platform “A” but it's not shown on OTTplay, why?",
    answer:
      'We try to keep our database updated at all times with all the available information . Please let us know what we are missing, and we will fix it asap. Write to us at feedback@ottplay.com.',
  },
  {
    question: 'Which all platforms is the application available on?',
    answer: 'As of now OTTplay is available on Android, iOS & web platforms.',
  },
  {
    question: 'Which countries does OTTplay support?',
    answer:
      'Right now, we are available in India. We are in the process of expanding to other geographies.',
  },
  {
    question:
      'I observed that a movie/show was not available on an OTT though your platform said it did, why?',
    answer:
      'The providers sometimes remove content from their catalogue, and we try to keep our database updated at all times. Please let us know where we are wrong, and we will fix it asap. Write to us at feedback@ottplay.com.',
  },
  {
    question:
      'The price listed for a movie/show is wrong , I saw that it was more expensive on the OTT, why?',
    answer:
      'The provider could have changed the price . We try to keep our database updated at all times. Please let us know where we are wrong, and we will fix it asap. Write to us at feedback@ottplay.com.',
  },
  {
    question:
      'I faced an issue when I tried to buy/rent/subscribe on OTT. What should I do now?',
    answer:
      'We will not be able to provide support for issues outside our app or website. Please contact the provider’s support for the same.',
  },
  {
    question:
      'I was redirected to a different movie/show when I clicked on OTT, why?',
    answer:
      'We aim at keeping the data error free but a few movies & shows get missed out . Please let us know what information is wrong and we will fix it asap. Write to us at feedback@ottplay.com.',
  },
];
export default function FAQ(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0 as any);
  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex('');
    } else {
      setSelectedIndex(index);
    }
  };
  return (
    <React.Fragment>
      <div className={classes.root}>
        {/* <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <a href="https://domain.xn--com-9o0a" rel="noindex,nofollow"></a>
      </Helmet> */}
        <Grid container xs={12}>
          <Grid item md={1} lg={2}></Grid>
          <Grid
            container
            item
            xs={12}
            md={10}
            lg={8}
            className={classes.contentBox}
          >
            <Grid item xs={12} sm={7}>
              <p className={classes.header}>FAQ</p>
              {/* <p
              className={classes.about_content}
              style={{ margin: '0px 0 70px 0' }}
            >
              {
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.'
              }
            </p> */}
              {faqs.map((item: any, index: any) => (
                <Grid
                  className={
                    index + 1 === faqs.length
                      ? classes.collapsable_container_no_border
                      : classes.collapsable_container
                  }
                >
                  <Grid
                    onClick={() => handleClick(index)}
                    className={classes.collapsable_div}
                  >
                    <span className={classes.collapsable_div_question}>
                      {item.question}
                    </span>{' '}
                    {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
                  </Grid>
                  <Collapse
                    in={index === selectedIndex}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Grid className={classes.collapsed_div}>{item.answer}</Grid>
                  </Collapse>
                </Grid>
              ))}
            </Grid>
            <Hidden only={['xs']}>
              <Grid item xs={12} sm={5} className={classes.faqBox}>
                <ImageComponent
                  src="https://images.ottplay.com/static/faq.png"
                  alt="FAQ image"
                  className={classes.faqImg}
                />
              </Grid>
            </Hidden>
          </Grid>
          <Grid item md={1} lg={2}></Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '3% 0px 20px 0px',
  },
  collapsable_container: {
    color: 'red',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    borderBottom: '2px solid #8b1b5d8c',
    textAlign: 'left',
    padding: '15px 0',
    [theme.breakpoints.down('lg')]: {
      padding: '10px 0',
    },
  },
  faqBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
  },
  collapsable_container_no_border: {
    color: 'red',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    // borderBottom: '2px solid #8b1b5d8c',
    textAlign: 'left',
    padding: '15px 0',
    [theme.breakpoints.down('lg')]: {
      padding: '10px 0',
    },
  },
  faqImg: {
    width: '28vw',
  },
  movie_option_container: {
    padding: '0px !important',
  },
  containerBox: {
    borderTop: '2px solid #8b1b5d8c',
  },
  contentBox: {
    padding: '0px 15px',
  },
  about_content: {
    opacity: '0.7',
    lineHeight: '22px',
    textAlign: 'left',
    color: 'white',
    fontSize: 'clamp(12px, 1.2vw, 16px)',
  },
  div_left: {},
  header: {
    textAlign: 'left',
    color: 'white',
    marginTop: '0px',
    fontSize: 'clamp(16px, 1.8vw, 28px)',
    fontWeight: 500,
    marginBottom: 5,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
    },
  },
  sub_header1: {
    textTransform: 'capitalize',
    fontWeight: 'bolder',
  },
  movie_container: {
    margin: 0,
    [theme.breakpoints.down('lg')]: {
      // marginLeft: '-140px'
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  collapsable_div: {
    // color: 'white',
    color: '#ff4376',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    fontWeight: 600,
    lineHeight: '1.4',
  },
  collapsed_div: {
    opacity: '0.7',
    color: 'white',
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    // textAlign: 'left',
    padding: '5px 2px 2px 2px',
    textAlign: 'justify',
    // color: 'red',
  },
  collapsable_div_question: {
    color: 'white',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      margin: '3% 0px 0px 0px',
    },
    faqImg: {
      width: '70vw',
    },
  },
}));
