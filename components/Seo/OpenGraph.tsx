import { handleStringlength, removeAllHTMLTags } from '../../utils/helper';

import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

export const OpenGraph = ({ ...props }) => {
  const router = useRouter();
  const { ogTitle, ogSiteName, ogUrl, ogDescription, ogType, ogImage } = props;
  return (
    <Head>
      <meta property="og:title" content={ogTitle} />
      <meta
        property="og:site_name"
        content={ogSiteName ? ogSiteName : 'OTTPlay'}
      />
      <meta
        property="og:url"
        content={
          ogUrl
            ? ogUrl
            : `${process.env.REACT_APP_FRONTEND_URL + router?.asPath?.slice(1)}`
        }
      />
      <meta
        property="og:description"
        content={
          ogDescription
            ? handleStringlength(removeAllHTMLTags(ogDescription))
            : 'not available'
        }
      />
      <meta property="og:type" content={ogType ? ogType : 'website'} />
      <meta
        property="og:image"
        content={
          ogImage
            ? ogImage
            : 'https://images.ottplay.com/images/ottplay-cover-image-700.png'
        }
      />
    </Head>
  );
};
