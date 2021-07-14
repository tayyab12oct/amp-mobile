import * as React from 'react';

import { Grid, Hidden } from '@material-ui/core';

import Helmet from 'react-helmet';
import SEO from '../../components/Seo';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

export default function CookiePolicy(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SEO>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </SEO>
      <Grid xs={12} container>
        <Grid sm={1} lg={2} item></Grid>
        <Grid
          // xs={12}
          // sm={10}
          // lg={8}
          container
          spacing={2}
          direction="row"
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item xs={12} md={8} className={classes.div_left}>
            <Grid xs={12} className={classes.header}>
              Cookie Policy
            </Grid>
            <Grid className={classes.about_content}>
              {
                'Hindustan Media Ventures Limited collect information by automated means when users visit, access, or use our websites, (“website”), or widgets (collectively the “Services”) that link to this Cookie Policy.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'This Cookie Policy describes the information we obtain from Cookies, how Hindustan Media Ventures Limited (“HMVL”, or “we” or “us”) use Cookies, and how user can manage them. By using the Services, users acknowledge that they have read and accepted the Cookie Policy. We may periodically update this Cookie Policy without prior notice to reflect changes in our practices.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 25px 0px' }}
            >
              {
                'Use of Cookies may involve the processing of Personal Information (i.e., any information relating to an identified or identifiable individual, such as IP addresses, or other online identifiers). For more information about our data protection practices, see our Privacy Policy.'
              }
            </Grid>
            <Grid className={classes.header}>
              Information Obtained through Cookies
            </Grid>
            <Grid className={classes.about_content}>
              {
                'The information, we obtain through the use of Cookies may include information about user computer, device, and browser, such as user IP address, browser, operating system and device characteristics, language preferences, mobile device or advertising ID, referring URLs, and actions taken by user on the Services such as what content user visited, whether users have used the Services  before, dates and times users access the Services, email and advertising views and click-throughs, frequent article searches on the Services, and other software or hardware information. If user accesses the Services from a mobile or other device, we may collect information for that device such as a unique device identifier ("UDID"), mobile phone number, and details about user mobile carrier.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'Cookies can recognize user and remember important information that will make use of a site more convenient such as by remembering user login status and user preferences.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'Through the Cookies of third party analytics providers, ad networks, and advertisers, we can track user’s online activities over time and across third party websites, apps and devices, by obtaining information through automated means. This information, along with information we gather when user  logs in, can be used to understand use across sites and devices to help improve our products & services, remember user  preferences, provide content recommendations, and show user advertisements on the Services  or other third party websites and apps that may be tailored to user individual interests.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'These Cookies are essential to the Services in order to facilitate our authentication, registration or log-in process and enable user to navigate and use the features of the Services. Without these Cookies, user may not be able to take full advantage of Services or features, and the Services will not perform as smoothly for user as we would like.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'Users can stop Cookies from being downloaded to their device from the Services at any time by selecting the appropriate settings in browser. Most browsers will tell how to change browser settings to notify when a Cookie is being set or updated, or to restrict or block certain types or all Cookies.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 25px 0px' }}
            >
              {
                'All questions, comments and requests regarding this Cookie Policy should be addressed to:'
              }
              <br />
              <strong>Mailing Address: </strong>
              {
                'Hindustan Media Ventures Limited, Attn: Legal Department, Hindustan Times House, 18-20, Second Floor, Kasturba Gandhi Marg, New Delhi – 110 001, India'
              }
              <br />
              <strong>Email Address: </strong>
              <a href="mailto:contactottplay@htmedialabs.com">
                {'contactottplay@htmedialabs.com'}
              </a>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movie_option_container: {
    padding: '0px !important',
  },
  about_content: {
    opacity: '0.7',
    lineHeight: '1.5',
    textAlign: 'justify',
    color: 'white',
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    '& ul': {
      paddingLeft: 25,
    },
    '& a': {
      color: '#FF4376',
      textDecoration: 'none',
    },
  },
  div_left: {
    padding: '3rem 8px 0px 30px !important',
  },
  header: {
    textAlign: 'left',
    color: 'white',
    marginBottom: '4px',
    fontSize: 'clamp(16px, 2vw, 24px)',
  },
  movie_container: {
    margin: 0,
  },
  [theme.breakpoints.down('xs')]: {
    div_left: {
      padding: '2rem 8px 0px 30px !important',
    },
  },
}));
