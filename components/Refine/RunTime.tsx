import React, { useContext } from 'react';

import { Grid } from '@material-ui/core';
import { RefineCard } from '../RefineCard';
import { WebfoxContext } from '../../services/webfox';
import { runtimeMinutesOptions } from '../../utils/helper';

export function RunTime(props) {
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
      {runtimeMinutesOptions.map((item, index) => {
        const array = webstore.runtime_min.selectedRuntime_min;
        const isSelected = array.includes(item.id);
        return (
          <Grid xs={12} sm={12} md={6} lg={6} item>
            <RefineCard
              item={item}
              isSelected={isSelected}
              onSelect={() => actionDispatch(actions.SET_RUNTIME_MIN, item.id)}
            />
          </Grid>
        );
      })}
    </React.Fragment>
  );
}
