import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1400,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: `"Montserrat", "Arial", "sans-serif"`,
    // fontWeightLight: 300,
    // fontWeightRegular: 400,
    // fontWeightMedium: 500,
    // fontWeightSemiBold: 600,
    // fontWeightBold: 700,
    // fontWeightExtraBold: 800,
  },
});

export default theme;