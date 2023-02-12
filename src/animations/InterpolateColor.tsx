import React, { useState } from 'react';
import { Dimensions, StyleSheet, Switch } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { globalThemeObject } from 'src/theme';

const colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E',
  },
};

type Theme = 'light' | 'dark';

export function InterpolateColor() {
  const [theme, setTheme] = useState<Theme>('light');

  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.light.background, colors.dark.background]
      ),
    };
  });

  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.light.circle, colors.dark.circle]
      ),
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        progress.value,
        [0, 1],
        [colors.light.text, colors.dark.text]
      ),
    };
  });

  return (
    <Animated.View
      className="flex-1 items-center justify-center bg-white"
      style={containerAnimatedStyle}
    >
      <Animated.Text
        className="mb-8 text-7xl font-bold uppercase"
        style={textAnimatedStyle}
      >
        Theme
      </Animated.Text>
      <Animated.View
        className="items-center justify-center rounded-full bg-white shadow-md"
        style={circleAnimatedStyle}
      >
        <Switch
          value={theme === 'dark'}
          onValueChange={(toggled) => {
            setTheme(toggled ? 'dark' : 'light');
          }}
          trackColor={{
            true: 'white',
            false: globalThemeObject.colors['gray-600'],
          }}
          thumbColor={globalThemeObject.colors.primary}
        />
      </Animated.View>
    </Animated.View>
  );
}

const SIZE = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE / 2,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  text: {
    fontSize: 70,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 14,
    marginBottom: 35,
  },
});
