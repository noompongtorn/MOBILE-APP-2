import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Image,
} from 'react-native';

const CheckIcon = require('@assets/image/checksquare.png');
const SquareIcon = require('@assets/image/square.png');

type CheckBoxParam = {
  variant?: 'primary';
  text: string;
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
    borderRadius: 16,
  },
};

const CheckBoxTextVariant: Record<'primary', TextStyle> = {
  primary: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Prompt-Regular',
  },
};

export default function CheckBox({
  variant = 'primary',
  text,
  styleProps,
  styleTextProps,
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
        tintColor={'#fff'}
        style={styles.icon}
        source={checked ? CheckIcon : SquareIcon}
      />

      <Text style={[CheckBoxTextVariant[variant], styleTextProps]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
