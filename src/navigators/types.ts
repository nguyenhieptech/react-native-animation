/**
 * Organizing types
 *
 * When writing types for React Navigation, there are a couple of things we recommend to keep things organized.
 * 1. It's good to create a separate files (e.g. navigators/types.ts) which contains the types related to React Navigation.
 * 2. Instead of using CompositeNavigationProp directly in your components, it's better to create a helper type that you can reuse.
 * 3. Specifying a global type for your root navigator would avoid manual annotations in many places.
 *
 * @see https://reactnavigation.org/docs/typescript#organizing-types - v6
 */

export type AppStackParamList = {
  Home: undefined;
};
