import GoogleAdOttPlay from '../../GoogleAds';
import { Grid } from '@material-ui/core';
import React from 'react';
import { ViewportContext } from '../../ViewportProvider';

export function AdsWidget({ ...props }) {
  const { adInfo } = props;
  const { width } = React.useContext(ViewportContext);
  return adInfo && adInfo.adCode ? (
    <Grid
      xs={12}
      container
      item
      style={{ padding: width < 600 ? '0px 16px' : '0px' }}
    >
      <Grid sm={1} lg={2} item></Grid>
      <Grid
        xs={12}
        sm={10}
        lg={8}
        item
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '12px 0px',
        }}
      >
        <GoogleAdOttPlay adInfo={adInfo} />;
      </Grid>
      <Grid sm={1} lg={2} item></Grid>
    </Grid>
  ) : null;
}
