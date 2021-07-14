import React, { useContext } from 'react';

import { Grid } from '@material-ui/core';
import { RefineCard } from '../RefineCard';
import { WebfoxContext } from '../../services/webfox';
import { contentRatingList } from '../../utils/helper';

export function ContentRatings(props) {
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
      {contentRatingList.map((item, index) => {
        const array = webstore.contentRating.selectedContentRating;
        const isSelected = array.includes(item.id);
        return (
          <Grid xs={12} sm={12} md={6} lg={6} item>
            <RefineCard
              item={item}
              isSelected={isSelected}
              onSelect={() =>
                actionDispatch(actions.SET_CONTENT_RATINGS, item.id)
              }
            />
          </Grid>
        );
      })}
    </React.Fragment>
  );
}
