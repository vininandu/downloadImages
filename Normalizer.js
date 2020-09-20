import {Dimensions, Platform} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

export const DEVICE_WIDTH =
  Platform.OS === 'android'
    ? ExtraDimensions.get('REAL_WINDOW_WIDTH')
    : Dimensions.get('window').width;
export const DEVICE_HEIGHT =
  Platform.OS === 'android'
    ? ExtraDimensions.get('REAL_WINDOW_HEIGHT') -
      ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT')
    : Dimensions.get('window').height;
//Guideline sizes are based on design screen size
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 647;

export const normalizeHorizontaly = (size) =>
  (DEVICE_WIDTH / guidelineBaseWidth) * size;
export const normalizeVerticaly = (size) =>
  (DEVICE_HEIGHT / guidelineBaseHeight) * size;
