import Head from 'next/head';
import React from 'react';
import { removeAllHTMLTags } from '../../utils/helper';
import { useRouter } from 'next/router';

const generateMicoDataMetaTags = (microData) => {
  const microDataArray = [];
  for (const property in microData) {
    microDataArray.push(
      <meta itemProp={property} content={microData[property]} />
    );
  }

  return microDataArray;
};

const handleStringlength = (str, wordCount = 200) => {
  //check if a string is blank, null or undefined
  if (!str || /^\s*$/.test(str)) {
    return '';
  } else {
    return str.split(' ').slice(0, wordCount).join(' ');
  }
};

export const SEO = ({ ...props }) => {
  const router = useRouter();
  const {
    metaData,
    ogData,
    title,
    exposeToGoogle,
    microData,
    schemaJsons,
    schema,
    extraTags,
  } = props;
  return (
    <Head>
      {/* no-follow no-index will be added if exposeToGoogle is not true */}
      {!exposeToGoogle || process.env.REACT_APP_ENV !== 'production' ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : null}
      {!exposeToGoogle || process.env.REACT_APP_ENV !== 'production' ? (
        <meta name="googlebot" content="noindex,nofollow" />
      ) : null}

      {/* all og tags */}
      <meta property="og:title" content={ogData.ogTitle} />
      <meta
        property="og:site_name"
        content={ogData.ogSiteName ? ogData.ogSiteName : 'OTTPlay'}
      />
      <meta
        property="og:url"
        content={
          ogData.ogUrl
            ? ogData.ogUrl
            : `${process.env.REACT_APP_FRONTEND_URL + router?.asPath?.slice(1)}`
        }
      />
      <meta
        property="og:description"
        content={
          ogData.ogDescription
            ? handleStringlength(removeAllHTMLTags(ogData.ogDescription))
            : 'not available'
        }
      />
      <meta
        property="og:type"
        content={ogData.ogType ? ogData.ogType : 'website'}
      />
      <meta
        property="og:image"
        content={
          ogData.ogImage
            ? ogData.ogImage
            : 'https://images.ottplay.com/images/ottplay-cover-image-700.png'
        }
      />
      {/* title */}
      <title>{title}</title>
      {/* meta data list */}
      <meta name="title" content={metaData.metaTitle} />
      <meta
        name="description"
        content={handleStringlength(
          removeAllHTMLTags(metaData.metaDescription)
        )}
      />
      <meta name="keywords" content={metaData.metaKeywords} />
      {/* micro data list */}
      {microData
        ? generateMicoDataMetaTags(microData).map((item, index) => {
            return item;
          })
        : null}
      {/* creating schema for JSON provided */}
      {schemaJsons && schemaJsons.length > 0
        ? schemaJsons.map((item) => {
            return (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({ item }),
                }}
              />
            );
          })
        : null}
      {/* rendering schema */}
      {schema && schema.length > 0
        ? schema.map((item) => {
            return item;
          })
        : null}
      {/* Custom tags */}
      {extraTags && extraTags.length > 0
        ? extraTags.map((item) => {
            return item;
          })
        : null}
    </Head>
  );
};

export const MetaData = ({ ...props }) => {
  const router = useRouter();
  const {
    metaData,
    title,
    exposeToGoogle,
    microData,
    extraTags,
    schema,
  } = props;
  return (
    <Head>
      {/* no-follow no-index will be added if exposeToGoogle is not true */}
      {!exposeToGoogle || process.env.REACT_APP_ENV !== 'production' ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : null}
      {!exposeToGoogle || process.env.REACT_APP_ENV !== 'production' ? (
        <meta name="googlebot" content="noindex,nofollow" />
      ) : null}

      {/* title */}
      <title>{title}</title>
      {/* meta data list */}
      <meta name="title" content={metaData.metaTitle} />
      <meta
        name="description"
        content={handleStringlength(
          removeAllHTMLTags(metaData.metaDescription)
        )}
      />
      <meta name="keywords" content={metaData.metaKeywords} />
      {/* micro data list */}
      {microData
        ? generateMicoDataMetaTags(microData).map((item, index) => {
            return item;
          })
        : null}

      {/* Custom tags */}
      {extraTags && extraTags.length > 0
        ? extraTags.map((item) => {
            return item;
          })
        : null}

      {schema && schema.length > 0
        ? schema.map((item) => {
            return item;
          })
        : null}
    </Head>
  );
};
