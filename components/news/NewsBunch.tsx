import { Theme, makeStyles } from '@material-ui/core';

import { NewsCard } from './NewsCard';
import React from 'react';
import { ReviewNewsCard } from './ReviewNewsCard';
import { TopNewsCard } from './TopNewsCard';
import { useRouter } from 'next/router';

export function NewsBunch({ ...props }) {
  const router = useRouter();
  const [random, setRandom] = React.useState(1);
  const iframsSectionRef = React.useRef(null);
  const {
    result,
    type,
    filter,
    setActiveNewsUrl,
    activeNewsUrl,
    setFilter,
    contentType,
    handleClick,
    component,
    sourceSelected,
    googleAd,
  } = props;
  const classes = useStyles();

  React.useEffect(() => {
    if (iframsSectionRef.current) {
      window.scrollTo({
        behavior: 'smooth',
        top: iframsSectionRef.current.offsetTop - 50,
      });
    }
  }, [activeNewsUrl]);

  const handleCardClick = (
    url,
    newsId,
    publisher,
    publisherShort,
    ottplayId,
    seoKey
  ) => {
    if (contentType !== 'review') {
      //code check
      if (seoKey) {
        router.push({
          pathname: `/${
            contentType === 'all-news' ? 'news' : contentType
          }/${seoKey}`,
        });
      } else return;
    } else if (contentType === 'review') {
      router.push({
        pathname: `/review/${seoKey}`,
      });
      // history.push({
      //   pathname: `/review-details`,
      //   search: `?seoUrl=${seoKey}`,
      // });
    } else {
      if (
        publisher === 'Hindustan Times' ||
        publisher === 'Desi Martini' ||
        publisher === 'Desimartini' ||
        publisherShort === 'DM'
      ) {
        window.open(url, '_blank');
        setActiveNewsUrl(null);
      } else {
        setActiveNewsUrl(url);
      }
    }
  };

  const handleIframeClose = () => {
    setActiveNewsUrl(null);
  };

  const handleIframeRefresh = () => {
    setRandom((prev) => prev + 1);
  };

  const renderButton = (lable, clickHandler) => {
    return (
      <div className={classes.button} onClick={() => clickHandler()}>
        {lable}
      </div>
    );
  };

  const renderIframe = () => {
    return (
      <div className={classes.iframeWrap} ref={iframsSectionRef}>
        <div className={classes.iframeHeader}>
          {renderButton('Reload', handleIframeRefresh)}
          {renderButton('Close', handleIframeClose)}
        </div>
        <iframe
          key={random}
          src={activeNewsUrl}
          className={classes.iframe}
        ></iframe>
      </div>
    );
  };

  return (
    <>
      {contentType !== 'review' && (
        <TopNewsCard
          item={result[0]}
          handleClick={handleCardClick}
          type={type}
          filter={filter}
          setFilter={setFilter}
          contentType={contentType === 'all-news' ? 'news' : contentType}
          sourceSelected={sourceSelected}
          googleAd={googleAd}
        />
      )}
      {activeNewsUrl &&
        result.some((item) => item.link === activeNewsUrl) &&
        renderIframe()}
      <div
        className={[
          classes.newsContainer,
          type === 'similar' && classes.similarNewsContainer,
          type === 'listing' && classes.newsContainerListing,
        ].join(' ')}
      >
        {contentType !== 'review'
          ? result.slice(1, result.length).map((item, index) => {
              if (component) {
                return component(item);
              } else
                return (
                  <NewsCard
                    item={item}
                    handleClick={handleCardClick}
                    type={type}
                    filter={filter}
                    setFilter={setFilter}
                    contentType={
                      contentType === 'all-news' ? 'news' : contentType
                    }
                    sourceSelected={sourceSelected}
                  />
                );
            })
          : result.map((item, index) => {
              return (
                <ReviewNewsCard
                  item={item}
                  handleClick={handleCardClick}
                  type={type}
                  filter={filter}
                  setFilter={setFilter}
                  contentType={
                    contentType === 'all-news' ? 'news' : contentType
                  }
                  sourceSelected={sourceSelected}
                />
              );
            })}
      </div>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '75%',
  },
  newsContainer: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 31.33%)',
    gap: '0 3%',
    padding: '0.5rem 0',
    color: '#ffffff',
  },
  similarNewsContainer: {
    gridTemplateColumns: 'repeat(auto-fit, 48%)',
  },
  iframeWrap: {
    width: '100%',
    paddingTop: '30px',
  },
  iframeHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '50px',
  },
  button: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    margin: '0px 6px',
    // height: '30px',
    padding: '4px 16px',
    borderRadius: '40px',
    border: '1px solid rgb(255 255 255 / 20%)',
  },
  iframe: {
    width: '100%',
    height: '950px',
    backgroundImage: `url("/static/newImages/new_spinner_mini.svg")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '30px',
    border: '1px solid  rgba(0, 0, 0, 0.3)',
  },

  '@media (max-width: 1440px)': {
    newsContainerListing: {
      gridTemplateColumns: 'repeat(auto-fit, 48%)',
    },
  },
  '@media (max-width: 960px)': {
    newsContainer: {
      gridTemplateColumns: 'repeat(auto-fit, 48%)',
    },
  },

  [theme.breakpoints.down('md')]: {
    newsContainerListing: {
      gridTemplateColumns: 'repeat(auto-fit, 48%)',
    },
  },
  [theme.breakpoints.down('xs')]: {
    newsContainer: {
      gridTemplateColumns: 'repeat(auto-fit, 100%)',
    },
    root: {
      width: '100%',
    },
    similarNewsContainer: {
      gridTemplateColumns: 'repeat(auto-fit, 100%)',
    },
    newsContainerListing: {
      gridTemplateColumns: 'repeat(auto-fit, 100%)',
    },
  },
}));
