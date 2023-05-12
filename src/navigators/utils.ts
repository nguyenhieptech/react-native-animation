import { createNavigationContainerRef } from '@react-navigation/native';
import { AppStackParamList } from './types';

/**
 * Sometimes you need to trigger a navigation action from places where
 * you do not have access to the navigation prop, such as a Redux middleware.
 * For such cases, you can dispatch navigation actions use a ref on
 * the navigation container.
 *
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop
 */
export const navigationRef = createNavigationContainerRef<AppStackParamList>();
