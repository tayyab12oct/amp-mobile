import { Genres, StreamingService } from '../Refine';
import React, { useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IMAGES } from '../../public/static/newImages';
import ImageComponent from '../Images';
import { RefineContentRating } from './RefineContentRating';
import { RefineFreePaid } from './RefineFreePaid';
import RefineGenre from './RefineGenre';
import RefineLanguage from './RefineLanguage';
import RefineProvider from './RefineProvider';
import { RefineQuality } from './RefineQuality';
import { RefineRunTime } from './RefineRuntime';
import RefineSource from './RefineSource';
import Typography from '@material-ui/core/Typography';

export default function RefineFilter(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>('panel0');

  useEffect(() => {
    if (props.forPage === 'news') {
      setExpanded('panel0');
    }
  });
  const refine = [
    {
      name: 'Languages',
      unselected_image:
        'https://images.ottplay.com/static/language_unselected.svg',
      selected_image:
        'https://images.ottplay.com/static/languages_selected.svg',
      component: <RefineLanguage setRefineState={props.setRefineState} />,
    },
    {
      name: 'Genres',
      unselected_image:
        'https://images.ottplay.com/static/Genres_unselected.svg',
      selected_image: 'https://images.ottplay.com/static/genres_selected.svg',
      component: <RefineGenre setRefineState={props.setRefineState} />,
    },
    {
      name: 'Providers',
      unselected_image:
        'https://images.ottplay.com/static/streaming_unselected.svg',
      selected_image:
        'https://images.ottplay.com/static/Streaming_selected.svg',
      component: <RefineProvider setRefineState={props.setRefineState} />,
    },
    // {
    //   name: 'Rating',
    //   unselected_image: IMAGES.filter_icons.rating_filter_default,
    //   selected_image: IMAGES.filter_icons.rating_filter_active,
    //   component: <EasyFilter setRefineState={props.setRefineState} />,
    // },
    {
      name: 'Free/Paid',
      unselected_image: IMAGES.filter_icons.free_paid_filter_default,
      selected_image: IMAGES.filter_icons.free_paid_filter_active,
      component: <RefineFreePaid setRefineState={props.setRefineState} />,
    },
    // props.from === 'foryou'
    //   ? {
    //       name: 'Content Type',
    //       unselected_image: IMAGES.filter_icons.content_type_filter_default,
    //       selected_image: IMAGES.filter_icons.content_type_filter_active,
    //       component: (
    //         <RefineContentType setRefineState={props.setRefineState} />
    //       ),
    //     }
    //   : {},
    {
      name: 'Runtime Minutes',
      unselected_image: IMAGES.filter_icons.runtime_filter_default,
      selected_image: IMAGES.filter_icons.runtime_filter_active,
      component: <RefineRunTime setRefineState={props.setRefineState} />,
    },
    {
      name: 'Quality ',
      unselected_image: IMAGES.filter_icons.quality_filter_default,
      selected_image: IMAGES.filter_icons.quality_filter_active,
      component: <RefineQuality setRefineState={props.setRefineState} />,
    },
    {
      name: 'Content Rating ',
      unselected_image:
        'https://images.ottplay.com/static/content_ratings_unselected.svg',
      selected_image:
        'https://images.ottplay.com/static/content_ratings_selected.svg',
      component: <RefineContentRating setRefineState={props.setRefineState} />,
    },
  ];
  const newsRefine = [
    {
      name: 'Source',
      unselected_image:
        'https://images.ottplay.com/static/streaming_unselected.svg',
      selected_image:
        'https://images.ottplay.com/static/Streaming_selected.svg',
      component: <RefineSource setRefineState={props.setRefineState} />,
    },
  ];
  const refineTab = props.forPage === 'news' ? newsRefine : refine;

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    // if (props.forPage !== 'news') {
    setExpanded(newExpanded ? panel : false);
    // }
  };

  return (
    <div className={classes.root}>
      {refineTab.map((item, index) => {
        if (item.name != undefined) {
          return (
            <div>
              <Accordion
                className={classes.panelDesign}
                onChange={handleChange(`panel${index}`)}
                expanded={expanded === `panel${index}`}
              >
                {props.forPage !== 'news' && (
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        style={{
                          color:
                            expanded === `panel${index}`
                              ? '#29F87E'
                              : '#A89ABF',
                        }}
                      />
                    }
                    // aria-controls={`panel${index}a-content`}
                    id={`panel${index}a-header`}
                  >
                    <ImageComponent
                      src={
                        expanded === `panel${index}`
                          ? item.selected_image
                          : item.unselected_image
                      }
                      alt="label image"
                      width="25"
                      height="25"
                      className={classes.tabImages}
                    />
                    <Typography
                      className={
                        classes.heading +
                        ' ' +
                        (expanded === `panel${index}` ? classes.selected : '')
                      }
                    >
                      {item.name}
                    </Typography>
                  </AccordionSummary>
                )}
                <AccordionDetails className={classes.sourceList}>
                  {item.component}
                </AccordionDetails>
              </Accordion>
            </div>
          );
        }
      })}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: '8%',
    },
    sourceList: {
      padding: '20px 16px 16px 16px',
    },
    heading: {
      color: '#A89ABF',
      fontSize: 'clamp(15px, 1vw, 16px)',
      textTransform: 'capitalize',
      marginLeft: '1rem',
    },
    panelDesign: {
      backgroundColor: 'rgba(255, 255, 255, .03)',
    },
    selected: {
      color: '#FFFFFF',
      fontWeight: 800,
    },
    tabImages: {
      width: 'auto',
      height: 'auto',
    },
  })
);
