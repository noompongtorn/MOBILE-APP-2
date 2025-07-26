import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React from 'react';
import Typography from '@component/Typography';

type ContainerParam<T> = {
  horizontal?: boolean;
  header?: string;
  data: ArrayLike<T> | null | undefined;
  renderItem: ListRenderItem<T> | null | undefined;
  ListFooterComponent: ListRenderItem<T> | null | undefined;
};

export default function Container<T>({
  horizontal = false,
  header,
  data,
  renderItem,
  ListFooterComponent,
}: ContainerParam<T>) {
  return (
    <View style={styles.container}>
      {header && <Typography text={header} />}

      <FlatList
        data={data}
        horizontal={horizontal}
        scrollEnabled={horizontal}
        style={{width: '100%'}}
        contentContainerStyle={{gap: 8}}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        keyExtractor={(item, index) => `${item?.id}-${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {gap: 4},
});
