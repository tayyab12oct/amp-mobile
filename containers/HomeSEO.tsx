import React, { useState } from 'react';

import SEO from '../components/Seo';
import { useRouter } from 'next/router';

const HomeSEO = () => {
  const router = useRouter();

  const siteNavigationSchema = () => {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              {
                '@type': 'SiteNavigationElement',
                position: 1,
                name: 'Home',
                url: 'http://www.ottplay.com/home',
              },
            ],
          }),
        }}
      />
    );
  };

  const breadcrumbSchema = () => {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@id':
                    'http://www.ottplay.com/' +
                    (typeof window !== 'undefined' &&
                      window.location?.pathname),
                  name: 'Home',
                },
              },
            ],
          }),
        }}
      />
    );
  };

  return (
    <SEO>
      <meta
        property="og:title"
        content="OTTplay - Movies, TV Shows, Web Series streaming search, where to watch online"
      />
      <meta property="og:site_name" content="OTTPlay" />
      <meta
        property="og:url"
        content={process.env.REACT_APP_FRONTEND_URL + router?.asPath?.slice(1)}
      />
      <meta
        property="og:description"
        content="OTTplay is a platform for finding Movies, TV Shows, Web Series - WHAT to watch, WHERE to watch, HOW to watch, and even WHEN to watch! We cover all the major streaming services and OTTs like Netflix, Amazon Prime Video, Hotstar Disney, Sonyliv, Zee5 and many others"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://images.ottplay.com/images/ottplay-cover-image-700.png"
      />
      <title>
        OTTplay - Movies, TV Shows, Web Series streaming search, where to watch
        online
      </title>
      <meta
        name="description"
        content="OTTplay is a platform for finding Movies, TV Shows, Web Series - WHAT to watch, WHERE to watch, HOW to watch, and even WHEN to watch! We cover all the major streaming services and OTTs like Netflix, Amazon Prime Video, Hotstar Disney, Sonyliv, Zee5 and many others"
      />
      <meta
        itemProp="keywords"
        content="OTTplay, OTTplay app, OTTplay movies, OTTplay web series, OTTplay TV shows, OTT streaming, Streaming search engine India, Where to watch movies, where to watch tv shows, where to watch web series, Netflix, Amazon Prime video, Hotstar Disney, Sonyliv, Zee5"
      />
      <meta
        name="keywords"
        content="OTTplay, OTTplay app, OTTplay movies, OTTplay web series, OTTplay TV shows, OTT streaming, Streaming search engine India, Where to watch movies, where to watch tv shows, where to watch web series, Netflix, Amazon Prime video, Hotstar Disney, Sonyliv, Zee5"
      />
      {siteNavigationSchema()}
      {breadcrumbSchema()}
      <link
        rel="canonical"
        href={process.env.REACT_APP_FRONTEND_URL + router?.asPath?.slice(1)}
      />
    </SEO>
  );
};

export default HomeSEO;
