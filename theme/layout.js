import { Dimensions, Platform, StatusBar } from 'react-native';

// Layout Config
const android = Platform.OS === 'android';
const screen = Dimensions.get('window');
const statusBarHeight = android ? StatusBar.currentHeight : 0;

const SCREEN_WIDTH = screen.width;
const SCREEN_HEIGHT = screen.height
  ? screen.height - statusBarHeight
  : screen.height;
const SMALL_MARGIN = 16;
const SMALL_PADDING = 16;

const layout = {
  SCREEN_WIDTH: SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT,
  SCREEN_HEIGHT: SCREEN_HEIGHT > SCREEN_WIDTH ? SCREEN_HEIGHT : SCREEN_WIDTH,
  SMALL_MARGIN,
  SMALL_PADDING,
};

export default layout;
