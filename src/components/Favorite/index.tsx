import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Image,
} from 'react-native';

const checkfavorite = require('@assets/image/checkfavorite.png');
const unCheckfavorite = require('@assets/image/uncheckfavorite.png');

type CheckBoxParam = {
  variant?: 'primary';
  styleProps?: ViewStyle;
  styleTextProps?: TextStyle;
  checked?: boolean;
  onCheck?: (value: boolean) => void;
};

const CheckBoxVariant: Record<'primary', ViewStyle> = {
  primary: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 28,
    paddingHorizontal: 8,
  },
};

export default function Favorite({
  variant = 'primary',
  styleProps,
  checked,
  onCheck,
}: CheckBoxParam) {
  const handlePress = () => {
    if (onCheck) {
      onCheck(!checked);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[CheckBoxVariant[variant], styleProps]}>
      <Image
        style={styles.icon}
        source={checked ? checkfavorite : unCheckfavorite}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 24,
  },
});
