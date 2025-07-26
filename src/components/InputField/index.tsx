import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  TextInputProps,
  ImageSourcePropType,
} from 'react-native';

type TextFieldProps = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: ImageSourcePropType; // Optional trailing icon (e.g., for visibility toggle)
  onIconPress?: () => void; // Action for trailing icon
  errorMessage?: string; // Error message
  disabled?: boolean; // Disabled state
  labelIcon?: ImageSourcePropType; // Leading icon for label
  labelText?: string; // Label text
};

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChangeText,
  secureTextEntry = false,
  icon,
  onIconPress,
  errorMessage,
  disabled = false,
  labelIcon,
  labelText,
  ...props
}) => {
  return (
    <View style={styles.wrapper}>
      {labelText && (
        <View style={styles.labelContainer}>
          {labelIcon && <Image source={labelIcon} style={styles.labelIcon} />}
          <Text style={styles.labelText}>{labelText}</Text>
        </View>
      )}

      <View
        style={[
          styles.container,
          errorMessage ? styles.errorBorder : null,
          disabled ? styles.disabledContainer : null,
        ]}>
        <TextInput
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, disabled ? styles.disabledInput : null]}
          editable={!disabled}
          autoCapitalize="none"
          {...props}
        />

        {icon && (
          <TouchableOpacity
            onPress={onIconPress}
            disabled={disabled}
            style={styles.iconContainer}>
            <Image
              source={icon}
              style={[styles.icon, disabled ? styles.disabledIcon : null]}
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  labelIcon: {
    width: 32,
    height: 32,
  },
  labelText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Prompt-Regular',
  },
  container: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
  },
  input: {
    fontSize: 18,
    color: '#fff',
    width: '85%',
    fontFamily: 'Prompt-Regular',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Prompt-Regular',
  },
  errorBorder: {
    borderColor: 'red',
  },
  disabledContainer: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
  },
  disabledInput: {
    color: '#999',
  },
  disabledIcon: {
    tintColor: '#999',
  },
});

export default TextField;
