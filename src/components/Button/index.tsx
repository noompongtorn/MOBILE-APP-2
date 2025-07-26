import React from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle } from 'react-native';

type ButtonParam = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'profile' | 'logout';
  text: string;
  styleProps?: ViewStyle;
  styleTextProps?: TextStyle;
  onPress?: () => void;
};

const ButtonVariant: Record<
  'primary' | 'secondary' | 'tertiary' | 'profile' | 'logout',
  ViewStyle
> = {
  primary: {
    width: '100%',
    height: 52,
    backgroundColor: '#F0D313',
    borderRadius: 16,
    alignItems: 'center', // FlexAlignType
    justifyContent: 'center', // FlexAlignType
  },
  secondary: {
    width: '100%',
    height: 52,
    backgroundColor: '#F0D313',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tertiary: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 16,
  },
  profile: {
    width: '100%',
    height: 52,
    backgroundColor: '#FFF',
    borderRadius: 16,
    justifyContent: 'center',
  },
  logout: {
    width: '100%',
    height: 52,
    backgroundColor: '#D1D1D1',
    borderRadius: 16,
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
  },
};

const ButtonTextVariant: Record<
  'primary' | 'secondary' | 'tertiary' | 'profile' | 'logout',
  TextStyle
> = {
  primary: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Prompt-Regular',
  },
  secondary: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Prompt-Regular',
  },
  tertiary: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Prompt-Regular',
  },
  profile: {
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: 'Prompt-Regular',
  },
  logout: { fontSize: 14, fontFamily: 'Prompt-Regular' },
};

export default function Button({
  variant = 'primary',
  text,
  styleProps,
  styleTextProps,
  onPress,
}: ButtonParam) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[ButtonVariant[variant], styleProps]}>
      <Text style={[ButtonTextVariant[variant], styleTextProps]}>{text}</Text>
    </TouchableOpacity>
  );
}
