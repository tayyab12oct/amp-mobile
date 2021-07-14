import React, { useContext } from 'react';

import { Grid } from '@material-ui/core';
import { RefineCard } from '../RefineCard';
import { WebfoxContext } from '../../services/webfox';

const ContentTypeList = [
  {
    id: 1,
    primary_title: 'Movies',
  },
  {
    id: 2,
    primary_title: 'Shows',
  },
  {
    id: 3,
    primary_title: 'Documentaries',
  },
  { id: 4, primary_title: 'Short Film' },
];

export function ContentType(props) {
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);
  return (
    <React.Fragment>
      {ContentTypeList.map((item, index) => {
        const array = webstore.contentType.selectedContentType;
        const isSelected = array.includes(item.id);
        return (
          <Grid xs={12} sm={12} md={6} lg={6} item>
            <RefineCard
              item={item}
              isSelected={isSelected}
              onSelect={() => actionDispatch(actions.SET_CONTENT_TYPE, item.id)}
            />
          </Grid>
        );
      })}
    </React.Fragment>
  );
}
