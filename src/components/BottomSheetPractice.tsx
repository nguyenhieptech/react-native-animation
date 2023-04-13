import BottomSheet, { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef } from 'react';
import { StatusBar, Text, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

export function BottomSheetPractice() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  return (
    <View className="flex-1 bg-gray-600 p-6">
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View className="flex-1 items-center">
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

export const CustomBackdrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: '#a8b5eb',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle} />;
};
