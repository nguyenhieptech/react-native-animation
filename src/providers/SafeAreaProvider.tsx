import { PropsWithChildren } from 'react';
import { SafeAreaProvider as SAProvider } from 'react-native-safe-area-context';

export function SafeAreaProvider({ children }: PropsWithChildren) {
  return <SAProvider>{children}</SAProvider>;
}
