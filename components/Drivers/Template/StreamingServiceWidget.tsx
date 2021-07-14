import { ProviderWidget } from '../../ProviderWidget';
import React from 'react';

export function StreamingServiceWidget({ ...props }) {
  const { title, data } = props;
  return (
    <ProviderWidget
      fromPage={'Discover'}
      screen={'Discover'}
      data={data}
      title={title}
    />
  );
}
