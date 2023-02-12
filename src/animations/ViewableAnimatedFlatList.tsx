import { memo, useRef } from 'react';
import { FlatList, Text, View, ViewToken } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Data = {
  id: number;
};

const data: Data[] = new Array(100).fill(0).map((_, index) => ({ id: index }));
// [{id: 0}, {id: 1}, {id: 2}, ..., {id: 99}]

export function ViewableAnimatedFlatList() {
  const flatListRef = useRef<FlatList<Data>>(null);

  // reactnative.dev/docs/viewtoken
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View className="flex-1 bg-gray-200">
      <FlatList
        data={data}
        ref={flatListRef}
        keyExtractor={(item) => item.id.toString()}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        renderItem={({ item }) => {
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
      />
    </View>
  );
}

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: Data;
};

const ListItem = memo(({ item, viewableItems }: ListItemProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable) // filter items that can be view (viewable) on the screen
        .find((viewableItem) => viewableItem.item.id === item.id) // find viewable item that has the same id with the passed id
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.8),
        },
      ],
    };
  }, []);

  return (
    <Animated.View
      className="mt-5 h-20 w-[90%] items-center justify-center self-center rounded-md bg-sky-600"
      style={animatedStyle}
    >
      <Text className="font-family-600 text-lg font-semibold text-gray-100">
        {item.id}
      </Text>
    </Animated.View>
  );
});
