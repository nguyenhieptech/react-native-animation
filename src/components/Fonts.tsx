import { Text, View } from 'react-native';

export function Fonts() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-700">
      <Text className="font-primary-100 font-thin text-gray-100">
        Font Thin
      </Text>
      <Text className="font-primary-200 font-extralight text-gray-100">
        Font ExtraLight
      </Text>
      <Text className="font-primary-300 font-light text-gray-100">
        Font Light
      </Text>
      <Text className="font-primary-400 font-normal text-gray-100">
        Font Normal
      </Text>
      <Text className="font-primary-500 font-medium text-gray-100">
        Font Regular
      </Text>
      <Text className="font-primary-600 font-semibold text-gray-100">
        Font SemiBold
      </Text>
      <Text className="font-primary-700 font-bold text-gray-100">
        Font Bold
      </Text>
      <Text className="font-primary-800 font-extrabold text-gray-100">
        Font ExtraBold
      </Text>
      <Text className="font-primary-900 font-black text-gray-100">
        Font Black
      </Text>
    </View>
  );
}
