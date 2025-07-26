import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

type TabScrollParam = {
  activeTab: Number;
  onTabPressOne?: () => void;
  onTabPressTwo?: () => void;
};

const TabScroll = ({
  activeTab,
  onTabPressOne,
  onTabPressTwo,
}: TabScrollParam) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={onTabPressOne} style={styles.tab}>
        <Text style={[styles.tabText, activeTab === 0 && styles.activeTab]}>
          NBA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onTabPressTwo} style={styles.tab}>
        <Text style={[styles.tabText, activeTab === 1 && styles.activeTab]}>
          WNBA
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#222',
    paddingVertical: 10,
  },
  tab: {
    marginHorizontal: 20,
  },
  activeTab: {
    color: '#fff',
    borderColor: '#fff',
  },
  tabText: {
    fontSize: 18,
    color: '#888',
    borderBottomWidth: 2,
    borderColor: 'transparent',
    paddingBottom: 5,
    fontFamily: 'Prompt-Regular',
  },
});

export default TabScroll;
