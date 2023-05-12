import React, { PropsWithChildren } from 'react';
import { GestureHandlerProvider } from './GestureHandlerProvider';
import { SafeAreaProvider } from './SafeAreaProvider';

/** Wrap all providers and React contexts inside this AppProvider. */
export function AppProvider({ children }: PropsWithChildren) {
  return (
    <GestureHandlerProvider>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </GestureHandlerProvider>
  );
}
