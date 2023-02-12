// https://docs.swmansion.com/react-native-gesture-handler/docs/quickstart/

import React from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export function GestureDetectorQuickStart() {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: isPressed.value
        ? withTiming('yellow', { duration: 150 })
        : withTiming('blue', { duration: 150 }),
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="h-48 w-48 items-center justify-center rounded-lg border-4 bg-sky-600">
        <GestureDetector gesture={gesture}>
          <Animated.View
            className="h-24 w-24 rounded-xl bg-sky-600"
            style={animatedStyles}
          />
        </GestureDetector>
      </View>
    </View>
  );
}
