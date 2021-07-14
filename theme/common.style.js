import { FONT_FAMILY_REGULAR } from './typography';
import { StyleSheet } from 'react-native';
import color from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: FONT_FAMILY_REGULAR,
    backgroundColor: color.background,
  },
});
