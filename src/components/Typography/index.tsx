import {Text, TextStyle} from 'react-native';
import React from 'react';

type TypographyParam = {
  variant?: 'small' | 'medium' | 'large';
  text?: string;
  styleProps?: TextStyle;
};

const TypographyVariant = {
  small: {
    fontSize: 12,
    color: '#FFF',
    fontFamily: 'Prompt-Regular',
  },
  medium: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Prompt-Regular',
  },
  large: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Prompt-Regular',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
};

export default function Typography({
  variant = 'medium',
  text,
  styleProps = {},
}: TypographyParam) {
  return <Text style={[TypographyVariant[variant], styleProps]}>{text}</Text>;
}
