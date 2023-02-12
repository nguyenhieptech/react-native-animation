// github.com/enzomanuelmangano/what-about-gestures/blob/main/00-introduction-to-gestures/App.tsx

import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type AnimatedPosition = {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
};

function useFollowAnimatedPosition({ x, y }: AnimatedPosition) {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: followX.value }, { translateY: followY.value }],
    };
  });

  return { followX, followY, rStyle };
}

const { width: screenWidth } = Dimensions.get('window');
const size = 80;

export function GestureHandlerIntroduction() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateX.value > screenWidth / 2) {
        translateX.value = screenWidth - size;
      } else {
        translateX.value = 0;
      }
    });

  const {
    followX: blueFollowX,
    followY: blueFollowY,
    rStyle: rBlueCircleStyle,
  } = useFollowAnimatedPosition({
    x: translateX,
    y: translateY,
  });

  const {
    followX: redFollowX,
    followY: redFollowY,
    rStyle: rRedCircleStyle,
  } = useFollowAnimatedPosition({
    x: blueFollowX,
    y: blueFollowY,
  });

  const { rStyle: rGreenCircleStyle } = useFollowAnimatedPosition({
    x: redFollowX,
    y: redFollowY,
  });

  return (
    <View className="flex-1 bg-gray-200">
      <Animated.View
        style={[styles.circle, { backgroundColor: 'green' }, rGreenCircleStyle]}
      />
      <Animated.View
        style={[styles.circle, { backgroundColor: 'red' }, rRedCircleStyle]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.circle, rBlueCircleStyle]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  circle: {
    position: 'absolute',
    height: size,
    aspectRatio: 1,
    backgroundColor: 'blue',
    borderRadius: size / 2,
    opacity: 0.8,
  },
});
