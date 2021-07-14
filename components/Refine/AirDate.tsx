import React, { useContext } from 'react';

import { Grid } from '@material-ui/core';
import { RefineCard } from '../RefineCard';
import { WebfoxContext } from '../../services/webfox';

const AirDateOptions = [
  {
    id: 1,
    primary_title: 'Still Running',
  },
  {
    id: 2,
    primary_title: 'New Release',
  },
  {
    id: 3,
    primary_title: '2000s',
  },
  {
    id: 4,
    primary_title: 'Classics',
  },
];

export function AirDate(props) {
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
      {AirDateOptions.map((item, index) => {
        const array = webstore.airdate.selectedAirdate;
        const isSelected = array.includes(item.id);
        return (
          <Grid xs={12} sm={12} md={6} lg={6} item>
            <RefineCard
              item={item}
              isSelected={isSelected}
              onSelect={() => actionDispatch(actions.SET_AIRDATE, item.id)}
            />
          </Grid>
        );
      })}
    </React.Fragment>
  );
}
