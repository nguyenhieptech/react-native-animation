import { SafeAreaView, View } from 'react-native';
import {
  ViewableAnimatedFlatList,
  LayoutAnimation,
  InterpolateColor,
  GestureDetectorQuickStart,
  GestureHandlerIntroduction,
} from 'src/animations';
import { Fonts } from 'src/components';
import { AppProvider } from 'src/providers';

export default function App() {
  return (
    <AppProvider>
      <View className="flex-1">
        {/* <InterpolateColor /> */}
        {/* <ViewableAnimatedFlatList /> */}
        <Fonts />
      </View>
    </AppProvider>
  );
}
