import React, { useContext } from 'react';

import { Grid } from '@material-ui/core';
import { RefineCard } from '../RefineCard';
import { WebfoxContext } from '../../services/webfox';
import { newsSourceList } from '../../utils/helper';

export function NewsSource(props) {
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);

  const [select, setSelect] = React.useState(false as any);
  const [another, setAnother] = React.useState(false as any);

  React.useEffect(() => {
    if (props.forPage && props.forPage === 'refine') {
      if (props.clear === true) {
        setSelect(true);
        setAnother(true);
        actionDispatch(actions.SET_REFINE_SOURCE, {
          toggle: false,
          content: 4,
        });
        // setGenArray([]);
      }
      if (props.selectAll === true) {
        setSelect(true);
        setAnother(false);
        newsSourceList.map((item) => {
          actionDispatch(actions.SET_REFINE_SOURCE, {
            toggle: props.selectAll,
            name: item.label,
          });
        });
      }
    }
  }, [props.clear, props.selectAll, newsSourceList]);
  React.useEffect(() => {
    if (props.forPage && props.forPage === 'refine') {
      if (
        props.selectAll === false &&
        props.clear === false &&
        select === true &&
        another === false
      ) {
        actionDispatch(actions.SET_REFINE_SOURCE, {
          toggle: false,
          content: 4,
        });
      }
    }
  }, [props.clear, props.selectAll, newsSourceList, select]);

  return (
    <>
      {newsSourceList.map((item, index) => {
        const array = webstore.refine.news.selectedSource;
        const isSelected = array.includes(item.label);
        return (
          <Grid xs={12} sm={12} md={6} lg={6} item>
            <RefineCard
              item={item}
              isSelected={isSelected}
              onSelect={() =>
                actionDispatch(actions.SET_REFINE_SOURCE, {
                  name: item.label,
                })
              }
            />
          </Grid>
        );
      })}
    </>
  );
}
