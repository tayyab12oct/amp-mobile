import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { CriticsReview } from './CriticsReview';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { UserReview } from './UserReview';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const GlobalCss = withStyles({
  '@global': {
    '.MuiTabs-indicator': {
      backgroundColor: 'red',
    },
  },
})(() => null);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  tabHeader: {
    backgroundColor: 'transparent',
    '& button': {
      width: '50%',
      '& span': {
        textTransform: 'capitalize',
        fontSize: 14,
        fontWeight: 500,
      },
    },
  },
}));

export function CriticsUsersReviewMobile() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <GlobalCss />
      <div className={classes.root}>
        <AppBar className={classes.tabHeader} position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Critics And Users Review"
          >
            <Tab
              selected
              fullWidth={true}
              label="Critics review"
              {...a11yProps(0)}
            />
            <Tab
              selected
              fullWidth={true}
              label="User reviews"
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <CriticsReview />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserReview location />
        </TabPanel>
      </div>
    </>
  );
}
