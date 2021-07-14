import { Grid, Hidden } from '@material-ui/core';

import CriticsCard from './CriticsCard';
import Helmet from 'react-helmet';
import React from 'react';
import ReadMore from './ReadMore';
import Reviews from './Reviews';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export default function CriticsReviews() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <a href="https://domain.xn--com-9o0a" rel="noindex,nofollow"></a> */}
        {/* <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'Name of Author',
              sameAs: 'https://www.ottplay.com/',
            },
            datePublished: '2020-08-10T12:31:19+05:30',
            dateModified: '2020-08-11T08:13:21+05:30',
            headline:
              'Gunjan Saxena The Kargil Girl review: Janhvi Kapoor movie doesn&#8217;t soar',
            description:
              'Gunjan Saxena The Kargil Girl movie review: Janhvi Kapoor does get better as she goes along, but performance-wise, she is still clearly a work-in-progress. She was excellent in her small part in Ghost',
            inLanguage: 'en',
            itemReviewed: {
              '@type': 'Movie',
              name: 'Gunjan Saxena The Kargil Girl ',
              dateCreated: '2020-08-11T08:13:21+05:30',
              sameAs: 'https://www.ottplay.com/',
              image: 'https://www.ottplay.com/',
              director: {
                '@type': 'Person',
                name: 'Sharan Sharma',
              },
              actor: [
                {
                  '@type': 'Person',
                  name: 'Janhvi Kapoor',
                  sameAs: '',
                },
                {
                  '@type': 'Person',
                  name: ' Pankaj Tripathi',
                  sameAs: '',
                },
                {
                  '@type': 'Person',
                  name: ' Vineet Kumar Singh',
                  sameAs: '',
                },
                {
                  '@type': 'Person',
                  name: ' Angad Bedi',
                  sameAs: '',
                },
                {
                  '@type': 'Person',
                  name: ' Manav Vij',
                  sameAs: '',
                },
              ],
            },
            publisher: {
              '@type': 'Organization',
              name: 'OTT PROJECT',
              sameAs: 'www.ottplay.com',
            },
            reviewRating: {
              '@type': 'Rating',
              worstRating: 0,
              bestRating: 5,
              ratingValue: '2.5',
            },
          })}
        </script>
        <meta
          name="title"
          content="Gunjan Saxena The Kargil Girl review: Janhvi Kapoor movie doesn&#8217;t soar"
        />
        <meta
          name="description"
          content="Gunjan Saxena The Kargil Girl movie review: Janhvi Kapoor does get better as she goes along, but performance-wise, she is still clearly a work-in-progress. She was excellent in her small part in Ghost"
        /> */}
      {/* </Helmet> */}
      <Grid xs={12} container>
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} item container>
          <Grid xs={12} item>
            <p className={classes.path}>
              {'Home'}{' '}
              <span>
                {' '}
                {'>>'} {'Serious man'} {'>>'} {'Critics Review'}{' '}
              </span>
            </p>
          </Grid>
          <CriticsCard />
          <Reviews />
          <ReadMore />
          {/* ad codes
          <Hidden only={['xs']}>
            <Grid xs item className={classes.img}>
              <ImageComponent src={ads} className={classes.bottomAd} />
            </Grid>
          </Hidden> */}
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '50vh',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: '14px',
    paddingLeft: 33,
    paddingRight: 16,
    margin: '20px 0',
    '@media (max-width: 768px)': {
      fontSize: 11,
    },
  },
  advert: {
    margin: '15px',
    width: '100%',
  },
  text: {
    margin: '40x 0 25px 0',
    fontSize: '24px',
    color: '#ffffff',
    fontWeight: 500,
  },
  bottomAd: {
    marginTop: 38,
    width: 728,
    height: 90,
  },
  img: {
    textAlign: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    path: {
      textTransform: 'uppercase',
      fontSize: 9,
      marginTop: 0,
      padding: '0px 16px',
      marginBottom: 14,
    },
  },
}));
