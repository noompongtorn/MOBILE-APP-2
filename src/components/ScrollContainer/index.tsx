import React, { ReactNode, useState } from 'react';
import {
  ScrollView,
  Platform,
  ViewStyle,
  View,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

interface ScrollContainerProps {
  children: ReactNode;
  onLoadMore?: () => void; // Callback to load more content
  isLoadingMore?: boolean; // Indicates if more content is loading
}

export default function ScrollContainer({
  children,
  onLoadMore,
  isLoadingMore,
}: ScrollContainerProps) {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    // Check if the user has scrolled close to the bottom
    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isNearBottom && !isAtBottom) {
      setIsAtBottom(true);
      onLoadMore?.(); // Trigger load more callback
    } else if (!isNearBottom && isAtBottom) {
      setIsAtBottom(false);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ paddingTop: Platform.OS === 'ios' ? 40 : 40 } as ViewStyle}
      onScroll={handleScroll}
      scrollEventThrottle={16} // Throttle scroll events for better performance
    >
      <View style={{ paddingHorizontal: 5, gap: 16 }}>{children}</View>
      {isLoadingMore ? (
        <ActivityIndicator style={{ marginVertical: 10 }} size="small" />
      ) : (
        <Footer />
      )}
    </ScrollView>
  );
}

const Footer = () => {
  return <View style={{ height: 120 }} />;
};
