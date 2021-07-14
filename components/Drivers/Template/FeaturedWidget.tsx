import { FeaturedWidget } from '../../FeaturedWidget';
import React from 'react';

export function FeaturedCarouselWidget({ ...props }) {
  const { title, data } = props;
  return <FeaturedWidget result={data.slice(0, 5)} sourcePage={'Home'} />;
}
