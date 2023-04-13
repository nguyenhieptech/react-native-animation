import { View } from 'react-native';
import { Host } from 'react-native-portalize';
import { InterpolateColor, ViewableAnimatedFlatList } from 'src/animations';
import { BottomSheetPractice } from 'src/components';
import { AppProvider } from 'src/providers';

export default function App() {
  return (
    <AppProvider>
      <Host>
        <View className="flex-1">
          <InterpolateColor />
          {/* <ViewableAnimatedFlatList /> */}
          {/* <Fonts /> */}
          {/* <BottomSheetPractice /> */}
        </View>
      </Host>
    </AppProvider>
  );
}
