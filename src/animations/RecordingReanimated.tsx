import { memo, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const RecordingReanimated = memo(() => {
  // Reanimated 2 has a concept of shared values.
  // These are values that can be shared across different threads
  // (think JavaScript thread and UI thread) thus the name of shared value.
  // useSharedValue returns a value - similar to using .current on a useRef hook
  // that means that we can't just access the result directly.
  // We need to access the .value property of the returned data
  const scaleY1 = useSharedValue(1);
  const scaleY2 = useSharedValue(1);
  const scaleY3 = useSharedValue(1);

  // Any animation with animatable value should be here
  const line1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: scaleY1.value }],
  }));
  const line2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: scaleY2.value }],
  }));
  const line3AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: scaleY3.value }],
  }));

  // Animate values after mounting
  useEffect(() => {
    scaleY1.value = withRepeat(withTiming(1.3, { duration: 300 }), -1, true);
    scaleY2.value = withRepeat(withTiming(1.2, { duration: 400 }), -1, true);
    scaleY3.value = withRepeat(withTiming(1.3, { duration: 350 }), -1, true);
  }, []);

  function renderAudioVerticalLine(
    viewStyle: ViewStyle,
    animatedStyle: ViewStyle
  ) {
    return (
      <Animated.View
        style={[viewStyle, animatedStyle]}
        className="h-8 w-3 rounded-xl bg-gray-600"
      />
    );
  }

  return (
    <View className="flex-row items-center space-x-1">
      {renderAudioVerticalLine({ height: 26 }, line1AnimatedStyle)}
      {renderAudioVerticalLine({ height: 36 }, line2AnimatedStyle)}
      {renderAudioVerticalLine({ height: 20 }, line3AnimatedStyle)}
    </View>
  );
});
