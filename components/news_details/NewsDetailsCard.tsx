import { Theme, makeStyles } from '@material-ui/core';

import { DATE_FORMATE } from '../../utils/constants';
import NewsPill from './NewsPill';
import React from 'react';
import { getFormattedDateToDisplay } from '../../utils/helper';
import ImageComponent from '../Images';

export default function NewsDetailsCard({ ...props }) {
  const { result } = props;
  const classes = useStyles();

  const renderPublisherDetails = () => {
    return (
      <div className={classes.publisherdetailsWrap}>
        <div>
          <div className={classes.publisherName}>{result.publisher}</div>
          <div className={classes.publishDate}>
            {getFormattedDateToDisplay(
              result.published_date,
              DATE_FORMATE.MONTH_FORMATTED
            )}
          </div>
        </div>
        <div>
          <ImageComponent src={result.publisher_logo} />
        </div>
      </div>
    );
  };

  return (
    <div className={classes.newDetailsWrap}>
      <div>
        <div className={classes.newDetailsHeader}>
          <NewsPill title={'FILM PREVIEW'} />
          {/* ---TODO---Share
          <div className={classes.shareIconWrap}> 
            <ImageComponent src={IMAGES.share_icon} />
          </div> */}
        </div>
        <div
          className={classes.title}
          dangerouslySetInnerHTML={{
            __html: result.title,
          }}
        />
        {result.sub_title && (
          <div className={classes.subTitle}>{result.sub_title}</div>
        )}
      </div>
      <div>
        <div className={classes.hr} />
        {renderPublisherDetails()}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  newDetailsWrap: {
    width: '37%',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  newDetailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  shareIconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: '1px solid #FFFFFF30',
    '& img': {
      width: '22px',
    },
  },
  title: {
    paddingTop: '20px',
    fontSize: 'clamp(16px, 1.4vw, 20px)',
    fontWeight: 600,
    color: '#ffffff',
  },
  subTitle: {
    paddingTop: '14px',
    color: '#D6C6F4',
    opacity: 0.7,
    fontSize: 'clamp(12px, 1vw, 16px)',
  },
  hr: {
    margin: '20px 0px',
    borderBottom: '1px solid #D6C6F470',
    opacity: 0.5,
  },
  publisherdetailsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  publisherName: {
    color: '#ffffff',
    fontSize: 'clamp(12px, 1vw, 14px)',
  },
  publishDate: {
    color: '#A89ABF',
    fontSize: 'clamp(12px, 1vw, 14px)',
  },
}));
