import React from 'react';
import { View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 90;
const CIRCLE_RADIUS = SIZE * 2;

type ContextType = {
  translateX: number;
  translateY: number;
};

export function PanGestureHandlerBasic() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    // Each time we touch the square, we need to store the shared values translateX & translateY
    // docs.swmansion.com/react-native-reanimated/docs/api/hooks/useAnimatedGestureHandler#arguments
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    // When the PanGesture is active, we need to update the shared values
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    // When the PanGesture is end, we need to update the shared values
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const squaredAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  }));

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="h-48 w-48 items-center justify-center rounded-lg border-4 bg-sky-600">
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            className="h-24 w-24 rounded-xl bg-sky-600"
            style={squaredAnimatedStyle}
          />
        </PanGestureHandler>
      </View>
    </View>
  );
}
