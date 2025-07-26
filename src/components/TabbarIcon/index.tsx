import React from 'react';
import {
  View,
  Text,
  Platform,
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextStyle,
  ImageStyle,
  StyleProp,
} from 'react-native';

const { width } = Dimensions.get('screen');

type TabbarIconParam = {
  focused?: boolean;
  icon?: ImageSourcePropType | undefined;
  label?: string;
};

export default function TabbarIcon({
  focused = false,
  icon,
  label,
}: TabbarIconParam) {
  return (
    <View style={styles.tabbarContainer}>
      <Image style={getTabbarIconStyle(focused)} source={icon} />

      <Text style={getTabbarLabelStyle(focused)}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabbarContainer: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 30 : 15,
    width: width * 0.2,
    justifyContent: 'center',
    gap: 4,
  },
  tabbarIconBase: {
    width: 24,
    height: 24,
  },
  tabbarLabelBase: {
    fontSize: 10,
    fontFamily: 'Prompt-Regular',
  },
});

const getTabbarIconStyle = (
  focused: boolean,
): StyleProp<ImageStyle> | undefined => ({
  ...styles.tabbarIconBase,
  tintColor: focused ? '#721E97' : '#FFF',
});

const getTabbarLabelStyle = (
  focused: boolean,
): StyleProp<TextStyle> | undefined => ({
  ...styles.tabbarLabelBase,
  color: focused ? '#5C1B70' : '#fff',
});
