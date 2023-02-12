import { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

type Item = {
  id: number;
};

export function LayoutAnimation() {
  const initialModeRef = useRef<boolean>(true);

  useEffect(() => {
    initialModeRef.current = false;
  }, []);

  // [{id: 0}, {id: 1}, {id: 2}, ..., {id: 5}]
  const [items, setItems] = useState<Item[]>(() => {
    return new Array(5).fill(0).map((_, index) => ({ id: index }));
  });

  const handleAddItem = useCallback(() => {
    setItems((currentItems) => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
      return [...currentItems, { id: nextItemId }];
    });
  }, []);

  const handleDeleteItem = useCallback((itemId: number) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <TouchableOpacity
        className="absolute right-6 bottom-6 z-10 h-20 w-20 items-center justify-center rounded-full bg-gray-800"
        onPress={handleAddItem}
        activeOpacity={0.7}
      >
        <Text className="text-4xl text-white">+</Text>
      </TouchableOpacity>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 50 }}
      >
        {items.map((item, index) => {
          return (
            <Animated.View
              key={item.id}
              className="my-2 h-24 w-[90%] items-center justify-center self-center rounded-xl bg-sky-500 shadow-md"
              entering={
                initialModeRef.current ? FadeIn.delay(50 * index) : FadeIn
              }
              exiting={FadeOut}
              layout={Layout.delay(100)}
              onTouchEnd={() => handleDeleteItem(item.id)}
            >
              <Text className="font-family-600 text-lg font-semibold text-gray-100">
                {item.id}
              </Text>
            </Animated.View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
