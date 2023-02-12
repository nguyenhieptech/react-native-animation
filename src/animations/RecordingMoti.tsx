import { MotiView } from 'moti';
import { memo } from 'react';
import { View } from 'react-native';

export const RecordingMoti = memo(() => {
  function renderAudioVerticalLine(scaleY: number, duration: number) {
    return (
      <MotiView
        className="h-8 w-3 rounded-xl bg-gray-600"
        from={{ scaleY: 1 }}
        animate={{ scaleY }}
        transition={{
          loop: true,
          type: 'timing',
          duration,
        }}
      />
    );
  }

  return (
    <View className="flex-row items-center space-x-1">
      {renderAudioVerticalLine(1.3, 300)}
      {renderAudioVerticalLine(1.2, 450)}
      {renderAudioVerticalLine(1.3, 380)}
    </View>
  );
});
