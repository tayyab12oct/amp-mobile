import Head from 'next/head';
import React from 'react';

export const WebSiteSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: 'https://www.ottplay.com/',
        }),
      }}
    />
  );
};

export const OrganisationSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ottplay',
          url: 'http://www.ottplay.com/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://images.ottplay.com/static/new_logo.svg',
            width: '122',
            height: '40',
          },
        }),
      }}
    />
  );
};

export const WebPageSchema = (pageTitle, pageDescription) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: pageTitle,
          description: pageDescription,
          publisher: {
            '@type': 'Organization',
            name: 'ottplay',
          },
        }),
      }}
    />
  );
};

export const Schema = ({ ...props }) => {
  const { schema } = props;
  return (
    <Head>
      {schema && schema.length > 0
        ? schema.map((item) => {
            return item;
          })
        : null}
    </Head>
  );
};
