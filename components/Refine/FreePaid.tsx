import React, { useContext } from 'react';

import { Grid } from '@material-ui/core';
import { RefineCard } from '../RefineCard';
import { WebfoxContext } from '../../services/webfox';
import { freePaidList } from '../../utils/helper';

export function FreePaid(props) {
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
      {freePaidList.map((item, index) => {
        const array = webstore.free_paid.selectedFree_Paid;
        const isSelected = array.includes(item.id);
        return (
          <Grid xs={12} sm={12} md={6} lg={6} item>
            <RefineCard
              item={item}
              isSelected={isSelected}
              onSelect={() => actionDispatch(actions.SET_FREE_PAID, item.id)}
            />
          </Grid>
        );
      })}
    </React.Fragment>
  );
}
