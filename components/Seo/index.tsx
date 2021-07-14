import Head from 'next/head';
import React from 'react';

const SEO = (props) => {
  const { removeNoIndex } = props;
  return (
    <Head>
      {props.children}
      {/* <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" /> */}
    </Head>
  );
};

export default SEO;
