import {View, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';

interface BetweenContainerProps {
  children: ReactNode;
}

export default function BetweenContainer({children}: BetweenContainerProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#fff',
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
